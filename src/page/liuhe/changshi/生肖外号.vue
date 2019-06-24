<template>
<div class="content">
    <div>
        <p>鼠（梅花；宰相；神偷；逆贼；国师 ）</p>
    </div>
    <div>
        <p>牛（元帅；大将；员外；包公；荷花 ）</p>
    </div>
    <div>
        <p>虎（将军；大王；武士；都督；桃花 ）</p>
    </div>
    <div>
        <p>兔（兰花；小姐；皇后；东宫；玉女; 玉帝 ）</p>
    </div>
    <div>
        <p>龙（皇帝；状元；君主；国君；李花 ）</p>
    </div>
    <div>
        <p>蛇（宫女；才人；美人；宫妃；竹花 ）</p>
    </div>
    <div>
        <p>马（杏花；秀才；太子；元帅；牛童 ）</p>
    </div>
    <div>
        <p>羊（宰相；西宫；夫人；皇妃；樱花 ）</p>
    </div>
    <div>
        <p>猴（太监；寇王；游侠；侠士；松树 ）</p>
    </div>
    <div>
        <p>鸡（东宫；贵妃；歌女；奴婢；葵花 ）</p>
    </div>
    <div>
        <p>狗（文官；先锋；管家；奴才；奸臣；菊花 ）</p>
    </div>
    <div>
        <p>猪（县令；太监；商贾；丞相；桂花 ）</p>
    </div>
</div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.content{
    overflow: hidden;
    padding:30px 16px;
    p{
        word-wrap: break-word;
        word-break: normal;
        text-align: left;
        font-size: 32px;
    }
    >div{
        text-align: justify;
        >p{
            font-size: $normal-fontSize;
        }
    }
}
</style>
