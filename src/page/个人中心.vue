<template>
<div class="user-wrap">
    <div class="user-data">
        <span class="qiandao" @click="$router.push({path:'/qiandao'})" :class="{qdactive:!isActiveToday}">{{isActiveToday?'已签到':'未签到'}}</span>
        <div class="avatar-wrap">
            <div class="avatar"><img v-if="user.avatar!=undefined" :src="'/static/images/avatar/'+user.avatar+'.jpg'"></div>
            <div class="nickname">{{user.nickname==''?'未填写':user.nickname}}</div>
            <div class="username">{{user.username==''?'未填写':user.username}}</div>
        </div>
        <div class="userabout">
            <div @click="$router.push({path:'/mypost'})"><span>{{total.ties==null?0:total.ties}}</span><span>我的帖子</span></div>
            <div @click="$router.push({path:'/collection'})"><span>{{total.colls==null?0:total.colls}}</span><span>我的收藏</span></div>
            <div @click="$router.push({path:'/mynote'})"><span>{{total.follows==null?0:total.follows}}</span><span>我的关注</span></div>
        </div>
    </div>
    <ul class="user-menus">
        <li><i class="iconfont icon-recharge"></i><router-link to="/mymoney"><span>我的金币</span><span>金币兑豪礼 幸运转盘送不停</span></router-link><span class="iconfont icon-fanhui jingbi"></span></li>
        <li><i class="iconfont icon-dashang"></i><router-link to="/reward"><span>我的打赏</span><span>打赏功能最新上线</span></router-link><span class="iconfont icon-fanhui jingbi dashang"></span></li>
        <li><i class="iconfont icon-selection"></i><router-link to="/recording"><span>竞猜记录</span><span>聊天室互动竞猜</span></router-link><span class="iconfont icon-fanhui jingbi jilu"></span></li>
        <li><i class="iconfont icon-share"></i><router-link to="/mypromotion"><span>我的推广</span><span>邀请好友一起赢金币</span></router-link><span class="iconfont icon-fanhui  jingbi tuiguang"></span></li>
        <li><i class="iconfont icon-xingxing"></i><router-link to="/loveType"><span>喜爱的类型</span><span>选择自己喜爱的帖子类型</span></router-link><span class="iconfont icon-fanhui"></span></li>
    </ul>
    <div class="kefu">
        <div class="item"><i class="iconfont icon-pulldown"></i><router-link to="/download"><span>下载APP</span><span>随时随地掌握最新咨询</span></router-link><span class="iconfont icon-fanhui xiazai"></span></div>
        <div class="item"><i class="iconfont icon-kefu"></i><a :href="$store.state.sysTem&&$store.state.sysTem.online_service.value">联系客服</a><span class="iconfont icon-fanhui"></span></div>
    </div>
    <div class="loginout" @click="$router.push({path:'/setting'})"><i class="iconfont icon-shezhi"></i>设置<span class="iconfont icon-fanhui"></span></div>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return {
            ties:0,
            fans:0,
            total:''
            
        }
    },
    computed:{
        ...mapGetters({
            user:'user',
            isActiveToday:'isActiveToday',
        })
    },
    created(){
        this.$store.commit('xqScrollTop',0)
        this.getQiandao();//查询今天签到了没有
        this.getTotal();
        this.getUserData();
    },
    methods:{
        ...mapActions(['getQiandao','getUserData']),
        //获取我的帖子
        getMyPost(){
            var that = this;
            var postData = that.$qs.stringify({
                offset:0,
                status: 1
            })
            that.$http.post('/v1/user/ties',postData).then(res=>{
                if(res.code==0){
                    that.ties = res.data.records.length;
                }
            })
        },
        //获取统计信息
        getTotal(){
            var that = this;
            that.$http.post('/v1/user/summary').then(res=>{
                if(res.code==0){
                    that.total = res.data[0]
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.user-wrap{
    height: 100%;
    overflow-y: scroll;
    .user-data{
        background: $theme-color;
        position: relative;
        padding-top:60px;
        .qiandao{
            position: absolute;
            top: 20px;
            right: 15px;
            font-size: 22px;
            color:#fff;
            padding-left:15px;
            padding-right:15px;
            border:#fff 1px solid;
            line-height: 38px;
            height: 38px;
            border-radius: 25px;
            padding-top:2px;
        }
        .qdactive{
            border:#f9dd00 1px solid;
            color:#f9dd00;
        }
        .avatar-wrap{
            height: 230px;
            position: relative;
            .hui{
                color: #e0e0e0!important;
            }
            .avatar{
                width: 120px;
                height: 120px;
                margin: auto;
                border:4px solid #fff;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
                img[lazy=loading] {
                    object-fit: none!important;
                    margin: auto;
                }
            }
            .nickname{
                height: 50px;
                line-height: 50px;
                font-size: 34px;
                margin-top:20px;
                color: #fff;
                overflow: hidden;
                text-align: center;
            }
            .username{
                height: 35px;
                line-height: 35px;
                font-size: 28px;
                color: #e0e0e0;
                overflow: hidden;
                text-align: center;
            }
        }
        .userabout{
            display: flex;
            >div{
                flex: 1;
                span{
                    display: block;
                    color:#fff;
                }
                span:first-child{
                    padding-top:40px;
                    padding-bottom:15px;
                    font-size: 32px;
                }
                span:last-child{
                    font-size: 28px;
                    padding-bottom:20px;
                }
            }
        }
    }
    .user-menus{
        margin-top:20px;
        padding: 0 16px 0 16px;
        background: $bg-color;
        li{
            height: 80px;
            line-height: 80px;
            border-bottom:1px solid $border-color;
            text-align: left;
            color:#524f4f;
            position: relative;
            list-style: none;
            a{
                position: absolute;
                display: block;
                width: calc(100% - 70px);
                text-decoration: none;
                padding-left:60px;
                overflow: hidden;
                >span:first-child{
                    font-size: 28px;
                    color:#666666;
                    float: left;
                }
                span:last-child{
                    float: right;
                    color:#999;
                    font-size: 24px;
                    padding-right:20px;
                }
            }
            >span{
                position: absolute;
                right:10px;
                display: inline-block;
                height: 80px;
                width: 40px;
                transform: rotate(180deg);
                font-size: 28px;
                color:$subtitle-color;
            }
            i{
                position: absolute;
                top: 0;
                left:0;
                font-size: 48px;
                line-height: 80px;
                height: 80px;
                width:80px;
                display: inline-block;
                vertical-align: middle;
                color:$theme-color;
            }
            .icon-dashang {
                font-size: 42px;
                left: 3px;
            }
        }
        // li:nth-child(5){
        //     margin-top:20px;
        // }
        li:last-child{
            border:none;
        }
    }
    .kefu{
        margin-top:20px;
        padding: 0 16px 0 16px;
        background: $bg-color;
        .item{
            height: 80px;
            line-height: 80px;
            border-bottom:1px solid $border-color;
            text-align: left;
            color:#524f4f;
            position: relative;
            list-style: none;
            display: block;
            a{
                position: absolute;
                display: block;
                text-decoration: none;
                padding-left:60px;
                font-size: 28px;
                color:#666666;
                width: calc(100% - 70px);
                span:first-child{
                float: left;
                }
                span:last-child{
                    float: right;
                    color:#999;
                    font-size: 24px;
                    padding-right:20px;
                }
            }
            >span{
                    position: absolute;
                    right:10px;
                    display: inline-block;
                    height: 80px;
                    width: 40px;
                    transform: rotate(180deg);
                    font-size: 28px;
                    color:$subtitle-color;
            }
        }
        i{
            position: absolute;
            top: 0;
            left:0;
            font-size: 48px;
            line-height: 80px;
            height: 80px;
            width:80px;
            display: inline-block;
            vertical-align: middle;
            color:$theme-color;
        }
        .item:last-child{
            border:none;
        }
    }
    .loginout{
        margin-top:20px;
        margin-bottom:30px;
        height: 80px;
        line-height: 80px;
        padding: 0 10px 0 76px;
        background: $bg-color;
        font-size: 28px;
        color:#666666;
        text-align: left;
        position: relative;
        i{
            position: absolute;
            left:19px;
            font-size: 44px;
            line-height: 80px;
            height: 80px;
            width:80px;
            display: inline-block;
            vertical-align: middle;
            color:$theme-color;
        }
        span{
            position: absolute;
            right:26px;
            transform: rotate(180deg);
            font-size: 40px;
            color:$subtitle-color;
        }
    }
}
</style>
