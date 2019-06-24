<template>
<div class="content">
    <router-link to="/cscont/sesx">十二生肖</router-link>
    <router-link to="/cscont/color">色波号码</router-link>
    <router-link to="/cscont/wxhm">五行号码</router-link>
    <router-link to="/cscont/hsds">合数单双</router-link>
    <router-link to="/cscont/sxsx">生肖属性</router-link>
    <router-link to="/cscont/tmdx">特码大小</router-link>
    <!-- <router-link to="/cscont/sxjb">生肖鉴别</router-link> -->
    <!-- <a>号码分类</a> -->
    <router-link to="/cscont/sxwx">生肖五行</router-link>
    <router-link to="/cscont/sxwh">生肖外号</router-link>
    <router-link to="/cscont/fwdl">方位段落</router-link>

    <!-- <a>生肖排行</a> -->
    <router-link to="/cscont/sxdm">生肖代名</router-link>
    <router-link to="/cscont/sxsssj">生肖所属时间</router-link>
    <router-link to="/cscont/bgpw">八卦排位</router-link>
    <router-link to="/cscont/esbxs">二十八星宿</router-link>
    <router-link to="/cscont/wxxk">五行相克</router-link>
    <router-link to="/cscont/bxpw">八仙排位</router-link>
    <router-link to="/cscont/zwds">紫薇斗数 生肖排位</router-link>
    <!-- <a>出生 生肖表</a> -->
    <router-link to="/cscont/zyx">左右肖</router-link>
    <router-link to="/cscont/qhx">前后肖</router-link>
    <router-link to="/cscont/tdx">天地肖</router-link>
    <router-link to="/cscont/dsbx">单双笔肖</router-link>
    <router-link to="/cscont/dhx">独合肖</router-link>
    <router-link to="/cscont/yyx">阴阳肖</router-link>
    <router-link to="/cscont/jyx">家野肖</router-link>
    <router-link to="/cscont/mcx">美丑肖</router-link>
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
    background: $app-bg-color;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    a{
        display: block;
        height: 80px;
        line-height: 80px;
        background: $bg-color;
        margin-bottom:16px;
        text-decoration: none;
        text-align: left;
        padding-left:10px;
        color:#333;
        font-size: 30px;
    }
    a:last-child{
        margin-bottom:0
    }
}
</style>
