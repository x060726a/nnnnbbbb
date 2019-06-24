<template>
<div class="app-header web-height"
    :class="{
        theme:routerStatus.title.name=='兑换',
    }">
    <span @click="selectYear" class="spYear" v-if="$store.state.routerStatus.title.name=='历史期数'">{{year}}</span>
    <!-- 返回 -->
    <div class="back back-web-posi"
        :class="{
            theme:routerStatus.title.name=='兑换',
        }"
        v-if="routerStatus.leftBackIcon&&routerStatus.title.name!=='搜索'" @click="goback()">
        <span class="iconfont icon-fanhui"></span>
    </div>
    <!-- 返回 -->

    <!-- 标题 -->
    <div class="title" v-if="routerStatus.title.isTab==false&&routerStatus.title.name!=='首页'&&routerStatus.title.name!=='搜索'&&routerStatus.title.name!=='帖子内容'" :class="{theme:routerStatus.title.name=='兑换'}">{{routerStatus.title.name}}</div>
    <!-- 标题 -->

    <!-- 搜索栏 -->
    <div
        v-if="routerStatus.title.name=='首页'||routerStatus.title.name=='帖子内容'"
        :class="{
            'index-search':routerStatus.title.name=='首页',
            'xq-search':routerStatus.title.name=='帖子内容'
        }"
        @click="$router.push({path:'/search'})"
        >
        <i class="iconfont icon-search"></i>
        <div>搜索帖子、公众号、高手榜...</div>
    </div>
    <!-- 搜索栏 -->

    <!-- 最右边的按钮 -->
    <a v-if="$store.state.routerStatus.title.name=='发帖'" class="submit-btn" @click="sendSendText">发送</a>
    <a v-if="routerStatus.rightIcon" @click="goRouter(routerStatus.rightIcon)" class="iconfont web-posi"
        :class="{
            'icon-edit fatie':routerStatus.rightIcon.className=='fatie',
            'thjilv':routerStatus.rightIcon.className=='thjilv',
            'qiandao':routerStatus.rightIcon.className=='qiandao',
            'kefu':routerStatus.rightIcon.className=='kefu'
        }
    ">{{routerStatus.rightIcon.className=='qiandao'?(isActiveToday?'未签到':'已签到'):routerStatus.rightIcon.text}}</a>
    <!-- 最右边的按钮 -->
