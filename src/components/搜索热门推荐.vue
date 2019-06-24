<template>
<div class="share">
    <div v-for="(ele,idx) in searchShare" @click="$router.push({path:'/detailcont/'+ele.id,query:{type:type}})"><span>{{ele.title}}</span></div>
</div>
</template>
<script>
export default {
    props:['searchShare','type'],
    created(){
        //console.log(this.searchShare);
    }
}
</script>
<style lang="scss" scoped>
.share{
    overflow: hidden;
    background: #fff;
    >div{
        float: left;
        display: block;
        width:50%;
        height: 68px;
        line-height: 68px;
        font-size: 28px;
        color:#333;
        border-bottom:1px #e1e1e1 solid;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap; 
        >span{
            float: left;
            margin-left:16px;
            width:calc(100% - 36px);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap; 
            text-align: left;
        }
    }
    >div:nth-child(2n+1){
        width:calc(50% - 1px);
        border-right:1px #e1e1e1 solid;
    }
}
</style>
