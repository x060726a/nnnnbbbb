<template>
    <ZHUZI :num="49" :numArr="numArr" :titleArr="titleArr" :maxIndex="max" :tmIndex="res[0].tm-1"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            numArr:[],
            titleArr:[],
            max:0
        }
    },
    created(){
        this.totalAll();
    },
    methods:{
        totalAll(){
            for(var i=0;i<49;i++){
                this.numArr.push(0)
                this.titleArr.push(i+1)
            }
            this.res.forEach(ele => {
                var index = this.numArr[ele.tm-1]
                index++
                this.numArr[ele.tm-1] = index
            });
            var newArr = [].concat(this.numArr)
            newArr.sort((a,b)=>{
                return b-a
            })
            if(newArr[0]<10){
                this.max = 1
            }else{
                if(newArr[0] % 10 !=0){
                    this.max = newArr[0].toString().substring(0,1)*1 + 1
                }else{
                    this.max = newArr[0].toString().substring(0,1)*1
                }
            }
        }
    },
    components:{
        ZHUZI(){
            return {
                component:ZHUZI,
            }
        }
    }
}
</script>
