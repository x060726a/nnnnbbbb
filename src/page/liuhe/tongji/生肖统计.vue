<template>
    <ZHUZI :num="12" :numArr="numArr" :titleArr="titleArr" :maxIndex="max" :tmIndex="tmIndex"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            sxArr:JSON.parse(localStorage.getItem('liuhe')).ballpanel,
            numArr:[],
            titleArr:[],
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        var index = 0
        for(var key in this.sxArr){
            index++
            if(this.sxArr[key].indexOf(this.res[0].tm)>-1){
                this.tmIndex = index - 1
            }
        }
    },
    methods:{
        totalAll(){
            for(var key in this.sxArr){
                this.titleArr.push(key)
                this.numArr.push(0);
            }
            this.res.forEach((ele,idx)=>{
                var sx = ele.sx.split(',')[ele.sx.split(',').length-1];
                var index = this.numArr[this.titleArr.indexOf(sx)]
                index++
                this.numArr[this.titleArr.indexOf(sx)] = index
            })
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
