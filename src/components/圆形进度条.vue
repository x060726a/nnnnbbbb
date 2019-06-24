<template>
<div>
    <div id="section1" :class="'clip'+width"><div class="item"></div></div>
    <div id="section2" :class="'clip'+width"><div class="item"></div></div>
    <div id="section3" :class="'clip'+width" :style="style_l"><div class="item" :style="style_f"></div></div>
    <div class="center" @click="add()" :style="'height:'+size+'%;width:'+size+'%;top:'+(100-size)/2+'%;left:'+(100-size)/2+'%'">
        <h1>{{parseInt(num)}}%</h1>
        <h2>再阅读{{parseInt(100-num)}}篇</h2>
        <h3>即可获得抽奖券</h3>
    </div>
</div>
</template>
<script>
import { TweenLite } from 'gsap'
export default {
    data(){
        return{
            first:180,
            last:180,
            index:0,
            style_f:'',
            style_l:'',
            num:0
        }
    },
    props:{
        size:{
            type: Number,
            default: 0
        },
        jdNum:{
            type:Number,
            default:100
        },
        width:{
            type:Number,
        }
    },
    watch:{
        num(val,oval){
            if(this.num==100){
                this.style_l = 'transform: rotate(0deg);'
                this.style_f = 'transform: rotate(180deg);background-color: #ED7792;'
                return
            }
            if(this.num<=50){
                this.first = 180 - this.num*3.6
                this.style_l = 'transform: rotate(180deg);'
                this.style_f = 'transform: rotate('+this.first+'deg);background-color: #C3C3C3;'
            }else{
                this.last = (100-this.num)*3.6
                this.first = 180 - (100-this.num)*3.6
                this.style_l = 'transform: rotate('+this.last+'deg);'
                this.style_f = 'transform: rotate('+this.first+'deg);background-color: #ED7792;'
            }
        }
    },
    created(){
        this.style_l = 'transform: rotate(180deg);'
        this.style_f = 'transform: rotate(180deg);background-color: #C3C3C3;'
        setTimeout(()=>{
            TweenLite.to(this.$data,1,{num:this.jdNum});
        },200)
    },
}
</script>
<style lang="scss" scoped>
.center{
    background: #FFF;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    h1{
        font-size: 58px;
        line-height: 70px;
        font-weight: 500;
        padding-top:35px;
        color:#ED7792;
    }
    h2{
        font-weight: 500;
        font-size: 28px;
        color:#FFB400;
    }
    h3{
        font-size: 24px;
        font-weight: 500;
        color:#959494;
    }
}
.clip250{
    border-radius: 50%;
    clip: rect(0px, 250px, 250px, 124px);
    height: 100%;
    position: absolute;
    width: 100%;
    .item{
        border-radius: 50%;
        clip: rect(0px, 125px, 250px, 0px);
        height: 100%;
        position: absolute;
        width: 100%;
    }
}
#section1{
    transform: rotate(0deg);
    .item{
        background-color: #C3C3C3;
        transform: rotate(180deg);
    }
}
#section2{
    transform: rotate(180deg);
    .item{
        background-color: #ED7792;
        transform: rotate(180deg);
    }
}
</style>
