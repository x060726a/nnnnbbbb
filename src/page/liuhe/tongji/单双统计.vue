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
            text:['单','双'],
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
                if(ele.tm%2==1){
                    a++
                }
                if(ele.tm%2==0){
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