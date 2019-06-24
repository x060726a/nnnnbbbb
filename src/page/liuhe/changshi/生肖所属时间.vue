<template>
<div class="content">
    <div>
        <p>鼠（23---01时，三更）</p>
    </div>
    <div>
        <p>牛（01---03时，四更）</p>
    </div>
    <div>
        <p>虎（03---05时，五更）</p>
    </div>
    <div>
        <p>兔（05---07时，六更）</p>
    </div>
    <div>
        <p>龙（07---09时，七更）</p>
    </div>
    <div>
        <p>蛇（09---11时，八更）</p>
    </div>
    <div>
        <p>马（11---13时，九更）</p>
    </div>
    <div>
        <p>羊（13---15时，十更）</p>
    </div>
    <div>
        <p>猴（15---17时，十一更）</p>
    </div>
    <div>
        <p>鸡（17---19时，十二更）</p>
    </div>
    <div>
        <p>狗（19---21时，一更）</p>
    </div>
    <div>
        <p>猪（21---23时，二更）</p>
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
