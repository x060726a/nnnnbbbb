<template>
    <div class="content">
        <div class="pad140"></div>
        <div class="top">
            <div><img src="static/images/logo_new.png"></div>
        </div>
        <p>手机有六友<span></span>特码天天有</p>
        <a class="down-btn" v-if="theClient=='Ios'" href="itms-services://?action=download-manifest&url=https://app.liuyou8888.com/app/liuyou/plist/liuyou_1.plist">点击下载注册即送6666金币</a>
        <a class="down-btn" v-if="theClient=='Android'" href="https://app.liuyou8888.com/app/liuyou/liuyou_android_1.apk">点击下载注册即送6666金币</a>
        <a class="down-btn" v-if="theClient=='Pc'" @click="check()">点击下载注册即送6666金币</a>
        <div class="ios-wrap" v-show="theClient=='Ios'">
            <h1>iPhone下载安装教程</h1>
            <p>[下载APP后弹出不受信任的开发者怎么办？]</p>
            <div><img src="/static/images/download/step1.png" alt=""></div>
            <span>1</span>
            <p>[点击设置，打开通用，找到设备管理]</p>
            <div><img src="/static/images/download/step2.png" alt=""></div>
            <span>2</span>
            <p>[点击信任“Webvista infotech”]</p>
            <div><img src="/static/images/download/step3.png" alt=""></div>
            <span>3</span>
            <p>[点击弹框中的信任，完成！]</p>
            <div style="margin-bottom:0"><img src="/static/images/download/step4.png" alt=""></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            src:null,
            theClient:'',
            url:''
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    created(){
        this.isWho();
    },
    methods:{
        download() {
            this.$vux.toast.text('保存成功','middle')
        },
        isWho(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log(u);
            if (isAndroid) {
                //这个是安卓操作系统
                console.log('这个是安卓操作系统');
                this.theClient = 'Android'
            }
            if (isIOS) {
        　　　　//这个是ios操作系统
                console.log('这个是ios操作系统');
                this.theClient = 'Ios'
            }
            if (u.indexOf('Windows') > 0) {
                //这个是PC端
                console.log('这个是PC端');
                this.theClient = 'Pc'
            }
        },
        check(){
            this.$vux.confirm.show({
                content:'请用手机打开本站下载APP',
                confirmText:'确认',
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    background: #fff url('/static/images/download/bg.jpg') no-repeat;
    background-size: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    p{
        font-size: 34px;
        color:#333;
        font-weight: bold;
        span{
            display: inline-block;
            width:40px;
            height: 20px;
        }
    }
    .pad140{
        height: 140px;
    }
    .top{
        height: 415px;
        width:430px;
        margin: auto;
        background: url('/static/images/download/logo_w.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        >div{
            width:160px;
            height: 160px;
            position: absolute;
            top: 110px;
            left: 143px;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0px 4px 22px #969595;
            img{
                width: 100%;
            }
        }
    }
    .down-btn{
        width:610px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color:#fff;
        background: $theme-color;
        font-size: 34px;
        margin: 210px auto 120px auto;
        border-radius: 6px;
        cursor: pointer;
        display: block;
    }
    .ios-wrap{
        padding-bottom:30px;
        h1{
            font-weight: 500;
            font-size: 30px;
            color:#333;
            padding-bottom:50px;
        }
        p{
            font-size: 28px;
            color:#666;
            font-weight: 500;
            padding-bottom:20px;
        }
        >div{
            width: 488px;
            height: 341px;
            margin: 0 auto 30px auto;
            font-size: 0;
            img{
                width:100%;
            }
        }
        span{
            display: block;
            margin: 0 auto 20px auto;
            width:60px;
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            color:#fff;
            border-radius: 50%;
            background: $theme-color;
        }
    }
}
</style>
