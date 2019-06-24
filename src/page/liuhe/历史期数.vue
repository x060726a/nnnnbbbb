<template>
<div class="content">
    <!--<span class="getYear" v-if="text" @click="showPlugin">年份筛选</span>-->
    <!--<span class="getYear" v-else @click="showPlugin">{{year}}</span>-->
    <scroller
        v-if="list.length!=0"
        height="100%"
        lock-x
        scrollbar-y
        :use-pullup='isUsePullUp'
        :pullup-config="pullUpObj"
        @on-pulldown-loading="getHistoryNum(false)"
        @on-pullup-loading='getHistoryNum(true)'
        ref="my_scroller">
        <div class="scroll">
            <div v-for="(ele,idx) in list"   class="his-item">
                <OPENRES :HistoryNum="ele" :isshow="false"/>
            </div>
            <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
        </div>
    </scroller>
    <div class="spinner" v-if="isHttpSending&&!isNotData"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
    <DATANONE v-if="isNotData"/>

</div>
</template>
<script>
const OPENRES = new Promise(resolve=>{
    require.ensure(['@/components/开奖结果'],()=>{
        setTimeout(()=>{
            resolve(require('@/components/开奖结果'))
        },500)
    })
})
import {mapState} from 'vuex'
import { mapGetters } from 'Vuex'
import { Scroller, Datetime } from 'vux'
export default {
    data(){
        return {
            offset:0,
            list:[],
            year: 0,
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
        this.getHistoryNum(false);
    },
    computed:{
        ...mapGetters(['isApp']),
        ...mapState(['selectYear'])
    },
    methods:{
        getHistoryNum(bool){
            this.$vux.loading.show()
            var postData = this.$qs.stringify({
                offset: bool ? this.offset : 0,
                year: this.year || new Date().getFullYear()
            })
            this.$http.post('/v1/liuyou/kj-records',postData).then(res=>{
                this.$vux.loading.hide()
                if (res.code != 0) return false
                let arr = []
                if (bool) { // 上拉加载
                    this.list = this.list.concat(res.data.records)
                    if (res.data.records.length < 20) this.isNoMoreData = true, this.$refs.my_scroller.disablePullup() // 暂无更多数据
                    this.$nextTick(()=> this.$refs.my_scroller.donePullup())
                } else {
                    this.list = res.data.records
                }
                console.log(this.list)
                this.offset = res.data.offset, this.isHttpSending = false
                this.$nextTick(() => setTimeout(() => { this.$refs.my_scroller.reset() }))
                this.list.forEach(ele=>{
                    arr.push(ele.title)
                })
                localStorage.setItem('parseListTitle',JSON.stringify(arr))
                localStorage.setItem('parseList',JSON.stringify(this.list))
                // this.$nextTick(() => setTimeout(() => { this.$refs.scroller.reset() }))
                // if(res.code==0){
                //     var arr = [];
                //     if(that.offset!=0){
                //         that.$refs.my_scroller.donePullup();
                //     }
                //     if(that.offset==0&&res.data.records.length==0){
                //         //根本没有数据
                //         that.isNotData = true
                //     }
                //     if(that.offset!=0&&res.data.records.length==0){
                //         //已经全部加载完数据
                //         that.$refs.my_scroller.disablePullup()
                //         that.isNoMoreData = true;
                //     }
                //     if(res.data.records.length<20){
                //         //是否开启上拉加载更多
                //         that.isUsePullUp = false
                //     }
                //     if(res.data.records.length!=0){
                //         if (val) {
                //             this.list = res.data.records
                //             val = null
                //         } else {
                //             var newArr = that.list.concat(res.data.records)
                //             that.list = newArr;
                //         }
                //     }
                //     that.offset = res.data.offset;
                //     that.list.forEach(ele=>{
                //         arr.push(ele.title)
                //     })
                //     localStorage.setItem('parseListTitle',JSON.stringify(arr))
                //     localStorage.setItem('parseList',JSON.stringify(that.list))
                // }
                // that.isHttpSending = false
            })
        },
        showPlugin () {
            let _this = this
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY',
                minYear: 1995,
                maxYear: new Date().getFullYear(),
                value: _this.year,
                onConfirm (val) {
                    _this.$store.commit('yearNum', val)
                    _this.year = val, _this.getHistoryNum(false)
                }
            })
        }
    },
    watch: {
        selectYear(val) {
            this.showPlugin()
        }
    },
    components:{
        Scroller,
        Datetime,
        OPENRES(){
            return {
                component:OPENRES,
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
    position: relative;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    .pad16{
        height: 16px;
    }
}
.his-item{
    margin-bottom:16px;
    min-height: 119px;
    position: relative;
}
/*.getYear {*/
    /*position: fixed;*/
    /*top: 0; right: 20px; z-index: 99; color: white; font-size: 30px; line-height: 88px;*/
/*}*/
</style>
