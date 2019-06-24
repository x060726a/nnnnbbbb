<template>
    <div class="content">
        <div class="title">iPhone下载安装教程</div>
        <div class="text">【下载APP后弹出"未受信任的开发者"怎么办】</div>
        <div class="img step0"></div>
        <div class="id">1</div>
        <div class="text">【点击设置，打开通用，找到"设备管理"】</div>
        <div class="img step01"></div>
        <div class="id">2</div>
        <div class="text">【点击信任"KOS,OOO"】</div>
        <div class="img step02"></div>
        <div class="id">3</div>
        <div class="text">【点击弹框中的"信任",完成】</div>
        <div class="img step03"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.content {
    background: #fff;
}
.title {
    color: #333;
    content: "viewport-units-buggyfill; padding: 4vw 0 6.667vw; font-size: 4vw";
    font-size: 4vw;
    padding: 4vw 0 6.667vw;
    text-align: center;
}
.text {
    color: #666;
    content: "viewport-units-buggyfill; padding-bottom: 4vw; font-size: 3.733vw";
    font-size: 3.733vw;
    padding-bottom: 4vw;
    text-align: center;
}
.img {
    content: "viewport-units-buggyfill; width: 65.067vw; height: 45.467vw";
    height: 45.467vw;
    margin: 0 auto;
    width: 65.067vw;
}
.step0 {
    background: url("/static/images/download/step0.png");
    background-size: 100% 100%;
}
.step01 {
    background: url("/static/images/download/step01.png");
    background-size: 100% 100%;
}
.step02 {
    background: url("/static/images/download/step02.png");
    background-size: 100% 100%;
}
.step03 {
    background: url("/static/images/download/step03.png");
    background-size: 100% 100%;
}
.id {
    background: $theme-color;
    border-radius: 50%;
    color: #fff;
    content: "viewport-units-buggyfill; width: 4.8vw; height: 4.8vw; margin: 2.667vw auto 4vw; line-height: 4.8vw";
    height: 4.8vw;
    line-height: 4.8vw;
    margin: 2.667vw auto 4vw;
    width: 4.8vw;
    text-align: center;
    font-size: 3.733vw;
}
</style>
