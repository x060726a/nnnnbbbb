<template>
<div class="content" v-if="res">
    <div class="username">
        <div class="avatar"><img :src="'/static/images/avatar/'+(res&&res.user.avatar)+'.jpg'"></div>
        <div class="text">
            <h1>{{res&&res.user.nickname}}</h1>
            <p>{{res&&res.user.level}}</p>
        </div>
        <div class="post" :class="{isFollowed:res.user.isFollowed}" @click="postSomeOne">
            <span v-if="!res.user.isFollowed">关注</span>
            <span v-if="res.user.isFollowed">已关注</span>
        </div>
        <div class="badge-sl">
            <span>{{res&&res.win_stat.win_rate}}%胜率</span>
        </div>
    </div>
    <div class="some-detail">{{typeName[$route.params.id&&$route.params.id.substring(0,1)-1]}}<span class="blue">{{active}}期</span>统计:命中<span class="blue">{{res&&res.win_stat.win_num}}期</span>,命中率<span class="blue">{{res&&res.win_stat.win_rate}}%</span>,最大连中<span class="blue">{{res&&res.win_stat.continue_win_num}}期</span></div>
    <div class="issue">
        <div class="title">
            <div class="qihao">第<span>{{res.kj_record.qihao}}</span>期开奖结果</div>
            <a class="btn" :href="sysTem&&sysTem.quick_bet.value">投注</a>
            <div class="next-time">下期开奖<span>{{Countdown.sy_h<10?'0'+Countdown.sy_h:Countdown.sy_h}}:{{Countdown.sy_m<10?'0'+Countdown.sy_m:Countdown.sy_m}}:{{Countdown.sy_s<10?'0'+Countdown.sy_s:Countdown.sy_s}}</span></div>
        </div>
    </div>
    <div class="result">
        <span :class="{
            'mrgr20':idx==(res&&res.kj_record.zm.split(',').length-1),
            red:liuhe['红'].indexOf(ele*1)>-1,
            blue:liuhe['蓝'].indexOf(ele*1)>-1,
            green:liuhe['绿'].indexOf(ele*1)>-1,
        }"
        v-for="(ele,idx) in res&&res.kj_record.zm.split(',')"
        >{{ele}}</span>
        <span class="mrgr20 te">特</span>
        <span :class="{
            red:liuhe['红'].indexOf(res&&res.kj_record.tm*1)>-1,
            blue:liuhe['蓝'].indexOf(res&&res.kj_record.tm*1)>-1,
            green:liuhe['绿'].indexOf(res&&res.kj_record.tm*1)>-1}">{{res&&res.kj_record.tm}}</span>
    </div>
    <div class="result-data">
        <div class="tab">
            <div class="tab-wrap">
                <span @click="tabIssue(10)">10期</span>
                <span @click="tabIssue(20)">20期</span>
                <span @click="tabIssue(50)">50期</span>
                <div class="mask" :class="{'posi1':active==10,'posi2':active==20,'posi3':active==50}">{{activeName[active]}}</div>
            </div>
        </div>
        <div class="table" :class="{pingte:$route.params.id&&$route.params.id.substring(0,1)*1==6||$route.params.id&&$route.params.id.substring(0,1)*1==7}">
            <table style="border-spacing:0">
                <tr><td>期数</td><td>开奖</td><td>预测内容</td><td>准</td></tr>
                <tr class="yuece">
                    <td>{{res&&res.next_kj_record.qihao.substring(4,res.next_kj_record.qihao.length)}}期</td>
                    <td>??</td>
                    <td v-if="!yuceData"><a @click="chakanyuce()" class="copy">查看预测</a></td>
                    <td v-else>
                        <div :class="{ershima:$route.params.id&&$route.params.id.substring(0,1)*1==5}">
                            <span v-for="ele in yuceData.split(',')">{{ele<10?'0'+ele:ele}}</span>
                        </div>
                    </td>
                    <td>??</td>
                </tr>
                <tr v-for="(ele,idx) in res&&res.records">
                    <td>{{ele.action_qishu.substring(4,ele.action_qishu.length)}}期</td>
                    <td><span v-for="(ele1,idx1) in ele.tm.split(',')" :class="{red:ele.is_win&&idx1==6}">{{ele1<10?'0'+ele1:ele1}}{{idx1!=6&&($route.params.id&&$route.params.id.substring(0,1)*1==6||$route.params.id&&$route.params.id.substring(0,1)*1==7)?',':''}}</span></td>
                    <td :class="{red:ele.is_win}" v-if="$route.params.id&&$route.params.id.substring(0,1)*1==5||$route.params.id&&$route.params.id.substring(0,1)*1==6">
                        <div :class="{ershima:$route.params.id&&$route.params.id.substring(0,1)*1==5}">
                            <span 
                                v-for="(ele1,idx1) in ele.action_data.split(',')" 
                                :class="{
                                    'c-red':ele.tm*1==ele1*1,
                                    'z-red':getSx(ele.tm,ele1)
                                }">{{ele1<10?'0'+ele1:ele1}}{{idx1!=ele.action_data.split(',').length-1?',':''}}</span>
                        </div>
                    </td>
                    <td v-else :class="{red:ele.is_win}">{{ele.action_data}}</td>
                    <td :class="{red:ele.is_win}">{{ele.is_win?'准':'错'}}</td>
                </tr>
            </table>
        </div>

    </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'Vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            liuhe:JSON.parse(localStorage.getItem('liuhe')).ballcolor,
            active:10,
            res:false,
            activeName:{
                '10':'10期',
                '20':'20期',
                '50':'50期'
            },
            typeName:['色波','大小','单双'],
            Countdown:{
                sy_h:0,
                sy_m:0,
                sy_s:0
            },
            color:['red','blue','green'],
            yuceData:false,
            isloading:false,
            qq:''
        }
    },
    computed:{
        ...mapGetters(['sysTem'])
    },
    created(){
        this.getDetail(this.active);
    },
    methods:{
        ...mapActions(['sendNote','cancelNote']),
        getSx(ele1,ele2){
            var sx = JSON.parse(localStorage.getItem('liuhe')).ballpanel
            var len = ele1.split(',').length
            var zsx = ''
            for(var k in sx){
                if(sx[k].indexOf(ele1.split(',')[len-1]*1)>-1){
                    zsx = k
                }
            }
            return ele2==zsx
        },
        async postSomeOne(){
            var that = this
            if(this.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'关注功能需登陆后才能使用',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            var type = this.$route.params.id.substring(0,1)
            var postData = this.$qs.stringify({
                id:this.res.user.id,
                category:2,
                game_type:type,
            })
            this.isloading = true
            if(this.res.user.isFollowed){
                //取关
                var res = await this.cancelNote(postData)
                this.isloading = false
                this.res.user.isFollowed = false
                return
            }
            if(!this.res.user.isFollowed){
                //关注
                var res = await this.sendNote(postData)
                this.isloading = false
                this.res.user.isFollowed = true
                return
            }
        },
        getDetail(idx){
            var that = this;
            var type = that.$route.params.id.substring(0,1)
            var uid = that.$route.params.id.substring(2,that.$route.params.id.length)
            that.$http.get('/v1/home/master-bets',{
                params:{
                    limit:idx,
                    uid:uid,
                    type:type,
                    current_uid:that.$store.state.user.id
                }
            }).then(res=>{
                this.$nextTick(()=>{
                    this.Clipboard = new ClipboardJS('.copy',{
                        text:()=>{
                            return that.qq.split(',')[that.$route.query.number*1-1];
                        }
                    });
                })
                if(res.code==0){
                    that.res = res.data
                    this.active = idx;
                    that.qq = res.data.contact_qq
                    this.openCountdown(res.data.next_kj_record.time*1000);
                }
                that.$vux.loading.hide()
            })
        },
        tabIssue(idx){
            this.$vux.loading.show({
                text:'加载中'
            })
            this.getDetail(idx);
        },
        //倒计时
        openCountdown(time){
            var that = this;
            var h,m,s,sy_h,sy_m,sy_s;
            var sy_time = time - Date.parse(new Date());
            s = sy_time / 1000
            sy_s = s % 60
            m = (s / 60).toFixed() * 1
            sy_m = m % 60
            sy_h = (m / 60).toFixed() * 1
            that.Countdown.sy_h = sy_h
            that.Countdown.sy_m = sy_m
            that.Countdown.sy_s = sy_s
            var intetId = setInterval(()=>{
                if(sy_s==0){
                    sy_s=59
                    sy_m--
                    that.$set(that.Countdown,'sy_m',sy_m)
                    if(sy_m==0){
                        sy_m=59
                        sy_h--
                        that.$set(that.Countdown,'sy_h',sy_h)
                        if(sy_h==0){
                            clearInterval(intetId)
                            this.getDetail(this.active);
                        }
                    }
                }else{
                    sy_s--
                    that.$set(that.Countdown,'sy_s',sy_s)
                }
            },1000)
        },
        //查看预测
        chakanyuce(){
            var that = this;
            if(that.$route.params.id.substring(0,1)*1==3&&(that.$route.query.number*1==1||that.$route.query.number*1==2||that.$route.query.number*1==3)){
                this.Clipboard.on('success',()=>{
                    that.$vux.confirm.show({
                        showCancelButton:false,
                        content:'高手微信'+that.qq.split(',')[that.$route.query.number*1-1]+'复制成功',
                        onConfirm () {
                            window.location.href = 'weixin://';
                        }
                    })
                })
                this.Clipboard.on('error',()=>{
                    that.$vux.confirm.show({
                        showCancelButton:false,
                        content:'高手微信'+that.qq.split(',')[that.$route.query.number*1-1]+'复制成功',
                        onConfirm () {
                            window.location.href = 'weixin://';
                        }
                    })
                })
                return;
            }
            if(that.$store.state.user==''){
                that.$vux.confirm.show({
                    content:'请先登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }else{
                that.getYueCe();
            }
        },
        //查看预测信息
        getYueCe(){
            var that = this;
            that.$http.get('/v1/home/master-forecast',{params:{qihao:that.res.next_kj_record.qihao,uid:that.res.user.id,type:that.$route.params.id.substring(0,1)}}).then(res=>{
                if(res.code==0){
                    that.yuceData = res.data.action_data
                }
            })
        }
    },
    destroyed(){
        this.Clipboard.destroy();
    }
}
</script>
<style lang="scss" scoped>
.copy{
    display: block;
    color:$theme-color;
    text-decoration: none;
}
.content{
    height: 100%;
    -webkit-overflow-scrolling:touch;
    position: relative;
    .copyling{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        // opacity: 0;
    }
    .clickbtn{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .username{
        padding:20px 0 20px 16px;
        background: #fff;
        border-bottom:$border-color 1px solid;
        overflow: hidden;
        >div{
            float: left;
        }
        .avatar{
            width:100px;
            height: 100px;
            overflow: hidden;
            border-radius: 50%;
            margin-right:10px;
            img{
                width: 100%;
            }
        }
        .text{
            max-width:calc(100% - 385px);
            text-align: left;
            h1{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 34px;
                color:#333;
                font-weight: 500;
            }
            p{
                font-size: 22px;
                color:#999;
            }
        }
        .badge-sl{
            height: 100px;
            width:148px;
            float: right;
            span{
                margin-top:20px;
                display: block;
                height: 60px;
                line-height: 60px;
                font-size: 28px;
                background: #ff6e75;
                color:#fff;
                text-align: center;
                border-radius: 50px 0 0 50px;
            }
        }
        .post{
            width:110px;
            height: 48px;
            line-height: 48px;
            background: $theme-color;
            color:#fff;
            border-radius: 8px;
            font-size: 26px;
            margin-left:17px;
            margin-top:28px;
            overflow: hidden;
            .spinner{
                display: block;
                width:40px;
                height: 40px;
                margin: 4px auto 0 auto;
            }
        }
        .isFollowed{
            border:1px solid #e1e1e1;
            color: #999;
            background: #fff;
        }
    }
    .some-detail{
        padding-top:20px;
        padding-bottom:20px;
        line-height: 40px;
        background: #fff;
        border-bottom:$border-color 1px solid;
        font-size: 28px;
        padding-left:16px;
        text-align: left;
        .blue{
            color:$theme-color;
        }
    }
    .issue{
        padding:20px 16px;
        font-size: 26px;
        overflow: hidden;
        background: #fff;
        color:#666;
        line-height: 44px;
        span{
            color:$theme-color;
        }
        .qihao{
            float: left;    
        }
        .next-time{
            float: right;
            margin-right:20px;
        }
        .btn{
            float: right;
            height: 44px;
            background: $theme-color;
            color:#fff;
            font-size: 24px;
            width:120px;
            border-radius: 40px;
        }
    }
    .result{
        padding:0 22px 20px 26px;
        overflow: hidden;
        background: #fff;
        span{
            float: left;
            margin-right:30px;
            width:64px;
            height: 64px;
            line-height: 64px;
            border-radius: 50%;
            font-size: 30px;
            color:#fff;
        }
        span.red{
            background: radial-gradient(circle at 0px 0px, #ff9677, #f93e30);
        }
        span.blue{
            background: radial-gradient(circle at 0px 0px, #35e0ea, #07aaf3);
        }
        span.green{
            background: radial-gradient(circle at 0px 0px, #24efb8, #33bfb7);
        }
        span:last-child{
            margin-right:0;
        }
        .mrgr20{
            margin-right:20px;
        }
        .te{
            border-radius: 0;
            color:#666;
            background: none;
        }
    }
    .result-data{
        margin-top:20px;
        height: calc(100% - 408px);
        .tab{
            padding-top:20px;
            padding-bottom:20px;
            background: #fff;
            border-bottom: $border-color 1px solid;
            .tab-wrap{
                width:600px;
                margin: auto;
                height: 68px;
                line-height: 68px;
                display: flex;
                background: #f2f2f2;
                border-radius: 34px;
                font-size: 30px;
                position: relative;
                span{
                    flex: 1;
                    color:#999;
                }
                .mask{
                    position: absolute;
                    width:200px;
                    height: 68px;
                    background: $theme-color;
                    color:#fff;
                    border-radius: 34px;
                    transition: all ease .5s;
                }
                .posi1{
                    left: 0;
                }
                .posi2{
                    left: 200px;
                }
                .posi3{
                    left: 400px;
                }
            }
        }
        .table{
            width: 100%;
            -webkit-overflow-scrolling:touch;
            height: calc(100% - 110px);
            background: #fff;
            overflow-y: auto;
            table{
                width:100%;
                border-collapse: separate;
                font-size: 30px;
                tr.yuece{
                    td:nth-child(3){
                        >div.ershima{
                            span{
                                color:$theme-color;
                            }
                        }
                    }
                }
                tr{
                    height: 80px;
                    td{
                        border-bottom:1px solid #e1e1e1;
                    }
                    td:nth-child(2){
                        max-width: 50px;
                    }
                    td:nth-child(3){
                        max-width: 80px;
                        word-break: break-word;
                        padding-top:20px;
                        padding-bottom:20px;
                        >div.ershima{
                            overflow: hidden;
                            font-size: 30px;
                            span{
                                float: left;
                                color:$theme-color;
                                display: block;
                                width:45px;
                                color:#333;
                            }
                            span.c-red{
                                color:red;
                            }
                        }
                    }
                    td:nth-child(4){
                        min-width: 50px;
                        word-break: break-word;
                    }
                    td.red{
                        color:red;
                    }
                }
                tr:nth-child(2){
                    font-size: 28px;
                    color:$theme-color;
                    td:nth-child(3){
                        font-weight: bold;
                    }
                }
            }
        }
        .pingte{
            table tr td:nth-child(2){
                max-width: 200px;
                font-size: 28px;
                span.red{
                    color:red;
                }
            }
            table tr td:nth-child(3){
                max-width: 180px;
                >div{
                    display: flex;
                    span{
                        font-size: 26px;
                        color:#333;
                        flex: 1;
                    }
                    span.z-red{
                        color:red;
                    }
                }
            }
            table tr.yuece td:nth-child(3){
                >div{
                    span{
                        color:$theme-color;
                    }
                }
            }
        }
    }
}
</style>
