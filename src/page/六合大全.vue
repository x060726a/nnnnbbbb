<template>
<div class="liuhe-router">
    <div class="open-wrap">
        <OPENRES :HistoryNum="HistoryNum&&HistoryNum[0]" :isshow="true"></OPENRES>
    </div>
    <div class="liuhe-cont">
        <div class="liuhe-title"><i class="iconfont icon-qr_code_light"></i>热门工具</div>
        <div class="jgg-wrap">
            <JGGList></JGGList>
        </div>
    </div>
</div>
</template>
<script>
const OPENRES = new Promise(resolve=>{
    require.ensure(['@/components/开奖结果'],()=>{
        resolve(require('@/components/开奖结果'))
    })
});
import { mapGetters } from 'Vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            HistoryNum:null,
            index:0,
            show:true,
            offset:0,
            tjList:'',
        }
    },
    created(){
        this.getHistoryNum();
        var tjsjc = localStorage.getItem('tjsjc')
        if(!tjsjc){
            this.gettuijain();
        }else{
            var d = new Date()*1
            if(d - tjsjc*1>=60000){
                this.gettuijain();
            }else{
                this.tjList = JSON.parse(localStorage.getItem('tjList'))
                console.log(this.tjList)
            }
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    components:{
        'JGGList':function(){
            return{
                component:import('@/components/九宫格'),
            }
        },
        OPENRES(){
            return {
                component:OPENRES,
            }
        }
    },
    methods:{
        sidebarHandle(){
            this.$store.commit('sidebarHandle');
        },
        onClick(index,title){
            this.index = index;
        },
        getHistoryNum(){
            var that = this;
            var year = new Date().getFullYear();
            var postData = that.$qs.stringify({
                year:year
            })
            that.$http.post('/v1/liuyou/kj-records',postData).then(res=>{
                if(res.code==0){
                    that.$store.commit('HistoryNum',res.data.records);
                    that.HistoryNum = res.data.records;
                    localStorage.setItem('HistoryOpen',JSON.stringify(that.HistoryNum))
                }else{
                    console.log('未获取到历史开奖数据')
                }
            })
        },
        //获取推荐阅读
        gettuijain(){
            var that = this;
            that.$http.get('/v1/home/recommend-ties').then(res=>{
                 
                if(res.code==0){
                    that.tjList = res.data.records
                    localStorage.setItem('tjsjc',new Date()*1)
                    localStorage.setItem('tjList',JSON.stringify(that.tjList))
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.liuhe-router{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    text-align: center;
}
.open-wrap{
    height: 228px;
    position: relative;
    background: #fff;
    .stylespinner{
        position: absolute;
        top:50%;
        left: 50%;
        margin-top:-30px;
        margin-left:-30px;
    }
    .triple-bounce{
        padding-top:100px;
        height: 69px;
        display: block;
    }
}
.liuhe-cont{
    margin-top:16px;
    margin-bottom: 16px;
    background: #fff;
    .liuhe-title{
        vertical-align: middle;
        padding:16px;
        text-align: left;
        font-size: 30px;
        border-bottom:$border-color 1px solid;
        line-height: 50px;
        i{
            display: inline-block;
            width: 50px;
            height: 50px;
            vertical-align: middle;
            margin-top:-4px;
            margin-right:5px;
            font-size: 36px;
            color:$theme-color;
        }
    }
    .jgg-wrap{
        min-height: 674px;
        position: relative;
    }
}
.JGGwrap{
    position: relative;
    .van-loading{
        position: absolute;
        top: 35vh;
        left: 50%;
        margin-top:-15px;
        margin-left:-15px;
    }
}
</style>
