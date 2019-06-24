<template>
<div class="content">
    <div class="tab">
        <span @click="active=1" :class="{active:active==1}">公众号</span>
        <span @click="active=2" :class="{active:active==2}">高手</span>
        <div :class="{activeLine1:active==1,activeLine2:active==2}"></div>
    </div>
    <div class="res-content">
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='getMyNote'
            ref="my_scroller">
            <div class="scroll">
                <div class="pad16"></div>
                <div class="user-list" v-for="(item,index) in list">
                    <TEXTLIST v-if="active==1" :text="item" @delete="deleteSomeOne" :idx="index" :isMyNote="true" :isshow="true"/>
                    <TEXTLIST v-if="active==2" :text="item" @delete="deleteSomeOne" :idx="index" :isMyNote="true" :isUser="true" :isshow="true"/>
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
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/用户列表'));
    })
});
import {mapGetters,mapActions} from 'Vuex'
import { Scroller } from 'vux' 
const DATANONE = import('@/components/没有数据')
export default {
    data(){
        return {
            list:[],
            offset:0,
            active:1,
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
        active(val,oval){
            this.list = []
            this.offset = 0
            this.isHttpSending = true
            this.isNotData = false
            this.getMyNote();
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    created(){
        this.getMyNote();
    },
    methods:{
        //获取我的关注
        getMyNote(){
            var that = this;
            var postData = this.$qs.stringify({
                offset:that.offset,
                category:that.active
            })
            that.$http.post('/v1/user/follows-records',postData).then(res=>{
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
        deleteSomeOne(idx){
            this.list.splice(idx,1)
        }
    },
    components:{
        Scroller,
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
.pad16{
    height: 16px;
    background: #f2f2f2;
}
.content{
    height: 100%;
    position: relative;
    .scroll{
        background: #fff;
    }
    .res-content{
        height: calc(100% - 68px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .tab{
        height: 68x;
        line-height: 68px;
        background: #fff;
        display: flex;
        color:#333;
        font-size: 34px;
        position: relative;
        span{
            flex: 1;
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
            transform: translateX(calc((50vw - 100px) / 2));
        }
        >div.activeLine2{
            transform: translateX(calc(50vw + (50vw - 100px) / 2));
        }
    }
    .user-list{
        padding:30px 20px 0 20px;
    }
}
</style>
