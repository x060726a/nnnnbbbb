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
            text:['家禽','野兽'],
            numArr:[],
            jyArr:{
                '家禽':[1,2,4,5,10,12,13,14,16,17,22,24,25,26,28,29,34,36,37,38,40,41,46,48,49],
                '野兽':[3,6,7,8,9,11,15,18,19,20,21,23,27,30,31,32,33,35,39,42,43,44,45,47],
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
                if(this.jyArr['家禽'].indexOf(ele.tm*1)>-1){
                    a++
                }
                if(this.jyArr['野兽'].indexOf(ele.tm*1)>-1){
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
