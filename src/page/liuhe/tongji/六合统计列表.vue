<template>
<div class="content">
    <router-link :to="'/tjcont/'+ele.id" v-for="(ele,idx) in list" :key="idx"><span>{{ele.name}}</span></router-link>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            list:[
                {
                    name:'特码统计',
                    id:'tmtj'
                },
                {
                    name:'色波统计',
                    id:'bstj'
                },
                {
                    name:'生肖统计',
                    id:'sxtj'
                },
                {
                    name:'五行统计',
                    id:'wxtj'
                },
                {
                    name:'头数统计',
                    id:'tstj'
                },
                {
                    name:'尾数统计',
                    id:'wstj'
                },
                {
                    name:'合数统计',
                    id:'hstj'
                },
                {
                    name:'大小统计',
                    id:'dxtj'
                },
                {
                    name:'单双统计',
                    id:'dstj'
                },
                {
                    name:'五门统计',
                    id:'wmtj'
                },
                {
                    name:'七段统计',
                    id:'qdtj'
                },
                {
                    name:'家野统计',
                    id:'jytj'
                },
                {
                    name:'阴阳统计',
                    id:'yytj'
                },
                {
                    name:'天地统计',
                    id:'tdtj'
                },
                {
                    name:'吉凶统计',
                    id:'jxtj'
                },
                {
                    name:'黑白统计',
                    id:'hbtj'
                },
                {
                    name:'色肖统计',
                    id:'sextj'
                },
                {
                    name:'笔画统计',
                    id:'bhtj'
                },
                {
                    name:'男女统计',
                    id:'nntj'
                },
            ]
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    },
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    background: $app-bg-color;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    a{
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
    }
}
</style>
