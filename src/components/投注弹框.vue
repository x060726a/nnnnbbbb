<template>
<popup v-model="popupVisible" position="bottom" class="lottery-pancel" @on-hide="hide()">
    <div class="content">
        <div class="top">
            <div class="left">
                <span @click="chooseLotteryType=1" :class="{active:chooseLotteryType==1}">色波投注</span>
                <span @click="chooseLotteryType=2" :class="{active:chooseLotteryType==2}">大小投注</span>
                <span @click="chooseLotteryType=3" :class="{active:chooseLotteryType==3}">单双投注</span>
                <span @click="chooseLotteryType=4" :class="{active:chooseLotteryType==4}">特码投注</span>
            </div>
            <div class="right">
                <div class="title" v-if="chooseLotteryType==1">色波投注</div>
                <div class="title" v-if="chooseLotteryType==2">大小投注</div>
                <div class="title" v-if="chooseLotteryType==3">单双投注</div>
                <div class="title" v-if="chooseLotteryType==4">特码投注</div>
                <div class="btn-group" v-if="chooseLotteryType==1">
                    <div class="item" @click="addBetArr('红波')" :class="{active:action_data.indexOf('红波')>-1}"><span>红波</span><span>3</span></div>
                    <div class="item" @click="addBetArr('绿波')" :class="{active:action_data.indexOf('绿波')>-1}"><span>绿波</span><span>3</span></div>
                    <div class="item" @click="addBetArr('蓝波')" :class="{active:action_data.indexOf('蓝波')>-1}"><span>蓝波</span><span>3</span></div>
                </div>
                <div class="btn-group" v-if="chooseLotteryType==2">
                    <div class="item" @click="addBetArr('特大')" :class="{active:action_data.indexOf('特大')>-1}"><span>特大</span><span>2</span></div>
                    <div class="item" @click="addBetArr('特小')" :class="{active:action_data.indexOf('特小')>-1}"><span>特小</span><span>2</span></div>
                </div>
                <div class="btn-group" v-if="chooseLotteryType==3">
                    <div class="item" @click="addBetArr('特单')" :class="{active:action_data.indexOf('特单')>-1}"><span>特单</span><span>2</span></div>
                    <div class="item" @click="addBetArr('特双')" :class="{active:action_data.indexOf('特双')>-1}"><span>特双</span><span>2</span></div>
                </div>
                <div class="btn-group" v-if="chooseLotteryType==4">
                    <div class="tema-group" v-for="idx in 24">
                        <div @click="addBetArr(idx*2-1)" :class="{active:action_data.indexOf(idx*2-1)>-1}"><span>{{idx*2-1}}</span><span>48</span></div>
                        <div @click="addBetArr(idx*2)" :class="{active:action_data.indexOf(idx*2)>-1}"><span>{{idx*2}}</span><span>48</span></div>
                    </div>
                    <div class="tema-group">
                        <div @click="addBetArr(49)" :class="{active:action_data.indexOf(49)>-1}"><span>49</span><span>48</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="input-btn">
                <div class="input-wrap">
                    <span>￥</span>
                    <div class="input" @click="keypoTogle=!keypoTogle" :class="{active:keypoNum=='请输入金额'}">{{keypoNum}}</div>
                    <i class="iconfont icon-close1" @click="allDelete()"></i>
                </div>
                <div @click="bet()">投注</div>
            </div>
        </div>
        <KEYPO v-if="keypoTogle"/>
    </div>
