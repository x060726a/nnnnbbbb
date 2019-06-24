<template>
    <div class="big-wrap">
        <div class="content" ref="content">
            <div class="wrap" ref="wrap">
                <div class="title">
                    <!-- 预加载的样式 -->
                    <div v-if="!content" class="lazy-title">
                        <div></div>
                        <div></div>
                    </div>
                    <!-- 预加载的样式 -->
                    <h1 v-if="content" v-text="content.title"></h1>

                    <!-- 预加载的样式 -->
                    <div class="lazy-title-s" v-if="!content">
                        <div class="first"></div>
                        <div class="next-btn"></div>
                    </div>
                    <!-- 预加载的样式 -->
                    <div class="title-s" v-if="content">
                        <div class="first">{{content.read_times==null?0:content.read_times}}阅读 {{content.zan_times}}点赞</div>
                        <!--<span class="win-badge" v-show="$route.query.type!=2">{{content.last_win_probably}}%准确</span>-->
                        <div class="next-btn" @click="nextOne" v-if="nextTieId!=0"><span>查看下一篇</span><i v-if="nextTieId!=0" class="iconfont icon-fanhui"></i></div>
                    </div>
                </div>
                <div class="index-banner">
                    <BANNER />
                </div>
                <!-- 预加载的样式 -->
                <div class="lazy-user" v-if="!content">
                    <span class="avatar"></span>
                    <div class="text">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <!-- 预加载的样式 -->

                <div class="user" v-if="content">
                    <span class="avatar">
                        <img v-if="$route.query.title == 6" :src="'/static/images/avatar/'+content.avatar+'.jpg'" />
                        <!--<img v-if="content&&content.category==9&&content.avatar" :src="'/static/images/avatar/'+content.avatar+'.jpg'">-->
                        <img v-else :src="content.avatar" @click="goHistory">
                    </span>
                    <div class="text">
                        <div class="name">
                            {{content.nickname}}
                            <!--<span @click="goHistory">往期回顾>></span>-->
                        </div>
                        <div class="badge-time">
                            <!--<span class="bgSp">{{content.userlevel}}</span>-->
                            <!--<span class="type">类型</span>-->
                            <span class="type_msg" v-if="$route.query.tab != 2">{{content.category_name}}</span>
                            <span>{{timeago(content.created_at)}}</span>
                        </div>
                        <!--非六友圈展示-->
                        <div v-if="content.uid!=$store.state.user.id && $route.query.tab != 2" class="note-btn-wrap" :class="{isFollowed:content.isFollowed}" @click="toggleNote">
                            <span class="spinner" v-if="isloading"><spinner type="spiral" size="16px"></spinner></span>
                            <span v-if="!content.isFollowed">关注</span>
                            <span v-if="content.isFollowed">已关注</span>
                        </div>
                    </div>
                </div>

                <!-- 预加载的样式 -->
                <div class="lazy-text-res" v-if="!content">
                    <span v-for="ele in 7"></span>
                </div>
                <!-- 预加载的样式 -->

                <div class="text-res" v-if="content" v-html="unescape(content.content)" id="content"></div>
                <!--六友圈展示-->
                <div class="tishi" v-if="$route.query.tab == 2">给作者支持与鼓励</div>
                <div class="dashang" v-if="$route.query.tab == 2">
                    <span class="iconfont icon-shang" @click="openDs()"></span>
                </div>

                <!-- 预加载的样式 -->
                <div class="lazy-tishi" v-if="!content"><span></span></div>
                <div class="lazy-wxerweima" v-if="!content"></div>
                <!-- 二维码六友圈不展示 -->
                <div class="tishi" v-if="content.qrcode_img && $route.query.tab != 2">点击添加专家{{content.qr_type==1?'微信':'QQ'}}，提前解码</div>
                <a class="wxerweima" @click="openApp" v-show="content.qrcode_img && $route.query.tab != 2"><img v-if="sysTem&&content.qrcode_img" :src="content.qrcode_img"></a>

                <!-- 热门工具 -->
                <div class="hot-toolbar">
                    <div>
                        <ul>
                            <li @click="goList('/forum')">六合论坛</li>
                            <li @click="goList('/lotteryopen')">开奖日期</li>
                            <li @click="goList('/cslist')">六合常识</li>
                            <li @click="goList('/tukulist')">六合图库</li>
                            <li @click="goList('/historyissue')">历史期数</li>
                            <li @click="goList('/gslist')">六合公式</li>
                            <li @click="goList('/tjlist')">六合统计</li>
                            <li @click="goList('/zslist')">走势图</li>
                            <li @click="goList('/zllist')">全年资料</li>
                        </ul>
                    </div>
                </div>
                <!-- 热门工具 -->
                <!-- 六友圈展示本地广告图，非六友圈展示后台返回图 -->
                <div class="banner" v-if="content.banner_img && $route.query.tab != 2" @click="goBannerRouter(content.banner_link)"><img :src="content.banner_img"></div>
                <div class="banner" v-if="$route.query.tab == 2"><img :src="'/static/images/banner/banner_v1.01.png'"></div>
                <!-- 广告图 -->

                <!-- 推荐阅读 -->
                <div class="tuijian">
                    <div class="tuijian-title">推荐阅读</div>
                    <ul>
                        <li v-for="ele in tjList" @click="goTuijian(ele)">{{ele.title}}</li>
                    </ul>
                </div>
                <!-- 推荐阅读 -->

                <!-- 评论 -->
                <div class="comment-pancel" v-if="content" ref="comment">
                    <div class="block"><span>评论 {{plData.length}}</span><span>点赞 {{content.zan_times?content.zan_times:0}}</span></div>
                    <div class="comment-list" v-for="(ele,idx) in plData" v-if="plData.length>0">
                        <COMMENT :comment="ele" :last="idx==plData.length-1"/>
                    </div>
                    <div class="loadMore" @click="getPinglun()" v-if="loadAll">点击加载更多评论</div>
                    <div v-if="plData.length==0" class="plnomore">暂无评论</div>
                    <div class="loadMore" v-if="loadAll==false&&plData.length!=0">没有更多了</div>
                </div>
            </div>
            <!-- 评论 -->
        </div>
        <!-- 底部bar -->
        <div class="footer-btn-bar">
            <div class="text" @click="openPop()">说说你的看法</div>
            <div @click="dianzan()" :class="{blue:isDianz}"><i class="iconfont" :class="{'icon-dianzan':isDianz,'icon-dianzan1':isDianz==false,'icon-active':isActive}"></i></div>
            <!--<div :class="{active:content.isCollected}" @click="toggleColle()">-->
                <!--<span class="spinner" v-if="isCollecting"><spinner type="spiral" size="23px"></spinner></span>-->
                <!--<i class="iconfont" v-if="!isCollecting" :class="{'icon-favorfill':content.isCollected,'icon-favor':!content.isCollected}"></i>-->
            <!--</div>-->
            <div><i class="iconfont icon-message1"></i><span v-show="plData.length!=0" class="badge">{{count}}</span></div>
        </div>
        <!-- 底部bar -->
        <!-- 打赏弹框 -->
        <div class="ly-pop" v-if="isdsPop">
            <div class="ly-pop-styleComfir" ref="dsdom">
                <p>请选择打赏金额</p>
                <div class="box first">
                    <span @click="selectMoney(30)" :class="{active:money==30&&!isInput}">30金</span>
                    <span @click="selectMoney(50)" :class="{active:money==50&&!isInput}">50金</span>
                    <span @click="selectMoney(100)" :class="{active:money==100&&!isInput}">100金</span>
                </div>
                <div class="box">
                    <span @click="selectMoney(200)" :class="{active:money==200&&!isInput}">200金</span>
                    <span @click="selectMoney(300)" :class="{active:money==300&&!isInput}">300金</span>
                    <span @click="selectMoney(500)" :class="{active:money==500&&!isInput}">500金</span>
                </div>
                <p class="last">土豪请随意</p>
                <input type="number" placeholder="请输入金额" v-model="money" @focus="cancelThat">
                <div class="submit-btn" @click="submitDs()">确认打赏</div>
                <span class="iconfont icon-close close" @click="closeDs()"></span>
            </div>
        </div>
        <popup v-model="popupVisible" position="right" class="my-popup" style="width:100%">
            <div class="header">
                <i class="iconfont icon-fanhui" @click="popupVisible=false"></i>
                <span>评论帖子</span>
                <span class="send" @click="commitText()">发送</span>
            </div>
            <div class="content-commit">
                <textarea placeholder="写评论..." maxlength="70" v-model="text"></textarea>
            </div>
        </popup>
        <div class="coin-pop" v-show="coinPop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jinbi"></use>
            </svg>
            <span>+{{coinChange}}</span>
        </div>
        <div class="jindutiao-wrap" v-if="isShowReadNumPop">
            <JINDUTIAO class="donut-chart" :jd-num="userReadNum" :size="90" :width="250"/>
        </div>
        <div class="readDone" v-if="isShowFullReadPop">
            <span class="close" @click="isShowFullReadPop=false"></span>
            <span class="go-router" @click="$router.push({path:'/activity/cont/3'})"></span>
        </div>
        <div v-transfer-dom>
            <previewer :list="imgList" ref="previewer"></previewer>
        </div>
    </div>
