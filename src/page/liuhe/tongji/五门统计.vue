<template>
    <ZHUZI :num="5" :numArr="numArr" :titleArr="text" :maxIndex="max" :tmIndex="tmIndex"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            color:['#f94e6e','#138be7','#2ec531','#ff9800','#c3c322'],
            text:['一','二','三','四','五'],
            numArr:[],
            wmArr:{
                '一门':[1,2,3,4,5,6,7,8,9],
                '二门':[10,11,12,13,14,15,16,17,18],
                '三门':[19,20,21,22,23,24,25,26,27],
                '四门':[28,29,30,31,32,33,34,35,36,37],
                '五门':[38,39,40,41,42,43,44,45,46,47,48,49]
            },
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        var index = 0
        for(var key in this.wmArr){
            index++
            if(this.wmArr[key].indexOf(this.res[0].tm)>-1){
                this.tmIndex = index-1
            }
        }
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0,d=0,e=0;
            this.res.forEach(ele=>{
                if(this.wmArr['一门'].indexOf(ele.tm)>-1){
                    a++
                }
                if(this.wmArr['二门'].indexOf(ele.tm)>-1){
                    b++
                }
                if(this.wmArr['三门'].indexOf(ele.tm)>-1){
                    c++
                }
                if(this.wmArr['四门'].indexOf(ele.tm)>-1){
                    d++
                }
                if(this.wmArr['五门'].indexOf(ele.tm)>-1){
                    e++
                }
            })
            this.numArr[0] = a
            this.numArr[1] = b
            this.numArr[2] = c
            this.numArr[3] = d
            this.numArr[4] = e
            var newArr = [].concat(this.numArr)
            newArr.sort((a,b)=>{
                return b-a
            })
            if(newArr[0]<10){
                this.max = 1
            }else{
                this.max = newArr[0].toString().substring(0,1)*1 + 1
            }
        },
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
