<template>
<div class="lottery-wrap">
    <div class="lottery-top" v-if="HistoryNum">
        <span>第<span>{{HistoryNum.qihao}}</span>期开奖结果</span>
        <span v-show="isshow" @click="$router.push({path:'/historyissue'})">历史开奖>></span>
        <a v-show="isshow" :href="sysTem&&sysTem.quick_bet.value">投注</a>
    </div>
    <div class="lottery-num" v-if="HistoryNum">
        <div class="lotterynum-res">
            <span v-for="(ele,idx) in HistoryNum.zm.split(',')" :class="MathColor(ele)">{{ele<10?'0'+ele:ele}}</span>
            <span :class="MathColor(HistoryNum.tm)">{{HistoryNum.tm<10?'0'+HistoryNum.tm:HistoryNum.tm}}</span>
        </div>
        <div class="shengxiao">
            <span v-for="(ele,idx) in HistoryNum.sx.split(',')">{{ele}}</span>
            <!-- <span>{{MathSX(HistoryNum.tm)}}</span> -->
        </div>
    </div>
    <div class="spinner-wrap" v-show="!HistoryNum"><spinner type='ios' size='40px'></spinner></div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            loading:true,
        }
    },
    computed:{
        ...mapGetters(['sysTem'])
    },
    props:['HistoryNum','isshow'],
    methods:{
        //生肖
        MathSX(num){
            var data = JSON.parse(localStorage.getItem('liuhe'))
            for(var key in data.ballpanel){
                if(data.ballpanel[key].indexOf(num*1)>-1){
                    return key;
                }
            }
        },
        //色波
        MathColor(num){
            var data = JSON.parse(localStorage.getItem('liuhe'))
            for(var key in data.ballcolor){
                if(data.ballcolor[key].indexOf(num*1)>-1){
                    if(key=='红'){
                        return 'hong';
                    }
                    if(key=='蓝'){
                        return 'lan';
                    }
                    if(key=='绿'){
                        return 'lv';
                    }
                }
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.lottery-wrap{
    position: relative;
    height: 228px;
    background: $bg-color;
}
.spinner-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-40px;
    margin-top:-40px;
}
.lottery-top{
    padding-top:16px;
    padding-bottom:26px;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    font-size: 28px;
    >span:first-child{
        float: left;
        padding-left:16px;
        font-size: 26px;
        color: #666;
        >span{
            color:$theme-color;
        }
    }
    >span:nth-child(2){
        float: left;
        font-size: 26px;
        color: #666;
        margin-left:30px;
        >span{
            color:$theme-color;
        }
    }
    >a{
        float: right;
        margin-right:16px;
        display: block;
        width:120px;
        height: 44px;
        line-height: 44px;
        background:$theme-color;
        font-size: 24px;
        color:#fff;
        border-radius: 44px;
        text-decoration: none;
    }
}
.lotterynum-res{
    overflow: hidden;
    padding: 0px 10px 5px 10px;
    span{
        float: left; width: 70px; height: 70px; margin-right: 30px; font-size: 34px; text-align: center; line-height: 72px;
    }
    .hong{
        color: #e9587a; background: url("/static/images/codeH1.png") no-repeat center; background-size: 100% 100%;
    }
    .lan{
        color: #4785f7; background: url("/static/images/codeL1.png") no-repeat center; background-size: 100% 100%;
    }
    .lv{
        color: #8acf3f; background: url("/static/images/codeLv1.png") no-repeat center; background-size: 100% 100%;
    }
    >span:last-child{
        float: right;
        margin-right:34px;
        position: relative;
    }
    >span:last-child::after{
        content: "特";
        position: absolute;
        left: -40px;
        top: -2px;
        font-size: 28px;
        color: #666;
    }
}
.shengxiao{
    overflow: hidden;
    padding: 10px;
    padding-top:0;
    span{
        float: left;
        width: 70px;
        font-size: 28px;
        text-align: center;
        margin-right:30px;
        color: #333;
    }
    >span:last-child{
        float: right;
        margin-right:34px;
        color:$theme-color;
    }
}
</style>
