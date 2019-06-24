<template>
<div class="content">
    <p>阴肖:</p>
    <div style="padding-bottom:10px;">
        <p>鼠，龙，马，蛇，狗，猪</p>
    </div>
    <p>阳肖:</p>
    <div>
        <p>鸡，兔，牛，羊，虎，猴</p>
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
