<template>
<div class="content">
    <p>家肖:</p>
    <div style="padding-bottom:10px;">
        <p>羊，马，牛，猪，狗，鸡</p>
    </div>
    <p>野肖:</p>
    <div>
        <p>猴，蛇，龙，兔，虎，鼠</p>
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
