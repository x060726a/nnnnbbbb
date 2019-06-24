<template>
<div class="content">
    <router-link :to="'/gscont/'+ele.formula_id" v-for="(ele,idx) in list" :key="idx"><span>{{ele.name}}</span><span>【准{{(ele.probably*100).toFixed(2)}}%】</span></router-link>
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
        this.getFormulas();
        // this.$indicator.open({
        //     text: '加载中...',
        //     spinnerType: 'snake'
        // });
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        getFormulas(){
            var that = this;
            that.$http.get('/v1/liuyou/formulas').then(res=>{
                if(res.code==0){
                    that.list = res.data.records
                    that.list.sort((a,b)=>{
                        return b.probably - a.probably
                    })
                    localStorage.setItem('lh_formulas',JSON.stringify(res.data.records))
                }
                // this.$indicator.close();
            })
        }
    }
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
        span:last-child{
            font-size: 30px;
        }
    }
    a:last-child{
        margin-bottom:0
    }
}
</style>
