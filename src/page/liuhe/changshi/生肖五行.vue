<template>
<div class="content">
    <div>
        <p>【金肖】猴鸡</p>
    </div>
    <div>
        <p>【木肖】虎兔</p>
    </div>
    <div>
        <p>【水肖】鼠猪</p>
    </div>
    <div>
        <p>【火肖】蛇马</p>
    </div>
    <div>
        <p>【土肖】牛羊龙狗</p>
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
