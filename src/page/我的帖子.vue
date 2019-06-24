<template>
<div class="context">
    <scroller 
        v-if="list.length!=0"
        height="100%"
        lock-x
        scrollbar-y
        :use-pullup='isUsePullUp'
        :pullup-config="pullUpObj"
        @on-pullup-loading='getMypost'
        ref="my_scroller">
        <div class="scroll">
            <div class="listItem" v-for="(item,index) in list">
                <TEXTLIST :text="item" :index="index" :type="2" :isShowthat="true"/>
            </div>
            <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
        </div>
    </scroller>
    <div class="spinner" v-if="isHttpSending&&!isNotData"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
    <DATANONE v-if="isNotData"/>
</div>
</template>
<script>
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/帖子列表'],()=>{
        setTimeout(()=>{
            resolve(require('@/components/帖子列表'))
        },500)
    })
});
const DATANONE = import('@/components/没有数据')
import { Scroller } from 'vux'
import { mapGetters } from 'Vuex'
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
    created(){
        this.getMypost();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getMypost(){
            var that = this;
            if(that.offset==0){
                that.isHttpSending = true
            }
            var postData = that.$qs.stringify({
                offset:that.offset,
                status:1
            });
            this.$http.post('/v1/user/ties',postData).then(res=>{
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
            });
        },
    },
    components:{
        Scroller,
        TEXTLIST(){
            return {
                component:TEXTLIST,
            }
        },
        DATANONE(){
            return {
                component:DATANONE,
            }
        }
    },
    destroyed(){
        this.$store.commit('headerActive',1);
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #f2f2f2;
}
.res-list{
    min-height: calc(100vh - #{$top-height});
    li{
        min-height: 127px;
        position: relative;
        .spinner-wrap{
            position: absolute;
            width:80px;
            height: 80px;
            top: 50%;
            left: 50%;
            margin-top:-40px;
            margin-left:-40px;
        }
    }
}
</style>
