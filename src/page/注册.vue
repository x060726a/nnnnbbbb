<template>
    <div class="reg-content">
        <div class="logo"><div class="icon-login"></div></div>
        <div class="icon-posi">
            <span class="block-line username-line"><i class="iconfont icon-my"></i></span>
            <input type="text" v-model="nickname" maxlength="16" placeholder="请输入昵称">
        </div>
        <div class="icon-posi">
            <span class="block-line username-line"><i class="iconfont icon-mobile"></i></span>
            <input type="text" v-model="phone" maxlength="11" placeholder="请输入手机号">
        </div>
        <div class="icon-posi">
            <span class="yanj" @click="isShowP1=!isShowP1"><i class="iconfont" :class="{'icon-attention':!isShowP1,'icon-attentionfill':isShowP1}"></i></span>
            <span class="block-line password-line"><i class="iconfont icon-unlock"></i></span>
            <input :type="isShowP1?'text':'password'" v-model="password" placeholder="请输入密码" maxlength="16">
        </div>
        <div class="icon-posi">
            <span class="yanj" @click="isShowP2=!isShowP2"><i class="iconfont" :class="{'icon-attention':!isShowP2,'icon-attentionfill':isShowP2}"></i></span>
            <span class="block-line password-line"><i class="iconfont icon-unlock"></i></span>
            <input :type="isShowP2?'text':'password'" v-model="password1" placeholder="请再次输入密码" maxlength="16">
        </div>
        <!-- <div class="icon-posi">
            <span class="block-line phone-line"><i class="iconfont icon-mobile"></i></span>
            <input type="tel" v-model="phone" placeholder="请输入手机号">
        </div> -->
        <div class="icon-posi">
            <span class="block-line phone-line"><i class="iconfont icon-mobile"></i></span>
            <input type="tel" v-model="phoneCode" placeholder="请输入验证码">
            <span class="code-btn" :class="{active:time==60}" @click="getPhooneCode">获取验证码{{time<60?time:''}}</span>
        </div>
        <div class="login-btn" @click="reg()">注册</div>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
