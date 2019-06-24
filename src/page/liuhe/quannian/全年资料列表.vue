<template>
<div class="content">
    <router-link :to="'/zlcont/'+ele.id" v-for="(ele,idx) in list" :key="idx">【{{ele.year}}】{{ele.title}}</router-link>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.getAll();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getAll(){
            var that = this;
            that.$http.post('/v1/liuyou/annual-lists').then(res=>{
                var arr = [];
                if(res.code==0){
                    that.list = res.data.records;
                    localStorage.setItem('allYear',JSON.stringify(res.data.records))
                    res.data.records.forEach(ele => {
                        arr.push(ele.title)
                        localStorage.setItem('allYearTitle',JSON.stringify(arr))
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    background: $app-bg-color;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    a{
        display: block;
        height: 80px;
        line-height: 80px;
        background: $bg-color;
        margin-bottom:16px;
        text-decoration: none;
        text-align: left;
        padding-left:10px;
        color:$text-color;
        color:#333;
        font-size: 30px;
    }
}
</style>
