<template>
<div class="content">
    <div class="block">
        <div class="item avatar" @click="$router.push({path:'/setavatar'})">
            <span class="text">头像</span>
            <span class="img"><img :src="'/static/images/avatar/'+user.avatar+'.jpg'"></span>
            <span class="iconfont icon-fanhui"></span>
        </div>
        <div class="item">
            <span class="text">用户名</span>
            <span class="res-text">{{user.username}}</span>
        </div>
        <div class="item last" @click="choose='nickname',popupVisible=!popupVisible">
            <span class="text">昵称</span>
            <span class="res-text">{{user.nickname}}</span>
            <span class="iconfont icon-fanhui"></span>
        </div>
    </div>
    <div class="block">
        <div class="item" @click="choose='realname',popupVisible=!popupVisible">
            <span class="text">真实姓名</span>
            <span class="res-text">{{user.realname}}</span>
            <span class="iconfont icon-fanhui"></span>
        </div>
        <div class="item">
            <span class="text">手机号</span>
            <span class="res-text">{{user.phone}}</span>
        </div>
        <div class="item last" @click="choose='qq',popupVisible=!popupVisible">
            <span class="text">QQ</span>
            <span class="res-text">{{user.qq}}</span>
            <span class="iconfont icon-fanhui"></span>
        </div>
    </div>
    <div class="block">
        <div class="item" @click="choose='password',popupVisible=!popupVisible">
            <span class="text">修改密码</span>
            <span class="iconfont icon-fanhui"></span>
        </div>
        <div class="item last" @click="choose='about',popupVisible=!popupVisible">
            <span class="text">关于我们</span>
            <span class="iconfont icon-fanhui"></span>
        </div>
    </div>
    <div class="block1" @click="loginOut">退出登录</div>
    <div v-transfer-dom>
        <popup v-model="popupVisible" position="right" class="my-popup1" :class="{bgw:choose=='about'}" style="width:100%">
            <div class="header">
                <span class="iconfont icon-fanhui back" @click="popupVisible=!popupVisible"></span>
                <span class="title">{{popObj[choose]}}</span>
                <span class="btn" @click="confirmSubmit" v-if="choose!='about'">确认</span>
            </div>
            <div class="pop-content" v-if="choose!='password'&&choose!='about'">
                <div class="input-group">
                    <input :type="type[choose]" v-model="popmodel" :disabled="user.realname!=''&&choose=='realname'">
                    <span class="iconfont icon-close1" v-if="choose!='realname'" @click="popmodel=''"></span>
                </div>
                <p class="waring" v-if="choose=='realname'">注意：绑定后将无法修改</p>
            </div>
            <div class="pop-content" v-if="choose=='password'">
                <div class="input-group">
                    <div class="label">手机号:</div>
                    <input class="label-input" placeholder="请输入手机号" :type="type[choose]" v-model="phone">
                </div>
                <div class="input-group">
                    <div class="label">验证码:</div>
                    <input class="label-input" placeholder="请输入验证码" :type="type[choose]" v-model="phoneCode">
                    <span class="code-btn" :class="{active:time==60}" @click="getPhooneCode">获取验证码{{time<60?time:''}}</span>
                </div>
                <div class="input-group">
                    <div class="label">新密码:</div>
                    <input class="label-input" placeholder="请输入新密码" :type="type[choose]" v-model="password1">
                </div>
                <div class="input-group last">
                    <div class="label">确认密码:</div>
                    <input class="label-input" placeholder="请输入新密码" :type="type[choose]" v-model="password2">
                </div>
            </div>
            <div class="pop-content about" v-if="choose=='about'">
                <div class="logo"><div class="icon-login"></div></div>
                <div class="cu">六友APP</div>
                <div class="xi">特码天天有</div>
                <p class=" text">六友APP是深圳天网科技专为广大六合彩民精心打造的图鉴，资讯，彩票开奖，彩票走势图，彩票社区等周边彩票服务。掌握对的技巧，赢得头彩不是梦！欢迎加入我们：QQ28783875。</p>
                <p class=" text1">【全国开奖，一手掌握】实时数据，随手关注！</p>
                <p class=" text1">【覆盖全国，安全便捷】随时随地，快速下注！</p>
                <p class=" text1">【官方诚信，权益保障】六合彩官方授权，正规有效！</p>
                <p class=" text1">【缤纷竞彩，天天投注】天天耍记录，累计六币有奖励！</p>
                <p class=" text1">【专业分析，精准推荐】走势图表，专家预测，高手推荐！</p>
            </div>
        </popup>
    </div>
