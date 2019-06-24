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
            text:['单笔','双笔'],
            numArr:[],
            bhArr:{
                '单笔':[2,5,6,7,11,12,14,17,18,19,23,24,26,29,30,31,35,36,38,41,42,43,47,48],
                '双笔':[1,3,4,8,9,10,13,15,16,20,21,22,25,27,28,32,33,34,37,39,40,44,45,46,49],
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
                if(this.bhArr['单笔'].indexOf(ele.tm*1)>-1){
                    a++
                }
                if(this.bhArr['双笔'].indexOf(ele.tm*1)>-1){
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
