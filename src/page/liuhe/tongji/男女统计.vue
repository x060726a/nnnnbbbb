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
            text:['男','女'],
            numArr:[],
            nnArr:{
                '男':[1,3,5,7,9,10,11,13,15,17,19,21,22,23,25,27,29,31,33,34,35,37,39,41,43,45,46,47,49],
                '女':[2,4,6,8,12,14,16,18,20,24,26,28,30,32,36,38,40,42,44,48],
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
                if(this.nnArr['男'].indexOf(ele.tm*1)>-1){
                    a++
                }
                if(this.nnArr['女'].indexOf(ele.tm*1)>-1){
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
