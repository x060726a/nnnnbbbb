<template>
    <YUANXING v-if="numArr.length>0" :color="color" :text="text" :numArr="numArr"/>
</template>
<script>
const YUANXING = import('@/components/统计圆环')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            jxArr:{
                '吉':[2,4,5,6,7,8,14,16,17,18,19,20,26,28,29,30,31,32,38,40,41,42,43,44],
                '凶':[1,3,9,10,11,12,13,15,21,22,23,24,25,27,33,34,35,36,37,39,45,46,47,48,49],
            },
            color:['#f94e6e','#138be7'],
            text:['吉','凶'],
            numArr:[]
        }
    },
    created(){
        this.totalAll();
    },
    methods:{
        totalAll(){
            var a=0,b=0;
            this.res.forEach(ele=>{
                if(this.jxArr['吉'].indexOf(ele.tm)>-1){
                    a++
                }
                if(this.jxArr['凶'].indexOf(ele.tm)>-1){
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