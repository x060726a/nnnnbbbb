<template>
    <div class="content">
        <div class="choose">
            <p>请选择项目<span v-if="money[id-11]">（所需要{{money[id-11]&&money[id-11].coin}}六币）</span></p>
            <div class="choose-btn">
                <div class="block"><span class="num1" :class="{active:id==16}" @click="id=16"></span></div>
                <div class="block"><span class="num2" :class="{active:id==15}" @click="id=15"></span></div>
                <div class="block"><span class="num3" :class="{active:id==14}" @click="id=14"></span></div>
            </div>
            <div class="choose-btn">
                <div class="block"><span class="num4" :class="{active:id==13}" @click="id=13"></span></div>
                <div class="block"><span class="num5" :class="{active:id==12}" @click="id=12"></span></div>
                <div class="block"><span class="num6" :class="{active:id==11}" @click="id=11"></span></div>
            </div>
        </div>
        <div class="text">
            <p>兑换规则:</p>
            <p><span>1.</span><span>本周签到不少于4天方可兑换</span></p>
            <p><span>2.</span><span>每人每天兑换充值卡上限为3张</span></p>
            <p><span>3.</span><span>所有话费券兑换会在24小时内处理</span></p>
            <p><span>4.</span><span>话费券有效期为7天，请参考截至日期</span></p>
            <p><span>5.</span><span>在交易中发生违反六友相关监管规定、欺诈、套利等行为，六友有权取消所有积分兑换</span></p>
            <p><span>6.</span><span>六友拥有本次活动的最终解释权，如有疑问可邮件咨询:qingpengda55@163.com 或 QQ：65530941</span></p>
        </div>
        <div class="submit-btn" @click="submitGift">确认兑换</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:0,
            money:false
        }
    },
    created(){
        this.$store.commit('changeRoutertTitle','话费券')
        this.gitList();
    },
    methods:{
        submitGift(){
            var that = this
            if(that.id==''){
                this.$vux.toast.text('请先选择礼品','middle')
                return
            }
            var obj = {
                16:'确定兑换200元话费吗？',
                15:'确定兑换100元话费吗？',
                14:'确定兑换80元话费吗？',
                13:'确定兑换50元话费吗？',
                12:'确定兑换30元话费吗？',
                11:'确定兑换20元话费吗？'
            }
            that.$vux.confirm.show({
                content:obj[that.id],
                confirmText:'确认',
                onConfirm () {
                    that.$vux.loading.show({
                        text: '请求中'
                    })
                    that.changeGift()
                }
            })
        },
        changeGift(){
            var that = this;
            if(that.money.length==0){
                that.$vux.toast.text('加载中，请稍后', 'middle')
                return true;
            }
            var postData = that.$qs.stringify({
                id:that.id,
                num:1
            })
            that.$http.post('/v1/user/gifts-change',postData).then(res=>{
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
                that.$vux.loading.hide();
            })
        },
        gitList(){
            var that = this;
            that.$http.post('/v1/user/gifts').then(res=>{
                if(res.code==0){
                    that.money = []
                    that.money.push(res.data[11])
                    that.money.push(res.data[12])
                    that.money.push(res.data[13])
                    that.money.push(res.data[14])
                    that.money.push(res.data[15])
                    that.money.push(res.data[16])
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
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
                background: url('/static/images/icons/hf_icon7.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num2{
                background: url('/static/images/icons/hf_icon1.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num3{
                background: url('/static/images/icons/hf_icon2.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num4{
                background: url('/static/images/icons/hf_icon3.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num5{
                background: url('/static/images/icons/hf_icon4.png') 2px 2px no-repeat;
                background-size: 98% 98%;
            }
            span.num6{
                background: url('/static/images/icons/hf_icon5.png') 2px 2px no-repeat;
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