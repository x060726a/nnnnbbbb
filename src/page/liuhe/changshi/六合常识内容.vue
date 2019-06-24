<template>
<div class="content-cs" ref="content">
    <div class="title">
        <div class="block">{{title[$route.params.id]}}</div>
    </div>
    <div class="ball-panel-wrap">
        <keep-alive>
            <component :is="currentComponent"></component>
        </keep-alive>
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
            title:{
                sesx:'十二生肖',
                color:'色波号码',
                wxhm:'五行号码',
                hsds:'合数单双',
                sxsx:'生肖属性',
                tmdx:'特码大小',
                sxwx:'生肖五行',
                sxwh:'生肖外号',
                fwdl:'方位段落',
                sxdm:'生肖代名',
                sxsssj:'生肖所属时间',
                bgpw:'八卦排位',
                esbxs:'二十八星宿',
                wxxk:'五行相克',
                bxpw:'八仙排位',
                zwds:'紫薇斗数生肖排行',
                qhx:'前后肖',
                tdx:'天地肖',
                zyx:'左右肖',
                dsbx:'单双笔肖',
                dhx:'独合肖',
                yyx:'阴阳肖',
                jyx:'家野肖',
                mcx:'美丑肖',
            },
            textArr:['十二生肖','色波号码','五行号码','合数单双','生肖属性','特码大小','生肖五行','生肖外号','方位段落','生肖代名','生肖所属时间','八卦排位','二十八星宿','五行相克','八仙排位','紫薇斗数生肖排行','前后肖','左右肖','天地肖','单双笔肖','独合肖','阴阳肖','家野肖','美丑肖'],
            recommend:[],
            lastText:'',
            nextText:''
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
            var name = this.title[this.$route.params.id]
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
            for(var key in this.title){
                if(this.title[key]==this.nextText){
                    id = key
                }
            }
            this.$router.push({path:'/cscont/'+id})
            this.navCtroInit();
        },
        last(){
            var id;
            if(this.lastText=='没有更多了') return;
            for(var key in this.title){
                if(this.title[key]==this.lastText){
                    id = key
                }
            }
            this.$router.push({path:'/cscont/'+id})
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
        sesx(){
            return {
                component:import('@/page/liuhe/changshi/十二生肖'),
            }
        },
        color(){
            return {
                component:import('@/page/liuhe/changshi/色波号码'),
            }
        },
        wxhm(){
            return {
                component:import('@/page/liuhe/changshi/五行号码'),
            }
        },
        hsds(){
            return {
                component:import('@/page/liuhe/changshi/合数单双'),
            }
        },
        sxsx(){
            return {
                component:import('@/page/liuhe/changshi/生肖属性'),
            }
        },
        tmdx(){
            return {
                component:import('@/page/liuhe/changshi/特码大小'),
            }
        },
        sxwx(){
            return {
                component:import('@/page/liuhe/changshi/生肖五行'),
            }
        },
        sxwh(){
            return {
                component:import('@/page/liuhe/changshi/生肖外号'),
            }
        },
        fwdl(){
            return {
                component:import('@/page/liuhe/changshi/方位段落'),
            }
        },
        sxdm(){
            return {
                component:import('@/page/liuhe/changshi/生肖代名'),
            }
        },
        sxsssj(){
            return {
                component:import('@/page/liuhe/changshi/生肖所属时间'),
            }
        },
        bgpw(){
            return {
                component:import('@/page/liuhe/changshi/八卦排位'),
            }
        },
        esbxs(){
            return {
                component:import('@/page/liuhe/changshi/二十八星宿'),
            }
        },
        wxxk(){
            return {
                component:import('@/page/liuhe/changshi/五行相克'),
            }
        },
        bxpw(){
            return {
                component:import('@/page/liuhe/changshi/八仙排位'),
            }
        },
        zwds(){
            return {
                component:import('@/page/liuhe/changshi/紫薇斗数生肖排行'),
            }
        },
        qhx(){
            return {
                component:import('@/page/liuhe/changshi/前后肖'),
            }
        },
        zyx(){
            return {
                component:import('@/page/liuhe/changshi/左右肖'),
            }
        },
        tdx(){
            return {
                component:import('@/page/liuhe/changshi/天地肖'),
            }
        },
        dsbx(){
            return {
                component:import('@/page/liuhe/changshi/单双笔肖'),
            }
        },
        dhx(){
            return {
                component:import('@/page/liuhe/changshi/独合肖'),
            }
        },
        yyx(){
            return {
                component:import('@/page/liuhe/changshi/阴阳肖'),
            }
        },
        jyx(){
            return {
                component:import('@/page/liuhe/changshi/家野肖'),
            }
        },
        mcx(){
            return {
                component:import('@/page/liuhe/changshi/美丑肖'),
            }
        }
    }

}
</script>
<style lang="scss" scoped>
.content-cs{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}
.title{
    background: $bg-color;
    font-size: 34px;
    .block{
        border-bottom:$border-color 1px solid;
        height: 68px;
        line-height: 68px;
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
    min-height: 500px;
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
