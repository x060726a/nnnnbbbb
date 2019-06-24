<template>
<div class="content">
    <div>
        <p>生肖属金的肖：龙马；</p>
    </div>
    <div>
        <p>五行属金的肖：猴鸡；</p>
    </div>
    <div>
        <p>生肖属木的肖：猴；</p>
    </div>
    <div>
        <p>五行属木的肖：虎兔；</p>
    </div>
    <div>
        <p>生肖属水的肖：蛇羊；</p>
    </div>
    <div>
        <p>五行属水的肖：鼠猪；</p>
    </div>
    <div>
        <p>生肖属火的肖：兔鸡；</p>
    </div>
    <div>
        <p>五行属火的肖：蛇马；</p>
    </div>
    <div>
        <p>生肖属土的肖：猪；</p>
    </div>
    <div>
        <p>五行属土的肖：牛龙羊狗。</p>
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
        >p {
            font-size: $normal-fontSize;
        }
    }
}
</style>
