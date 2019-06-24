<template>
<div class="content">
    <div class="title">{{res.name}}</div>
    <div class="content-scroll">
        <GSCONT :id="res.formula_id" :name="res.name"/>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="bottom" class="my-pop">
        <div class="pop-title">
            选择公式
            <span @click="popupVisible=false" class="iconfont icon-close1"></span>
        </div>
        <div class="pop-select">
            <mt-picker :slots="slots" :valueKey="'name'" @change="onValuesChange"></mt-picker>
        </div>
        <div class="pop-comfir" @click="select()">确定</div>
    </mt-popup> -->
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            popupVisible:null,
            title:'',
            offset:0,
            slots:[
                {
                    flex:1,
                    values:[]
                }
            ],
            res:'',
            changeObj:''
        }
    },
    created(){
        this.init();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        onValuesChange(picker,values){
            this.changeObj = values
        },
        async select(){
            var that = this;
            that.$router.push({path:'/main/lhformula/cont/'+that.changeObj[0].formula_id})
            this.res = await that.Maththis(that.changeObj[0].formula_id);
            this.popupVisible = false;
        },
        async init(){
            var that = this;
            this.res = await that.Maththis(this.$route.params.id);
        },
        //根据id
        Maththis(id){
            var that = this
            var data = JSON.parse(localStorage.getItem('lh_formulas'));
            var len = 0;
            var arr = [];
            return new Promise(resolve=>{
                while (len<data.length) {
                    if(data[len].formula_id==id){
                        resolve(data[len]);
                    }
                    arr.push(data[len]);
                    that.$set(that.slots[0],'values',arr)
                    len++
                }
            })
        }
    },
    components:{
        GSCONT(){
            return {
                component:import('@/page/liuhe/gongshi/公式通用模板'),
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    position: relative;
    background: #fff;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    margin-bottom:16px;
    .right{
        width: 40px;
        display: block;
        position: absolute;
        z-index: 0;
        top: 0px;
        right: 20px;
        transform: rotate(180deg);
        font-size: 40px;
        color: #333;
    }
}
.content{
    height: 100%;
}
.content-scroll{
    height: calc(100% - 96px);
    background: $bg-color;
}
.my-pop{
    width:100%;
}
.pop-title{
    font-size: 32px;
    line-height: 80px;
    position: relative;
    border-bottom:$border-color 1px solid;
    color: #333;
    span{
        position: absolute;
        top: 20px;
        right:20px;
        width:40px;
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 40px;
        color: $subtitle-color;
    }
}
.pop-comfir{
    height: 80px;
    line-height: 80px;
    background: $theme-color;
    color:#fff;
    font-size: 32px;
}
</style>
