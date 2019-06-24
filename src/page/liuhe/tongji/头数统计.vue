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
            text:['0','1','2','3','4'],
            numArr:[],
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        if(this.res[0].tm<10){
            this.tmIndex = 0
        }else{
            this.tmIndex = this.res[0].tm.toString().substring(0,1)
        }
    },
    methods:{
        totalAll(){
            var bose = JSON.parse(localStorage.getItem('liuhe')).ballcolor
            var a=0,b=0,c=0,d=0,e=0;
            this.res.forEach(ele=>{
                if(ele.tm<=9){
                    a++
                }
                if(ele.tm>9&&ele.tm<=19){
                    b++
                }
                if(ele.tm>19&&ele.tm<=29){
                    c++
                }
                if(ele.tm>29&&ele.tm<=39){
                    d++
                }
                if(ele.tm>39&&ele.tm<=49){
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
