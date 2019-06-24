<template>
<div class="content">
    <p>相生:</p>
    <div style="padding-bottom:10px;">
        <p>木生火、火生土、土生金、金生水、水生木</p>
    </div>
    <p>相克:</p>
    <div>
        <p>木克土、土克水、水克火、火克金、金克木</p>
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
