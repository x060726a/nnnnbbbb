<template>
    <div id="app" style="height:100%;">
        <view-box ref="viewBox" :body-padding-top="routerStatus.isHideHeader?'0':'11.733vw'" :body-padding-bottom="routerStatus.isHasFooter?'13.067vw':'0vw'" class="view-box-liuyou">
            <Gheader slot="header" v-if="!routerStatus.isHideHeader"></Gheader>
            <keep-alive>
            <router-view v-if="routerStatus.keepAlive" ref="mainRouter" :class="{'no-padding':routerStatus.isHideHeader}"></router-view>
            </keep-alive>
            <router-view v-if="!routerStatus.keepAlive" ref="mainRouter" :class="{'no-padding':routerStatus.isHideHeader}"></router-view>
            <Gfooter slot="bottom" v-if="routerStatus.isHasFooter"></Gfooter>
        </view-box>
        <qiandao v-if="qiandaoStatus"/>
        <div class="main-btn" @touchmove="Start()" ref="mainBtn" v-show="$route.name=='首页'">
            <span @click="openApp"></span>
            <span @click="$router.push({path:'/mypromotion'})"></span>
            <!--<span @click="goRouter('/activity-cont/3')"></span>-->
            <span @click="$router.push({path:'/download'})"></span>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'Vuex'
