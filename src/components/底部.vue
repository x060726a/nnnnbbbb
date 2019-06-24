<template>
    <div class="footer-bar">
        <router-link to="/main">
            <span class="iconfont" :class="{'icon-home1':active!=0,'icon-homefill':active==0}"></span>
            <span>首页</span>
        </router-link>
        <router-link to="/liuhe">
            <span class="iconfont" :class="{'icon-circle':active!=1,'icon-circlefill':active==1}"></span>
            <span>六合大全</span>
        </router-link>
        <a :href="sysTem&&sysTem.quick_bet.value">
            <span class="lottery"></span>
            <!--<span class="lottery-text">投注</span>-->
        </a>
        <router-link to="/chat">
            <span class="iconfont icon-comment"></span>
            <span>聊天室</span>
        </router-link>
        <router-link  to="/manage">
            <span class="iconfont" :class="{'icon-my':active!=2,'icon-myfill':active==2}"></span>
            <span>个人中心</span>
        </router-link>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return {
            active:false,
        }
    },
    computed:{
        ...mapGetters(['sysTem'])

    },
    watch:{
        '$store.state.routerStatus'(val,oval){
            if(val.title.name == '六合大全'){
                this.active = 1
            }
            if(val.title.name=="首页"){
                this.active = 0
            }
            if(val.title.name=="个人中心"){
                this.active = 2
            }

        }
    },
    created(){
        if(this.$store.state.routerStatus.title.name == '六合大全'){
            this.active = 1
        }
        if(this.$store.state.routerStatus.title.name=="首页"){
            this.active = 0
        }
        if(this.$store.state.routerStatus.title.name=="个人中心"){
            this.active = 2
        }
    }
}
</script>
<style lang="scss" scoped>
.footer-bar{
    width: 100%;
    height: $bot-height;
    background: $bg-color;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    border-top: 1px solid #e1e1e1;
    .main-active{
        color:$theme-color;
    }
    >a{
        flex: 1;
        color:$subtitle-color;
        text-decoration: none;
        span:first-child{
            display: block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            margin: 3px auto 0px auto;
            font-size: 40px;
            text-align: center;
        }
        span:last-child{
            display: block;
            font-size: 26px;
            margin-top:-15px;
            text-align: center;
            padding-top:10px;
        }
        span.lottery{
            width: 142px;
            height: 111px;
            background: url('/static/images/icon-logo.png') no-repeat center;
            background-size: 100% 100%;
            border-radius: 50%;
        }
        span.lottery-text{
            margin-top:-2px;
            padding:0;
        }
        .icon-hezi1 {
            font-size: 50px!important;
        }
    }
}

</style>
