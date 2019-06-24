<template>
<div>
    <div class="title">
        <span>历史搜索</span>
        <span @click="deleteHistorySearch" v-if="!deleteBtn"><i class="iconfont icon-delete"></i></span>
        <span @click="deleteHistorySearch" v-if="deleteBtn">完成</span>
    </div>
    <div class="history-data">
        <div v-for="(ele,idx) in searchHistory" v-if="idx<4">
            <span @click="searchSomeOne(ele)">{{ele}}</span>
            <i class="iconfont icon-close1" v-show="deleteBtn" @click="deleteSomeOne(ele)"></i>
        </div>
    </div>
    <div class="pad20"></div>
</div>
</template>
<script>
export default {
    data(){
        return{
            deleteBtn:false,
        }
    },
    props:['searchHistory'],
    methods:{
        //点击删除按钮
        deleteHistorySearch(){
            this.deleteBtn = !this.deleteBtn;
        },
        deleteSomeOne(text){
            var index = this.searchHistory.indexOf(text)
            this.searchHistory.splice(index,1)
            if(this.searchHistory.length==0){
                this.$store.commit('searchData',{searchHistory:[]})
            }
            localStorage.setItem('searchHistorys',JSON.stringify(this.searchHistory))
        },
        searchSomeOne(text){
            this.$store.commit('searchTextStr',text);
            this.$emit('searchStep')
        },
    }
}
</script>
<style lang="scss" scoped>
.pad20{
    height: 20px;
    background: #f2f2f2;
}
.title{
    line-height: 68px;
    height: 68px;
    font-size: 28px;
    color: #999;
    border-bottom:#e1e1e1 1px solid;
    background: #fff;
    span:first-child{
        float: left;
        margin-left:16px;
    }
    span:last-child{
        float: right;
        margin-right:7px;
        width: 70px;
        text-align: center;
    }
}
.history-data{
    width: 100%;
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
        >span{
            float: left;
            margin-left:16px;
            width:250px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            text-align: left; 
        }
        >i{
            float: right;
            margin-right:26px;
            color:#999;
            font-size: 32px;
        }
    }
    >div:nth-child(2n+1){
        width:calc(50% - 1px);
        border-right:1px #e1e1e1 solid;
    }
}
.margb20{
    margin-bottom:20px;
}
</style>
