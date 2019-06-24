<template>
<div class="content">
    <div class="jixi-tab">
        <span :class="{active:tukuTabIndex==1}" @click="$store.commit('tukuTabIndex',1)">看图解码</span>
        <span :class="{active:tukuTabIndex==2}" @click="$store.commit('tukuTabIndex',2)">幸运彩图</span>
        <span :class="{active:tukuTabIndex==3}" @click="$store.commit('tukuTabIndex',3)">精选彩图</span>
        <span :class="{active:tukuTabIndex==4}" @click="$store.commit('tukuTabIndex',4)">香港图库</span>
        <div :class="{activeLine1:tukuTabIndex==1,activeLine2:tukuTabIndex==2,activeLine3:tukuTabIndex==3,activeLine4:tukuTabIndex==4}"></div>
    </div>
    <div class="list" ref="index" >
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='getParse'
            ref="my_scroller">
            <div class="scroll">
                <div class="pad16"></div>
                <div v-for="(item,index) in list" class="jixi-list" @click="$router.push({path:'/tkcont/'+item.id})">【{{item.qishu}}期】{{item.title}}</div>
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
const DATANONE = import('@/components/没有数据')
export default {
    data(){
        return {
            offset:0,
            list:[],
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
    watch:{
        '$store.state.tukuTabIndex'(val,oval){
            this.offset = 0;
            this.list = []
            this.isHttpSending = true
            this.getParse();
        }
    },
    activated(){

    },
    created(){
        this.isHttpSending = true
        this.getParse();
    },
    computed:{
        ...mapGetters(['tukuTabIndex','isApp'])
    },
    methods:{
        getParse(){
            var that = this;
            var postData = that.$qs.stringify({
                offset:that.offset,
                category:this.$store.state.tukuTabIndex
            })
            that.$http.post('/v1/liuyou/gallery',postData).then(res=>{
                if(res.code==0){
                    var arr = [];
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
                    that.list.forEach(ele=>{
                        arr.push(ele.title)
                    })
                    localStorage.setItem('parseListTitle',JSON.stringify(arr))
                    localStorage.setItem('parseList',JSON.stringify(that.list))
                }
                that.isHttpSending = false
            })
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
.spinner{
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-100px;
}
.content{
    height: 100%;
    background: $app-bg-color;
    .jixi-tab{
        height: 68px;
        line-height: 68px;
        display: flex;
        background: #fff;
        position: relative;
        span{
            flex: 1;
            position: relative;
            font-size: 34px;
            color:#333;
        }
        span.active{
            color:$theme-color;
        }
        >div{
            position: absolute;
            z-index: 1;
            bottom:0;
            height: 5px;
            width:100px;
            background: $theme-color;
            transition: all .5s ease;
        }
        >div.activeLine1{
            transform: translateX( calc( ( 100vw / 4 - 100px) / 2 ) );
        }
        >div.activeLine2{
            transform: translateX( calc( ( 100vw / 4 - 100px) / 2 + 100vw / 4) );
        }
        >div.activeLine3{
            transform: translateX( calc( ( 100vw / 4 - 100px) / 2 + (100vw / 4) * 2) );
        }
        >div.activeLine4{
            transform: translateX( calc( ( 100vw / 4 - 100px) / 2 + (100vw / 4) * 3) );
        }
    }
    .list{
        height: calc(100% - 68px);
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        .pad16{
            height: 16px;
        }
        .jixi-list{
            display: block;
            height: 80px;
            line-height: 80px;
            background: $bg-color;
            margin-bottom:16px;
            text-decoration: none;
            text-align: left;
            padding-left:10px;
            color:#333;
            font-size: 30px;
            span{
                display: inline-block;
                margin-right:10px;
            }
            span:last-child{
                font-size: 30px;
            }
        }
        .jixi-listi:last-child{
            margin-bottom:0
        }
    }
}
</style>