</popup>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
import { Popup } from 'vux'
const KEYPO = new Promise(resolve=>{
    require.ensure(['@/components/键盘'],()=>{
        resolve(require('@/components/键盘'))
    })
})
export default {
    data(){
        return{
            popupVisible:'',
            chooseLotteryType:1,
            action_data:[],
            keypoTogle:false,
            odds:''
        }
    },
    watch:{
        '$store.state.tz_popupVisible'(val,oval){
            this.popupVisible = val
        },
        '$store.state.lotteryPancel'(val,oval){
            this.$store.commit('tz_popupVisible',false)
        },
        'chooseLotteryType'(val,oval){
            this.action_data = []
        },
        deep:true
    },
    created(){
        this.popupVisible = this.$store.state.tz_popupVisible
    },
    computed:{
        ...mapGetters(['keypoNum','tz_popupVisible'])
    },
    components:{
        Popup,
        KEYPO(){
            return {
                component:KEYPO,
            }
        },
    },
    methods:{
        hide(){
            this.action_data = []
            this.keypoTogle = false
            this.$store.commit('tz_popupVisible',false)
            this.$store.commit('keypoNum','请输入金额');
        },
        addBetArr(num){
            var arr = [2,1,1,30]
            var newOdds = [3,2,2,48]
            this.odds = newOdds[this.chooseLotteryType-1]
            if(this.action_data.indexOf(num)>-1){
                this.action_data.splice(this.action_data.indexOf(num),1)
            }else{
                if(this.action_data.length+1>arr[this.chooseLotteryType-1]){
                    this.$vux.toast.text('最多选择'+arr[this.chooseLotteryType-1]+'注','middle')
                    return
                }else{
                    this.action_data.push(num)
                }
            }
            this.action_data.sort((a,b)=>{
                return a - b
            })
        },
        bet(){
            var that = this;
            if(this.isbetPending){
                return;
            }
            if(this.action_data.length==0){
                this.$vux.toast.text('请先选择投注内容', 'middle')
                return
            }
            if(this.$store.state.keypoNum == "请输入金额" || this.$store.state.keypoNum==0){
                this.$vux.toast.text('请输入金额', 'middle')
                return;
            }
            if(!this.$store.state.nextIssue.qihao){
                this.$store.commit('tz_popupVisible',false)
                this.$vux.toast.text('获取期号失败', 'middle')
                return;
            }
            
            this.$vux.loading.show({
                text: '投注中',
            })
            this.isbetPending = true;
            var new_action_data = []
            this.action_data.forEach(ele => {
                var obj = {
                    value:ele,
                    money:that.$store.state.keypoNum,
                    odds:that.odds
                }
                new_action_data.push(obj)
            });
            var qs_new_action_data = JSON.stringify(new_action_data)
            var postData = this.$qs.stringify({
                type:that.chooseLotteryType,
                action_qishu:this.$store.state.nextIssue.qihao,
                total_num:this.action_data.length,
                total_money:this.$store.state.keypoNum*this.action_data.length,
                action_data:qs_new_action_data,
            })
            var betObj = {
                avatar:that.$store.state.user.avatar,
                event:'bet',
                isMyself:true,
                level:that.$store.state.user.level,
                uid:that.$store.state.user.id,
                username:that.$store.state.user.username,
                nickname:that.$store.state.user.nickname,
                bet_type:that.chooseLotteryType,
                bet_issue:this.$store.state.nextIssue.qihao,
                bet_num:that.$store.state.keypoNum,
                content:that.action_data,
            }
            this.$store.commit('tz_popupVisible',false)
            that.$http.post('/v1/chat/bets',postData).then(res=>{
                if(res.code==0){
                    that.$vux.toast.text('投注成功', 'middle')
                    that.$store.commit('changeMoney',res.data.money);
                    // 投注成功发送消息
                    // that.$store.commit('pushMessage',betObj);
                    that.$store.commit('chatRoll')
                    that.$store.state.socket.send(JSON.stringify(betObj));
                    // 投注成功发送消息
                }else{
                    that.$vux.toast.text(res.msg_zh, 'middle')
                }
                that.$vux.loading.hide()
                that.isbetPending = false;
            })
        },
        allDelete(){
            this.$store.commit('keypoNum','请输入金额');
        },
    }
}
</script>
<style lang="scss" scoped>
.lottery-pancel{
    .content{
        width: 100vw;
        background: #fff;
        .top{
            overflow: hidden;
            height: 662px;
            .left{
                width:237px;
                height: 662px;
                float: left;
                background: #eeeeee;
                font-size: 32px;
                span{
                    display: block;
                    height: 80px;
                    line-height: 80px;
                }
                span.active{
                    background: $bg-color;
                    color:$theme-color;
                }
            }
            .right{
                height: 662px;
                width: calc(100vw - 237px);
                float: left;
                font-size: 32px;
                .title{
                    width:100%;
                    height: 80px;
                    line-height: 80px;
                }
                .btn-group{
                    padding:20px 20px 0 20px;
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                    height: calc(100% - 100px);
                    >div.item{
                        display: block;
                        height: 60px;
                        line-height: 60px;
                        width:228px;
                        float: left;
                        margin-bottom:20px;
                        background: #eeeeee;
                        font-size: 28px;
                        border-radius: 10px;
                        overflow: hidden;
                        span{
                            float: left;
                            line-height: 60px;
                        }
                        span:first-child{
                            margin-left:55px;
                        }
                        span:last-child{
                            margin-left:55px;
                        }
                    }
                    >div.item.active{
                        background: $theme-color;
                        color:#fff;
                    }
                    >div.item:nth-child(2n){
                        float: right;
                    }
                    .tema-group{
                        width:100%;
                        overflow: hidden;
                        margin-bottom:20px;
                        >div{
                            float: left;
                            width:228px;
                            height: 60px;
                            line-height: 60px;
                            background: #eeeeee;
                            font-size: 28px;
                            border-radius: 10px;
                            >span:nth-child(1){
                                display: block;
                                width: 44px;
                                height: 44px;
                                line-height: 44px;
                                border-radius: 50%;
                                background: #fff;
                                float: left;
                                margin-left:50px;
                                margin-top:7px;
                                box-shadow: 2px 2px 2px #b7b3b3;
                            }
                            >span:nth-child(2){
                                display: block;
                                width:calc(100% - 110px);
                                float: left;
                                text-align: center;
                                color:$theme-color;
                            }
                        }
                        >div:nth-child(2){
                            float: right;
                        }
                        >div.active{
                            background: $theme-color;
                            >span:nth-child(1){
                                color:$theme-color;
                            }
                            >span:nth-child(2){
                                color:#fff;
                            }
                        }
                    }
                }
            }
        }
        .bottom{
            .input-btn{
                padding:16px 26px 16px 16px;
                display: flex;
                border-top:$border-color 1px solid;
                div{
                    height: 60px;
                    line-height: 60px;
                }
                div:nth-child(1){
                    flex: 1.5;
                    border:$border-color 1px solid;
                    border-radius: 3px;
                    position: relative;
                    overflow: hidden;
                    margin-right:26px;
                    margin-top:8px;
                    span{
                        display: inline-block;
                        height: 60px;
                        line-height: 60px;
                        position: absolute;
                        left: 16px;
                        z-index: 2;
                        font-size: 36px;
                        color:#333;
                    }
                    .input{
                        height: 60px;
                        line-height: 60px;
                        padding-left:60px;
                        position: absolute;
                        left: 0;
                        z-index: 1;
                        width:calc(100% - 130px);
                        background: #fff;
                        color:$subtitle-color;
                        text-align: left;
                        font-size: 32px;
                        color:#333;
                    }
                    .input.active{
                        color:#999;
                    }
                    i{
                        display: inline-block;
                        position: absolute;
                        z-index: 1;
                        top: 0px;
                        right:15px;
                        height: 60px;
                        line-height: 60px;
                        font-size: 50px;
                    }
                }
                div:nth-child(2){
                    flex: 0.3;
                    background: linear-gradient(to right,#49b4ff,$theme-color);
                    color:#fff;
                    border-radius: 10px;
                    height: 80px;
                    line-height: 80px;
                    font-size: 32px;
                }
            }
        }
    }
}
</style>