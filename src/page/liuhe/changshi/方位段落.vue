<template>
<div class="content">
    <p>东肖</p>
    <div>
        <p>猴, 龙, 鼠</p>
    </div>
    <p>南肖</p>
    <div>
        <p>蛇, 牛, 鸡</p>
    </div>
    <p>西肖</p>
    <div>
        <p>马, 虎, 狗</p>
    </div>
    <p>北肖</p>
    <div>
        <p>羊, 兔, 猪</p>
    </div>
    <h3>号码九段</h3>
    <p>一段</p>
    <div>
        <p>1 2 3 4 5 6 7</p>
    </div>
    <p>二段</p>
    <div>
        <p>8 9 10 11 12 13 14 15</p>
    </div>
    <p>三段</p>
    <div>
        <p>16 17 18 19 20</p>
    </div>
    <p>四段</p>
    <div>
        <p>21 22 23 24 25</p>
    </div>
    <p>五段</p>
    <div>
        <p>26 27 28 29 30</p>
    </div>
    <p>六段</p>
    <div>
        <p>31 32 33 34 35</p>
    </div>
    <p>七段</p>
    <div>
        <p>36 37 38 39 40</p>
    </div>
    <p>八段</p>
    <div>
        <p>41 42 43 44 45</p>
    </div>
    <p>九段</p>
    <div>
        <p>46 47 48 49</p>
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
    h3{
        font-weight: 500;
        text-align: left;
        padding-top:10px;
    }
}
</style>
