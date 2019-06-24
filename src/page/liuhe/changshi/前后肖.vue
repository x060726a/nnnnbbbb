<template>
<div class="content">
    <p>前肖:</p>
    <div style="padding-bottom:10px;">
        <p>鼠，牛，虎，兔，龙，蛇</p>
    </div>
    <p>后肖:</p>
    <div>
        <p>马，羊，猴，鸡，狗，猪</p>
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
