<template>
<div class="content">
    <p>东方青龙七宿：</p>
    <div>
        <p>角木蛟; 亢金龙; 氐土貉; 箕水豹; 尾火虎; 房日兔; 心月狐</p>
    </div>
    <div style="padding-bottom:10px;">
        <p>龙. 猴. 鼠 . 狗. 鸡. 兔. 蛇</p>
    </div>
    <p>南方朱雀七宿: </p>
    <div>
        <p>井木犴; 鬼金羊; 柳土獐; 轸水蚓; 翼火蛇; 星日马; 张月鹿</p>
    </div>
    <div style="padding-bottom:10px;">
        <p>鸡. 牛. 蛇. 兔. 龙 . 狗. 猴</p>
    </div>
    <p>西方白虎七宿:</p>
    <div>
        <p>奎木狼; 娄金狗; 胃土雉; 壁水蝓; 觜火猴; 昂日鸡; 危月燕</p>
    </div>
    <div style="padding-bottom:10px;">
        <p>虎. 狗. 马. 猪. 猴. 兔. 龙</p>
    </div>
    <p>北方玄武七宿:</p>
    <div>
        <p>斗木豸; 牛金牛; 女土蝠; 参水猿; 室火猪; 虚日鼠; 毕月乌</p>
    </div>
    <div>
        <p>虎. 马. 狗. 牛. 羊. 猴. 兔</p>
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
