<template>
    <div class="content">
        <router-link to="/zscont/tszs">头数走势</router-link>
        <router-link to="/zscont/dxzs">大小走势</router-link>
        <router-link to="/zscont/jyzs">家野走势</router-link>
        <router-link to="/zscont/hlzs">色波走势</router-link>
        <router-link to="/zscont/tmzs">特码走势</router-link>
        <router-link to="/zscont/wxzs">五行走势</router-link>
        <router-link to="/zscont/twzs">特尾走势</router-link>
        <router-link to="/zscont/sxzs">生肖走势</router-link>
        <router-link to="/zscont/oddzs">单双走势</router-link>
        <router-link to="/zscont/ptzs">平特走势</router-link>
        <!-- <a class="none">每期短期走势</a> -->
        <router-link to="/zscont/ylzs">遗漏</router-link>
        <router-link to="/zscont/qhxzs">前后肖走势</router-link>
        <!-- <a class="none">内外围走势</a>
        <a class="none">相隔期数走势</a> -->
        <router-link to="/zscont/bbzs">半波走势</router-link>
        <router-link to="/zscont/yyxzs">阴阳肖走势</router-link>
        <router-link to="/zscont/nnzs">男女肖走势</router-link>
        <!-- <a class="none">琴棋书画图</a> -->
        <router-link to="/zscont/sjxzs">四季肖走势</router-link>
        <!-- <a class="none">合大小走势</a> -->
        <router-link to="/zscont/mszs">门数走势</router-link>
        <router-link to="/zscont/tdxzs">天地肖走势</router-link>
        <router-link to="/zscont/dsbzs">单双笔走势</router-link>
        <!-- <a class="none">旁肖走势</a> -->
        <router-link to="/zscont/fwxzs">方位肖走势</router-link>
        <!-- <a class="none">总和大小图</a>
        <a class="none">冷热统计图</a>
        <a class="none">色波走势图</a> -->
        <router-link to="/zscont/dszs">段数走势</router-link>
        <!-- <a class="none">合单双走势</a> -->
        <router-link to="/zscont/jxxzs">吉凶肖走势</router-link>
        <!-- <a class="none">黑白肖走势</a>
        <a class="none">独和肖走势</a> -->
        <router-link to="/zscont/bgxzs">八卦肖走势</router-link>
        <!-- <a class="none">出码统计图</a>
        <a class="none">历史同期查询</a> -->
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            loading: true,
            liuhe:{
                ballpanel:{
                    '狗':[1,13,25,37,49],
                    '鸡':[2,14,26,38],
                    '猴':[3,15,27,39],
                    '羊':[4,16,28,40],
                    '马':[5,17,29,41],
                    '蛇':[6,18,30,42],
                    '龙':[7,19,31,43],
                    '兔':[8,20,32,44],
                    '虎':[9,21,33,45],
                    '牛':[10,22,34,46],
                    '鼠':[11,23,35,47],
                    '猪':[12,24,36,48]
                },//生肖与号码
                ballcolor:{
                    '红':[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],
                    '蓝':[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48],
                    '绿':[5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49]
                },//色波与号码
                ballwx:{
                    '金':[2,3,16,17,24,25,32,33,46,47],
                    '木':[6,7,14,15,28,29,36,37,44,45],
                    '水':[4,5,12,13,20,21,34,35,42,43],
                    '火':[1,8,9,22,23,30,31,38,39],
                    '土':[10,11,18,19,26,27,40,41,48,49]
                },
            }
        }
    },
    created(){
        var ball = localStorage.getItem('liuhe');
        if(!ball){
            localStorage.setItem('liuhe',JSON.stringify(this.liuhe));
        }
    },
    computed:{
        ...mapGetters(['isApp'])
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    background: $app-bg-color;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
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
    a.none{
        color:#ded7d7;
    }
}
</style>
