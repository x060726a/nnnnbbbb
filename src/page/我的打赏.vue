<template>
<div class="context">
    <div class="inline-block">
        <span>用户名</span>
        <span>日期</span>
        <span>属性</span>
        <span>金币</span>
    </div>
    <div class="pull-down-wrap" v-if="list.length>0">
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='getMyreward'
            ref="my_scroller">
            <div class="scroll">
                <div class="inline-block text" v-for="(ele,idx) in list">
                    <span>{{ele.to_name}}</span>
                    <span class="time">{{trfTime(ele.time)}}</span>
                    <span>{{$store.state.user.id==ele.from_uid?'赠送':'收到'}}</span>
                    <span :class="{active:$store.state.user.id==ele.from_uid,unactive:$store.state.user.id!=ele.from_uid}">{{$store.state.user.id==ele.from_uid?'-':'+'}}{{ele.money}}</span>
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
        }
    },
    created(){
        this.getMyreward();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getMyreward(){
            let that = this;
            var postData = that.$qs.stringify({
                offset:that.offset
            })
            that.$http.post('/v1/user/rewards-records',postData).then(res=>{
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
        async loadTop(){
            var res = await this.getMyreward(false);
            this.$refs.loadmore.onTopLoaded();
        },
        async loadBottom(){
            var res = await this.getMyreward(true);
            this.$refs.loadmore.onBottomLoaded();
        },
        //转化时间戳
        trfTime(str){
            if(!str) return '';
            var d = new Date();
            d.setTime(str*1000)
            var year = d.getFullYear();
            var m = d.getMonth() + 1;//月
            var day = d.getDate() - 1;//日
            var h = d.getHours();//小时
            var min = d.getMinutes();
            // return year+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day)+' '+(h<10?'0'+h:h)+':'+(min<10?'0'+min:min);
            return year+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day);
        },
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
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    background: $app-bg-color;
    .pull-down-wrap{
        height: calc(100% - 80px);
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }
    .inline-block{
        font-size: 30px;
        line-height: 80px;
        display: flex;
        border-bottom:$border-color 1px solid;
        background: #fff;
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
            color:$theme-color;
        }
    }
}
</style>