import { ViewBox,Confirm  } from 'vux'
const Gheader = resolve => require(["../components/头部"], resolve);
const Gfooter = resolve => require(["../components/底部"], resolve);
export default {
    methods:{
        Start(){
            this.$refs.mainBtn.style.left=(event.changedTouches[0].pageX - 27)+'px'
            this.$refs.mainBtn.style.top=(event.changedTouches[0].pageY - 81)+'px'
        },
        openApp(){
            this.$router.push('/expertInfo')
            // let wechat = JSON.parse(localStorage.getItem('sysTem')).contact_qq.value
            // if (!wechat) return this.$vux.toast.text('暂无相关配置', 'middle')
            // //打开app
            // let vx = wechat.split(',')[0]
            // this.$vux.confirm.show({
            //     content:'请打开微信添加'+vx,
            //     confirmText:'确认',
            //     onConfirm () {
            //         window.location.href = "weixin://"
            //         return
            //     }
            // })
        },
        goRouter(url){
            var that = this
            if(that.$store.state.user==''){
                that.$vux.confirm.show({
                    content:'请先登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
            }else{
                if(url=='签到'){
                    that.$store.commit('qiandaoStatus',true)
                }else{
                    that.$router.push({path:url});
                }
            }
        },
    },
    // mounted() {
    //     this.$nextTick(()=>{
    //         this.Clipboard = new ClipboardJS('.wxerweima',{
    //             text:()=>{
    //                 return this.content.qr_account;
    //             }
    //         });
    //     })
    // },
    components:{
        ViewBox,
        Gheader,
        Gfooter,
        qiandao(){
            return {
                component:new Promise(resolve=>{
                    Vue.$vux.loading.show({
                        text: '加载中',
                    })
                    require.ensure(['@/components/签到弹窗'],()=>{
                        Vue.$vux.loading.hide()
                        resolve(require('@/components/签到弹窗'))
                    })
                }),
            }
        }
    },
    computed:{
        ...mapGetters(['diaLog','routerStatus','loading','loadingText','qiandaoStatus'])
    },
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.c-i-i{
    margin: auto;
    width: 80%;
    height: 60px;
    margin-top:30px;
    border:#e1e1e1 2px solid;
    border-radius: 6px;
    overflow: hidden;
    input{
        display: block;
        width: calc(100% - 12px);
        height: 60px;
        padding-left:30px;
    }
}
.clearfix:after {content:"\200B"; display:block; height:0; clear:both; }
.clearfix { *zoom:1; }
strong{
    font-style: normal!important;
    font-weight: 500;
    em,i,a{
        font-weight: 500;
        font-style: normal!important;
    }
}
a:visited{
    p{
        color: #666!important;
    }
}
.dailog-tie-neirong{
    max-height: 150px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
.admin-text{
    p{
        width:100%;
        img{
            width:100%;
        }
    }
}
.bgw{
    background: #fff!important;
}
.pswp__top-bar{
    height: 70px!important;
    .pswp__counter{
        line-height: 70px!important;
    }
    .pswp__button{
        transform: scale(1.5);
    }
    .pswp__button--close{
        background-position: -1px -40px;
    }
}
.pswp--supports-fs .pswp__button--fs{
    display: none!important;
}
.my-popup1{
    height: 100%;
    width: 100vw;
    background: #f2f2f2;
    .header{
        height: 88px;
        background: #2f86ff;
        color:#fff;
        width: 100%;
        .back{
            position: absolute;
            top: 0;
            left: 0;
            display:block;
            height: 88px;
            font-size: 40px;
            width:34px;
            margin-left:16px;
            line-height: 88px;
        }
        .title{
            font-size: 36px;
            height: 88px;
            line-height: 88px;
            display: block;
        }
        .btn{
            font-size: 36px;
            height: 88px;
            line-height: 88px;
            position: absolute;
            right:20px;
            top: 0;
        }
    }
    .pop-content{
        .input-group{
            height: 80px;
            line-height: 80px;
            // margin-top:20px;
            // border-top:1px solid #e1e1e1;
            border-bottom:1px solid #e1e1e1;
            position: relative;
            background: #fff;
            span.code-btn{
                font-size: 28px;
                color:#999;
            }
            span.active{
                color:#2f86ff;
            }
            span{
                position: absolute;
                right:22px;
                display: block;
            }
            input{
                float: left;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                width:calc(100% - 26px);
                padding-left:26px;
            }
            input[disabled="disabled"]{
                background: #fff;
            }
            .label{
                float: left;
                padding-left:26px;
                font-size: 28px;
                color:#333;
            }
            .label-input{
                width:500px;
                padding-left:60px;
            }
        }
        .last{
            margin-top:0;
            border-top:none;
            .label-input{
                padding-left:32px;
            }
        }
        .waring{
            text-align: left;
            padding-left:16px;
            line-height: 45px;
            color:#999;
            font-size: 24px;
        }
    }
    .about{
        padding-left:16px;
        padding-right:16px;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        background: #fff;
        .logo{
            width: 170px;
            margin:auto;
            padding-top:130px;
            .icon-login {
                width:160px;
                height:160px;
                background:url("/static/images/logo_new.png") no-repeat;
                background-size:100% 100%;
                border-radius:30px;
            }
        }
        .cu {
            padding-top: 20px;
            font-size: 30px;
            font-weight: 700;
            color: #666;
        }
        .xi {
            padding-top: 10px;
            padding-bottom: 50px;
            color: #666;
        }
        p:first-child{
            margin-bottom:30px;
            margin-left:0;
        }
        .text{
            text-indent: 20px;
            padding: 0 10px;
            margin-left:-12px;
            font-size: 26px;
            color:#333;
            text-align: justify;
            margin-bottom:10px;
        }
        .text1 {
            text-indent:0;
            padding: 0 10px;
            margin-left:-12px;
            font-size: 26px;
            color:#333;
            text-align: justify;
            margin-bottom:10px;
        }
    }
}
.main-btn{
    position: fixed;
    bottom:120px;
    left: 625px;
    width: 108px;
    height: 325px;
    z-index: 999;
    background: url('/static/images/icons/indexicons.jpg') no-repeat;
    background-size: 100%;
    span{
        display: block;
        height: 108px;
    }
}
.vux-slider .vux-indicator-right>a>.vux-icon-dot, .vux-slider>.vux-indicator>a>.vux-icon-dot{
    width: 20px!important;
    height: 20px!important;
    border-radius: 50%!important;
    background: rgba(208, 205, 209, 0.6)!important;
}
.vux-slider .vux-indicator-right>a>.vux-icon-dot.active, .vux-slider>.vux-indicator>a>.vux-icon-dot.active{
    background: #d0cdd1!important;
}
.vux-spinner{
    position: relative;
}
.vux-spinner svg{
    position: absolute;
    top: 0;
    left: 0;
}
.view-box-liuyou{
    background: #f2f2f2;
}
.weui-dialog__hd{
    padding:0 10px 0 10px!important;
    line-height: 60px!important;
    .weui-dialog__title{
        font-size: 28px!important;
    }
}
.weui-loading_toast{
    .weui-toast{
        width:250px!important;
        min-height: 250px!important;
        top:50%!important;
        margin-top:-25%!important;
    }
}
.weui-icon_toast.weui-loading{
    height: 72px!important;
    width:72px!important;
    margin:60px 0 0!important;
}
.weui-toast__content{
    font-size: 30px!important;
}
.vux-confirm .weui-dialog{
    width: 70%;
    max-width: 70%;
    border-radius:20px;
}
.ws-dialog .weui-dialog{
    width:600px;
    max-width: 600px;
    height: 620px;
    top:230px;
    left: 50%;
    margin:0 0 0 -300px;
    border-radius: 20px;
    overflow: hidden;
}
.weui-dialog__ft{
    line-height: 80px!important;
    font-size: 26px!important;
}
.weui-dialog__btn_primary{
    color:#26a2ff!important;
}
.weui-dialog__bd{
    color: #333!important;
    font-size: 28px!important;
    font-weight: bold!important;
}
input[type="search"]::-webkit-search-cancel-button{
    display: none;
    -webkit-appearance: none;
}
input{
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-appearance:none;
    outline: none;
    border: none;
}
.text-res img{
    cursor: pointer;
    height: auto!important;
    width: 100%!important;
}
body,html{
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */

    /* Rules below not implemented in browsers yet */
    -o-user-select: none;
    user-select: none;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    text-align: center;
    touch-action: none;
}
#app {
  font-family:"Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f2f2f2;
  font-size: 24px;
}
.footer{
    position: fixed;
    bottom:0;
    left: 0;
    height: 88px;
    background: #2f86ff;
    width: 100%;
    font-size: 26px;
    color:#fff;
}
.loader {
    display: inline-block;
    background: #6699e2c7;
    width: 30px;
    height: 30px;
    position: relative;
    text-align: center;
    animation: loader1 3s linear infinite;
}
.loader:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    background: #64a2f9;
    transform: rotate(135deg);
}
@keyframes loader1 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(720deg);
    }
}
.no-more-data{
    line-height: 68px;
}
.loading-text,.no-more-data{
    font-size: 30px;
    height: 100%;
    color:#908e8e;
}
.my-spinner {
    margin: auto;
    width: 150px;
    height: 100%;
    font-size: 10px;
    display: flex;
    justify-content:center;
}

.my-spinner > div {
    background-color: #2f86ff;
    height: 100%;
    width: 10px;
    margin-right:5px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.my-spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.my-spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.my-spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.my-spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
.dp-header {
    height: 90px;
    .dp-item.dp-left, .dp-item.dp-right {
        color: #3f8feb;  font-size: 30px;
    }
}
.dp-content  {
    padding: 0;
    .scroller-component{
        height: 270px;
    }
    .scroller-item, .scroller-indicator {
        height: 90px; color: #333333; line-height: 115px; font-size: 28px;
    }
    .scroller-item-selected{
        font-size: 35px;
    }
}
</style>

