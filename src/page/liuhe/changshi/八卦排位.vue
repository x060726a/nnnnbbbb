<template>
<div class="content">
    <div>
        <p>乾（离）马兔;</p>
    </div>
    <div>
        <p>巽（坤）羊猴;</p>
    </div>
    <div>
        <p>坎（兑）鸡;</p>
    </div>
    <div>
        <p>艮（乾）狗猪;</p>
    </div>
    <div>
        <p>坤（坎）鼠;</p>
    </div>
    <div>
        <p>震（艮）牛虎;</p>
    </div>
    <div>
        <p>离（震）兔;</p>
    </div>
    <div>
        <p>兑（巽）龙蛇;</p>
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
        padding-top:10px;
        >p {
            font-size: $normal-fontSize;
        }
    }
}
</style>
