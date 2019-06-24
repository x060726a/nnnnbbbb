<template>
<div class="content">
    <p>特码小：</p>
    <div>
        <p>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24</p>
    </div>
    <p>特码大：</p>
    <div>
        <p>25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49</p>
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
        font-size: 32px;
        >p {
            font-size: $normal-fontSize;
        }
    }
}
</style>
