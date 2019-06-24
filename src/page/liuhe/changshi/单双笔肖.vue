<template>
<div class="content">
    <p>单笔画肖:</p>
    <div style="padding-bottom:10px;">
        <p>鼠，龙，蛇，马，鸡，猪</p>
    </div>
    <p>双笔画肖:</p>
    <div>
        <p>牛，虎，兔，羊，猴，狗</p>
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
