<template>
    <div class="content">
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='gettie'
            ref="my_scroller">
            <div class="scroll">
                <div class="tie-list" v-for="(item,index) in list">
                    <TEXTLIST :text="item" :type="2" :isshow="true"/>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </div>
        </scroller>
        <DATANONE v-if="list.length==0"/>
    </div>
</template>
<script>
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/帖子列表'],()=>{
        resolve(require('@/components/帖子列表'))
    })
});
const DATANONE = import('@/components/没有数据')
import { mapGetters } from 'Vuex'
import { Scroller } from 'vux' 
export default {
    data(){
        return{
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
        this.$store.commit('xqScrollTop',0)
        this.gettie();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        gettie(){
            var that = this;
            that.$http.get('/v1/home/sub-ties',{params:{utype:2,offset:that.offset,uid:that.$route.params.id,tie_type:2}}).then(res=>{
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

}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .tie-list{
        min-height: 160px;
        position: relative;
    }
}
</style>
