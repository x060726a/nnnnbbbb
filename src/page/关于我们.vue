<template>
    <div class="content">
        <div class="logo"><div class="icon-login"></div></div>
         <div class="cu">六友APP</div>
        <div class="xi">信息创造价值</div>
        <p class=" text">六友圈APP是深圳天网科技专为广大六合彩民精心打造的图鉴，资讯，彩票开奖，彩票走势图，彩票社区等周边彩票服务。掌握对的技巧，赢得头彩不是梦！欢迎加入我们：QQ28783875。</p>
        <p class=" text1">【全国开奖，一手掌握】实时数据，随手关注！</p>
        <p class=" text1">【覆盖全国，安全便捷】随时随地，快速下注！</p>
        <p class=" text1">【官方诚信，权益保障】六合彩官方授权，正规有效！</p>
        <p class=" text1">【缤纷竞彩，天天投注】天天耍记录，累计六币有奖励！</p>
        <p class=" text1">【专业分析，精准推荐】走势图表，专家预测，高手推荐！</p>
       
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    computed:{
        ...mapGetters(['isApp'])
    },
}
</script>

<style lang="scss" scoped>
.content{
    height: 100%;
    padding-left:16px;
    padding-right:16px;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    background: $bg-color;
     .logo{
        width: 170px;
        margin:auto;
        padding-top:50px;
        .icon-login {
            width:160px;
            height:160px;
            background:url("/static/images/logo_new.png") no-repeat;
            background-size:100% 100%;
            border-radius:30px;
        }
    }
    .cu {
        padding-top: 20px;
        font-size: $normal-fontSize;
        font-weight: 700;
        color: $text-table-color;
    }
    .xi {
        padding-top: 10px;
        padding-bottom: 50px;
        color: $normal-color;
    }
    p:first-child{
        margin-bottom:30px;
        margin-left:0;
    }
    .text{
        text-indent: 20px;
        padding: 0 10px;
        margin-left:-12px;
        font-size: 26px;
        color:#333;
        text-align: justify;
        margin-bottom:10px;
    }
    .text1 {
        text-indent:0;
        padding: 0 10px;
        margin-left:-12px;
        font-size: 26px;
        color:#333;
        text-align: justify;
        margin-bottom:10px;
    }
}
</style>
