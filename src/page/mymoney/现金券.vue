<template>
    <div class="content">
        <div class="choose">
            <p>请选择项目<span v-if="money!=0">（所需要{{money}}六币）</span></p>
            <div class="choose-btn">
                <div class="block"><span class="num1" :class="{active:id==26}" @click="id=26,money=150000"></span></div>
                <div class="block"><span class="num2" :class="{active:id==25}" @click="id=25,money=80000"></span></div>
                <div class="block"><span class="num3" :class="{active:id==24}" @click="id=24,money=38000"></span></div>
            </div>
            <div class="choose-btn">
                <div class="block"><span class="num4" :class="{active:id==23}" @click="id=23,money=22000"></span></div>
                <div class="block"><span class="num5" :class="{active:id==22}" @click="id=22,money=12000"></span></div>
                <div class="block"><span class="num6" :class="{active:id==21}" @click="id=21,money=7500"></span></div>
            </div>
        </div>
        <div class="text">
            <p>兑换规则:</p>
            <p><span>1.</span><span>本周签到不少于4天方可兑换</span></p>
            <p><span>2.</span><span>每人每天兑换代金券上限为3张</span></p>
            <p><span>3.</span><span>现金券有效期为7天，请参考截止日期</span></p>
            <p><span>4.</span><span>现金券只限六友合作官网使用、相关条款请咨询合作网站</span></p>
            <p><span>5.</span><span>在交易中发生违反六友相关监管规定、欺诈、套利等行为，六友有权取消所有积分兑换</span></p>
            <p><span>6.</span><span>六友拥有本次活动的最终解释权，如有疑问可邮件咨询:qingpengda55@163.com 或 QQ：65530941</span></p>
        </div>
        <div class="submit-btn" @click="submitGift()">确认兑换</div>
    </div>
