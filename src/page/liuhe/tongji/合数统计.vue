<template>
    <ZHUZI :num="13" :numArr="numArr" :titleArr="titleArr" :maxIndex="max" :tmIndex="tmIndex - 1"/>
</template>
<script>
const ZHUZI = import('@/components/统计柱状')
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            numArr:[],
            titleArr:[1,2,3,4,5,6,7,8,9,10,11,12,13],
            max:0,
            tmIndex:0
        }
    },
    created(){
        this.totalAll();
        if(this.res[0].tm<10){
            this.tmIndex = this.res[0].tm
        }else{
            this.tmIndex = this.res[0].tm.toString().substring(0,1)*1 + this.res[0].tm.toString().substring(1,2)*1
        }
        console.log(this.res[0].tm)
    },
    methods:{
        totalAll(){
            var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;
            this.res.forEach(ele => {
                if(ele.tm<10){ 
                    if(ele.tm==1){a++};if(ele.tm==2){b++};if(ele.tm==3){c++};if(ele.tm==4){d++};if(ele.tm==5){e++};if(ele.tm==6){f++};
                    if(ele.tm==7){g++};if(ele.tm==8){h++};if(ele.tm==9){i++};if(ele.tm==10){j++};if(ele.tm==11){k++};if(ele.tm==12){l++};
                    if(ele.tm==13){m++}
                }else{
                    var str = ele.tm.toString();
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==1){a++};if((str.substring(0,1)*1+str.substring(1,2)*1)==2){b++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==3){c++};if((str.substring(0,1)*1+str.substring(1,2)*1)==4){d++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==5){e++};if((str.substring(0,1)*1+str.substring(1,2)*1)==6){f++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==7){g++};if((str.substring(0,1)*1+str.substring(1,2)*1)==8){h++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==9){i++};if((str.substring(0,1)*1+str.substring(1,2)*1)==10){j++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==11){k++};if((str.substring(0,1)*1+str.substring(1,2)*1)==12){l++};
                    if((str.substring(0,1)*1+str.substring(1,2)*1)==13){m++}
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
            this.numArr[9] = j
            this.numArr[10] = k
            this.numArr[11] = l
            this.numArr[12] = m
            var newArr = [].concat(this.numArr)
            newArr.sort((a,b)=>{
                return b-a
            })
            if(newArr[0]<10){
                this.max = 1
            }else{
                this.max = newArr[0].toString().substring(0,1)*1 + 1
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
