<template>
<div class="content">
    <p>天肖:</p>
    <div style="padding-bottom:10px;">
        <p>兔，马，猴，猪，牛，龙</p>
    </div>
    <p>地肖:</p>
    <div>
        <p>蛇，羊，鸡，狗，鼠，虎</p>
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
    >p{
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
