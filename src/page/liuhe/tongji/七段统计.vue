<template>
    <ZHUZI :num="7" :numArr="numArr" :titleArr="titleArr" :maxIndex="max" :tmIndex="tmIndex"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            numArr:[],
            titleArr:['一','二','三','四','五','六','七'],
            qdArr:{
                '一':[1,2,3,4,5,6,7],
                '二':[8,9,10,11,12,13,14],
                '三':[15,16,17,18,19,20,21],
                '四':[22,23,24,25,26,27,28],
                '五':[29,30,31,32,33,34,35],
                '六':[36,37,38,39,40,41,42],
                '七':[43,44,45,46,47,48,49]
            },
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        var index = 0
        for(var key in this.qdArr){
            index++
            if(this.qdArr[key].indexOf(this.res[0].tm)>-1){
                this.tmIndex = index-1
            }
        }
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0,d=0,e=0,f=0,g=0;

            this.res.forEach(ele => {
                if(this.qdArr['一'].indexOf(ele.tm)>-1){
                    a++
                }
                if(this.qdArr['二'].indexOf(ele.tm)>-1){
                    b++
                }
                if(this.qdArr['三'].indexOf(ele.tm)>-1){
                    c++
                }
                if(this.qdArr['四'].indexOf(ele.tm)>-1){
                    d++
                }
                if(this.qdArr['五'].indexOf(ele.tm)>-1){
                    e++
                }
                if(this.qdArr['六'].indexOf(ele.tm)>-1){
                    f++
                }
                if(this.qdArr['七'].indexOf(ele.tm)>-1){
                    g++
                }
            });
            this.numArr[0] = a
            this.numArr[1] = b
            this.numArr[2] = c
            this.numArr[3] = d
            this.numArr[4] = e
            this.numArr[5] = f
            this.numArr[6] = g
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
