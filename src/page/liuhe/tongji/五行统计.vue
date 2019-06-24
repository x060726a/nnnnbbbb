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
            text:['金','木','水','火','土'],
            numArr:[],
            wxArr:{
                '金':[4,5,18,19,26,27,34,35,48,49],
                '木':[1,8,9,16,17,30,31,38,39,46,47],
                '水':[6,7,14,15,22,23,36,37,44,45],
                '火':[2,3,10,11,24,25,32,33,40,41],
                '土':[12,13,20,21,28,29,42,43]
            },
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        var index = 0
        for(var key in this.wxArr){
            index++
            if(this.wxArr[key].indexOf(this.res[0].tm)>-1){
                this.tmIndex = index-1
            }
        }
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0,d=0,e=0;
            this.res.forEach(ele=>{
                if(this.wxArr['金'].indexOf(ele.tm)>-1){
                    a++
                }
                if(this.wxArr['木'].indexOf(ele.tm)>-1){
                    b++
                }
                if(this.wxArr['水'].indexOf(ele.tm)>-1){
                    c++
                }
                if(this.wxArr['火'].indexOf(ele.tm)>-1){
                    d++
                }
                if(this.wxArr['土'].indexOf(ele.tm)>-1){
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
