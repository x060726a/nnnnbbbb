<template>
<div class="content">
    <scroller 
        v-if="list.length!=0"
        height="100%"
        lock-x
        scrollbar-y
        :use-pullup='isUsePullUp'
        :pullup-config="pullUpObj"
        @on-pullup-loading='userRecommend'
        ref="my_scroller">
        <div class="scroll">
            <div class="list-user1" v-for="(ele,idx) in list"><USERLIST :text="ele" :isshow="true"/></div>
            <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
        </div>
    </scroller>
    <div class="spinner" v-if="isHttpSending&&!isNotData"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
    <DATANONE v-if="isNotData"/>
</div>
</template>
<script>
const USERLIST = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/用户列表'))
    })
});
import { Scroller } from 'vux' 
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
    created(){
        this.userRecommend();
    },
    methods:{
        userRecommend(){
            var that = this;
            var step = {}
            if(this.$store.state.user==''){
                step = {
                    params:{
                        offset:that.offset,
                        uid:0
                    }
                }
            }else{
                step = {
                    params:{
                        offset:that.offset,
                        uid:this.$store.state.user.id
                    }
                }
            }
            that.$http.get('/v1/home/subscriptions',step).then(res=>{
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
    },
    components:{
        Scroller,
        USERLIST(){
            return{
                component:USERLIST,
            }
        }
    },
    // destroyed(){
    //     this.$store.commit('headerActive',1);
    //     this.$store.commit('headerActive',0);
    // }
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
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    background: #fff;
    .list{
        background: #fff;
    }
}
.list-user1 {
    padding-top:30px;
    padding-left:20px;
    padding-right:20px;
}
</style>
