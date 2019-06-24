<template>
<div class="chatcont-wrap" ref="wrap" @scroll="paperScroll">
    <div class="message-list" ref="msglist">
        <div class="contain">
            <div class="list"  v-for="(ele,idx) in message" :key='idx' ref="list">
                <ADMIN :message="ele" v-if="ele.event=='bet_vote'||ele.event=='bet_statistics'||ele.event=='envelop'||ele.event=='notice'"/>
                <USER :message="ele" v-else/>
            </div>
        </div>
    </div>
    <div class="warring" v-if="newMessageNum>0">{{newMessageNum}}条新消息</div>
    <!-- 红包弹窗 -->
    <div class="redpack-mask" v-if="redPackPop" style="z-index:3">
        <div class="redpack">
            <span class="text"><span>{{redPackRes.money.toFixed(0)}}</span><span>金</span></span>
            <span class="iconfont icon-close close" @click="$store.commit('redPackPop',false)"></span>
        </div>
    </div>
    <!-- 红包弹窗 -->

    <!-- 底部键盘 -->
    <KEYPO v-if="keyposhow"/>
    <!-- 底部键盘 -->
</div>
</template>
<script>
import { mapGetters,mapMutations } from 'Vuex'
import { TweenLite } from 'gsap'
export default {
    data(){
        return {
            isLoading: false,
            listH:0,
            guestname:'!guest001!',
            guestpasw:'!guest001!',
            promptList:[],
            allLoaded:false,
            socket:'',
            scrollTop:0,
            chatHeight:0,//聊天界面的高度
        }
    },
    watch:{
        '$store.state.chatRoll'(val,oval){
            var dom = this.$refs.msglist&&this.$refs.msglist.scrollHeight;
            if(this.$refs.wrap){
                TweenLite.to(this.$refs.wrap,1,{scrollTop:dom});
            }
        }
    },
    async created(){
        var res = await this.gethistory();
        this.createWebSocket();
    },
    mounted(){
        this.$nextTick(function(){
            setTimeout(()=>{
                var dom = this.$refs.msglist&&this.$refs.msglist.scrollHeight;
                if(this.$refs.wrap){
                    this.$refs.wrap.scrollTop = this.$refs.wrap&&this.$refs.wrap.scrollHeight-this.$refs.wrap.clientHeight;
                }
                this.$store.commit('isScrolltoBottom',true)
            },500)
        })
    },
    computed:{
        ...mapGetters({
            message:'message',
            redPackPop:'redPackPop',
            keyposhow:'openKeypo',
            redPackRes:'redPackRes',
            isApp:'isApp',
            isFirst:'isFirst',
            chatRoll:'chatRoll',
            newMessageNum:'newMessageNum'
        }),
    },
    updated(){
        if(this.$store.state.isScrolltoBottom){
            this.$nextTick(function(){
                setTimeout(()=>{
                    var dom = this.$refs.msglist&&this.$refs.msglist.scrollHeight;
                    if(this.$refs.wrap){
                        TweenLite.to(this.$refs.wrap,1,{scrollTop:dom});
                    }
                },200)
            })
        }
    },
    methods:{
        ...mapMutations(['createWebSocket','connection']),
        paperScroll(e){
            var that = this;
            this.chatHeight = this.$refs.wrap&&this.$refs.wrap.scrollHeight-this.$refs.wrap.clientHeight;
            if(that.scrollTop>event.target.scrollTop){
                this.$store.commit('isScrolltoBottom',false)
            }else{
                if(this.chatHeight-e.target.scrollTop<=50){
                    this.$store.commit('isScrolltoBottom',true)
                    this.$store.commit('newMessageNum',0)
                }
            }
            that.scrollTop = parseInt(event.target.scrollTop);
        },
        loadTop(){
            this.$refs.loadmore.onTopLoaded();
        },
        guestLogin(){
            var that = this;
            let postData = that.$qs.stringify({
                username:this.guestname,
                password:this.guestpasw
            });
            return new Promise((resolve,reject)=>{
                that.$http.post('/v1/user/login',postData).then(res=>{
                    that.$store.commit('guest',res.data);
                    resolve(res.data);
                });
            })
        },
        removePromptList(){
            var that =  this;
            setTimeout(()=>{
                this.promptList.shift();
            },2000)
        },
        //获取历史聊天记录
        gethistory(){
            var that = this;
            that.$store.commit('resetMessage',[]);
            that.$vux.loading.hide()
            that.$vux.loading.show({
                text: '正在加载聊天记录'
            })
            return new Promise(resolve=>{
                that.$http.post('/v1/chat/chat-records').then(res=>{
                    res.data.sort((a,b)=>{
                        return a.time - b.time
                    })
                    var nowDate,lastDate;
                    res.data.forEach((ele,idx) => {
                        var d = new Date(ele.time * 1000).getDate();
                        var m = new Date(ele.time * 1000).getMonth()*1+1;
                        var y = new Date(ele.time * 1000).getFullYear();
                        var mm = m<10?'0'+m:m;
                        var dd = d<10?'0'+d:d;
                        ele['t_time'] = y+'-'+mm+'-'+dd;
                        if(idx==0){
                            ele['nextTime'] = true;
                        }else{
                            if(idx!=res.data.length-1){
                                nowDate = new Date(ele.time * 1000).getFullYear()+'-'+(new Date(ele.time * 1000).getMonth()*1+1)+'-'+new Date(ele.time * 1000).getDate();
                                lastDate = new Date(res.data[idx-1].time * 1000).getFullYear()+'-'+(new Date(res.data[idx-1].time * 1000).getMonth()*1+1)+'-'+new Date(res.data[idx-1].time * 1000).getDate()
                                if(nowDate!==lastDate){
                                    ele['nextTime'] = true;
                                }else{
                                    ele['nextTime'] = false;
                                }
                            }
                        }
                        if(ele.username==that.$store.state.user.username){
                            ele['isMyself'] = true;
                        }else{
                            ele['isMyself'] = false;
                        }
                        if(idx+1 == res.data.length){
                            ele['type'] = 'record'
                        }
                        ele['isSending'] = false;
                        that.$store.commit('pushMessage',ele);
                    });
                    resolve('done')
                    that.$vux.loading.hide()
                })
            })
        },

    },
    components:{
        ADMIN(){
            return {
                component:import('@/components/来自后台的信息'),
            }
        },
        USER(){
            return {
                component:import('@/components/来自用户的信息'),
            }
        },
        KEYPO(){
            return {
                component:import('@/components/键盘'),
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.warring{
    position: fixed;
    z-index: 2;
    bottom: 120px;
    right: 0;
    background: #fff;
    color:$theme-color;
    padding: 5px 5px 5px 20px;
    line-height: 30px;
    border-radius: 20px 0 0 20px;
    box-shadow: 0px 1px 2px #b7b3b3;
    font-size: 24px;
}
.redpack-mask{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    background: rgba(0,0,0,.5);
    .redpack{
        position: absolute;
        top: 50%;
        left:50%;
        width: 400px;
        height: 550px;
        z-index: 4;
        background: url('/static/images/redpack_open.png') no-repeat;
        background-size: 100% 100%;
        margin-top:-375px;
        margin-left:-200px;
        .text{
            position: absolute;
            top: 70px;
            left: 66px;
            display: block;
            width:260px;
            height: 90px;
            line-height: 90px;
            color:#e72426;
            span{
                display: inline-block;
                vertical-align: middle;
            }
            span:first-child{
                line-height: 120px;
                height: 90px;
                font-size: 90px;
            }
            span:last-child{
                height: 90px;
                line-height: 160px;
                font-weight: bold;
                text-shadow: 1px 1px 10px #807f7f;
            }
        }
        .close{
            width: 50px;
            height: 50px;
            font-size: 50px;
            position: absolute;
            z-index: 4;
            bottom:-62px;
            left: 50%;
            margin-left:-25px;
            display: block;
            color:#fff;
        }
    }
}
.chatcont-wrap{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .web-bmessage-list{
        min-height: calc(100vh - (#{$web-height} + #{$bot-height} + 2px));
    }
    .app-bmessage-list{
        min-height: calc(100vh - (#{$app-height} + #{$bot-height} + 2px));
    }
    .message-list{
        position: relative;
        .list{
            min-height: 50px;
            position: relative;
        }
        .title {
                display: flex;
                flex-direction: column;

        }
    }
}

</style>
