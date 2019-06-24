<template>
<div class="columnar-wrap">
    <!-- 小于12个 -->
    <h1>2019年1月1日--{{new Date().getFullYear()}}年{{new Date().getMonth()+1}}月{{new Date().getDate()}}日</h1>
    <div class="charts" v-if="num<=12">
        <div class="columnar-index" :style="'margin-right:'+marginRight+'vw'">
            <div v-for="ele in maxIndex" :style="'height:'+56/maxIndex+'vw;'"></div>
        </div>
        <div class="columnar-item" v-for="(ele,idx) in numArr" :style="'margin-right:'+marginRight+'vw'">
            <div ref="zhuzi" :class="{active:tmIndex==idx}">
                <span>{{ele}}</span>
                <div class="badge" v-if="tmIndex==idx"><span>{{res[0].qihao.toString().substring(4,res[0].qihao.length)}}期</span></div>
            </div>
        </div>
    </div>
    <div class="chart-title" v-if="num<=12">
        <div class="index" :style="'width:'+(marginRight + 0.267)+'vw'"></div>
        <div v-for="ele in titleArr" :style="'width:'+(marginRight + 2.4)+'vw'">{{ele}}</div>
    </div>

    <!-- 超过12个 -->
    <div class="charts" :style="'width:'+(num*4.267 + num*2.4 + 4.534)+'vw'" v-if="num>12">
        <div class="columnar-index">
            <div v-for="ele in maxIndex" :style="'height:'+56/maxIndex+'vw'"></div>
        </div>
        <div class="columnar-item" v-for="(ele,idx) in numArr">
            <div ref="zhuzi" :class="{active:tmIndex==idx}">
                <span>{{ele}}</span>
                <div class="badge" v-if="tmIndex==idx"><span>{{res[0].qihao.toString().substring(4,res[0].qihao.length)}}期</span></div>
            </div>
        </div>
    </div>
    <div class="chart-title" :style="'width:'+(num*4.267 + num*2.4 + 4.534)+'vw'" v-if="num>12">
        <div class="index"></div>
        <div v-for="ele in titleArr">{{ele}}</div>
    </div>
</div>
</template>
<script>
import { TweenLite } from 'gsap'
export default {
    data(){
        return{
            res:JSON.parse(localStorage.getItem('HistoryOpen')),
            marginRight:0,
        }
    },
    props:['num','numArr','titleArr','maxIndex','tmIndex'],
    created(){
        this.$nextTick(()=>{
            this.numArr.forEach((ele,idx) => {
                TweenLite.to(this.$refs.zhuzi[idx],.5,{'height':ele*(56/(this.maxIndex*10))+'vw'});
            });
            this.marginRight = (92 - 2.4*this.num - 0.267) / (this.num+1)
        })
    }
}
</script>
<style lang="scss" scoped>
.columnar-wrap{
    width:calc(100vw - 60px);
    overflow-x: auto;
    margin-left:30px;
    margin-right:30px;
    h1{
        padding-top:30px;
        font-size: 30px;
        color:#333;
        font-weight: 500;
    }
    .charts{
        padding-top:70px;
        height: 420px;
        border-bottom:1px solid #ecf1f5;
        .columnar-index{
            float: left;
            height: 420px;
            width:2px;
            background: #ecf1f5;
            border-radius: 2px 2px 0 0;
            margin-right:32px;
            >div{
                height: 70px;
                position: relative;
            }
            >div::after{
                content:'';
                display: block;
                position: absolute;
                top:0;
                left: -2px;
                width: 7px;
                height: 2px;
                background: #000;
            }
        }
        .columnar-item{
            float: left;
            height: 420px;
            width:18px;
            background: #fff;
            margin-right:32px;
            position: relative;
            >div{
                position: absolute;
                bottom:0;
                left: 0;
                height: 0;
                width:18px;
                border-radius: 2px 2px 0 0;
                background: #ecf1f5;
                transition: height .5s ease;
                span{
                    position: absolute;
                    top:-30px;
                    left: -2px;
                    width:18px;
                    font-size: 24px;
                    text-align: center;
                }
            }
            .active{
                background: #0a95dd;
                .badge{
                    width:73px;
                    height: 54px;
                    line-height: 54px;
                    font-size: 22px;
                    color:#333;
                    border-radius: 4px;
                    background: #fff;
                    box-shadow: 0px 2px 7px #c5c2c2;
                    position: absolute;
                    top:-110px;
                    left: 0;
                    margin-left:-28px;
                }
                .badge::after{
                    content:'';
                    display: block;
                    height: 40px;
                    width:40px;
                    position: absolute;
                    bottom:-5px;
                    left: 50%;
                    margin-left:-20px;
                    background: #fff;
                    transform: rotate(-45deg);
                    box-shadow: 0px 3px 0px #c5c2c2;
                    clip: rect(20px,20px,40px,0px);
                }
                .badge>span{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width:73px;
                    height: 54px;
                    line-height: 54px;
                }
            }
        }
    }
    .chart-title{
        overflow: hidden;
        padding-top:30px;
        padding-bottom:30px;
        margin: auto;
        .index{
            width:34px;
        }
        >div{
            float: left;
            height: 40px;
            width:50px;
            text-align: left;
            font-size: 24px;
            color:#666;
        }
    }
}
</style>