import { isNumber } from 'util';
import { setInterval, clearInterval } from 'timers';
export default {
    data(){
        return {
            nickname: '',
            username:'',
            password:'',
            password1:'',
            phone:'',
            phoneCode:'',
            isShowP1:false,
            isShowP2:false,
            time:60
        }
    },
    created(){
        localStorage.setItem('pUID',window.location.href.substring(window.location.href.indexOf('=')*1+1,window.location.href.length))
        this.getUrlid();
        this.checkCowdonCode();
    },
    // watch:{
    //     username(){
    //         this.username=this.username.replace(/[\W]/g,'');
    //     },
    //     nickname(){
    //         this.nickname = this.nickname.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
    //     },
    // },
    methods:{
        back(){
            this.$router.push({path:'/main/manage'})
        },
        reg(){
            this.regUsername() && this.regPhone()
            &&
            (this.password!==""&&this.password.length > 5||this.regPasw())
            &&
            (this.password1==this.password || this.regPaswA())
            &&
            this.regPhoneCode() && this.submitReg();
        },
        goLogin(){
            this.$router.push({path:'/login'});
        },
        regUsername(){
            if (!this.nickname.length) {
                this.$vux.toast.text('请输入昵称', 'middle')
                return false;
            } else {
                return true
            }
        },
        regPasw(){
            this.$vux.toast.text('密码最少六位', 'middle')
            return false;
        },
        regPaswA(){
            this.$vux.toast.text('两次输入的密码不一致', 'middle')
            return false;
        },
        regPhone(){
            var phonereg=/^1[13456789]\d{9}$/;
            if(!phonereg.test(this.phone)){
                this.$vux.toast.text('请输入正确的手机号码', 'middle')
                return false;
            }else{
                return true;
            }
        },
        regPhoneCode(){
            if(!this.phoneCode){
                this.$vux.toast.text('请输入正确的验证码', 'middle')
                return false;
            }else{
                return true;
            }
        },
        regEmail(){
            var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(!reg.test(this.email)){
                this.$vux.toast.text('邮箱格式不正确', 'middle')
                return false;
            }else{
                return true;
            }
        },
        async submitReg(){
            var that = this;
            var resreg = await that.signup();
            if(resreg.code==0){
                localStorage.setItem('regHongbao',1);
                this.login();
            }else{
                this.$vux.toast.text(resreg.msg_zh, 'middle')
            }
        },
        async signup(){
            var that = this;
            var isHasUid = localStorage.getItem('pUID')
            var res = await this.getUrlid()
            var postData = that.$qs.stringify({
                nickname: that.nickname,
                password:that.password,
                phone:that.phone,
                pUID:isHasUid?isHasUid:'',
                verify_code:that.phoneCode,
                host:window.location.href
            })
            this.$vux.loading.show({
                text: '注册中',
            })
            return new Promise(resolve=>{
                that.$http.post('/v1/user/signup',postData).then(res=>{
                    that.$vux.loading.hide()
                    resolve(res);
                });
            })
        },
        login(){
            var that = this;
            var postData = that.$qs.stringify({
                username:that.phone,
                password:that.password,
            })
            this.$vux.loading.show({
                text: '登录中',
            })
            that.$http.post('/v1/user/login',postData).then(res=>{
                if(res.code==0){
                    that.$vux.loading.hide()
                    that.$store.commit('user',res.data);
                    var user = JSON.stringify(res.data);
                    localStorage.setItem('user',user);
                    that.$router.push({path:'/loveType'})
                }
            })
        },
        //获取url的注册uid
        getUrlid(){
            var str = window.location.href;
            var start = str.indexOf('?');
            var end = str.indexOf('#');
            var newStr = str.substring(start+1,end);
            var newStart = newStr.indexOf('=');
            return new Promise(resolve=>{
                resolve(newStr.substring(newStart+1,newStr.length))
            })
        },
        getPhooneCode(){
            if(this.regPhone()){
                var that = this,
                    postData = this.$qs.stringify({
                        phone:this.phone
                    });
                if(that.time<60) return;
                that.$http.post('/v1/user/send-verify-code',postData).then(res=>{
                    if(res.code==0){
                        that.$vux.toast.text('验证码已发送', 'middle')
                        localStorage.setItem('ph_code',new Date().getTime())
                        that.checkCowdonCode();
                    }else{
                        that.$vux.toast.text(res.msg_zh, 'middle')
                    }
                })
            }
        },
        //60秒倒计时
        checkCowdonCode(){
            var that = this;
            var d = new Date();
            var nowTimeStr = d.getTime()
            var lastTimeStr = localStorage.getItem('ph_code')
            if(lastTimeStr){
                if(parseInt((nowTimeStr - lastTimeStr*1) / 1000) < 60){
                    that.time = that.time - parseInt((nowTimeStr - lastTimeStr*1) / 1000)
                    var timer = setInterval(()=>{
                        that.time--
                        if(that.time==0){
                            that.time = 60
                            clearInterval(timer)
                            localStorage.removeItem('ph_code')
                        }
                    },1000)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.reg-content{
    background: #fff;
    height: 100%;
    .icon-posi{
        width: 552px;
        padding-bottom:10px;
        margin: auto;
        position: relative;
        margin-bottom:60px;
        border-bottom:$border-color 1px solid;
        .code-btn{
            position: absolute;
            display: block;
            height: 35px;
            line-height: 35px;
            font-size: 26px;
            right:5px;
            top: 0;
            color:#999;
            cursor: pointer;
        }
        .active{
            color:$theme-color;
        }
    }
    .yanj{
        width:50px;
        height: 50px;
        display: block;
        position: absolute;
        right:18px;
        top: -5px;
    >i{
        width:50px;
        height: 50px;
        color:#999;
        font-size: 35px;
        display: block;
    }
    }
    .mtop {
        margin-top: 20px;
    }
    .logo {
        width: 160px;
        margin: auto;
        padding-top:60px;
        margin-bottom:100px;
    .icon-login {
        width: 160px;
        height: 160px;
        background: url("/static/images/logo_new.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 30px;
    }
    }
    input {
        display: block;
        width: calc(100% - 60px);
        font-size: 30px;
        padding-left:55px;
        color:$text-table-color;
        border-radius: 0;
        color:#000;
        // padding-bottom:10px;
    }
    input::-webkit-input-placeholder {
        color: #999;
        font-size: 30px;
    }
    .block-line {
        height: 42px;
        display: block;
        text-align: left;
        line-height: 42px;
        position: absolute;
        bottom: 10px;
        left: 0;
    i {
        font-size: 38px;
        display: block;
    }
    }
    .kefu {
        font-size: 24px;
        line-height: 35px;
        color: $subtitle-color;
        overflow: hidden;
        width: 80%;
        margin: auto;
    span {
        float: right;
    }
    }
}
.login-btn{
    height: 88px;
    line-height: 88px;
    width: 80%;
    margin: 20px auto;
    background: $theme-color;
    color: #fff;
    border-radius: 44px;
    font-size: 32px;
}
</style>
