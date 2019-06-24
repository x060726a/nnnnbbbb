<template>
    <YUANXING v-if="numArr.length>0" :color="color" :text="text" :numArr="numArr"/>
</template>
<script>
const YUANXING = import('@/components/统计圆环')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            color:['#f94e6e','#138be7','#2ec531'],
            text:['红','蓝','绿'],
            numArr:[],
            sxArr:{
                '红':[2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47],
                '蓝':[3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48],
                '绿':[1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49]
            },
        }
    },
    created(){
        this.totalAll();
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0;
            this.res.forEach(ele=>{
                if(this.sxArr['红'].indexOf(ele.tm*1)>-1){
                    a++
                }
                if(this.sxArr['蓝'].indexOf(ele.tm*1)>-1){
                    b++
                }
                if(this.sxArr['绿'].indexOf(ele.tm*1)>-1){
                    c++
                }
                this.numArr[0] = a
                this.numArr[1] = b
                this.numArr[2] = c
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
