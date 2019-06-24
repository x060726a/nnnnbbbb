<template>
<div class="content">
    <div>
        <p>1.鸡(太岁)</p>
    </div>
    <div>
        <p>2.蛇(太阳)</p>
    </div>
    <div>
        <p>3.马(丧门)</p>
    </div>
    <div>
        <p>4.羊(太阴)</p>
    </div>
    <div>
        <p>5.虎(官符)</p>
    </div>
    <div>
        <p>6.兔(死符)</p>
    </div>
    <div>
        <p>7.龙(岁破)</p>
    </div>
    <div>
        <p>8.猪(龙德)</p>
    </div>
    <div>
        <p>9.狗(白虎)</p>
    </div>
    <div>
        <p>10.牛(福星)</p>
    </div>
    <div>
        <p>11.猴(吊客)</p>
    </div>
    <div>
        <p>12.鼠(病符)</p>
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
        padding-top:10px;
        >p {
            font-size: $normal-fontSize;
        }
    }
}
</style>
