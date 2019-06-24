<template>
<div class="content-tj" ref="content">
    <div class="title">
        <div class="block">{{componentName[$route.params.id]}}</div>
    </div>
    <div class="ball-panel-wrap">
        <component :is="currentComponent"></component>
    </div>
    <div class="banner"><img :src="'/static/images/banner/banner_v1.01.png'"></div>
    <div class="next-last">
        <div @click="last()">上一篇：{{this.lastText}}</div>
        <div @click="next()">下一篇：{{this.nextText}}</div>
    </div>
    <div class="tjgz-list" v-if="recommend">
        <div class="title">推荐阅读</div>
        <ul>
            <li v-for="ele in recommend" @click="$router.push({path:'/detailcont/'+ele.id,query:{type:1}})">{{ele.title}}</li>
        </ul>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            recommend:[],
            componentName:{
                tmtj:'特码统计',
                bstj:'色波统计',
                sxtj:'生肖统计',
                wxtj:'五行统计',
                tstj:'头数统计',
                wstj:'尾数统计',
                hstj:'合数统计',
                dxtj:'大小统计',
                dstj:'单双统计',
                wmtj:'五门统计',
                qdtj:'七段统计',
                jytj:'家野统计',
                yytj:'阴阳统计',
                tdtj:'天地统计',
                jxtj:'吉凶统计',
                hbtj:'黑白统计',
                sextj:'色肖统计',
                bhtj:'笔画统计',
                nntj:'男女统计',
            },
            textArr:['特码统计','色波统计','生肖统计','五行统计','头数统计','尾数统计','合数统计','大小统计','单双统计','五门统计','七段统计','家野统计','阴阳统计','天地统计','吉凶统计','黑白统计','色肖统计','笔画统计','男女统计'],
            lastText:'',
            nextText:''
        }
    },
    watch:{
        '$route'(){
            if(this.$route.name=='六合统计'){
                this.navCtroInit();
                // this.getWenZhang();
            }
        }
    },
    created(){
        this.navCtroInit();
        // this.getWenZhang();
        this.recommend = JSON.parse(localStorage.getItem('tjList'))
    },
    computed:{
        ...mapGetters(['isApp']),
        currentComponent(){
            return this.$route.params.id;
        }
    },
    methods:{
        async navCtroInit(){
            this.$nextTick(()=>{
                if(!this.$refs.content) return
                this.$refs.content.scrollTop = 0
            })
            var name = this.componentName[this.$route.params.id]
            var curIndex = this.textArr.indexOf(name);
            
            if(curIndex==0){
                this.lastText = '没有更多了'
            }else{
                this.lastText = this.textArr[curIndex-1]
            }

            if(curIndex==this.textArr.length-1){
                this.nextText = '没有更多了'   
            }else{
                this.nextText = this.textArr[curIndex+1] 
            }
        },
        next(){
            var id;
            if(this.nextText=='没有更多了') return;
            for(var key in this.componentName){
                if(this.componentName[key]==this.nextText){
                    id = key
                }
            }
            this.$router.push({path:'/tjcont/'+id})
            this.navCtroInit();
        },
        last(){
            var id;
            if(this.lastText=='没有更多了') return;
            for(var key in this.componentName){
                if(this.componentName[key]==this.lastText){
                    id = key
                }
            }
            this.$router.push({path:'/tjcont/'+id})
            this.navCtroInit();
        },
        getWenZhang(){
            var that = this;
            var postData = that.$qs.stringify({
                offset:0,
                limit:4
            })
            that.$http.post('/v1/home/ties',postData).then(res=>{
                if(res.code==0){
                    that.recommend = res.data.records
                }
            })
        }
    },
    components:{
        tmtj(){
            return {
                component:import('@/page/liuhe/tongji/特码统计'),
            }
        },
        sxtj(){
            return {
                component:import('@/page/liuhe/tongji/生肖统计'),
            }
        },
        bstj(){
            return {
                component:import('@/page/liuhe/tongji/色波统计'),
            }
        },
        wxtj(){
            return {
                component:import('@/page/liuhe/tongji/五行统计'),
            }
        },
        tstj(){
            return {
                component:import('@/page/liuhe/tongji/头数统计'),
            }
        },
        wstj(){
            return {
                component:import('@/page/liuhe/tongji/尾数统计'),
            }
        },
        hstj(){
            return {
                component:import('@/page/liuhe/tongji/合数统计'),
            }
        },
        dxtj(){
            return {
                component:import('@/page/liuhe/tongji/大小统计'),
            }
        },
        dstj(){
            return {
                component:import('@/page/liuhe/tongji/单双统计'),
            }
        },
        wmtj(){
            return {
                component:import('@/page/liuhe/tongji/五门统计'),
            }
        },
        qdtj(){
            return {
                component:import('@/page/liuhe/tongji/七段统计'),
            }
        },
        jytj(){
            return {
                component:import('@/page/liuhe/tongji/家野统计'),
            }
        },
        yytj(){
            return {
                component:import('@/page/liuhe/tongji/阴阳统计'),
            }
        },
        tdtj(){
            return {
                component:import('@/page/liuhe/tongji/天地统计'),
            }
        },
        jxtj(){
            return {
                component:import('@/page/liuhe/tongji/吉凶统计'),
            }
        },
        hbtj(){
            return {
                component:import('@/page/liuhe/tongji/黑白统计'),
            }
        },
        sextj(){
            return {
                component:import('@/page/liuhe/tongji/色肖统计'),
            }
        },
        bhtj(){
            return {
                component:import('@/page/liuhe/tongji/笔画统计'),
            }
        },
        nntj(){
            return {
                component:import('@/page/liuhe/tongji/男女统计'),
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content-tj{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}
.title{
    background: $bg-color;
    font-size: 34px;
    padding-top:30px;
    .block{
        border-bottom:$border-color 1px solid;
        padding-bottom:30px;
        margin-left:16px;
        margin-right:16px;
    }
}
.banner{
    height: 160px;
    background: #fff;
    img{
        width:100%;
    }
}
.next-last{
    padding-top:30px;
    padding-bottom:30px;
    background: $bg-color;
    margin-bottom:16px;
    >div{
        padding-left:16px;
        font-size: 30px;
        text-align: left;
    }
    >div:first-child{
        padding-bottom:30px;
    }
}
.ball-panel-wrap{
    min-height: 600px;
    position: relative;
    background: #fff;
}
.tjgz-list{
    background: #fff;
    padding-left:16px;
    padding-right:16px;
    .title{
        height: 68px;
        line-height: 68px;
        padding-top:0;
        text-align: left;
        color:#666;
        font-size: 30px;
        border-bottom:$border-color 1px solid;
    }
    ul{
        li{
            // padding-top:25px;
            padding-bottom:25px;
            font-size: 28px;
            color:#333;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        li:first-child{
            padding-top:25px;
        }
    }
}
</style>
