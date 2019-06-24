<template>
    <div class="jgg-wrap">
        <div class="jgg-rows">
            <router-link to="/forum"><span class="luntan"></span><span>六合论坛</span></router-link>
            <router-link to="/lotteryopen"><span class="kaijiang"></span><span>开奖日期</span></router-link>
            <router-link to="/cslist"><span class="changshi"></span><span>六合常识</span></router-link>
        </div>
        <div class="jgg-rows">
            <router-link to="/tukulist"><span class="jiexi"></span><span>六合图库</span></router-link>
            <router-link to="/historyissue"><span class="qishu"></span><span>历史期数</span></router-link>
            <router-link to="/gslist"><span class="gongshi"></span><span>六合公式</span></router-link>
        </div>
        <div class="jgg-rows">
            <router-link to="/tjlist"><span class="tongji"></span><span>六合统计</span></router-link>
            <router-link to="/zslist"><span class="zoushi"></span><span>走势图</span></router-link>
            <router-link to="/zllist"><span class="ziliao"></span><span>全年资料</span></router-link>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
    }
}
</script>
<style lang="scss" scoped>
.jgg-wrap{
    font-size: 28px;
    a{
        color:#2c3e50;
    }
    .jgg-rows{
        border-bottom:1px solid #e6e1e1;
        display: flex;
        >a{
            flex: 1;
            border-right:1px solid #e6e1e1;
            padding-top:50px;
            padding-bottom:50px;
            text-decoration: none;
            position: relative;
            span:first-child{
                display: block;
                width:88px;
                height: 88px;
                margin: auto;
            }
            span:last-child{
                margin-top:10px;
                width: 100%;
                font-size: 28px;
                color:#666;
            }
        }
        >a:last-child{
            border-right:none;
        }
    }
}
.luntan{
    background: url('/static/images/liuhIcons/luntan.png') no-repeat;
    background-size: 100% 100%;
}
.kaijiang{
    background: url('/static/images/liuhIcons/kaijiang.png') no-repeat;
    background-size: 100% 100%;
}
.changshi{
    background: url('/static/images/liuhIcons/changshi.png') no-repeat;
    background-size: 100% 100%;
}
.jiexi{
    background: url('/static/images/liuhIcons/jiexi.png') no-repeat;
    background-size: 100% 100%;
}
.qishu{
    background: url('/static/images/liuhIcons/qishu.png') no-repeat;
    background-size: 100% 100%;
}
.gongshi{
    background: url('/static/images/liuhIcons/gongshi.png') no-repeat;
    background-size: 100% 100%;
}
.tongji{
    background: url('/static/images/liuhIcons/tongji.png') no-repeat;
    background-size: 100% 100%;
}
.zoushi{
    background: url('/static/images/liuhIcons/zoushitu.png') no-repeat;
    background-size: 100% 100%;
}
.ziliao{
    background: url('/static/images/liuhIcons/ziliao.png') no-repeat;
    background-size: 100% 100%;
}
</style>
