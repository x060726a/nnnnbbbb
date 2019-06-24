<template>
<div class="content">
    <div class="table-head" v-for="(ele,idx) in list" v-if="idx==0">
        <div><span>{{ele.qishu}}</span><span>期数</span></div>
        <div><span>{{ele.open}}</span><span>开</span></div>
        <div><span>{{ele.kill}}</span><span>杀</span></div>
        <div><span>准</span><span>准</span></div>
    </div>
    <div class="table-body-scroll">
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='getFormulas'
            ref="my_scroller">
            <div class="main">
                <div v-for="(ele,idx) in list" class="table-body" :class="{first:idx==0}">
                    <div><span>{{list[0].qishu}}</span><span>{{ele.qishu}}</span></div>
                    <div><span>{{list[0].open<10?'0'+list[0].open:list[0].open}}</span><span>{{ele.open<10?'0'+ele.open:ele.open}}</span></div>
                    <div><span>{{list[0].kill}}</span><span>{{ele.kill}}</span></div>
                    <div v-if="ele.result==0"><span>错</span><span>错</span></div>
                    <div v-if="ele.result==1" class="active"><span>准</span><span>准</span></div>
                    <div v-if="ele.result==2"><span>准</span><span>??</span></div>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </div>
        </scroller>
        <div class="spinner" v-if="isHttpSending&&!isNotData"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
        <DATANONE v-if="isNotData"/>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
import { Scroller } from 'vux' 
export default {
    data(){
        return {
            offset:0,
            list:[],
            act:true,
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
        this.isHttpSending = true
        this.getFormulas();
    },
    props:['id','name'],
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getFormulas(){
            var that = this;
            var postData = that.$qs.stringify({
                offset:that.offset,
                formula_id:that.$route.params.id
            })
            that.$http.post('/v1/liuyou/formulas-specify',postData).then(res=>{
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
                        that.list.sort((a,b)=>{
                            return b.qishu*1 - a.qishu*1
                        })
                    }
                    that.offset = res.data.offset;
                }
                that.isHttpSending = false
            })
        },
    },
    components:{Scroller}
}
</script>
<style lang="scss" scoped>
.spinner{
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-100px;
}
.content{
    width: 100%;
    height: 100%;
    text-align: center;
    .table-head{
        width:100vw;
        height: 80px;
        line-height: 80px;
        display: table;
        font-size: 28px;
        >div{
            display: table-cell;
            position: relative;
            min-width: 60px;
            border-bottom:1px solid $border-color;
            >span:first-child{
                opacity: 0;
            }
            >span:last-child{
                display: block;
                position: absolute;
                height: 80px;
                line-height: 80px;
                width:100%;
                top: 0;
                left: 0;
            }
        }
    }
    .table-body-scroll{
        height: calc(100% - 80px);
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        .first{
            color:$theme-color;
        }
        .table-body{
            width:100vw;
            height: 80px;
            line-height: 80px;
            display: table;
            font-size: 26px;
            >div{
                display: table-cell;
                position: relative;
                min-width: 60px;
                border-bottom:1px solid $border-color;
                >span:first-child{
                    opacity: 0;
                }
                >span:last-child{
                    display: block;
                    position: absolute;
                    height: 80px;
                    line-height: 80px;
                    width:100%;
                    top: 0;
                    left: 0;
                }
            }
            >div.active>span{
                color:#fe3422;
            }
        }
    }
}

</style>
