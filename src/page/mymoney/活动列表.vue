<template>
    <div>
        <div class="activity-list" @click="goRouter(1)">
            <div class="list-left cash"></div>
            <div class="list-right">
                <div class="title"><span>现金券</span><span> Cash coupons</span></div>
                <p>可用金币直接兑换商品,兑换成功后请联系客服。</p>
                <div class="list-img cash-list"><span></span><span></span><span></span><span></span><span></span><span class="iconfont icon-jiantou1"></span></div>
            </div>
        </div>
        <!-- <div class="activity-list" @click="goRouter(2)">
            <div class="list-left huafei"></div>
            <div class="list-right">
                <div class="title"><span>话费券</span><span> Call charge</span></div>
                <p>可用金币直接兑换商品,兑换成功后请联系客服。</p>
                <div class="list-img haufei-list"><span></span><span></span><span></span><span></span><span></span><span class="iconfont icon-jiantou1"></span></div>
            </div>
        </div> -->
        <div class="activity-list" @click="goRouter(3)">
            <div class="list-left zhuanpan"></div>
            <div class="list-right">
                <div class="title"><span>大转盘</span><span> Lottery tray</span></div>
                <p>可用抽奖券抽取商品,抽取成功后请联系客服。</p>
                <div class="list-img zhuanpan-list"><span></span><span></span><span></span><span></span><span></span><span class="iconfont icon-jiantou1"></span></div>
                <div class="list-img zhuanpan-text-list"><span>双人游</span><span>Iphonex</span><span>话费券</span><span>现金券</span><span>金币</span></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    methods:{
        goRouter(id){
            this.$router.push({path:'/activity-cont/'+id})
        }
    }
}
</script>
<style lang="scss" scoped>
.activity-list{
    margin-bottom:20px;
    background: $bg-color;
    border-radius: 3px;
    overflow: hidden;
    display: table;
    width: 100%;
    padding-top:16px;
    padding-bottom:16px;
    .list-left{
        display: table-cell;
        width:124px;
        height: 100px;
        position: relative;
    }
    .cash{
        border-right:#f6532f 1px solid;
        vertical-align: middle;
    }
    .huafei{
        border-right:$theme-color 1px solid;
        vertical-align: middle;
    }
    .zhuanpan{
        border-right:#ff9800 1px solid;
        vertical-align: middle;
    }
    .cash::before{
        content:'';
        display: block;
        width: calc(100% - 60px);
        background: url('/static/images/icons/icon_money.png') center no-repeat;
        background-size: 50px;
        height: 100px;
        margin: auto;
    }
    .huafei::before{
        content:'';
        display: block;
        width: calc(100% - 60px);
        background: url('/static/images/icons/icon_phone.png') center no-repeat;
        background-size: 40px;
        height: 100px;
        margin: auto;
    }
    .zhuanpan::before{
        content:'';
        display: block;
        width: calc(100% - 60px);
        background: url('/static/images/icons/icon_zp.png') center no-repeat;
        background-size: 55px;
        height: 100px;
        margin: auto;
    }
    .list-right{
        display: table-cell;
        padding-left:20px;
        .title{
            text-align: left;
            padding-bottom:10px;
            line-height: 40px;
            color: #333;
            span:first-child{
                font-size: 30px;
            }
            span:last-child{
                font-size: 24px;
            }
        }
        >p{
            text-align: justify;
            color:$subtitle-color;
            font-size: 24px;
            padding-right:50px;
            padding-bottom:40px;
        }
        .list-img{
            overflow: hidden;
            padding-bottom:30px;
        }
        .cash-list{
            span{
                width:82px;
                height: 47px;
                display: block;
                float: left;
                margin-right:23px;
            }
            span:nth-child(1){
                background: url('/static/images/icons/cash_icon1.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(2){
                background: url('/static/images/icons/cash_icon2.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(3){
                background: url('/static/images/icons/cash_icon3.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(4){
                background: url('/static/images/icons/cash_icon4.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(5){
                background: url('/static/images/icons/cash_icon5.png') no-repeat;
                background-size: 100% 100%;
                margin-right:20px;
            }
            span:last-child{
                margin-right:0;
                width:32px;
                line-height: 47px;
            }
        }
        .haufei-list{
            span{
                width:82px;
                height: 47px;
                display: block;
                float: left;
                margin-right:23px;
            }
            span:nth-child(1){
                background: url('/static/images/icons/hf_icon1.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(2){
                background: url('/static/images/icons/hf_icon2.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(3){
                background: url('/static/images/icons/hf_icon3.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(4){
                background: url('/static/images/icons/hf_icon4.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(5){
                background: url('/static/images/icons/hf_icon5.png') no-repeat;
                background-size: 100% 100%;
                margin-right:20px;
            }
            span:last-child{
                margin-right:0;
                width:32px;
                line-height: 47px;
            }
        }
        .zhuanpan-list{
            span{
                width:80px;
                height: 80px;
                display: block;
                float: left;
                margin-right:24.5px;
            }
            span:nth-child(1){
                background: url('/static/images/icons/zp_icon1.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(2){
                background: url('/static/images/icons/zp_icon2.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(3){
                background: url('/static/images/icons/zp_icon6.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(4){
                background: url('/static/images/icons/zp_icon4.png') no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(5){
                background: url('/static/images/icons/zp_icon3.png') no-repeat;
                background-size: 100% 100%;
                margin-right:20px;
            }
            span:last-child{
                margin-right:0;
                width:32px;
                line-height: 80px;
            }
        }
        .zhuanpan-text-list{
            span{
                width:80px;
                display: block;
                float: left;
                margin-right:24px;
                font-size: 24px;
                color:$subtitle-color;
            }
        }
    }
}
.activity-list:last-child{
    margin-bottom: 0;
}
</style>