</template>
<script>
import '../../static/js/hammer.js'
import { mapGetters,mapActions } from 'Vuex';
import { Popup,Previewer,TransferDom } from 'vux'
import { setTimeout } from 'timers';
const BANNER = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/轮播图'))
    })
});
export default {
    directives: {
        TransferDom
    },
    data(){
        return {
            text:'',
            category_type: '', // 类型
            content:false,
            offset:0,
            isdsPop:false,
            plData:[],
            count: 0, // 评论数量
            money:'',
            isInput:false,
            isDianz:false,
            stepTime:0,//点赞时间间隔
            loadAll:false,
            popupVisible:false,
            issending:false,
            coinPop:false,
            coinChange:0,
            isActive:false,
            isShowReadNumPop:false,
            isShowFullReadPop:false,
            userReadNum:0,
            isloading:false,
            nextTieId:null,
            isCollecting:false,
            imgList:[],
            tjList:[]
        }
    },
    created(){
        var that = this
        that.$nextTick(()=>{
            setTimeout(()=>{
                that.$refs.content.scrollTop = that.$store.state.xqScrollTop
            },100)
        })
        this.getContent();
        this.getPinglun();
    },
    computed:{
        ...mapGetters({
            sysTem:'sysTem',
            user:'user',
            isApp:'isApp',
            myNoteData:'myNoteData'
        }),
    },
    methods:{
        ...mapActions(['AsSendNote','AsCancelNote']),
        c_scroll(){
            this.$store.commit('xqScrollTop',event.target.scrollTop)
        },
        openApp(){
            //打开app
            var that = this
            if(this.content.qr_type==2){
                window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin="+this.content.qr_account+"&version=1&src_type=web&web_src=b.qq.com"
                return
            }
            if(!that.content.qr_account) return
            if(this.content.qr_type==1){
                that.Clipboard.on('success',()=>{
                    that.$vux.confirm.show({
                        content:'请打开微信添加'+that.content.qr_account,
                        confirmText:'确认',
                        onConfirm () {
                            window.location.href = "weixin://"
                            return
                        }
                    })
                })
                that.Clipboard.on('error',()=>{
                    that.$vux.confirm.show({
                        content:'请打开微信添加'+this.content.qr_account,
                        confirmText:'确认',
                        onConfirm () {
                            window.location.href = "weixin://"
                            return
                        }
                    })
                })
            }
        },
        openPop(){
            var that = this;
            // if(this.$store.state.user==''){
            //     this.$vux.confirm.show({
            //         content:'评论功能需登录',
            //         confirmText:'登录',
            //         onConfirm () {
            //             that.$router.push({path:'/login'});
            //         }
            //     })
            //     return;
            // }
            this.popupVisible = true;
        },
        scrollBottom(){
            var that = this
            // that.$refs.content.scrollTop = that.$refs.wrap.clientHeight
            // that.$refs.content.scrollTop = that.$refs.wrap.clientHeight - that.$refs.comment.clientHeight
        },
        back(){
            this.$router.go(-1);
        },
        goList(path){
            this.$store.commit('xqScrollTop',this.$refs.content.scrollTop)
            this.$router.push({path:path})
        },
        goTuijian(ele){
            var that = this
            event.preventDefault();
            this.$store.commit('xqScrollTop',0)
            that.$router.push({path:'/detailcont/'+ele.id,query:{offset:0,tab:1,type:1}})
            that.$refs.content.scrollTop = 0
            this.content = false
            this.plData = [];
            this.imgList = []
            this.offset = 0;
            this.getContent();
            this.getPinglun();
        },
        //获取推荐阅读
        gettuijain(){
            var that = this;
            var postData = that.$qs.stringify({
                category: that.category_type
            })
            that.$http.post('/v1/home/recommend-ties', postData).then(res=>{
                if(res.code==0){
                    that.tjList = res.data.records
                }
            })
        },
        //往期回顾
        goHistory(){
            if(this.content.category!=9){
                this.$router.push({path:'/publictie/'+this.content.uid})
            }else{
                this.$router.push({path:'/usertie/'+this.content.uid})
            }
        },
        //查看下一篇
        nextOne(){
            var that = this;
            this.$store.commit('isClickNextOneTie',true)
            if(this.nextTieId==0){
                return;
            }
            this.$router.push({path:'/detailcont/'+this.nextTieId,query:{offset:that.$route.query.offset*1+1,tab:that.$route.query.tab,type:that.$route.query.type}})
            this.content = false
            this.plData = [];
            this.imgList = []
            this.offset = 0;
            this.getContent();
            this.getPinglun();
        },
        //路由挑转
        goBannerRouter(url){
            window.location.href = url;
        },
        goLottery(sysTem){
            window.location.href = sysTem.quick_bet.value
        },
        //关闭打赏
        closeDs(){
            var that = this;
            this.$refs.dsdom.className = "ly-pop-styleComfir"
            setTimeout(()=>{
                that.isdsPop = false;
            },200)
        },
        //打开打赏
        openDs(){
            var that = this;
            if(this.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'打赏功能需登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            if(this.content.uid==this.$store.state.user.id){
                this.$vux.toast.text('不能给自己打赏', 'middle')
                return;
            }
            this.isdsPop = true;
            setTimeout(()=>{
                that.$refs.dsdom.className = "ly-pop-styleComfir active"
            },10)
        },
        //toggle关注
        toggleNote(){
            console.log(this.content.isFollowed);
            if(this.$store.state.user!=''){
                this.isloading = true
            }
            if(this.content.isFollowed){
                //取关
                this.cancelNote()
            }
            if(!this.content.isFollowed){
                //关注
                this.notePublic();
            }
        },
        //点击关注
        notePublic(){
            var that = this;
            if(this.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'关注功能需登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            var postData = that.$qs.stringify({
                id:that.content.uid,
                category:1,
            })
            that.$http.post('/v1/user/follow-add',postData).then(res=>{
                if(res.code==0){
                    that.$store.commit('noteSomeOne',that.content.uid)
                    that.$set(that.$data.content,'isFollowed',true);
                        this.$vux.toast.text('关注成功', 'middle')
                }else{
                    this.$vux.toast.text('操作失败', 'middle')
                }
                that.isloading = false
            })
        },
        //取消关注
        cancelNote(){
            var that = this;
            if(this.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'关注功能需登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            var postData = that.$qs.stringify({
                id:that.content.uid,
                category:1,
            })
            that.$http.post('/v1/user/follow-sub',postData).then(res=>{
                if(res.code==0){
                    that.$set(that.$data.content,'isFollowed',false)
                    this.$vux.toast.text('取消关注', 'middle')
                }else{
                    this.$vux.toast.text('操作失败', 'middle')
                }
                that.isloading = false
            })
        },
        //获取内容
        getContent(){
            var that = this;
            var postData;
            var id = that.$route.params.id;
            var tab;
            if(that.$route.query.tab==1){
                tab = 1
            }
            if(that.$route.query.tab==0){
                tab = 2
            }
            if(that.$route.query.tab==2){
                tab = 3
            }
            if(that.$store.state.user==''){
                postData = that.$qs.stringify({
                    tie_id:id,
                    next_tie_offset:that.$route.query.offset,
                    tab:tab,
                    tie_type:that.$route.query.type
                })
            }else{
                postData = that.$qs.stringify({
                    tie_id:id,
                    uid:that.$store.state.user.id,
                    next_tie_offset:that.$route.query.offset,
                    tab:tab,
                    tie_type:that.$route.query.type
                })
            }
            that.$http.post('/v1/home/tie-content',postData).then(res=>{
                if(res.code==0){
                    that.$nextTick(()=>{
                        that.Clipboard = new ClipboardJS('.wxerweima',{
                            text:()=>{
                                return that.content.qr_account;
                            }
                        });
                    })
                    that.nextTieId = res.data.next_tie_id
                    if(res.data.userReadNum%10==0&&res.data.userReadNum!=100&&res.data.userReadNum!=0&&that.$route.query.type==1){
                        that.isShowReadNumPop = true
                        that.userReadNum = res.data.userReadNum
                        setTimeout(()=>{
                            that.isShowReadNumPop = false
                        },5500)
                    }
                    if(res.data.userReadNum==100){
                        that.isShowFullReadPop = true
                        that.$store.commit('changeRollTime',res.data.roll_nums)
                    }
                    that.content = res.data.records;
                    that.category_type = that.content.category
                    if(that.$store.state.user!=''&&res.data.coinChange>0){
                        that.coinChange = res.data.coinChange;
                        var local = JSON.parse(localStorage.getItem('coinChangeUid'))
                        if(local){
                            if(local.indexOf(res.data.records.uid)==-1){
                                that.coinPop = true
                                local.push(res.data.records.uid)
                                localStorage.setItem('coinChangeUid',JSON.stringify(local))
                            }
                        }else{
                            that.coinPop = true
                            local = []
                            localStorage.setItem('coinChangeUid',JSON.stringify(local))
                        }
                        setTimeout(()=>{
                            that.coinPop = false
                        },1500)
                    }
                    that.resImgSrc(res.data.records.content)
                }else{
                    that.$vux.toast.text(res.data, 'middle')
                }
                this.$vux.loading.hide();
                this.$nextTick(()=>{
                    this.gettuijain()
                    try {
                        document.getElementsByClassName('myimg').length
                    } catch (error) {
                        console.log(error);
                    }
                    for(var i=0;i<document.getElementsByClassName('myimg').length;i++){
                        document.getElementsByClassName('myimg')[i].addEventListener('click',this.getItem)
                    }
                })
            })
        },
        getItem(){
            var index = 0
            this.imgList.forEach((ele,idx) => {
                if(ele.src==event.target.src){
                    index = idx
                }
            });
            this.$refs.previewer.show(index)
        },
        //获取评论
        getPinglun(){
            var that = this;
            var postData;
            postData=that.$qs.stringify({
                tie_id:that.$route.params.id,
                offset:that.offset,
                tie_type:that.$route.query.type
            })
            that.$http.post('/v1/home/comments',postData).then(res=>{
                if(res.code==0){
                    if(res.data.records.length==0){
                        that.loadAll = false;
                        return;
                    };
                    if(that.offset==0){
                        that.plData = res.data.records
                    }else{
                        var newArr = that.plData.concat(res.data.records)
                        that.plData = newArr
                    }
                    that.offset = res.data.offset
                    that.count = res.data.count
                    if(res.data.offset<20){
                        that.loadAll = false
                    }else{
                        that.loadAll = true
                    }
                }
            })
        },
        //点击选择金额
        selectMoney(num){
            var that = this;
            that.money = num;
            that.isInput = false;
        },
        cancelThat(){
            this.isInput = true;
        },
        //打赏
        submitDs(){
            var that = this;
            var postData;
            if(that.$store.state.user==''){
                this.$vux.toast.text('请先登录', 'middle')
                return;
            }
            if(that.money==''||that.money*1==0){
                this.$vux.toast.text('请先输入金额', 'middle')
                return;
            }
            postData = that.$qs.stringify({
                to_uid:that.content.uid,
                money:that.money
            })
            that.$http.post('/v1/user/reward',postData).then(res=>{
                if(res.code==0){
                    that.closeDs();
                    that.$vux.toast.text('打赏成功', 'middle')
                }else{
                    that.$vux.toast.text(res.msg_zh, 'middle')
                    that.closeDs();
                }
            })
        },
        toggleColle(){
            var that = this;
            if(that.content.isCollected){
                that.cancelCollected()
            }else{
                that.collected()
            }
        },
        //收藏
        collected(){
            var that = this;
            if(that.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'收藏功能需登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            this.isCollecting = true;
            var postData = that.$qs.stringify({
                id:that.$route.params.id,
                tie_type:that.$route.query.type
            })
            that.$http.post('/v1/user/colls-add',postData).then(res=>{
                if(res.code==0){
                    that.content.isCollected=true;
                    that.$vux.toast.text('收藏成功', 'middle')
                    that.isCollecting = false;
                }
            })
        },
        cancelCollected(){
            var that = this;
            this.isCollecting = true;
            var postData = that.$qs.stringify({
                id:that.$route.params.id,
                tie_type:that.$route.query.type
            })
            that.$http.post('/v1/user/colls-del',postData).then(res=>{
                if(res.code==0){
                    that.content.isCollected=false;
                    that.$vux.toast.text('取消成功', 'middle')
                    that.isCollecting = false;
                }
            })
        },
        //文章点赞
        dianzan(){
            var that = this;
            if (this.isActive) {
                this.isActive = false;
            } else {
                this.isActive = true;
            }
            if(that.isDianz) return;
            var postData = that.$qs.stringify({
                tie_id:that.$route.params.id,
                tie_type:that.$route.query.type
            })
            var nowT = new Date().getTime();
            var step = nowT - that.stepTime;
            if(step<2000){
                return;
            }
            that.$http.post('/v1/home/zans-add',postData).then(res=>{
                if(res.code==0){
                    that.content.zan_times = res.data.zannums;
                    that.isDianz = true;
                    var time = new Date().getTime();
                    that.stepTime = time;
                }
            })
        },
        //评论
        commitText(){
            var that = this;
            var newText = that.text.replace(/(^\s*)|(\s*$)/g, "")
            if(newText==""||newText.length==0){
                this.$vux.confirm.show({
                    content:'评论内容不能为空！',
                    confirmText:'确认',
                })
                return;
            }
            if(this.issending) return;
            this.issending = true;
            that.$vux.loading.show({
                text: '请求中',
            })
            var postData = that.$qs.stringify({
                tie_id:that.$route.params.id,
                content:that.text,
                uid:that.$store.state.user==''?0:that.$store.state.user.id,
                tie_type:that.$route.query.type
            })
            that.$http.post('/v1/user/comment-add',postData).then(res=>{
                if(res.code==0){
                    that.$vux.toast.text('评论成功','middle');
                    that.text='';
                    that.offset = 0;
                    that.popupVisible = false;
                    that.getPinglun();
                    that.scrollBottom();
                }
                that.issending = false;
                that.$vux.loading.hide();
            })
        },
        //转化时间
        timeago(TimeStamp){
            var date = new Date(TimeStamp*1000);
            var nowDate = new Date();
            var sec = parseInt((nowDate.getTime() - date.getTime()) / 1000);//默认秒
            if(sec<=60) return '刚刚';
            var parseMin = parseInt(sec / 60);//转成分
            var parseHur = parseInt(parseMin/60);//转成时
            var parseDay = parseInt(parseHur/24);//转成天
            var parseWee = parseInt(parseDay/7);//转成周
            var parseMon = parseInt(parseDay/30);//转成月
            var parseYea = parseInt(parseMon/12);//转成年
            //分-时-天-周-月-年
            var Arr = [parseMin,parseHur,parseDay,parseWee,parseMon,parseYea];
            //给个规则
            var gzArr = [60,24,7,4,12,999]
            var gzArrName = ['分前','小时前','天前','周前','月前','年前']
            var res;
            Arr.forEach((ele,idx) => {
                if(ele<=gzArr[idx]&&ele!=0){
                    res = ele+gzArrName[idx];
                }
            });
            return res;
        },
        unescape(html){
            if(!html) return;
            html = "" + html
            return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        },
        //转化时间戳
        trfTime(str){
            if(!str) return '';
            var d = new Date();
            d.setTime(str*1000)
            var m = d.getMonth() + 1;//月
            var day = d.getDate() - 1;//日
            var h = d.getHours();//小时
            var min = d.getMinutes();
            return (m<10?'0'+m:m)+'-'+(day<10?'0'+day:day)+' '+(h<10?'0'+h:h)+':'+(min<10?'0'+min:min);
        },
        resImgSrc(str){
            this.content.content = str.replace(/img/g, "img class='myimg'")
            var imgReg = /<img.*?(?:>|\/>)/gi;
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr = str.match(imgReg);
            if(!arr) return;
            this.$nextTick(()=>{
                for (var i = 0; i < arr.length; i++) {
                    var src = arr[i].match(srcReg);
                    this.imgList.push({
                        src:src[1],
                        w: document.getElementById('content')&&document.getElementById('content').getElementsByTagName('img')[i].clientWidth,
                        h: document.getElementById('content')&&document.getElementById('content').getElementsByTagName('img')[i].clientHeight
                    })
                }
            })
        }
    },
    components:{
        Popup,Previewer,
        COMMENT(){
            return {
                component:import('@/components/评论'),
            }
        },
        BANNER(){
            return {
                component:BANNER,
            }
        },
        INPUT(){
            return {
                component:import('@/components/回复评论'),
            }
        },
        JINDUTIAO(){
            return {
                component:import('@/components/圆形进度条'),
            }
        }
    },
    // destroyed(){
    //     this.$store.commit('isClickNextOneTie',true)
    // }
}
</script>
<style lang="scss" scoped>
.tuijian{
    background: #fff;
    padding-left:16px;
    padding-right:16px;
    .tuijian-title{
        height: 68px;
        line-height: 68px;
        padding: 0 0 0 45px;
        text-align: left;
        color:#333;
        font-size: 30px;
        border-bottom:$border-color 1px solid;
        background: url('/static/images/hot.png') no-repeat left center;
        background-size: 34px 40px;
    }
    ul{
        li{
            // padding-top:25px;
            padding-bottom:25px;
            font-size: 28px;
            color:#333;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        li:first-child{
            padding-top:25px;
        }
    }
}
.readDone{
    height: 100vh;
    width:100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, .6) url('/static/images/activity/read_done.png') no-repeat;
    background-size: 100% 100%;
    .close{
        display: block;
        width:60px;
        height: 60px;
        position: absolute;
        top:333px;
        right:65px;
    }
    .go-router{
        height: 80px;
        width:320px;
        display: block;
        position: absolute;
        bottom:185px;
        left: 50%;
        margin-left:-160px;
    }
}
.donut-chart{
    position: relative;
    width: 250px;
    height: 250px;
    margin: auto;
    border-radius: 100%;
}
.jindutiao-wrap{
    height: 200px;
    width: 100%;
    position: fixed;
    top:50%;
    left: 0;
    margin-top:-100px;
}
.coin-pop{
    width:150px;
    background: rgba(0, 0, 0, .6);
    border-radius: 10px;
    padding-top:10px;
    padding-bottom:10px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left:-60px;
    margin-top:-50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 60px;
        vertical-align: middle;
        text-align: center;
    }
    span{
        vertical-align: middle;
        font-size: 40px;
        color:#fdc72f;
    }
}
.my-popup{
    height: 100vh;
    width: 100vw;
    .header{
        height: 88px;
        background: $theme-color;
        color:#fff;
        .pad40{
            padding-top:40px;
        }
        i{
            font-size: 50px;
            position: absolute;
            left: 16px;
            text-align: center;
            height: 88px;
            line-height: 88px;
        }
        span{
            font-size: 34px;
            height: 88px;
            line-height: 88px;
        }
        .send{
            position: absolute;
            right:20px;
            height: 88px;
            line-height: 88px;
        }
    }
    .content-commit{
        background: #fff;
        width:100%;
        height: calc(100% - 88px);
        textarea{
            border:none;
            outline:none;
            resize:none;
            width:calc(100% - 32px);
            padding:16px 16px 0 16px;
            height: 500px;
            font-size: 28px;
            color:#333;
        }
    }
}
.plnomore{
    padding-top:30px;
    height: 265px;
    line-height: 265px;
    color: #999;
    font-size: 28px;
}
.loadMore{
    line-height: 85px;
    font-size: 26px;
    background: #f2f2f2;
    color:#999;
}
.ly-pop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 7;
    background: rgba(0, 0, 0, .6);
    .ly-pop-styleComfir{
        padding:20px 16px;
        width:calc(70% - 20px);
        height: 480px;
        background: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-200px;
        margin-left:-35%;
        border-radius: 10px;
        position: relative;
        transition: all .2s ease;
        transform: scale(.9);
        opacity: 0;
        p{
            color: #999;
            font-size: 14px;
            text-align: left;
            margin-bottom:15px;
            font-size: 26px;
        }
        .box{
            display: flex;
            margin-top:10px;
            span{
                flex: 1;
                height: 80px;
                line-height: 80px;
                margin-right:10px;
                border-radius: 6px;
                color:#999;
                border:$border-color 1px solid;
                font-size: 28px;
            }
            span:last-child{
                margin-right:0;
            }
            .active{
                border:$theme-color 1px solid;
                color:$theme-color;
                position: relative;
                overflow: hidden;
            }
        }
        .first{
            margin-bottom:20px;
        }
        .last{
            margin-top:20px;
        }
        input{
            height: 60px;
            font-size: 30px;
            outline: none;
            color:#999;
            width:calc(100% - 19px);
            margin-bottom:20px;
            padding-left:15px;
            border:$border-color 1px solid;
            border-radius: 6px;
        }
        .submit-btn{
            height: 70px;
            line-height: 70px;
            border-radius: 6px;
            width:166px;
            background: $theme-color;
            font-size: 30px;
            color:#fff;
            margin: auto;
        }
        .close{
            position: absolute;
            left:50%;
            bottom:-100px;
            margin-left:-30px;
            width: 60px;
            height: 60px;
            font-size: 60px;
            color:#fff;
        }
    }
    .active{
        transform: scale(1);
        opacity: 1;
    }
}
.big-wrap{
    height: 100%;
    position: relative;
    .footer-btn-bar{
        width: 100vw;
        height: 98px;
        background: #fff;
        border-top:1px solid $border-color;
        .text{
            line-height: 78px;
            font-size: 30px;
            color:#999;
            text-align: left;
            width:405px;
            float: left;
            height: 78px;
            margin-left:16px;
            background: #f2f2f2;
            border-radius: 100px;
            margin-top:9px;
            padding-left:30px;
        }
        >div.active{
            span,i{
                color: #ffb400!important;
            }
        }
        >div.blue{
            span,i{
                color: #ffb400!important;
            }
        }
        >div{
            position: relative;
            float: left;
            i{
                font-size: 46px;
                height: 98px;
                line-height: 98px;
                display: inline-block;
                vertical-align: middle;
                color:#666;
            }
        }
        div:nth-child(2),div:nth-child(3),div:nth-child(4){
            float: right;
            margin-right:40px;
            position: relative;
            display: flex;
            span.badge{
                background: $theme-color;
                width:30px;
                height: 30px;
                line-height: 30px;
                display: block;
                color:#fff;
                position: absolute;
                top: 17px;
                left: 25px;
                border-radius: 50%;
                font-size: 24px;
            }
            span.spinner{
                display: flex;
                align-items:center ;
                height: 98px;
            }
        }
    }
}
.content{
    height: calc(100% - 98px);
    background: #fff;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .wrap{
        height: auto;
        background: #fff;
        .title{
            padding:16px 0px 10px 0px;
            margin-left:16px;
            margin-right:16px;
            min-height: 80px;
            word-wrap: break-word;
            .lazy-title{
                div:first-child,div:last-child{
                    height: 20px;
                    background: #e1e1e1;
                }
                div:last-child{
                    width:50%;
                    margin-top:10px;
                }
            }
            h1{
                font-size: 34px;
                text-align: left;
                font-weight: 500;
                color:#000;
                word-wrap:break-word ;
            }
            .title-s {
                display: block;
                line-height: 40px;
                font-size: 24px;
                text-align: left;
                padding-bottom: 10px;
                color:#999;
                overflow: hidden;
                .first{
                    float: left;
                }
                .next-btn{
                    float: right;
                    span,i{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    i{
                        transform:rotate(180deg);
                        color:#999;
                        font-size: 34px;
                        font-weight: bold;
                    }
                }
                .win-badge{
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    float: left;
                    color:$theme-color;
                    font-size: 26px;
                    text-align: center;
                    border:$theme-color 1px solid;
                    border-radius: 8px;
                    margin-left:20px;
                    padding-left:10px;
                    padding-right:10px;
                }
            }
            .lazy-title-s{
                display: block;
                font-size: 24px;
                text-align: left;
                color:#999;
                padding-top:10px;
                overflow: hidden;
                .first{
                    float: left;
                    height: 20px;
                    background: #e1e1e1;
                    width:200px;
                }
                .next-btn{
                    float: right;
                    height: 20px;
                    background: #e1e1e1;
                    width:200px;
                }
            }
        }
        .lazy-user{
            padding: 30px 16px;
            overflow: hidden;
            .avatar{
                float: left;
                display: block;
                height: 80px;
                width:80px;
                border-radius: 50%;
                background: #e1e1e1;
            }
            .text{
                float: left;
                width:calc(100% - 100px);
                height: 70px;
                padding-top:10px;
                padding-left:20px;
                span{
                    width:100%;
                    height: 20px;
                    background: #e1e1e1;
                    display: block;
                }
                span:last-child{
                    width:50%;
                    margin-top:20px;
                }
            }
        }
        .user{
            overflow: hidden;
            padding: 20px 16px 30px 16px;
            min-height: 100px;
            .avatar{
                height: 80px;
                width:80px;
                display: block;
                border:$border-color 1px solid;
                border-radius: 50%;
                float: left;
                overflow: hidden;
                background: #d2cfcf;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                float: left;
                width:calc(100% - 106px);
                padding-left:20px;
                position: relative;
                .name{
                    display: block;
                    font-size: 30px;
                    width:100%;
                    text-align: left;
                    color:#333;
                    >span{
                        float: right;
                        color:#333;
                        cursor: pointer;
                        font-size: 22px;
                    }
                }
                .badge-time{
                    text-align: left;
                    margin-top:10px;
                    display: flex;
                    .bgSp {
                        font-size: 22px;
                        border:1px solid #999;
                        color:#666;
                        height: 47px;
                        line-height: 47px;
                        padding:0 10px;
                        border-radius: 5px;
                        margin-right:10px;
                    }
                    .type_msg {
                        color: #09b1e5; border: 1px solid #09b1e5; padding: 0 6px; border-radius: 6px; margin: 0 30px 0 0;
                    }
                    span{
                        color:#999;
                        font-size: 24px;
                        line-height: 49px;
                    }
                }
                .note-btn-wrap{
                    position: absolute;
                    right:0px;
                    bottom:0px;
                    width:110px;
                    height: 48px;
                    line-height: 48px;
                    background: $theme-color;
                    color:#fff;
                    border-radius: 8px;
                    font-size: 26px;
                    overflow: hidden;
                    .spinner{
                        display: flex;
                        height: 48px;
                        align-items:center;
                        justify-content: center;
                    }
                }
                .isFollowed{
                    border:1px solid #e1e1e1;
                    color: #999;
                    background: #fff;
                }
            }
        }
        .lazy-text-res{
            padding:0 16px 0 16px;
            span{
                display: block;
                width:100%;
                height: 20px;
                background: #e1e1e1;
                margin-top:30px;
            }
            span:last-child{
                width:50%;
            }
        }
        .text-res{
            min-height: 300px;
            padding-left: 16px;
            padding-right: 16px;
            padding-bottom:50px;
            font-size: 32px;
            text-align: justify;
            color:#333;
            overflow: hidden;
            :nth-child(1) {
                word-wrap:break-word;
            }
            img{
                width:100%;
            }
        }
        .lazy-tishi{
            margin-top:30px;
            padding-top:10px;
            position: relative;
            font-size: 28px;
            color:#999;
            span{
                display: block;
                height: 20px;
                background: #e1e1e1;
                width:300px;
                margin: auto;
            }
        }
        .tishi{
            position: relative;
            font-size: 28px;
            color:#999;
        }
        .tishi::before,.lazy-tishi::before{
            content:'';
            display: block;
            height: 1px;
            width:150px;
            background: #e1e1e1;
            position: absolute;
            top: 21px;
            left: 35px;
        }
        .tishi::after,.lazy-tishi::after{
            content:'';
            display: block;
            height: 1px;
            width:150px;
            background: #e1e1e1;
            position: absolute;
            top: 21px;
            right: 35px;
        }
        .dashang{
            width:80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            border-radius: 50%;
            position: relative;
            margin:30px auto;
            span{
                font-size: 80px;
                color:#ffb400;
                font-weight: 100;
            }
        }
        .lazy-wxerweima{
            width: 320px;
            height: 320px;
            background: #e1e1e1;
            margin:30px auto;
            margin-bottom:0px;
        }
        .wxerweima{
            width: 320px;
            height: 320px;
            background: #fff;
            margin:30px auto;
            padding:16px;
            border:$border-color 1px solid;
            display: block;
            img{
                width:100%;
                height: 100%;
            }
            img[lazy=loading] {
                width: 30%!important;
                height: 100%;
                margin: auto;
            }
        }
        .hot-toolbar{
            height: 80px;
            line-height: 80px;
            padding-left:10px;
            text-align: left;
            border-top:1px solid #e1e1e1;
            font-size: 26px;
            color:#333;
            >div{
                overflow-x: scroll;
                overflow-y: hidden;
                width:100%;
                height: 80px;
                line-height: 80px;
                -webkit-overflow-scrolling: touch;
                >ul{
                    width: 1440px;
                    color:$theme-color;
                    height: 52px;
                    line-height: 52px;
                    margin-top:12px;
                    li{
                        float: left;
                        width:150px;
                        margin-right:10px;
                        list-style: none;
                        text-align: center;
                        background: #d9b154;
                        color:#fff;
                        border-radius: 6px;
                    }
                }
            }
        }
        .banner{
            height: 250px;
            background: #d2cfcf;
            img{
                width:100%;
                height: 100%;
            }
        }
        .comment-pancel{
            background: #fff;
            border-top:$border-color 1px solid;
            .block{
                overflow: hidden;
                padding:30px 0px;
                margin-left:16px;
                margin-right:16px;
                border-bottom:$border-color 1px solid;
                font-size: 26px;
                color:#666;
                span:first-child{
                    float: left;
                }
                span:last-child{
                    float: right;
                }
            }
            .comment-list{
                position: relative;
                min-height: 145px;
                .wrap-spinner{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top:-18px;
                    margin-left:-18px;
                }
            }
        }
    }
}
.bigImg {
    background: #000;
    height:100vh;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 7;
    font-size: 0;
    display: table;
    overflow-x: auto;
    .top-bar{
        padding-top:40px;
        width: 100%;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        background: rgba(255,255,255,.2);
        text-align: right;
        color:#fff;
        font-size: 60px;
        span{
            font-size: 60px;
            line-height: 120px;
            color:#fff;
            margin-right:16px;
        }
    }
    img{
        width:100%;
        position: absolute;
        left: 0;
        top:0;
        // transform: translateY(0);
        // transition: transform .5s ease;
    }
}
</style>
