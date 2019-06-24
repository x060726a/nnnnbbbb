<template>
    <ZHUZI :num="9" :numArr="numArr" :titleArr="titleArr" :maxIndex="max" :tmIndex="tmIndex-1"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            numArr:[],
            titleArr:[1,2,3,4,5,6,7,8,9],
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        if(this.res[0].tm<10){
            this.tmIndex = this.res[0].tm
        }else{
            this.tmIndex = this.res[0].tm.toString().substring(1,2)
        }
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0;
            this.res.forEach(ele => {
                if(ele.tm<10){
                    if(ele.tm==1){a++};if(ele.tm==2){b++};if(ele.tm==3){c++};
                    if(ele.tm==4){d++};if(ele.tm==5){e++};if(ele.tm==6){f++};
                    if(ele.tm==7){g++};if(ele.tm==8){h++};if(ele.tm==9){i++};
                }else{
                    var weishu = ele.tm.toString().substring(1,2)
                    if(weishu*1==1){a++};if(weishu*1==2){b++};if(weishu*1==3){c++};
                    if(weishu*1==4){d++};if(weishu*1==5){e++};if(weishu*1==6){f++};
                    if(weishu*1==7){g++};if(weishu*1==8){h++};if(weishu*1==9){i++};
                }
            });
            this.numArr[0] = a
            this.numArr[1] = b
            this.numArr[2] = c
            this.numArr[3] = d
            this.numArr[4] = e
            this.numArr[5] = f
            this.numArr[6] = g
            this.numArr[7] = h
            this.numArr[8] = i
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
