<template>
<div class="content">
    <div>
        <p>精（鼠）， 憨（牛）， 威（虎）， 慧（兔）</p>
    </div>
    <div>
        <p>神（龙）， 智（蛇）， 奔（马）， 温（羊）</p>
    </div>
    <div>
        <p>神（龙）， 智（蛇）， 奔（马）， 温（羊）</p>
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