</div>
</template>
<script>
import { Popup,TransferDom } from 'vux'
import { mapGetters } from "Vuex";
export default {
    directives: {
        TransferDom
    },
    data(){
        return{
            text:'12321321',
            popupVisible:false,
            password_old:'',
            password1:'',
            password2:'',
            phone:'',
            phoneCode:'',
            popObj:{
                nickname:'昵称',
                phone:'手机号',
                qq:'QQ',
                password:'密码',
                realname:'真实姓名',
                about:'关于我们'
            },
            choose:'',
            popmodel:'',
            type:{
                nickname:'text',
                phone:'tel',
                qq:'tel',
                password:'text',
                realname:'text'
            },
            time:60,
            timer:0
        }
    },
    computed:{
        ...mapGetters(['user'])
    },
    watch:{
        'popupVisible'(val,oval){
            switch (this.choose) {
                case 'nickname':
                    this.popmodel = this.$store.state.user.nickname
                    break;
                case 'phone':
                    this.popmodel = this.$store.state.user.phone
                    break;
                case 'qq':
                    this.popmodel = this.$store.state.user.qq
                    break;
                case 'realname':
                    this.popmodel = this.$store.state.user.realname
                    break;
            }
        }
    },
    created(){
        this.checkCowdonCode();
    },
    methods:{
        //退出登录
        loginOut(){
            var that = this
            that.$vux.confirm.show({
                content:'您确认退出吗？',
                onConfirm () {
                    localStorage.clear();
                    sessionStorage.clear();
                    that.$store.commit('user','');
                    that.$store.commit('cancelNote');
                    that.$router.push({path:'/login'});
                }
            })
        },
        //获取手机验证码
        getPhooneCode(){
            if(this.regPhone()){
                var that = this,
                    postData = this.$qs.stringify({
                        for:2,
                        phone:that.phone
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
                    that.timer = setInterval(()=>{
                        that.time--
                        if(that.time==0){
                            that.time = 60
                            clearInterval(that.timer)
                            localStorage.removeItem('ph_code')
                        }
                    },1000)
                }
            }
        },
        //确定
        confirmSubmit(){
            var that = this;
            if(this.popmodel=='' && this.choose!='password'){
                this.$vux.toast.text(that.popObj[that.choose]+'不能为空','middle')
                return;
            }
            var postData;
            switch (this.choose) {
                case 'nickname':
                    postData = that.$qs.stringify({
                        nickname:that.popmodel
                    })
                    break;
                case 'phone':
                    postData = that.$qs.stringify({
                        phone:that.popmodel
                    })
                    if(!this.regPhone()) return
                    break;
                case 'qq':
                    postData = that.$qs.stringify({
                        qq:that.popmodel
                    })
                    break;
                case 'realname':
                    if(this.$store.state.user.realname!=''){
                        that.popupVisible = !that.popupVisible;
                        return;
                    }
                    if(that.popmodel==''){
                        this.$vux.toast.text('真实姓名不能为空','middle')
                        return
                    }
                    postData = that.$qs.stringify({
                        realname:that.popmodel
                    })
                    break;
                case 'password':
                    if(that.password_old==''&&that.password1==''&&that.password2==''){
                        that.popupVisible = !that.popupVisible;
                        return;
                    }else{
                        // if(that.password_old==''){
                        //     this.$vux.toast.text('旧密码不能为空','middle')
                        //     return
                        // }
                        if(that.password1==''&&that.password2==''){
                            this.$vux.toast.text('新密码不能为空','middle')
                            return
                        }
                        if(that.password1!=that.password2){
                            this.$vux.toast.text('两次密码输入不一致','middle')
                            return;
                        }
                    }
                    postData = that.$qs.stringify({
                        phone:that.phone,
                        new_password:that.password1,
                        confirm_password:that.password2,
                        verify_code:that.phoneCode
                    })
                    break;
            }
            this.$vux.loading.show({
                text: '提交中',
            })
            that.$http.post('/v1/user/profile-update',postData).then(res=>{
                if(res.code==0){
                    that.$store.commit("user", res.data);
                    var user = JSON.stringify(res.data);
                    localStorage.setItem("user", user);
                    that.$vux.toast.text('更新成功','middle')
                }else{
                    this.$vux.toast.text(res.msg_zh,'middle')
                }
                that.popupVisible = !that.popupVisible;
                that.$vux.loading.hide();
            })
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
    },
    components:{
        Popup
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    color:#333;
    font-size: 28px;
    .block{
        padding-left:16px;
        padding-right:16px;
        background: #fff;
        margin-bottom:20px;
        .item{
            font-size: 28px;
            border-bottom:1px solid $border-color;
            position: relative;
            height: 80px;
            line-height: 80px;
            span.text{
                float: left;
            }
            span.img{
                width:80px;
                height: 80px;
                border-radius: 50%;
                float: right;
                background: #c5c4c4;
                margin-right:46px;
                margin-top:24px;
                cursor: pointer;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            span.iconfont{
                position: absolute;
                right:10px;
                transform: rotate(180deg);
                font-size: 40px;
                color:$subtitle-color;
            }
            span.res-text{
                float: right;
                margin-right:46px;
                font-size: 28px;
                color: #999;
            }
        }
        .last{
            border-bottom:none;
        }
        .avatar{
            height: 128px;
            line-height: 128px;
        }
    }
    .block1{
        margin-top:40px;
        background: #fff;
        height: 80px;
        line-height: 80px;
        cursor: pointer;
    }
}
</style>
