<template>
<div class="round-wrap">
    <h1>2019年1月1日--{{new Date().getFullYear()}}年{{new Date().getMonth()+1}}月{{new Date().getDate()}}日</h1>
    <span class="round-text">
        <div v-for="(ele,idx) in text"><span :style="'background:'+color[idx]"></span><span :style="'color:'+color[idx]">{{ele}}{{numArr[idx]}}</span></div>
    </span>
    <div class="w-round">
        <div class="n-round one-round">
            <span v-for="(ele,idx) in nums" :style="'transform: rotate('+(ele*onePic<=180?180:ele*onePic)+'deg);background:'+color[idx]+';z-index:'+(nums.length-idx)"></span>
        </div>
        <div class="n-round two-round">
            <span v-for="(ele,idx) in nums" :style="'transform: rotate('+(ele*onePic>=180?180:ele*onePic)+'deg);background:'+color[idx]+';z-index:'+(nums.length-idx)"></span>
        </div>
        <div class="center"></div>
    </div>
</div>
</template>
<script>
import { TweenLite } from 'gsap'
export default {
    data(){
        return{
            onePic:(360 / JSON.parse(localStorage.getItem('HistoryOpen')).length),//每一份的度数
            nums:[]
        }
    },
    props:['text','color','numArr'],
    created(){
        var arr = []
        this.numArr.forEach((ele,idx) => {
            if(idx==0){
                arr[idx] = ele
            }else{
                arr[idx] = ele + arr[idx-1]
            }
        });
        TweenLite.to(this.$data,.5,{nums:arr}); 
    },
    computed:{
        newNus(){
            var arr = []
            this.numArr.forEach((ele,idx) => {
                if(idx==0){
                    arr[idx] = ele
                }else{
                    arr[idx] = ele + arr[idx-1]
                }
            });
            return arr;
        }
    }
}
</script>
<style lang="scss" scoped>
.round-wrap{
    min-height: 600px;
    h1{
        padding-top:30px;
        font-size: 30px;
        color:#333;
        font-weight: 500;
    }
}
.round-text{
    padding-top:30px;
    overflow: hidden;
    display: inline-block;
    >div{
        float: left;
        margin-right:25px;
        span{
            display: inline-block;
            vertical-align: middle;
        }
        span:first-child{
            width:30px;
            height: 30px;
            border-radius: 50%;
            margin-right:5px;
        }
        span:last-child{
            font-size: 28px;
        }
    }
    >div:last-child{
        margin-right:0px;
    }
}
.w-round{
    width:300px;
    height: 300px;
    overflow: hidden;
    margin: auto;
    position: absolute;
    z-index: 5;
    top:50%;
    left: 50%;
    margin-top:-120px;
    margin-left:-150px;
    border-radius: 50%;
    .n-round{
        width:300px;
        height: 300px;
        position: absolute;
        top: 0;
        z-index: 1;
        span{
            display: block;
            width: 300px;
            height: 300px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            clip: rect(0px,150px,300px,0px)
        }
    }
    .one-round{
        clip: rect(0px,150px,300px,0px);
        background: #e1e1e1;
        span{
            transition: transform .5s ease;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            transform: rotate(180deg);
        }
    }
    .two-round{
        clip: rect(0px,300px,300px,150px);
        background: #e1e1e1;
        span{
            transition: transform .5s ease;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            transform: rotate(0deg);
        }
    }
    .center{
        width:250px;
        height: 250px;
        background: #fff;
        position: absolute;
        border-radius: 50%;
        z-index: 5;
        top: 50%;
        left: 50%;
        margin-left:-125px;
        margin-top:-125px;
    }
}
</style>
