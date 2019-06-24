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
            numArr:[]
        }
    },
    created(){
        this.totalAll();
    },
    methods:{
        totalAll(){
            var bose = JSON.parse(localStorage.getItem('liuhe')).ballcolor
            var a=0,b=0,c=0;
            this.res.forEach(ele=>{
                if(bose['红'].indexOf(ele.tm)>-1){
                    a++
                }
                if(bose['蓝'].indexOf(ele.tm)>-1){
                    b++
                }
                if(bose['绿'].indexOf(ele.tm)>-1){
                    c++
                }
            })
            this.numArr[0] = a
            this.numArr[1] = b
            this.numArr[2] = c
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
