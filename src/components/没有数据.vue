<template>
<div class="index-data-none"></div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.index-data-none{
    position: absolute;
    top: 50%;
    left: 50%;
    width:200px;
    height: 200px;
    background: url('/static/images/dataNone.png') no-repeat;
    background-size: 100%;
    margin-top:-170px;
    margin-left:-70px;
}
// .index-data-none::after{
//     content: "暂时没有数据";
//     position: absolute;
//     bottom: -50px;
//     left: 0px;
//     width: 200px;
//     text-align: center;
//     font-size: 26px;
//     line-height: 60px;
// }
</style>
