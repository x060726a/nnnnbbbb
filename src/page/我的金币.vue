<template>
<div class="context">
    <div class="exchange-center">
        <div class="item" @click="$router.push({path:'/cjquan'})">
            <div class="iconfont icon-ticket"></div>
            <p class="text">抽奖券</p>
            <p class="num">{{user.roll_nums==null?0:user.roll_nums}}</p>
        </div>
        <div class="item" @click="$router.push({path:'/golddetail'})">
            <div class="iconfont icon-recharge"></div>
            <p class="text">六币</p>
            <p class="num">{{user.money}}</p>
        </div>
        <div class="item" @click="$router.push({path:'/mythings'})">
            <div class="iconfont icon-present"></div>
            <p class="text">我的物品</p>
            <p class="num">{{total.gifts==null?0:total.gifts}}</p>
        </div>
    </div>
    <div class="list-wrap">
        <ACTIVITY />    
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            active:0,
            gifId:0,
            list:[],
            total:''
        }
    },
    created(){
        this.getGif();
        this.getTotal();
    },
    computed:{
        ...mapGetters(['user','isApp'])
    },
    methods:{
        //获取礼物列表
        getGif(){
            var that = this
            that.$http.post('/v1/user/gifts').then(res=>{
                if(res.code==0){
                    that.list = res.data
                }
            })
        },
        //获取统计信息
        getTotal(){
            var that = this;
            that.$http.get('/v1/user/summary').then(res=>{
                if(res.code==0){
                    that.total = res.data[0]
                }
            })
        }
    },
    components:{
        ACTIVITY(){
            return {
                component:import('@/page/mymoney/活动列表'),
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.context{
    height: 100%;
    background: $app-bg-color;
    .list-wrap{
        padding:20px 16px;
        height: calc(100% - 230px);
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        .spinner-wrap{
            width: 40px;
            height: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top:-20px;
            margin-left:-20px;
        }
    }
    .exchange-center{
        background: $theme-color;
        display: flex;
        height: 190px;
        .item{
            flex: 1;
            color:#fff;
            div{
                font-size: 44px;
                font-weight: 500;
                display: flex;
                justify-content: center;
                height: 50px;
                line-height: 50px;
                padding-top:20px;
                &.icon-ticket {
                    font-size: 46px;
                }
                &.icon-recharge {
                    font-size: 46px;
                }
            }
            p.text{
                display: flex;
                justify-content: center;
                padding-top:18px;
                padding-bottom:10px;
                font-size: 28px;
                line-height: 32px;
            }
            p.num{
                display: flex;
                justify-content: center;
                font-size: 32px;
            }
        }
    }
}
</style>

