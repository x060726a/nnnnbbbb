<template>
<div class="content">
    <p>吉美肖:</p>
    <div style="padding-bottom:10px;">
        <p>兔，龙，蛇，马，羊，鸡</p>
    </div>
    <p>凶丑肖:</p>
    <div>
        <p>鼠，牛，虎，猴，狗，猪</p>
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
