<template>
    <div class="chat">
        <div class="roomCode">
            <liuCode/>
        </div>
        <div class="chat-wrap"><CHATS v-if="hackReset"></CHATS></div>
        <div class="chat-input">
            <span @click="admin()">投注</span>
            <input type="text" class="send-input" v-model="text" v-if="user" maxlength="70" :disabled="user.chat==0" :placeholder="user.chat==0?'您已被禁言':'请输入聊天内容'">
            <span class="send-input" v-if="!user">点击登录后发言...</span>
            <span class="send" v-if="!isNull"><i class="iconfont icon-pullup"></i></span>
            <span @click="send()" v-if="isNull" class="issend send"><i class="iconfont icon-xaingshang"></i></span>
            <div class="unlogin-chat-input" v-if="user==''" @click="goRouterLogin()"></div>
        </div>
        <!-- 投注的弹框 -->
        <TOUZU />
        <!-- 投注的弹框 -->
    </div>
</template>
<script>
const CHAT = new Promise(resolve=>{
    require.ensure(['@/components/聊天室面板'],()=>{
        resolve(require('@/components/聊天室面板'))
    })
})
const TOUZU = new Promise(resolve=>{
    require.ensure(['@/components/投注弹框'],()=>{
        resolve(require('@/components/投注弹框'))
    })
})
import { mapGetters,mapActions } from 'Vuex'
import { Popup } from 'vux'
export default {
    data(){
        return {
            text:'',
            isNull:false,
            hackReset:true,
        }
    },
    watch:{
        '$store.state.a_someOne'(val,oval){
            if(this.$store.state.user!=''&&this.$store.state.user.chat!=0){
                this.text = '@'+val+' ';
            }
        },
        //统计发送是否成功
        sendCuont(val,oval){
            this.text = "";
        },
        '$store.state.user.chat'(val,oval){
            if(val==0){
                this.text = "";
            }
        },
        text(val,oval){
            this.$store.commit('chatRoll')
            if(val.length==0){
                this.isNull = false
            }else{
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                this.isNull = !re.test(val)
            }
        },
        popupVisible(val,oval){
            if(!val){
                this.keypoTogle = false;
                this.$store.commit('keypoNum','请输入金额');
            }
        },
        '$store.state.lotteryPancel'(val,oval){
            this.popupVisible = false;
            this.keypoTogle = false;
        },
        deep:true
    },
    computed:{
        ...mapGetters({
            Sending:'isSending',
            sendCuont:'sendCuont',
            user:'user',
            keypoNum:'keypoNum',
        }),
    },
    created(){
        this.getNextIssue();
        if(this.$store.state.user!=''){
            this.getUserData();
        }
    },
    activated(){
        this.getNextIssue();
        if(this.$store.state.user!=''){
            this.getUserData();
        }
    },
    methods:{
        ...mapActions(['sendChat','getNextIssue','getUserData']),
        goLogin(){
            this.$router.push({path:'/main/manage'})
        },
        goRouterLogin(){
            var that = this;
            this.$store.commit('loginBackPath','/chat');
            this.$vux.confirm.show({
                content:'聊天功能需要登录',
                confirmText:'登录',
                onConfirm () {
                    that.$router.push({path:'/login'});
                }
            })
        },
        send(){
            var that = this;
            if(this.$store.state.user.chat!=1){
                this.$vux.toast.text('您暂时无法发言', 'middle')
                return;
            }
            if(that.text == "") {
                return;
            }
            let chatFilters = JSON.parse(localStorage.getItem('sysTem')).chat_filter.value
            let xian = chatFilters.substring(chatFilters.length - 1, chatFilters.length)
            // 字符串最后有|就去掉
            if (xian == '|') chatFilters = chatFilters.substring(0, chatFilters.length - 1)
            // console.log(chatFilters)
            if(!chatFilters){
                this.$vux.toast.text('未知错误', 'middle')
                return;
            }
            let reg = new RegExp(chatFilters,'g')
            var newObj = {
                avatar:this.$store.state.user.avatar,
                event:'msg',
                level:that.$store.state.user.level,
                uid:that.$store.state.user.id,
                username:that.$store.state.user.username,
                nickname:that.$store.state.user.nickname,
                content:that.text.replace(reg,'***'),
                isSending:true,
                isMyself:true,
            }
            if(this.$store.state.socket==''|| this.$store.state.socket.readyState==3){
                this.$vux.confirm.show({
                    content:'聊天室已断开，请重新连接',
                    onConfirm () {
                        window.location.reload()
                    }
                })
                return;
            }else{
                if(this.$store.state.socket.readyState==0){
                    this.$vux.toast.text('正在连接中', 'middle')
                }
                this.$store.commit('chatRoll')
                this.$store.commit('pushMessage',newObj);
                this.$store.commit('sendLastMessage',this.$store.state.message.length);
                this.$store.state.socket.send(JSON.stringify(newObj));
                this.httpSend(newObj);
                that.text="";
            }
        },
        admin(){
            this.$store.commit('tz_popupVisible',true)
        },
        //发送聊天信息
        httpSend(obj){
            var that = this;
            var postData = this.$qs.stringify(obj)
            that.$http.post('/v1/chat/msg',postData);
        }
    },
    components:{
        Popup,
        CHATS(){
            return {
                component:CHAT,
            }
        },
        TOUZU(){
            return {
                component:TOUZU,
            }
        },
        liuCode () {
            return {
                component: import('@/module/roomCode')
            }
        }
    },
    destroyed(){
        this.$store.state.socket.close();
        this.$store.commit('isFirst',true);
    }
}
</script>
<style lang="scss" scoped>
.chat{
    position: relative;
    height: 100%;
    overflow: hidden;
    .roomCode {
        position: absolute; top: 0; z-index: 99; width: 100%; box-shadow: 0 0 15px #b3b3b3;
    }
}
.chat-wrap{
    height: calc(100% - 100px);
}
.chat-header{
    background: $theme-color;
    color:#fff;
    height: 45px;
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    .back{
        position: absolute;
        top: 20px;
        left:10px;
        font-size: 24px;
        color:#fff;
    }
    .title{
        padding-top:10px;
        display: block;
    }
    .kefu{
        position: absolute;
        top: 20px;
        right:10px;
        font-size: 24px;
        color:#fff;
    }
}
.chat-time{
    height: 25px;
    line-height: 25px;
    position: fixed;
    top: 45px;
    width: 100%;
    z-index: 1;
    background: rgba(255,255,255,.5)
}
.chat-content{
    height: calc(100% - 90px);
    position: absolute;
    top: 45px;
    width:100%;
    .van-loading{
        position: absolute;
        top: 50%;
        left:50%;
        margin-top:-15px;
        margin-left:-15px;
    }
}
.unlogin-chat-input{
    position: absolute;
    height: 100px;
    width: 100vw;
    z-index: 4;
    top: 0;
    left: 0;
    opacity: 0;
}
.chat-input{
    height: 100px;
    line-height: 100px;
    width: 100vw;
    background: $bg-color;
    font-size: 30px;
    border-top: 1px solid #e1e1e1;
    position: relative;
    .send{
        position: absolute;
        z-index: 3;
        right: 0;
    }
    input{
        height: 68px;
        margin-top:7px;
        display: inline-block;
    }
    span:first-child{
        float: left;
        width:130px;
        height: 68px;
        line-height: 68px;
        margin-left:20px;
        margin-right:20px;
        margin-top:15px;
        display: block;
        background: -webkit-linear-gradient(left, #49b4ff, $theme-color);
        color:#fff;
        font-size: 36px;
        border-radius: 5px;
    }
    span.send{
        float: right;
        line-height: 100px;
        margin-right:26px;
        display: block;
        i{
            font-size: 70px;
            color:#e1e1e1;
        }
    }
    .issend{
        i{
            color:$theme-color!important;
        }
    }
    .send-input{
        background: #f2f2f2;
        outline: none;
        border:none;
        height: 68px;
        line-height: 68px;
        text-align: left;
        width:calc(100% - 323px);
        margin-right:20px;
        padding-left:40px;
        float: left;
        font-size: 30px;
        color:#999;
        margin-top:15px;
        border-radius: 50px;
        cursor: pointer;
    }
}
</style>
