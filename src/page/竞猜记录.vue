<template>
    <div class="context">
        <div class="inline-block">
            <span>类型</span>
            <span>期数</span>
            <span>下注</span>
            <span>内容</span>
            <span>盈亏</span>
        </div>
        <div class="pull-down-wrap" v-if="list.length>0">
            <scroller 
                v-if="list.length!=0"
                height="100%"
                lock-x
                scrollbar-y
                :use-pullup='isUsePullUp'
                :pullup-config="pullUpObj"
                @on-pullup-loading='getMyquiz'
                ref="my_scroller">
                <div class="scroll">
                    <div class="inline-block text" v-for="(ele,idx) in list">
                        <span>{{ele.title}}</span>
                        <span>{{ele.action_qishu}}</span>
                        <span>{{ele.money}}</span>
                        <span>{{ele.action_data<10?'0'+ele.action_data:ele.action_data}}</span>
                        <span v-if="ele.bonus*1==0" class="gray">-{{ele.money}}</span>
                        <span v-if="ele.bonus==='等待开奖'">等待开奖</span>
                        <span v-if="ele.bonus*1>0" class="red">+{{ele.bonus}}</span>
                        <span v-if="ele.bonus*1<0">和</span>
                    </div>
                    <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                </div>
            </scroller>
        </div>
        <DATANONE v-if="list.length==0"/>
    </div>
</template>
<script>
const DATANONE = import('@/components/没有数据')
import { mapGetters } from 'Vuex'
import { Scroller } from 'vux'
export default {
    data(){
        return {
            list:[],
            offset:0,
            isHttpSending:false,//请求是否在发送中
            isNoMoreData:false,//是否已经加载所有数据
            isUsePullUp:true,//是否开启上拉加载
            isNotData:false,//根本没有数据
            pullUpObj:{
                upContent:"<span class='loading-text'></span>", 
                downContent: "<span class='loading-text'>释放后加载</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
            bet_type:['色波','特效','尾数']
        }
    },
    created(){
        this.getMyquiz();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getMyquiz(){
            let that = this;
            var postData = that.$qs.stringify({
                offset:that.offset
            })
            that.$http.post('/v1/user/bets-records',postData).then(res=>{
                if(res.code==0){
                    if(that.offset!=0){
                        that.$refs.my_scroller.donePullup();
                    }
                    if(that.offset==0&&res.data.records.length==0){
                        //根本没有数据
                        that.isNotData = true
                    }
                    if(that.offset!=0&&res.data.records.length==0){
                        //已经全部加载完数据
                        that.$refs.my_scroller.disablePullup()
                        that.isNoMoreData = true;
                    }
                    if(res.data.records.length<20){
                        //是否开启上拉加载更多
                        that.isUsePullUp = false
                    }
                    if(res.data.records.length!=0){
                        var newArr = that.list.concat(res.data.records)
                        that.list = newArr;
                    }
                    that.offset = res.data.offset;
                }
                that.isHttpSending = false
            })
        },
        kjType(type,data){
            var tm = data[data.length-1]*1
            if(tm==49) return '和'
            var liuhe = JSON.parse(localStorage.getItem('liuhe'))
            if(type==3){
                if(tm%2==0&&tm!=49){
                    return '特双'
                }
                if(tm%2==1&&tm!=49){
                    return '特单'
                }
            }
            if(type==2){
                if(tm<=24){
                    return '特小'
                }
                if(tm>24&&tm!=49){
                    return '特大'
                }
            }
            if(type==1){
                for(var k in liuhe.ballcolor){
                    liuhe.ballcolor[k].indexOf(tm)
                    return k
                }
            }
        }
    },
    components:{
        Scroller,
        DATANONE(){
            return {
                component:DATANONE,
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.context{
    height: 100%;
    background: $app-bg-color;
    .pull-down-wrap{
        height: calc(100% - 80px);
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }
    .inline-block{
        font-size: 24px;
        line-height: 80px;
        display: flex;
        background: #fff;
        border-bottom:$border-color 1px solid;
        span{
            color:#333;
            font-size: 30px;
            font-weight: 500;
            flex: 1;
        }
    }
    .text{
        span{
            color:$text-table-color;
            font-size: 28px;
            font-weight: 500;
        }
        span.active{
            color:$theme-color!important;
        }
        span.gray{
            color:#666;
        }
        span.red{
            color:red;
        }
    }
}
</style>
