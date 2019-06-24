<template>
<div class="context">
    <scroller 
        v-if="list.length!=0"
        height="100%"
        lock-x
        scrollbar-y
        :use-pullup='isUsePullUp'
        :pullup-config="pullUpObj"
        @on-pullup-loading='getMycollection'
        ref="my_scroller">
        <div class="scroll">
            <swipeout class="myout">
                <swipeout-item v-for="(item,index) in list" ref="swipeoutItem" :key="index">
                    <div slot="right-menu" class="right-btn">
                        <div @click="onButtonClick('cancel',item,index)"><span>取消</span></div>
                        <div @click="onButtonClick('delete',item,index)"><span>删除</span></div>
                    </div>
                    <div slot="content" class="vux-1px-t"><TEXTLIST :text="item" :index="index" :type="item.tie_type" :isShowthat="true"/></div>
                </swipeout-item>
            </swipeout>
            <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
        </div>
    </scroller>
    <div class="spinner" v-if="isHttpSending&&!isNotData"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
    <DATANONE v-if="isNotData"/>
</div>
</template>
<script>
const DATANONE = import('@/components/没有数据')
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/帖子列表'],()=>{
        resolve(require('@/components/帖子列表'))
    })
});
import { Scroller,Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { mapGetters } from 'Vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            list:[],
            offset:0,
            isHttpSending:false,
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
    // activated(){
    //     this.offset = 0;
    //     try {
    //         if(this.$store.state.lastRouterStatus.title.name=='个人中心'){
    //             this.list = []
    //             this.getMycollection();
    //         }
    //     }catch(data){
    //         this.list = []
    //         this.getMycollection();
    //     }
    // },
    created(){
        this.offset = 0;
        this.list = []
        this.getMycollection();
        // try {
        //     if(this.$store.state.lastRouterStatus.title.name=='个人中心'){
        //         this.list = []
        //         this.getMycollection();
        //     }
        // }catch(data){
        //     this.list = []
        //     this.getMycollection();
        // }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getMycollection(){
            let that = this;
            if(that.offset==0){
                that.isHttpSending = true
            }
            var postData = this.$qs.stringify({
                offset:that.offset
            })
            that.$http.post('/v1/user/colls',postData).then(res=>{
                if(res.code==0){
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
        onButtonClick(str,item,index){
            var that = this
            if(str=='cancel'){
                this.$refs.swipeoutItem[index].close()
            }else{
                var postData = that.$qs.stringify({
                    id:item.id,
                    tie_type:item.tie_type
                })
                that.$vux.loading.show({
                    text:'删除中'
                })
                that.$http.post('/v1/user/colls-del',postData).then(res=>{
                    if(res.code==0){
                        that.list.splice(index,1)
                        that.$vux.loading.hide()
                        that.$vux.toast.text('删除成功','middle')
                        that.$refs.swipeoutItem[index].close()
                        that.offset = res.data.offset
                        if(res.data.rows<20){
                            that.isUsePullUp = false
                        }
                        if(res.data.rows==0){
                            that.isNoMoreData = true
                        }else{
                            that.isNoMoreData = false
                        }
                    }
                })
            }
        }
    },
    components:{
        Scroller,Swipeout,SwipeoutItem,SwipeoutButton,
        'TEXTLIST'(){
            return {
                component:TEXTLIST,
            }
        },
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
.context{
    height: 100%;
    background: #f2f2f2;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .res-list{
        min-height: calc(100vh - #{$top-height});
        li{
            position: relative;
            min-height: 127px;
            .spinner-wrap{
                width: 40px;
                height: 40px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top:-20px;
                margin-left:-20px;
            }
        }
    }
}
// .myout{
//     height: 120px;
//     line-height: 120px;
// }
.right-btn{
    height: 100%;
    background: #fff;
    font-size: 28px;
    font-size: 0;
    color:#fff;
    >div:first-child{
        background: #c8c7cd;
    }
    >div:last-child{
        background: #E64340;
    }
    >div{
        display: inline-block;
        height: 100%;
        width: 160px;
        position: relative;
        >span{
            display: block;
            width: 100px;
            height: 35px;
            line-height: 35px;
            font-size: 26px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left:-50px;
            margin-top:-17.5px;
        }
    }
}
</style>
