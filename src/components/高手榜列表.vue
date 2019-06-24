<template>
<div class="liuyou-item-list" @click="$router.push({path:'/yuce/'+type+'-'+text.id,query:{number:index}})">
    <div class="item-index">
        <span v-if="index<=3" :class="{imgr:index<=3}"><img :src="'/static/images/icons/top_'+index+'.jpg'"></span>
        <span v-if="index>3" :class="{text:index>3}">{{index}}</span>
    </div>
    <div class="center">
        <div class="avatar"><img :src="'/static/images/avatar/'+text.avatar+'.jpg'"></div>
        <div class="text1">
            <h1>{{text.name}}</h1>
            <p>{{text.level}}</p>
        </div>
        <div class="text2">
            <h1>{{text.bet_num}}中{{text.win_num}}</h1>
            <p>最大连中{{text.continue_win_num}}期</p>
        </div>
    </div>
    <div class="total">
        <span :class="{red:index==1,yellow:index==2,blue:index==3}">{{text.win_probability}}%胜率</span>
    </div> 
</div>
</template>
<script>
export default {
    props:['text','index','type'],
}
</script>
<style lang="scss" scoped>
.liuyou-item-list{
    padding-top:20px;
    padding-bottom:20px;
    background: #fff;
    border-bottom:$border-color 1px solid;
    overflow: hidden;
    width: 100%;
    >div{
        float: left;
        height: 80px;
    }
    .item-index{
        width:85px;
        height: 80px;
        >span{
            width: 52px;
            height: 60px;
            display: block;
            text-align: center;
            float: right;
            img{
                width: 100%;
            }
        }
        .imgr{
            padding-top:10px;
            font-size: 0;
        }
        .text{
            line-height: 80px;
            font-size: 30px;
        }
    }
    >div:nth-child(2){
        width:calc(100% - 225px);
    }
    >div:nth-child(3){
        width:140px;
    }
    .center{
        overflow: hidden;
        .avatar{
            font-size: 0;
            float: left;
            border-radius: 50%;
            margin-left:30px;
            overflow: hidden;
            background: #f2f2f2;
            width:80px;
            height: 80px;
            img{
                width: 100%;
            }
        }
        .text1{
            height: 76px;
            width:150px;
            padding-left:10px;
            float: left;
            text-align: left;
            margin-right:65px;
            h1{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 34px;
                color:#333;
                font-weight: 500;
                height: 40px;
                line-height: 40px;
            }
            p{
                font-size: 22px;
                color:#999;
                height: 40px;
                line-height: 40px;
            }
        }
        .text2{
            float: left;
            text-align: left;
            height: 80px;
            h1{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 34px;
                color:#333;
                font-weight: 500;
                height: 40px;
                line-height: 40px;
            }
            p{
                color:$theme-color;
                font-size: 24px;
            }
        }
    }
    .total{
        span{
            margin-top:10px;
            display: block;
            height: 60px;
            line-height: 60px;
            background: #c3c3c3;
            border-radius: 50px 0 0 50px;
            color:#fff;
            font-size: 28px;
            text-align: center;
        }
        span.red{
            background: #ff6e75;
        }
        span.yellow{
            background: #ffc547;
        }
        span.blue{
            background: #6fbcff;
        }
    }
}
</style>