</template>
<script>
import { TransferDomDirective as TransferDom } from 'vux'
import { setTimeout } from 'timers';
export default {
    directives:{
        TransferDom
    },
    data(){
        return {
            id:'',
            money:0,
            showDialog:false,
            showDialog1:false,
            name:'',
            phone:'',
            qq:'',
            userObj:{}
        }
    },
    created(){
        this.$store.commit('changeRoutertTitle','现金券')
    },
    methods:{
        submitGift(){
            var that = this
            if(that.id==''){
                this.$vux.toast.text('请先选择礼品','middle')
                return
            }
            var obj = {
                26:'确定兑换88元现金券吗？',
                25:'确定兑换66元现金券吗？',
                24:'确定兑换38元现金券吗？',
                23:'确定兑换28元现金券吗？',
                22:'确定兑换18元现金券吗？',
                21:'确定兑换10元现金券吗？',
            }
            that.$vux.confirm.show({
                content:obj[that.id],
                confirmText:'确认',
                onConfirm () {
                    that.$vux.loading.show({
                        text: '请求中'
                    })
                    that.getChangeGift()
                }
            })
        },
        check(){
            var that = this
            var res;
            this.regChinese()&&this.regPhone()&&(this.qq||this.regQQ)&&(()=>{
                that.$vux.loading.show({
                    text: '请求中'
                })
                var postData = that.$qs.stringify({
                    realname:that.name,
                    phone:that.phone,
                    qq:that.qq,
                })
                //完善个人信息
                that.$http.post('/v1/user/improve',postData).then(res=>{
                    that.$vux.loading.hide();
                    if(res.code==0){
                        that.showDialog = false
                        that.$vux.toast.text('更新资料成功', 'middle')
                    }else{
                        that.$vux.toast.text(res.msg_zh, 'middle')
                    }
                })
            })()
        },
        //兑换现金
        getChangeGift(){
            var that = this;
            var postData = that.$qs.stringify({
                id:that.id,
                num:1
            })
            that.$http.post('/v1/user/gifts-change',postData).then(res=>{
                that.$vux.loading.hide();
                if(res.code==0){
                    that.$vux.confirm.show({
                        content:'兑换成功，请在我的物品中查看',
                        confirmText:'确认',
                        onConfirm () {
                            that.$router.push({path:'/mythings'})
                        }
                    })
                    that.$store.commit('changeMoney',res.data.coin)
                }else{
                    that.$vux.toast.text(res.msg_zh, 'middle')
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.ws-dialog{
    position: relative;
    .ws-dialog-close{
        position: absolute;
        top: 5px;
        right: 20px;
        font-size: 50px;
    }
    h1{
        font-weight: 500;
        padding-top:50px;
        padding-bottom:34px;
        font-size: 30px;
        color:$theme-color;
    }
    .mgr10{
        margin:0 auto 20px;
    }
    .mgr44{
        margin:0 auto 64px;
    }
    p{
        font-size: 24px;
        padding-left:50px;
        text-align: left;
        color:#fc0505;
    }
    .text-group{
        padding-left:50px;
        font-size: 28px;
        color:#000;
        text-align: left;
        width:530px;
        i.impty{
            display: inline-block;
            width: 14px;
            vertical-align: middle;
            font-size: 0;
        }
        span.texturl{
            display: block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        a.playgame{
            width:130px;
            height: 50px;
            line-height: 50px;
            font-size: 24px;
            color:#fff;
            background: $theme-color;
            text-align: center;
            display: inline-block;
            border-radius: 30px;
            margin-left:20px;
        }
    }
    .input-group:hover{
        border: $theme-color 1px solid;
        i{
            color: $theme-color;
        }
    }
    .input-group{
        position: relative;
        width: 480px;
        height: 66px;
        border: #d6d7dc 1px solid;
        border-radius: 10px;
        overflow: hidden;
        input{
            width: calc(100% - 80px);
            height: 66px;
            line-height: 66px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            padding-left:80px;
            font-size: 30px;
            cursor: pointer;
        }
        i{
            font-size: 42px;
            color:#d6d7dc;
            position: absolute;
            z-index: 2;
        }
        i.input-user{
            top: 0;
            left: 10px;
        }
        i.input-phone{
            font-size: 50px;
            top: -7px;
            left: 6px;
        }
        i.input-qq{
            top: 3px;
            left: 13px;
            font-size: 38px;
        }
    }
    .btn-group{
        font-weight: 500;
        overflow: hidden;
        margin-top:40px;
        a{
            display: block;
            width:calc(40% - 2px);
            float: left;
            height: 88px;
            line-height: 88px;
            border-radius: 44px;
            border-radius: 50px;
            font-size: 36px;
            border:$theme-color 1px solid;
            color:$theme-color;
        }
        a:first-child{
            margin-left:7%;
        }
        a:last-child{
            background: $theme-color;
            color:#fff;
            margin-left:6%;
        }
    }
}
.content{
    height: 100%;
    -webkit-overflow-scrolling:touch;
    overflow-y: scroll;
}
.choose{
    padding:10px;
    background: $bg-color;
    >p{
        font-size: 30px;
        color:$subtitle-color;
        text-align: left;
        padding-top:15px;
        padding-bottom:15px;
    }
    .choose-btn{
        display: flex;
        .block{
            flex: 1;
            height: 90px;
            position: relative;
            padding-top:15px;
            padding-bottom:15px;
            span{
                display: block;
                width: 182px;
                height: 90px;
                margin: auto;
                position: relative;
            }
            span.active::after{
                content: "";
                position: absolute;
                top: -8px;
                left: -6px;
                display: block;
                width:190px;
                height: 100px;
                border:$theme-color 1px solid;
                border-radius: 5px;
            }
            span.num1{
                background: url('/static/images/icons/cash_icon1.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num2{
                background: url('/static/images/icons/cash_icon2.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num3{
                background: url('/static/images/icons/cash_icon3.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num4{
                background: url('/static/images/icons/cash_icon4.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num5{
                background: url('/static/images/icons/cash_icon5.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num6{
                background: url('/static/images/icons/cash_icon6.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
        }
    }
}
.text{
    margin-top:16px;
    background: $bg-color;
    padding:16px;
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
}
.submit-btn{
    background: $theme-color;
    color:$bg-color;
    font-size: 34px;
    width: 70%;
    height: 88px;
    line-height: 88px;
    border-radius: 10px;
    margin: 50px auto;
}
</style>