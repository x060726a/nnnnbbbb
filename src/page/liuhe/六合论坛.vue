<template>
<div class="content">
    <div class="block" v-for="(ele,key) in newObj" v-if="ele.length>0">
        <div class="title"><i class="iconfont" :class="{'icon-tuijian':obj[key]=='推荐','icon-zuixin':obj[key]=='最新','icon-remen':obj[key]=='热门'}"></i><span>{{obj[key]}}</span></div>
        <div class="bbs-item" v-for="(ele1,idx1) in ele" @click="goHref(ele1.url)">
            <span><img :src="ele1.avatar"></span>
            <span>{{ele1.name}}</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            domain:null,
            obj:{
                hot:'热门',
                newest:'最新',
                recommend:'推荐'
            },
            newObj:{
                hot:[],
                newest:[],
                recommend:[]
            }
        }
    },
    created(){
        this.getbbs();
    },
    methods:{
        getbbs(){
            var that = this;
            that.$http.get('/v1/liuyou/bbs').then(res=>{
                if(res.code==0){
                    that.newObj.hot = res.data.hot
                    that.newObj.newest = res.data.newest
                    that.newObj.recommend = res.data.recommend
                    that.domain = res.data.domain
                }
            })
        },
        goHref(url){
            window.location.href = url
        }
    }
}
</script>
<style lang="scss" scoped>
.bbs-item{
    float: left;
    width: 25%;
    text-decoration: none;
    margin-bottom:15px;
    span{
        img{
            width: 100%;
            height: 100%;
        }
    }
    span:first-child{
        height: 85px;
        width: 85px;
        margin:auto;
        margin-top:15px;
        display: block;
        border-radius: 50%;
    }
    span:last-child{
        font-size: 24px;
        color:$text-table-color;
    }
}
.content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    .block{
        background: $bg-color;
        overflow: hidden;
        margin-bottom:20px;
        .title{
            padding-left:20px;
            line-height: 80px;
            text-align: left;
            border-bottom:1px solid #cecece;
            overflow: hidden;
            i,span{
                display: block;
                float: left;
            }
            i{
                font-size: 50px;
                color:#ec1919;
            }
            span{
                color:#333;
                font-size: 28px;
                margin-left:10px;
            }
        }
    }
}
</style>
