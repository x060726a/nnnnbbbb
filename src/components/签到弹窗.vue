<template>
<div class="qiandao-pop-mask" v-if="resQiandaoDate">
    <div class="qiandao-content" :class="{'qiandao-active':qiandaoStatus}">
        <div class="title">
            <span class="qd-success" v-if="resQiandaoDate.coinChange">{{qiandaoClassName=='bq-active'?'补签成功':'签到成功'}}</span>
            <span class="qd-badge" v-if="resQiandaoDate.coinChange">{{resQiandaoDate.coinChange>0?"+"+resQiandaoDate.coinChange:resQiandaoDate.coinChange}}金币</span>
            <span class="unqd-success" v-if="resQiandaoDate.record.indexOf(today)&&!resQiandaoDate.coinChange">已签到</span>
        </div>
        <div class="date-title">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div>
        <div class="date-day" v-for="(ele,idx) in 6">
            <div v-for="(ele1,idx1) in 7" @click="qiandaoComfir()">
                <span :class="{
                    'active':resQiandaoDate.record.length!=0&&resQiandaoDate.record.indexOf(getDay(idx,idx1).toString())>-1 && getDay(idx,idx1)>0,
                    'bq-active':(resQiandaoDate.record.length==0||resQiandaoDate.record.indexOf(getDay(idx,idx1).toString())==-1) && getDay(idx,idx1)<today,
                }" v-if="getDay(idx,idx1)">{{getDay(idx,idx1)}}</span>
            </div>
        </div>
        <div class="some-init">
            <span class="avatar"><img :src="'/static/images/avatar/'+user.avatar+'.jpg'"></span>
            <span>您已成功签到{{resQiandaoDate.record.length==0?'0':resQiandaoDate.record.length}}天</span>
        </div>
        <p>*连续签满{{MonthLen}}天可获得666金币</p>
        <span class="iconfont icon-close close" @click="close_qiandao()"></span>
    </div>
    <div class="buqian-mask" v-show="buqianStatus">
        <div class="buqian-content" :class="{'buqain-active':buqainActive}">
            <p v-if="step_qiandaoClassName=='bq-active'">确定补签吗？</p>
            <p v-if="step_qiandaoClassName=='soon-active'">确定签到吗？</p>
            <span class="btn" v-if="step_qiandaoClassName=='bq-active'" @click="sendbuqian()">立即补签</span>
            <span class="btn" v-if="step_qiandaoClassName=='soon-active'" @click="sendbuqian()">立即签到</span>
            <span class="iconfont icon-close close" @click="close_buqian()"></span>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return{
            Yeas:'',
            Month:'',
            today:new Date().getDate(),
            firstDay:'',//开始的第一天
            MonthLen:'',//这个月有多少天
            
            openYear:'',//开奖年
            openMonth:'',//开奖月
            openDay:'',//开奖日

            qiandaoStatus:false,//签到弹窗
            buqianStatus:false,//确认签到弹窗
            buqainActive:false,//加个类名做动画效果
            buqianDay:'',//补签哪天
            step_qiandaoClassName:'',//通过这个判断是补签还是签到
            qiandaoClassName:'',//通过这个判断是补签还是签到
        }
    },
    watch:{
        buqianStatus(val,oval){
            if(val){
                setTimeout(()=>{
                    this.buqainActive = true;
                },100)
            }
        },
    },
    async mounted(){

    },
    created(){
        var postData = this.$qs.stringify({
            date:new Date().getDate()
        })
        this.sendQiandao(postData);
        this.init();
        setTimeout(()=>{
            this.qiandaoStatus = true;
        },100)
    },
    computed:{
        ...mapGetters(['user','resQiandaoDate'])
    },
    methods:{
        ...mapActions(['getQiandao','sendQiandao']),
        async init(){
            var date = new Date();
            this.curYear = date.getFullYear();//年
            this.curMonth = date.getMonth();//月
            this.curDay = date.getDate();//日

            this.Yeas = date.getFullYear();//年
            this.Month = date.getMonth();//月
            this.firstDay = this.MathFirstDay();
            this.MonthLen = this.MathMonthLen();
        },
        //求1号是星期几
        MathFirstDay(){
            var date = new Date();
            date.setFullYear(this.Yeas,this.Month,1);
            return date.getDay();
        },
        //求某个月有多少天
        MathMonthLen(){
            var timeStr = this.Yeas+"/"+(this.Month*1+1)+"/1"
            var selectedDate = new Date(timeStr);
            var selectedMonth = selectedDate.getMonth()+1;
            selectedDate.setMonth(selectedMonth);
            selectedDate.setDate(0);
            var dayMany = selectedDate.getDate();
            return dayMany;
        },
        //返回的日期
        getDay(idx,idx1){
            var hang = idx+1;
            var one  = idx1+1;
            if(idx==0){
                return (one*hang)-this.firstDay>0?(one*hang)-this.firstDay:''
            }else{
                var day = (((hang-1)*7)+one)-this.firstDay;
                if(day<=this.MonthLen){
                    return day;
                }else{
                    return false;
                }
            }
        },
        close_qiandao(){
            this.qiandaoStatus = false;
            setTimeout(()=>{
                this.$store.commit('qiandaoStatus',false)
            },200)
        },
        close_buqian(){
            this.buqainActive = false
            setTimeout(()=>{
                this.buqianStatus = false
            },200)
        },
        //签到
        qiandaoComfir(){
            var d = new Date().getDate();
            this.step_qiandaoClassName = event.target.className
            switch (event.target.className) {
                case 'soon-active':
                    this.buqianStatus = true;
                    this.buqianDay = event.target.innerText
                    break;
                case 'bq-active':
                    this.buqianStatus = true;
                    this.buqianDay = event.target.innerText
                    break;
            }
        },
        async sendbuqian(){
            var postData = this.$qs.stringify({
                date:this.buqianDay
            })
            this.$vux.loading.show({
                text: this.step_qiandaoClassName=='bq-active'?'补签中':'签到中',
            })
            this.buqianStatus = false;
            var res = await this.sendQiandao(postData);
            this.$vux.loading.hide()
            this.qiandaoClassName = this.step_qiandaoClassName;
            if(res.code==0){
                this.$vux.toast.text(this.qiandaoClassName=='bq-active'?'补签成功':'签到成功', 'middle')
                var postData = this.$qs.stringify({
                    date:new Date().getDate()
                })
                this.init();
            }else{
                this.$vux.toast.text(this.qiandaoClassName=='bq-active'?'补签失败':'签到失败', 'middle')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.qiandao-pop-mask{
    background: rgba(0,0,0,.5);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    .qiandao-content{
        width: 80%;
        padding-bottom:35px;
        background: #fff;
        border-radius: 17px;
        position: absolute;
        top: 15%;
        left: 50%;
        // margin-top:-650px;
        margin-left:-40%;
        opacity: 0;
        transform: scale(.95);
        transition: all .2s ease;
        p{
            font-size: 26px;
            padding-top:10px;
            color:$subtitle-color;
        }
        .title{
            background: url('/static/images/qiandao_bg.png') 0px 0px no-repeat;
            background-size: 100% 100%;
            height: 100px;
            .unqd-success{
                font-size: 38px;
                color:#fff;
                padding-top:25px;
                display: block;
            }
            .qd-success{
                font-size: 30px;
                color:#fff;
                padding-top:10px;
                display: block;
            }
            .qd-badge{
                color:#f9dd00;
                padding:2px 10px 0 10px;
                background: rgba(255,255,255,.3);
                border-radius: 10px;
                line-height: 35px;
                height: 35px;
                font-size: 26px;
                display: block;
                width:120px;
                margin: auto;
            }
        }
        .close{
            width: 70px;
            height: 70px;
            display: block;
            position: absolute;
            bottom:-100px;
            left: 50%;
            margin-left:-35px;
            font-size: 70px;
            color:$border-color;
        }
        .date-title{
            display: flex;
            margin-left:10px;
            margin-right:10px;
            >span{
                flex: 1;
                line-height: 70px;
                text-align: center;
                position: relative;
                font-size: 32px;
            }
        }
        .date-day{
            display: flex;
            margin-bottom:10px;
            margin-left:10px;
            margin-right:10px;
            >div{
                flex: 1;
                position: relative;
                span{
                    text-align: center;
                    display: inline-block;
                    line-height: 70px;
                    width: 70px;
                    position: relative;
                    z-index: 2;
                    font-size: 26px;
                }
                span.active{
                    border:$theme-color 1px solid;
                    border-radius: 50%;
                }
                span.bq-active{
                    border:#afacac 1px solid;
                    border-radius: 50%;
                    position: relative;
                }
                span.bq-active:before{
                    content:'补';
                    position: absolute;
                    right:-5px;
                    bottom:-5px;
                    width: 35px;
                    height: 35px;
                    line-height: 35px;
                    display: block;
                    background: #fff;
                    color:#afacac;
                    font-size: 24px;
                    border-radius: 20px;
                }
                span.soon-active{
                    border:#54e654 1px solid;
                    border-radius: 50%;
                }
                span.soon-active:before{
                    content: "签";
                    display: block;
                    font-size: 35px;
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    width: 70px;
                    height: 70px;
                    color:#54e654;
                    opacity: .5;
                    transform: rotate(-30deg)
                }
            }
        }
        .some-init{
            height: 70px;
            line-height: 70px;
            width: 70%;
            border-radius: 40px;
            background: #f9dd00;
            margin: auto;
            overflow: hidden;
            span{
                float: left;
                display: inline-block;
                color: $text-table-color;
            }
            span.avatar{
                width: 70px;
                height: 70px;
                background: #fff;
                border-radius: 50%;
                margin-left:-1px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            span:last-child{
                width:calc(100% - 70px);
                text-align: center;
                font-size: 28px;
            }
        }
    }
    .qiandao-active{
        opacity: 1;
        transform: scale(1);
    }
    .buqian-mask{
        position: fixed;
        z-index: 3;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.5);
        .buqian-content{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 480px;
            height: 200px;
            margin-left:-240px;
            margin-top:-100px;
            background: $bg-color;
            border-radius: 10px;
            opacity: 0;
            transform: scale(.95);
            transition: all .2s ease;
            p{
                text-align: center;
                padding-top:30px;
                color:$subtitle-color;
                font-size: 32px;
            }
            span.btn{
                display: block;
                width:200px;
                height: 70px;
                line-height: 70px;
                margin: 20px auto;
                background: $theme-color;
                border-radius: 5px;
                color:#fff;
                font-size: 28px;
            }
            span.close{
                width: 40px;
                height: 40px;
                display: block;
                position: absolute;
                bottom:-70px;
                left: 50%;
                margin-left:-20px;
                font-size: 40px;
                color:$border-color;
            }
        }
        .buqain-active{
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
