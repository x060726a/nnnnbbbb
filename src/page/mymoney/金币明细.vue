<template>
<div class="content">
    <scroller 
        v-if="list.length!=0"
        height="100%"
        lock-x
        scrollbar-y
        :bounce='isUsePullUp'
        :scrollbar-y='isUsePullUp'
        :use-pullup='isUsePullUp'
        :pullup-config="pullUpObj"
        @on-pullup-loading='getList'
        ref="my_scroller">
        <div>
            <div class="listItem" v-for="(item,index) in list">
                <h1>{{data[item.liq_type]}}</h1>
                <p>{{trfTime(item.time)}}</p>
                <span>{{item.coin*1<0?item.coin:'+'+item.coin}}</span>
            </div>
            <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
        </div>
    </scroller>
    <DATANONE v-if="list.length==0"/>
</div>
</template>
<script>
const DATANONE = import('@/components/没有数据')
import { Scroller } from 'vux'
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            offset:0,
            list:[],
            data:{},
            isNoMoreData:false,
            isUsePullUp:true,
            pullUpObj:{
                upContent:"<span class='loading-text'></span>", 
                downContent: "<span class='loading-text'>释放后加载</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
        }
    },
    created(){
        this.getList();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getList(){
            var that = this;
            that.$http.post('/v1/user/coin-log').then(res=>{
                if(res.code==0){
                    that.data = res.data.liq_type;
                    if(res.data.data.length==0){
                        that.isNoMoreData = true
                        that.$refs.my_scroller.disablePullup()
                    }else{
                        var newArr = that.list.concat(res.data.data)
                        that.list = newArr;
                        if(that.offset!=0){
                            that.$refs.my_scroller.donePullup();
                        }
                    }
                    if(res.data.data.length<20){
                        //是否开启上拉加载更多
                        that.isUsePullUp = false
                    }
                }
                that.offset = res.data.offset
            })
        },
        trfTime(str){
            var d = new Date();
            d.setTime(str*1000)
            var years = d.getFullYear();
            var m = d.getMonth() + 1;//月
            var day = d.getDate();//日
            var h = d.getHours();//小时
            var min = d.getMinutes();
            return years+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day)+' '+(h<10?'0'+h:h)+':'+(min<10?'0'+min:min);
        }
    },
    components:{
        Scroller,
        DATANONE(){
            return{
                component:DATANONE,
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .listItem{
        background: $bg-color;
        padding:16px 40px 16px 16px;
        position: relative;
        margin-bottom:16px;
        h1{
            font-weight: 500;
            font-size: 30px;
            text-align: left;
            color:#333;
            line-height: 40px;
            margin-bottom:10px;
        }
        p{
            font-size: 26px;
            color:$subtitle-color;
            text-align: left;
        }
        span{
            position: absolute;
            right:40px;
            top: 0;
            line-height: 110px;
            display: block;
            font-size: 28px;
        }
        span.jia{
            color:$theme-color;
        }
        span.jian{
            color:#333;
        }
    }
}
</style>
