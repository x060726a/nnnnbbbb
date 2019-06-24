<template>
    <YUANXING v-if="numArr.length>0" :color="color" :text="text" :numArr="numArr"/>
</template>
<script>
const YUANXING = import('@/components/统计圆环')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            color:['#f94e6e','#138be7'],
            text:['天','地'],
            numArr:[],
            wxArr:{
                '天':[3,5,7,8,10,12,15,17,19,20,22,24,27,29,31,32,34,36,39,41,43,44,46,48],
                '地':[1,2,4,6,9,11,13,14,16,18,21,23,25,26,28,30,33,35,37,38,40,42,45,47,49],
            },
        }
    },
    created(){
        this.totalAll();
    },
    methods:{
        totalAll(){
            var a=0,b=0;
            this.res.forEach(ele=>{
                if(this.wxArr['天'].indexOf(ele.tm)>-1){
                    a++
                }
                if(this.wxArr['地'].indexOf(ele.tm)>-1){
                    b++
                }
                this.numArr[0] = a
                this.numArr[1] = b
            })
        },
    },
    components:{
        YUANXING(){
            return {
                component:YUANXING,
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
