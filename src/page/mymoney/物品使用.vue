<template>
    <div class="content">
        <div class="input-group">
            <div class="block"><span>物品名称：</span><span class="blue">{{$route.query.p_name}}</span></div>
            <div class="block"><span>充值号码：</span><span><input type="tel" v-model="phone" placeholder="仅限中国大陆手机号码"></span></div>
            <div class="block"><span>确认号码：</span><span><input type="tel" v-model="phoneAgain" placeholder="请再输入一次充值号码"></span></div>
        </div>
        <div class="text">
            <p>兑换规则:</p>
            <p><span>1.</span><span>点选要兑换的话费券，价值10 至 100 元。</span></p>
            <p><span>2.</span><span>所有申请兑换会在24小时内处理。</span></p>
            <p><span>3.</span><span>在交易中发生违反六友圈相关监管规定、欺诈、套利等行为，六友圈有权取消所有积分兑换。</span></p>
            <p><span>4.</span><span>有效期为30天，请参考截至日期。 逾期没有兑换的奖励恕不退还。</span></p>
            <p><span>5.</span><span>任何疑问可邮件咨询: qingpenda55@163.com 或 QQ: 65530941</span></p>
        </div>
        <div class="submit-btn" @click="userGift()">确认使用</div>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return{
            phone:null,
            phoneAgain:null
        }
    },
    created(){
        console.log(this.$route);
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        userGift(){
            var that = this;
            if(!that.phone){
                that.$vux.toast.text('手机号码不能为空', 'middle')
                return
            }
            var phonereg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!phonereg.test(that.phoneAgain)){
                that.$vux.toast.text('请输入正确的手机号码', 'middle')
                return;
            }
            if(that.phone!=that.phoneAgain){
                that.$vux.toast.text('两次输入的号码不一致', 'middle')
                return
            }
            that.$vux.confirm.show({
                content:'确定执行此操作',
                confirmText:'确认',
                onConfirm () {
                    that.postApi()
                }
            })
        },
        postApi(){
            var that = this;
            var postData = that.$qs.stringify({
                phone:that.phoneAgain,
                id:that.$route.query.id,
            })
            var obj = {
                phone:that.phoneAgain,
                name:that.$route.query.p_name
            }
            that.$http.post('/v1/user/gifts-use',postData).then(res=>{
                if(res.code==0){
                    that.$router.push({path:'/ddstatus',query:obj})
                }else{
                    that.$vux.toast.text(res.msg_zh, 'middle')
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
.input-group{
    margin-bottom:20px;
    background: #fff;
    .block{
        border-bottom:$border-color 1px solid;
        height: 80px;
        line-height: 80px;
        padding-left:16px;
        text-align: left;
        font-size: 26px;
        span.blue{
            color:$theme-color;
        }
    }
    .block:last-child{
        border-bottom:none;
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
