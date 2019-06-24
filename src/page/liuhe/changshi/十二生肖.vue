<template>
<!-- <ul class="ball-panel">
    <li v-for="(ele,key) in liuhe.ballpanel" :key="key">
        <span>{{key}}:</span>
        <div class="ball"><span v-for="(ele1,key1) in ele" :key="key1" :class="setColor(ele1)">{{ele1}}</span></div>
    </li>
</ul> -->
<div class="content">
    <p>鼠:12 24 36 48</p>
    <p>牛:11 23 35 47</p>
    <p>虎:10 22 34 46</p>
    <p>兔:09 21 33 45</p>
    <p>龙:08 20 32 44</p>
    <p>蛇:07 19 31 43</p>
    <p>马:06 18 30 42</p>
    <p>羊:05 17 29 41</p>
    <p>猴:04 16 28 40</p>
    <p>鸡:03 15 27 39</p>
    <p>狗:02 14 26 38</p>
    <p>猪:01 13 25 37 49</p>
</div>
</template>
<script>
export default {
    data(){
        return {
            liuhe:JSON.parse(localStorage.getItem('liuhe'))
        }
    },
    methods:{
        setColor(ball){
            let ballcolor = this.liuhe.ballcolor;
            if(this.liuhe.ballcolor['红'].indexOf(ball)!=-1){
                return 'red'
            }
            if(this.liuhe.ballcolor['蓝'].indexOf(ball)!=-1){
                return 'blue'
            }
            if(this.liuhe.ballcolor['绿'].indexOf(ball)!=-1){
                return 'green'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.ball-panel{
    >li{
        border-bottom:$border-color 1px solid;
        overflow: hidden;
        >span{
            display: block;
            float: left;
            width:100px;
            line-height: 35px;
            text-align: right;
            padding-top:5px;
            padding-bottom:5px;
            padding-right:5px;
        }
        .ball{
            overflow: hidden;
            float: left;
            width: calc(100% - 105px);
            height: 35px;
            line-height: 35px;
            padding-top:5px;
            padding-bottom:5px;
            span{
                width: 35px;
                height: 35px;
                display: block;
                float: left;
                background: red;
                border-radius: 50%;
                margin-right:5px;
                color:#fff;
            }
            .red{
                background: red;
            }
            .blue{
                background: blue;
            }
            .green{
                background: green;
            }
        }
    }
}
.content{
    padding:30px 16px;
    p{
        text-align: left;
        font-size: $normal-fontSize;
    }
}
</style>
