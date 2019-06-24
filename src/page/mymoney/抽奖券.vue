<template>
    <div class="content">
        <div class="top"></div>
        <div class="middle">
            <div class="left">
                <h1>幸运大转盘抽奖券</h1>
                <h2>兑换比例500:1</h2>
            </div>
            <div class="right">
                <div class="text-input">
                    <span class="iconfont icon-add jia" @click="jia"></span>
                    <span class="input"><input type="number" v-model="num"></span>
                    <span class="iconfont icon-move jian" @click="jian"></span>
                    <span class="text">兑换数量</span>
                </div>
                <h2>合计：<span>{{num*500}}金币</span></h2>
            </div>
        </div>
        <div class="text">
            <p class="title">兑换规则:</p>
            <p><span>1.</span><span>每500六币可兑换一张抽奖券。</span></p>
            <p><span>2.</span><span> 只要满月签到（包括补签）也可获得一张免费抽奖券。</span></p>
            <p><span>3.</span><span>在兑换页面点选“抽奖”后，百分百幸运转盘将弹出,点击中间的”点击抽奖”即可开始幸运抽奖。</span></p>
            <p><span>4.</span><span>可抽取澳门双人豪华旅游团和IphoneX 256GB等大奖。</span></p>
            <p><span>5.</span><span>任何疑问可邮件咨询: qingpenda55@163.com 或 QQ: 65530941。</span></p>
            <p><span>6.</span><span>六友圈拥有最终解释权。</span></p>
        </div>
        <div class="submit-btn" @click="changeGift"><span>确认兑换</span></div>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return {
            num:1,
            id:0
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        ...mapActions(['getUserData']),
        jia(){
            this.num++;
        },
        jian(){
            if(this.num!=0){
                this.num--;
            }
        },
        changeGift(){
            var that = this;
            that.$vux.confirm.show({
                content:'确认兑换'+that.num+'张抽奖券吗？',
                confirmText:'确认',
                onConfirm () {
                    that.$vux.loading.show({
                        text: '请求中'
                    })
                    var postData = that.$qs.stringify({
                        id:1,
                        num:that.num
                    })
                    that.$http.post('/v1/user/gifts-change',postData).then(res=>{
                        that.$vux.loading.hide()
                        if(res.code==0){
                            that.$vux.toast.text('兑换成功', 'middle')
                            that.$store.commit('changeMoney',res.data.coin)
                            that.getUserData()
                        }else{
                            that.$vux.toast.text(res.msg_zh, 'middle')
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    background: $app-bg-color;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    >.text{
        margin-top:16px;
        background: $bg-color;
        padding:16px;
        .title {
            padding-bottom: 20px;
        }
        p{
            text-align: justify;
            font-size: 26px;
            color: $subtitle-color;
            padding-bottom:16px;
            display: table;
            >span{
                display: table-cell;
                text-align: justify;
            }
            >span:first-child{
                width:40px;
                display: table-cell;
            }
        }
        p:first-child{
            padding-bottom:20px;
        }
        p:last-child{
            padding-bottom:14px;
        }
    }
    .submit-btn{
        width:100%;
        height: 88px;
        line-height: 88px;
        padding: 50px 0 30px 0;
        background: #f2f2f2;
        span{
            display: block;
            background: $theme-color;
            color:$bg-color;
            font-size: 34px;
            width: 70%;
            border-radius: 44px;
            margin: auto;
        }
    }
}
.top{
    padding-bottom:50px;
    height: 379px;
    background: #fff url('/static/images/icons/cjquan.png') center center no-repeat;
    background-size: 366px 379px;
    border-bottom:$border-color 1px solid;
}
.middle{
    padding:30px 16px;
    background: #fff;
    margin-bottom:20px;
    overflow: hidden;
    .left{
        text-align: left;
        float: left;
        color: #333;
        h1{
            font-weight: 500;
            font-size: 30px;
            margin-bottom:10px;
        }
        h2{
            font-weight: 500;
            font-size: 28px;
        }
    }
    .right{
        float: right;
        color: #333;
        h2{
            text-align: left;
        }
        .text-input{
            overflow: hidden;
            text-align: right;
            padding-bottom:5px;
            span{
                display: block;
                float: right;
                line-height: 44px;
            }
            >.text{
                font-size: 30px;
                height: 44px;
                line-height: 47px;
                margin-right:10px;
            }
            .input{
                width: 44px;
                height: 44px;
                display: flex;
                input{
                    width: 44px;
                    height: 44px;
                    background:$border-color;
                    text-align: center;
                    color:$theme-color;
                    font-size: 30px;
                }
            }
            .jian,.jia{
                width: 44px;
                height: 44px;
                font-size: 30px;
                background:$border-color;
                text-align: center;
            }
            .jian{
                margin-right:2px;
            }
            .jia{
                margin-left:3px;
            }
        }
        h2{
            font-weight: 500;
            font-size: 28px;
            span{
                color:$theme-color;
            }
        }
    }
}
</style>