</div>
</template>
<script>
import {mapGetters,mapActions} from 'Vuex'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            key: 0,
            year: '年份筛选',
            title:'',
            rightIcon:false,
            v:''
        }
    },
    computed:{
        ...mapGetters(['routerStatus','headerActive','isActiveToday','isApp']),
        ...mapState(['yearNum'])
    },
    methods:{
        ...mapActions(['getQiandao','sendText','chooseBall']),

        getActive(id){
            if(this.$store.state.routerStatus.title.name=='首页'){
                this.$store.commit('headRefresh');
            }
            this.$store.commit('headerActive',id);
        },
        goRouter(rightIcon){
            var that = this;
            if(rightIcon.text=='签到'){
                this.openQiandao();
                return;
            }
            if(this.$store.state.routerStatus.rightIcon.className=='kefu'){
                window.location=this.$store.state.sysTem.online_service.value;
                return;
            }
            if(this.$store.state.user==''){
                if(rightIcon.className=='fatie'){
                    this.$vux.confirm.show({
                        content:'确认发帖？',
                        confirmText:'登录',
                        onConfirm () {
                            that.$router.push({path:'/login'});
                        }
                    })
                }
            }else{
                this.$router.push({path:rightIcon.routerPath})
            }
        },
        goback(){
            if(this.$route.name=="登录" || this.$route.name=="选择喜好"){
                this.$router.push({path:'/main'})
                return true;
            }
            if(this.$route.name=="注册"){
                this.$router.push({path:'/login'})
                return true;
            }
            if(this.$route.name=="帖子详情"&&this.$route.query.offset!=undefined&&this.$route.query.tab!=undefined&&this.$route.query.type!=undefined){
                this.$router.push({path:'/main'})
                return true;
            }
            this.$router.go(-1)
        },
        //打开签到弹窗
        openQiandao(){
            this.$store.commit('qiandaoStatus',true)
        },
        //发送--发帖
       sendSendText(){
            var that = this
            if(this.$store.state.fatietitle==''){
                this.$vux.toast.text('标题不能为空','middle')
                return;
            }
            if(!this.$store.state.chooseObj){
                this.$vux.toast.text('内容不能为空','middle')
                return;
            }
            var title = [],postTitle=[],content='',postContent = '';
            if(this.$store.state.headerActive==0){
                if(this.$store.state.fatietitle==''){
                    for(var k in this.$store.state.chooseObj){
                        if(this.$store.state.chooseObj[k].length>0){
                            title = title.concat(this.$store.state.chooseObj[k])
                        }
                    }
                }else{
                    title = this.$store.state.fatietitle;
                }
                var obj = {
                    ball:'号码',
                    colorBall:'色波',
                    danshuang:'单双',
                    daxiao:'大小',
                    jiaye:'家野',
                    pingtexiao:'平特肖',
                    tetou:'特头',
                    tewei:'特尾',
                    texiao:'特肖',
                    title:'标题',
                    wuxing:'五行',
                }
                for(var k in this.$store.state.chooseObj){
                    if(this.$store.state.chooseObj[k].length>0){
                        content += "<p class='tiezi'>"+obj[k]+":"+this.$store.state.chooseObj[k].join(',')+"</p>"
                        postContent += "<p>"+obj[k]+":"+this.$store.state.chooseObj[k].join(',')+"</p>"
                    }
                }
            }else{
                title = this.$store.state.fatietitle
                content = "<div class='dailog-tie-neirong'>"+this.$store.state.chooseObj+"</div>"
                postContent = this.$store.state.chooseObj
            }
            this.$vux.confirm.show({
                title: '['+this.$store.state.nextIssue.qihao+'期]：'+title,
                content: content,
                onConfirm () {
                    that.$vux.loading.show({
                        text: '发送中',
                    });
                    var postData = that.$qs.stringify({
                        title:'['+that.$store.state.nextIssue.qihao+'期]：'+title,
                        content:postContent
                    })
                    that.$http.post('/v1/user/ties-publish',postData).then(res=>{
                        if(res.code==0){
                            that.$vux.toast.text('发送成功', 'middle')
                            that.$store.commit('indexHeadActive',2)
                            that.$router.push('/main');
                        }else{
                            that.$vux.toast.text(res.msg_zh)
                        }
                        that.$vux.loading.hide();
                    })
                }
            })
        },
        // 年份选择
        selectYear () {
            this.key++
            this.$store.commit('selectYear', this.key)
        }
    },
    watch: {
        yearNum(val) {
            this.year = val
        }
    }
};
</script>
<style lang="scss" scoped>
.search-cencel{
    font-size: 32px;
    line-height: 56px;
    position: absolute;
    right:26px;
    bottom: 17px;
    color:#fff;
}
.index-search{
    margin-left:26px;
    width:500px;
    height: 56px;
    padding-left:70px;
    background: #fff;
    margin-top:15px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    >div{
        line-height: 56px;
        color:#999;
        font-size: 28px;
        text-align: left;
        user-select: none;
    }
    input{
        height: inherit;
        width:100%;
        font-size: 28px;
        line-height: 56px;
    }
    i{
        position: absolute;
        left: 20px;
        z-index: 1;
        font-size: 36px;
        text-align: center;
        line-height: 56px;
        color:#999;
    }
}
.xq-search{
    margin-left:65px;
    width:460px;
    height: 56px;
    padding-left:70px;
    background: #fff;
    margin-top:15px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    >div{
        line-height: 56px;
        color:#999;
        font-size: 28px;
        text-align: left;
        user-select: none;
    }
    input{
        height: inherit;
        width:100%;
        font-size: 28px;
        line-height: 56px;
    }
    i{
        position: absolute;
        left: 20px;
        z-index: 1;
        font-size: 36px;
        text-align: center;
        line-height: 56px;
        color:#999;
    }
}
.web-height{
    height: $web-height;
}
.app-height{
    height: $app-height;
}
.app-header{
    background: $theme-color;
    position: fixed;
    top: 0;
    width:100%;
    z-index: 6;
    .pad{
        height: 40px;
    }
    .back-web-posi{
        top: 0px;
    }
    .back-app-posi{
        top: 40px;
    }
    .back{
        position: absolute;
        font-weight: 500;
        left:0;
        font-size: 28px;
        color:$bg-color;
        line-height: 88px;
        min-width: 80px;
        >span{
            display:block;
            float: left;
            height: 88px;
            font-size: 40px;
            width:34px;
            margin-left:16px;
        }
        >div{
            float: left;
            margin-left:10px;
            font-size: 28px;
        }
    }
    .title{
        line-height: 88px;
        font-size: 36px;
        color:$bg-color;
        text-align: center;
    }
    .theme{
        background: $theme-color;
        color:#fff;
        border:$theme-color 1px solid;
        span{
            color:#fff;
        }
    }

    .fatie{
        position: absolute;
        right:16px;
        display: block;
        width: 110px;
        height: 50px;
        line-height: 50px;
        z-index: 2;
        font-size: 40px;
        color:$bg-color;
        text-align: left;
    }
    .web-posi{
        top: 20px;
    }
    .app-posi{
        top: 63px;
    }
    .unlogin{
        position: absolute;
        right:25px;
        display: block;
        width: 60px;
        height: 50px;
        z-index: 2;
        font-size: 40px;
        color:$bg-color;
    }
    .unlogin::after{
        content:'请登录';
        display: block;
        position: absolute;
        bottom:-23px;
        left: -20px;
        font-size: 22px;
        width: 100px;
    }
    .fatie:after{
        content:'发帖';
        display: block;
        position: absolute;
        line-height: 50px;
        top:2px;
        left:45px;
        font-size: 28px;
        width: 100px;
    }
    .kefu{
        position: absolute;
        right:16px;
        top: 0;
        display: block;
        height: 88px;
        line-height: 88px;
        z-index: 2;
        color:$bg-color;
        font-size: 34px;
    }
    .thjilv{
        position: absolute;
        right:7px;
        top: 11px;
        display: block;
        width: 40px;
        height: 40px;
        z-index: 2;
        background: url('/static/images/css_sprite3.png') -13px -62px no-repeat;
        transform: scale(0.7);
    }
    .qiandao{
        position: absolute;
        right:20px;
        top: 40px;
        display: block;
        z-index: 2;
        color:$subtitle-color;
        font-size: 32px;
        line-height: 50px;
        text-align: left;
        border:$bg-color 1px solid;
        border-radius: 50px;
        padding-left:10px;
        padding-right:10px;
        color:#fff;
    }
    .qdactive{
        color:#f9dd00;
        border:#f9dd00 1px solid;
    }
    .submit-btn {
        position: absolute;
        top: 0;
        right:0;
        display: block;
        color: #fff;
        font-size: 30px;
        height:  $web-height;
        padding-right: 16px;
        line-height:  $web-height;
    }
}
.spYear {
    position: absolute; right: 20px; color: white; font-size: 30px; line-height: 88px;
}
</style>
