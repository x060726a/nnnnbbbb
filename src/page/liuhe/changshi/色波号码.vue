<template>
<!-- <ul class="ball-panel">
    <li v-for="(ele,idx) in liuhe.ballcolor"  >
        <span>{{idx}}:</span>
        <div class="ball" :class="{'red':idx=='红','blue':idx=='蓝','green':idx=='绿'}"><span v-for="(ele1,idx1) in ele" :key="idx1">{{ele1}}</span></div>
    </li>
</ul> -->
<div class="content">
    <p>红：</p>
    <p>1.2.7.8.12.13.18.19.23.24.29.30.34.35.40.45.46</p>
    <p>蓝：</p>
    <p>3.4.9.10.14.15.20.25.26.31.36.37.41.42.47.48</p>
    <p>绿：</p>
    <p>5.6.11.16.17.21.22.27.28.32.33.38.39.43.44.49</p>
</div>
</template>
<script>
export default {
    data(){
        return {
            liuhe:JSON.parse(localStorage.getItem('liuhe'))
        }
    }
}
</script>
<style lang="scss" scoped>
.ball-panel{
    >li{
        border-bottom:$border-color 1px solid;
        padding-top:5px;
        padding-bottom:5px;
        line-height: 35px;
        overflow: hidden;
        >span{
            display: block;
        }
        .ball{
            width:70%;
            padding-right:5px;
            padding-left:5px;
            margin: auto;
            >span{
                border-radius: 50%;
                width:30px;
                height: 30px;
                line-height: 30px;
                font-size: 24px;
                display: inline-block;
                color:#fff;
                margin-left:2px;
                margin-right:2px;
            }
        }
        .red{
            >span{
                background: red;
            }
        }
        .blue{
            >span{
                background: blue;
            }
        }
        .green{
            >span{
                background: green;
            }
        }
    }
}
.content{
    overflow: hidden;
    padding:30px 16px;
    >p{
        word-wrap: break-word;
        word-break: normal;
        text-align: left;
        font-size: $normal-fontSize;
    }
}
</style>
