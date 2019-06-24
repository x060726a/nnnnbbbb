<template>
<div class="zhuanpan-wrap">
    <div class="bg1"><img src="/static/images/activity/bg1.png" alt=""></div>
    <div class="zhuanpan-content">
        <div class="zhuanpan-bg" :style="'transform: rotate('+num+'deg);transition:all '+time+'s ease'"></div>
        <div class="zhuanpan-btn" @click="start()"><img src="/static/images/activity/zp_start.png"></div>
    </div>
    <span class="text" v-if="user.roll_nums">您还有<span>{{user.roll_nums}}</span>张抽奖券</span>
    <span class="text" v-else @click="$router.push({path:'/cjquan'})">立即兑换抽奖券</span>
    <div class="zhuanpan-pop" v-show="tsPop">
        <div class="zhuanpan-tishi" ref="zhuanpants">
            <p>您获得{{tsText}}</p>
            <span class="text1">已存入我的物品</span>
            <span class="btn-jixu" @click="closePop()">继续抽奖</span>
            <span class="btn-go" @click="goRouter()">去看看</span>
            <span class="iconfont icon-close1 close" @click="closePop()"></span>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return{
            num:0,
            time:0,
            tsPop:false,
            tsText:'',
            gift_id:'',
            isRoll:false,
        }
    },
    created(){
        this.$store.commit('changeRoutertTitle','大转盘')
    },
    computed:{
        ...mapGetters(['user','isApp'])
    },
    methods:{
        start(){
            if(!this.isRoll){
                this.getGift();
            }
        },
        goRouter(){
            if(this.gift_id==3||this.gift_id==4){
                this.$router.push({path:'/mythings',query:{active:0}})
            }else{
                this.$router.push({path:'/mythings',query:{active:2}})
            }
        },
        getGift(){
            var that = this;
            if(this.$store.state.user==''){
                that.$vux.confirm.show({
                    content:"请先登录!",
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'})
                    }
                })
                return;
            }
            if(this.$store.state.user.roll_nums==0){
                that.$vux.confirm.show({
                    content:"您没有抽奖券",
                    confirmText:'兑换',
                    onConfirm () {
                        that.$router.push({path:'/cjquan'})
                    }
                })
                return;
            }
            this.isRoll = true;
            this.time = 10
            this.$vux.loading.show({
                text:'准备开始'
            })
            that.$http.post('/v1/user/roll').then(res=>{
                if(res.code==0){
                    this.tsText = res.data.prizeName
                    this.gift_id = res.data.prizeId
                    setTimeout(()=>{
                        switch (res.data.prizeId*1) {
                            case 1:
                                //双人游
                                this.num = (360*20)+60
                                break;
                            case 2:
                                //苹果
                                this.num = (360*19)+300
                                break;
                            case 3:
                                //话费10元
                                this.num = (360*20)+120
                                break;
                            case 4:
                            //官方彩金18元
                                this.num = (360*20)+240
                                break;
                            case 5:
                            //666金币
                                this.num = (360*20)+180
                                break;
                            case 6:
                            //66金币
                                this.num = (360*21)
                                break;
                        }
                    },200)
                    setTimeout(()=>{
                        that.confirmPop();
                        that.isRoll = false;
                        this.$store.commit('changeRollTime',res.data.roll_nums);
                        this.$store.commit('changeMoney',res.data.coin);
                    },10300)
                }else{
                    that.$vux.toast.text(res.msg_zh,'middle')
                }
                that.$vux.loading.hide();
            })
        },
        //打开确认弹窗
        confirmPop(){
            this.tsPop = true;
            setTimeout(()=>{
                this.$refs.zhuanpants.className = 'zhuanpan-tishi zhuanpants'
            },70)   
        },
        //关闭弹窗
        closePop(){
            this.time = 0;
            this.$refs.zhuanpants.className = 'zhuanpan-tishi'
            setTimeout(()=>{
                this.num = 0;
                this.tsPop = false;
            },300)
        }
    }
}
</script>
<style lang="scss" scoped>
.bg1{
    width:100%;
    img{
        width: 100%;
    }
}
.bg-b{
    width: 100%;
    height: 170px;
}
.zhuanpan-wrap{
    height:calc(100% - 50px);
    background: #df0d34;
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom:50px;
    .zhuanpan-content{
        position: relative;
        height: 600px;
        width: 100%;
        margin-top:-210px;
        margin-bottom:50px;
        .zhuanpan-bg{
            position: absolute;
            top: 0px;
            left: 50%;
            margin-left:-300px;
            width: 600px;
            height: 600px;
            background: url('/static/images/activity/zhuanpan2.png') no-repeat;
            background-size: 100%;
            transform: rotate(0deg);
            transition: all 10s ease;
            transform-origin: center center;
        }
        .zhuanpan-btn{
            width: 164px;
            height: 164px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top:-112px;
            margin-left:-82px;
            font-size: 0;
            z-index: 0;
            >img{
                width: 100%;
            }
        }
    }
    .text{
        color:#fff;
        padding:10px 40px;
        border:$bg-color 1px solid;
        border-radius: 50px;
        font-size: 28px;
        margin-bottom:50px;
        span{
            color:#f9dd00;
        }
    }
    .text::before{
        content:'';
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 15px;
        margin-top:-5px;
        background: #f9dd00;
        border-radius: 50%;
    }
    .zhuanpan-pop{
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.5);
        .zhuanpan-tishi{
            position: absolute;
            top:40%;
            left: 50%;
            width: 500px;
            height: 360px;
            margin-top:-100px;
            margin-left:-250px;
            z-index: 9;
            background: url('/static/images/activity/zp_pop.png') no-repeat;
            background-size: 100% 100%;
            transition: all .3s ease;
            opacity: 0;
            transform: scale(.7);
            p{
                padding-top:160px;
                color: #f9dd00;
                font-size: 32px;
            }
            .text1{
                display: block;
                font-size: 22px;
                color:#fff;
                padding-top:5px;
            }
            .btn-jixu{
                position: absolute;
                bottom:37px;
                left: 65px;
                display: block;
                width: 162px;
                line-height: 48px;
                background: #fff;
                color: #333;
                border-radius: 40px;
                font-size: 26px;
            }
            .btn-go{
                position: absolute;
                bottom:37px;
                right: 65px;
                display: block;
                width: 162px;
                line-height: 48px;
                background: #fff;
                color: #333;
                font-size: 26px;
                border-radius: 40px;
            }
            .btn-go:active{
                background: #f9dd00;
            }
            .close{
                width: 57px;
                height: 60px;
                line-height: 60px;
                padding-left:3px;
                text-align: center;
                font-size: 48px;
                display: block;
                position: absolute;
                bottom:-100px;
                left: 50%;
                margin-left:-40px;
                color:#fff;
                border:#fff 1px solid;
                border-radius: 50%;
            }
        }
        .zhuanpants{
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
