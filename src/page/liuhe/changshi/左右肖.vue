<template>
<div class="content">
    <p>左肖:</p>
    <div style="padding-bottom:10px;">
        <p>鼠，牛，龙，蛇，猴，鸡</p>
    </div>
    <p>右肖:</p>
    <div>
        <p>虎，兔，马，羊，狗，猪</p>
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
