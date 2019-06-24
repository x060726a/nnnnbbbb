<template>
<div class="index vux-fix-safari-overflow-scrolling">
    <!--<div class="redpack-mask" v-if="redPop">-->
        <!--<div class="redpack-pancel" ref="redpack">-->
            <!--<span @click="closeRedPack()"></span>-->
        <!--</div>-->
    <!--</div>-->
    <!-- <liuCode/> -->
    <div class="index-tab" v-show="isShowTopbar">
        <span @click="$store.commit('indexHeadActive',1)" :class="{active:indexHeadActive==1}">推荐</span>
        <span @click="$store.commit('indexHeadActive',0)" :class="{active:indexHeadActive==0}">关注</span>
        <span @click="$store.commit('indexHeadActive',2)" :class="{active:indexHeadActive==2}">六友圈</span>
        <span @click="$store.commit('indexHeadActive',3)" :class="{active:indexHeadActive==3}">高手</span>
        <div class="activeline" :class="{
            activeline1:indexHeadActive==1,
            activeline2:indexHeadActive==0,
            activeline3:indexHeadActive==2,
            activeline4:indexHeadActive==3
        }"></div>
    </div>
    <div class="spinner" v-if="isHttpSending">
        <div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
    </div>
    <!-- 推荐 -->
    <div class="tj-scroller-wrap weui-tab__panel vux-fix-safari-overflow-scrolling" v-if="indexHeadActive==1">
        <div class="tj-scroller">
            <scroller
                v-if="list.length!=0"
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup='isUsePullUp'
                :pulldown-config="pullDownObj"
                :pullup-config="pullUpObj"
                @on-scroll='scrollTj'
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div>
                    <liuCode/>
                    <!--<div class="pad16"></div>-->
                    <div class="index-banner" v-if="indexHeadActive==1">
                        <BANNER />
                    </div>
                    <div class="index-tab" ref="indexTab">
                        <span @click="$store.commit('indexHeadActive',1)" :class="{active:indexHeadActive==1}">推荐</span>
                        <span @click="$store.commit('indexHeadActive',0)" :class="{active:indexHeadActive==0}">关注</span>
                        <span @click="$store.commit('indexHeadActive',2)" :class="{active:indexHeadActive==2}">六友圈</span>
                        <span @click="$store.commit('indexHeadActive',3)" :class="{active:indexHeadActive==3}">高手</span>
                        <div class="activeline" :class="{
                            activeline1:indexHeadActive==1,
                            activeline2:indexHeadActive==0,
                            activeline3:indexHeadActive==2,
                            activeline4:indexHeadActive==3
                        }"></div>
                    </div>
                    <div v-for="(item, index) in list" class="tie-list">
                        <TEXTLIST :text="item" :index="index" :type="1" :tab="indexHeadActive"/>
                    </div>
                    <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                </div>
            </scroller>
        </div>
    </div>
    <!-- 推荐 -->
    <!-- 关注 -->
    <div class="gz-scroller-wrap" v-if="indexHeadActive==0">
        <div class="pad16"></div>
        <div class="gzh-list" @click="$router.push({path:'/recommend'})">
            <span>发现更多感兴趣的人</span>
            <ul>
                <li><span><img :src="'/static/images/avatar/4.jpg'"></span></li>
                <li><span><img :src="'/static/images/avatar/5.jpg'"></span></li>
                <li><span><img :src="'/static/images/avatar/6.jpg'"></span></li>
                <li><span><img :src="'/static/images/avatar/7.jpg'"></span></li>
                <li><i class="iconfont icon-fanhui"></i></li>
            </ul>
        </div>
        <div class="user-list" v-if="!unnote">
            <div class="title">您可能感兴趣的人</div>
            <div class="list">
                <div class="title-list" v-for="(ele,idx) in list">
                    <USERLIST :text="ele" :isshow="true"/>
                </div>
            </div>
            <div class="gzh-btn">
                <span @click="geyPublic">换一批</span>
                <span @click="allNote">全部关注</span>
            </div>
        </div>
        <div class="gz-scroller" v-if="unnote">
            <scroller
                v-if="list.length!=0"
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup='isUsePullUp'
                :pulldown-config="pullDownObj"
                :pullup-config="pullUpObj"
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div>
                    <div v-for="(item, index) in list" class="tie-list">
                        <TEXTLIST :text="item" :index="index" :type="1" :tab="indexHeadActive"/>
                    </div>
                    <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                </div>
            </scroller>
        </div>
    </div>
    <!-- 关注 -->
    <!-- 六友圈 -->
    <div class="ly-scroller-wrap" v-if="indexHeadActive==2">
        <div class="ly-scroller">
            <scroller
                v-if="list.length!=0"
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup='isUsePullUp'
                :pulldown-config="pullDownObj"
                :pullup-config="pullUpObj"
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div>
                    <div class="pad16"></div>
                    <div v-for="(item, index) in list" class="tie-list">
                        <TEXTLIST :text="item" :index="index" :type="2" :tab="indexHeadActive" :title="6" />
                    </div>
                    <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                </div>
            </scroller>
        </div>
    </div>
    <!-- 六友圈 -->
    <!-- 高手 -->
    <div class="gs-scroller-wrap"  v-if="indexHeadActive==3">
        <div class="pad16"></div>
        <div class="height-rank-tab">
            <div class="wrap">
                <span @click="heightRankTab(3)" :class="{active:heightRankActive==3}">单双</span>
                <span @click="heightRankTab(2)" :class="{active:heightRankActive==2}">大小</span>
                <span @click="heightRankTab(1)" :class="{active:heightRankActive==1}">色波</span>
                <span @click="heightRankTab(5)" :class="{active:heightRankActive==5}">二十码中特</span>
                <span @click="heightRankTab(6)" :class="{active:heightRankActive==6}">六肖中特</span>
                <span @click="heightRankTab(7)" :class="{active:heightRankActive==7}">平特一肖</span>
                <!-- <div class="mask" :class="{posi1:heightRankActive==1,posi2:heightRankActive==2,posi3:heightRankActive==3}">{{heightRankArr[heightRankActive-1]}}</div> -->
            </div>
        </div>
        <div class="gs-scroller">
            <scroller
                v-if="list.length!=0"
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup='isUsePullUp'
                :pulldown-config="pullDownObj"
                :pullup-config="pullUpObj"
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div>
                    <div v-for="(item, index) in list">
                        <HEIGHTLIST :text="item" :index="index+1" :type="heightRankActive"/>
                    </div>
                </div>
            </scroller>
            <DATANONE v-if="list.length==0&&!isHttpSending"/>
        </div>
    </div>
    <!-- 高手 -->
</div>
</template>
<script>
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/帖子列表'],()=>{
        resolve(require('@/components/帖子列表'))
    })
});
const HEIGHTLIST = new Promise(resolve=>{
    require.ensure(['@/components/高手榜列表'],()=>{
        resolve(require('@/components/高手榜列表'))
    })
})
const USERLIST = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/用户列表'))
    })
});
const BANNER = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/轮播图'))
    })
});
const DATANONE = import('@/components/没有数据')
import { Swiper,SwiperItem,Spinner,LoadMore,Scroller } from 'vux'
import { mapGetters, mapActions,mapState } from 'Vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            isShowTopbar:false,
            show:false,
            redPop:false,
            offset:0,
            list:[],
            lockswiper:true,
            unnote:false,
            publicListLimit:4,//公众号列表的每页显示数量
            publicList:[],//公众号列表
            publicId:[],//公众号id
            heightRankActive:3,
            heightRankArr:['色波','大小','单双'],
            isHttpSending:false,//请求是否正在发送中
            isUsePullUp:true,//是否开启上拉加载
            isNoMoreData:false,
            pullDownObj:{
                downContent: "<span class='loading-text'>下拉刷新</span>",
                upContent: "<span class='loading-text'>释放后更新</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
            pullUpObj:{
                upContent:"<span class='loading-text'></span>",
                downContent: "<span class='loading-text'>释放后加载</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            }
        }
    },
    computed:{
        ...mapGetters(['indexHeadActive']),
        ...mapState(['user'])
    },
    watch:{
        '$store.state.deleteSomeOntList'(val,oval){
            this.list.splice(val,1)
        },
        //推荐 关注 六友圈
        '$store.state.indexHeadActive'(val,oval){
            console.log(val);
            if(val!=1){
                this.isShowTopbar = true
            }else{
                this.isShowTopbar = false
            }
            this.offset = 0;
            this.list = [];
            this.isUsePullUp = true;
            this.isNoMoreData = false//重制没有更多数据
            this.tabChange(val);
        },
    },
    activated(){
        this.$store.commit('xqScrollTop',0)
        var regHongbao = JSON.parse(localStorage.getItem('regHongbao'))
        if(regHongbao*1==1){
            this.redPackPop()
            localStorage.setItem('regHongbao',0)
        }
        var that = this
        if(this.user.nickname===this.user.username && this.user!=''){
            this.$vux.confirm.show({
                content:`<p>请完善个人资料填写用户昵称</p><div class="c-i-i"><input type="text" placeholder="请输入昵称" id="nb"/></div>`,
                showCancelButton:false,
                closeOnConfirm:false,
                onConfirm:(value)=>{
                    var postData = that.$qs.stringify({
                        nickname:document.getElementById('nb').value
                    })
                    if(document.getElementById('nb').value!=''){
                        that.$http.post('/v1/user/profile-update',postData).then(res=>{
                            if(res.code==0){
                                    that.$store.commit("user", res.data);
                                    var user = JSON.stringify(res.data);
                                    localStorage.setItem("user", user);
                                that.$vux.toast.text('更新成功','middle')
                                this.$vux.confirm.hide()
                            }else{
                                that.$vux.toast.text(res.msg_zh,'middle')
                            }
                        })
                    }
                }
            })
        }
    },
    created(){
        let regHongbao = JSON.parse(localStorage.getItem('regHongbao'))
        if(regHongbao*1==1){
            this.redPackPop()
            localStorage.setItem('regHongbao',0)
        }
        this.tabChange(this.$store.state.indexHeadActive);
    },
    mounted(){
        var that = this
        that.$nextTick(()=>{
            setTimeout(()=>{
                if(!that.$refs.swiper) return false;
                that.$refs.swiper.$el.firstChild.childNodes[2].onclick = ()=>{
                    window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=28783875&version=1&src_type=web&web_src=b.qq.com"
                }
            },1000)
        })
    },
    methods:{
        ...mapActions(['sendNote']),
        scrollTj(p){
            if(this.$refs.indexTab.offsetTop<=p.top){
                this.isShowTopbar = true
                this.$refs.indexTab.className = "index-tab posi-hide"
            }else{
                this.isShowTopbar = false
                this.$refs.indexTab.className = "index-tab posi-show"
            }
            this.$store.commit('indexScrollTop',p.top)
            if(p.top==0){
                this.lockswiper = true
            }else{
                this.lockswiper = false
            }
        },
        async refresh(done) {
            var that = this
            this.isNoMoreData = false//重制没有更多数据
            switch (this.$store.state.indexHeadActive) {
                case 1:
                    var res = await this.tuijian(true);
                    that.$refs.my_scroller.donePulldown();
                    // that.$refs.my_scroller.reset({
                    //     top:that.$store.state.indexScrollTop
                    // });
                    break;
                case 0:
                    var res = await this.getPublicTie(true);
                    that.$refs.my_scroller.donePulldown();
                    // that.$refs.my_scroller.reset({
                    //     top:that.$store.state.indexScrollTop
                    // });
                    break;
                case 2:
                    var res = await this.getLiuyou(true);
                    that.$refs.my_scroller.donePulldown();
                    // that.$refs.my_scroller.reset({
                    //     top:that.$store.state.indexScrollTop
                    // });
                    break;
                case 3:
                    var res = await this.getHeightRank(true);
                    that.$refs.my_scroller.donePulldown();
                    // that.$refs.my_scroller.reset({
                    //     top:that.$store.state.indexScrollTop
                    // });
                    break;
            }
        },
        async infinite(done) {
            var that = this
            switch (this.$store.state.indexHeadActive) {
                case 1:
                    var res = await this.tuijian(false);
                    break;
                case 0:
                    var res = await this.getPublicTie(false);
                    break;
                case 2:
                    var res = await this.getLiuyou(false);
                    break;
                case 3:
                    var res = await this.getHeightRank(false);
                    break;
            }
        },
        //首页的tab切换
        async tabChange(idx){
            switch (idx) {
                case 1:
                    this.tuijian(true);
                    break;
                case 0:
                    if(this.$store.state.user==''){
                        //未登录
                        this.geyPublic();
                        this.unnote = false;
                    }else{
                        //已登录
                        var res = await this.getMynote();
                        if(res&&res.records.length==0){
                            this.geyPublic();
                            return;
                        }else{
                            this.getPublicTie(true);
                        }
                    }
                    break;
                case 2:
                    this.getLiuyou(true);
                    break;
                case 3:
                    this.getHeightRank(true);
                    break;
            }
        },
        //高手的切换
        async heightRankTab(idx){
            var that = this;
            that.isNoMoreData = false//重制没有更多数据
            that.offset = 0;
            that.heightRankActive = idx;
            var res = await that.getHeightRank(true);
            if(res.data.records.length==0) return true;
            this.$nextTick(()=>{
                that.$refs.my_scroller.enablePullup();
                that.$refs.my_scroller.reset({top:0});
            })
        },
        //获取推荐的帖子
        tuijian(flg){
            var that = this;
            var postData = {};
            if(that.isHttpSending) return;
            that.isHttpSending = true;
            if(flg){
                postData = that.$qs.stringify({
                    offset:0
                })
            }else{
                postData = that.$qs.stringify({
                    offset:that.offset
                })
            }
            return new Promise(resolve=>{
                that.$http.post('/v1/home/ties',postData).then(res=>{
                    if(res.code==0){
                        if(flg){
                            that.list = [];
                            that.list = res.data.records;
                        }else{
                            if(res.data.records.length==0){
                                that.$refs.my_scroller.disablePullup()
                                that.isNoMoreData = true;
                            }else{
                                var newArr = that.list.concat(res.data.records)
                                that.list = newArr;
                                that.$refs.my_scroller.donePullup();
                            }
                        }
                        if(res.data.records.length<20){
                            //是否开启上拉加载更多
                            that.isUsePullUp = false
                        }
                        that.offset = res.data.offset;
                    }
                    that.isHttpSending = false;
                    resolve(res.data);
                })
            })
        },
        //获取已关注公众号的帖子
        getPublicTie(flg){
            var that = this
            var postData;
            if(that.isHttpSending) return;
            that.isHttpSending = true;
            if(flg){
                postData = that.$qs.stringify({
                    offset:0,
                    uid:that.$store.state.user.id
                })
            }else{
                postData = that.$qs.stringify({
                    offset:that.offset,
                    uid:that.$store.state.user.id
                })
            }
            return new Promise(resolve=>{
                that.$http.post('/v1/home/ties-interest',postData).then(res=>{
                    if(res.code==0){
                        if(flg){
                            that.list = res.data.records;
                        }else{
                            if(res.data.records.length==0){
                                that.$refs.my_scroller.disablePullup()
                                that.isNoMoreData = true;
                            }else{
                                var newArr = that.list.concat(res.data.records)
                                that.list = newArr;
                                that.$refs.my_scroller.donePullup();
                            }
                        }
                        if(res.data.records.length<20){
                            //是否开启上拉加载更多
                            that.isUsePullUp = false
                        }
                        that.offset = res.data.offset;
                    }
                    that.isHttpSending = false;
                    resolve(res.data);
                })
            })
        },
        //获取六友圈的帖子
        getLiuyou(flg){
            var that = this;
            var postData;
            if(that.isHttpSending) return;
            that.isHttpSending = true;
            if(flg){
                postData = that.$qs.stringify({
                    offset:0
                })
            }else{
                postData = that.$qs.stringify({
                    offset:that.offset
                })
            }
            return new Promise(resolve=>{
                that.$http.post('/v1/home/liuyou-quan',postData).then(res=>{
                    if(flg){
                        that.list = res.data.records;
                    }else{
                        if(res.data.records.length==0){
                            that.$refs.my_scroller.disablePullup()
                            that.isNoMoreData = true;
                        }else{
                            var newArr = that.list.concat(res.data.records)
                            that.list = newArr;
                            that.$refs.my_scroller.donePullup();
                        }
                    }
                    if(res.data.records.length<20){
                        //是否开启上拉加载更多
                        that.isUsePullUp = false
                    }
                    that.isHttpSending = false;
                    that.offset = res.data.offset;
                    resolve(res)
                })
            })
        },
        //高手
        getHeightRank(flag){
            var that = this
            if(that.isHttpSending) return;
            that.isHttpSending = true;
            return new Promise(resolve=>{
                that.$http.get('/v1/home/master-list',{params:{offset:flag?0:that.offset,type:that.heightRankActive}}).then(res=>{
                    if(res.code==0){
                        if(flag){
                            that.list = res.data.records
                        }else{
                            if(res.data.records.length==0){
                                that.$refs.my_scroller.disablePullup()
                            }else{
                                var newArr = that.list.concat(res.data.records)
                                that.list = newArr;
                                that.$refs.my_scroller.donePullup();
                            }
                        }
                    }
                    that.isHttpSending = false;
                    that.offset = res.data.offset
                    resolve(res)
                })
            })
        },
        //获取公众号
        geyPublic(){
            var that = this;
            var str = {}
            that.list = [];
            if(this.$store.state.user==''){
                str = {
                    params:{
                        offset:that.offset,
                        limit:that.publicListLimit,
                        uid:0
                    }
                }
            }else{
                str = {
                    params:{
                        offset:that.offset,
                        limit:that.publicListLimit,
                        uid:this.$store.state.user.id
                    }
                }
            }
            return new Promise(resolve=>{
                that.$http.get('/v1/home/subscriptions',str).then(res=>{
                    if(res.code==0){
                        that.list = res.data.records
                        if(res.data.records.length<4){
                            that.offset = 0
                        }else{
                            that.offset = res.data.offset
                        }
                    }
                })
            })
        },
        //获取关注
        getMynote(){
            var that = this;
            var postData = this.$qs.stringify({
                offset:0,
                category:1
            })
            return new Promise(resolve=>{
                that.$http.post('/v1/user/follows-records',postData).then(res=>{
                    if(res.code==0){
                        localStorage.setItem('myNote',JSON.stringify(res.data));
                        if(res.data.records.length==0){
                            this.unnote = false;
                        }else{
                            this.unnote = true;
                        }
                        resolve(res.data)
                    }else{
                        this.unnote = false;
                        resolve('undone')
                    }
                })
            })
        },
        //全部关注
        async allNote(){
            var that = this
            this.$vux.confirm.show({
                content:'关注功能需要登录',
                confirmText:'登录',
                onConfirm () {
                    that.$router.push({path:'/login'});
                }
            })
            return
            that.publicId = [];
            that.publicList.forEach(ele=>{
                if(!ele.isFollowed){
                    that.publicId.push(ele.id)
                }
            })
            var postData = that.$qs.stringify({
                id:that.publicId.join(","),
                category:1
            })
            var res = await this.sendNote(postData);
            if(res==0){
                that.publicList.forEach(ele=>{
                    ele.isFollowed = true
                })
            }
        },
        //打开注册红包弹窗
        redPackPop(){
            var that = this
            this.redPop = true;
            setTimeout(()=>{
                that.$refs.redpack.className = "redpack-pancel active"
            },50)
        },
        //关闭红包弹窗
        closeRedPack(){
            var that = this
            this.$refs.redpack.className = "redpack-pancel"
            setTimeout(()=>{
                that.redPop = false;
            },200)
        }
    },
    deactivated(){
        this.$store.commit('isClickNextOneTie',false)
    },
    components:{
        Swiper,SwiperItem,Spinner,LoadMore,Scroller,
        'TEXTLIST'(){
            return {
                component:TEXTLIST,
            }
        },
        'USERLIST'(){
            return {
                component:USERLIST,
            }
        },
        DATANONE(){
            return {
                component:DATANONE,
            }
        },
        HEIGHTLIST(){
            return {
                component:HEIGHTLIST,
            }
        },
        BANNER(){
            return {
                component:BANNER,
            }
        },
        liuCode () {
            return {
                component: import('@/module/openCode')
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.redpack-mask{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    background: rgba(0,0,0,.5);
    .redpack-pancel{
        width:95%;
        height: 610px;
        background: url('/static/images/activity/reg_redPack2.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top:-300px;
        margin-left: -43%;
        opacity: 0;
        transform: scale(.7);
        transition: all .2s ease;
        span{
            position: absolute;
            bottom:44px;
            left: 250px;
            width:150px;
            height: 60px;
        }
    }
    .active{
        opacity: 1;
        transform: scale(1)
    }
}
.posi-show{
    opacity: 1;
}
.posi-hide{
    opacity: 0;
}
.index-tab{
    height: 68px;
    line-height: 68px;
    font-size: 34px;
    display: flex;
    background: #fff;
    width: 100vw;
    position: relative;
    z-index: 2;
    span{
        flex: 1;
        height: 68px;
        text-align: center;
    }
    span.active{
        color:$theme-color;
    }
    .activeline{
        position: absolute;
        display: block;
        width: 100px;
        height: 5px;
        background: $theme-color;
        bottom:0px;
        transition: all .5s ease;
    }
    .activeline1{
        transform: translateX(calc((25vw - 100px) / 2))
    }
    .activeline2{
        transform: translateX(calc(25vw + (25vw- 100px) / 2))
    }
    .activeline3{
        transform: translateX(calc(50vw + (25vw - 100px) / 2))
    }
    .activeline4{
        transform: translateX(calc(75vw + (25vw - 100px) / 2))
    }
    .hackpad{
        position: absolute;
        z-index: 3;
        bottom:0;
        height: 20px;
        background: #f2f2f2;
        width: 100vw;
    }
}
.index-banner{
    position: relative;
}
.spinner{
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-100px;
}
.index{
    width:100vw;
    height: 100%;
    position: relative;
    .tj-scroller-wrap{
        width:100%;
        height: 100%;
        padding-bottom:0;
        position: absolute;
        top: 0;
        .pad16{
            height: 16px;
        }
        .tj-scroller{
            height: 100%;
            position: relative;
        }
    }
    .gz-scroller-wrap{
        height: 100%;
        .pad16{
            height: 16px;
        }
        .gzh-list{
            background: $bg-color;
            overflow: hidden;
            padding:0 16px;
            height: 100px;
            border-bottom: 1px solid #e1e1e1;
            span{
                font-size: 30px;
                float: left;
                line-height: 100px;
                color: #333;
            }
            ul{
                overflow: hidden;
                float: right;
                li{
                    float: left;
                    font-size: 0px;
                    margin-left:-10px;
                    height: 100px;
                    span{
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        border:#fff 5px solid;
                        font-size: 0px;
                        margin-top:15px;
                        display: block;
                        overflow: hidden;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                li:first-child{
                    margin:0;
                }
                li:last-child{
                    margin-left:0;
                    i{
                        font-size: 40px;
                        font-weight: bold;
                        color:$subtitle-color;
                        line-height: 100px;
                        transform:rotate(180deg);
                        text-align: center;
                        display: block;
                        margin-right:10px;
                    }
                }
            }
        }
        .gz-scroller{
            height: calc(100% - 116px);
            position: relative;
        }
        .user-list{
            background: $bg-color;
            .title{
                padding-left: 16px;
                padding-top:30px;
                font-size: 34px;
                color: #333;
                text-align: left;
                padding-bottom:30px;
            }
            .title-list:first-child{
                margin-top: 0;
            }
            .title-list {
                padding:0 16px 30px 16px;
            }
            .gzh-btn{
                width: 70%;
                background: $bg-color;
                display: block;
                overflow: hidden;
                margin: auto;
                padding:10px 0 40px 0;
                span{
                    display: block;
                    width:calc(50% - 30px);
                    font-size: 26px;
                    text-align: center;
                }
                span:first-child{
                    border:$theme-color 1px solid;
                    line-height: 58px;
                    border-radius: 44px;
                    color:$theme-color;
                    float: left;
                }
                span:last-child{
                    border-radius: 44px;
                    background: $theme-color;
                    line-height: 60px;
                    color:#fff;
                    float: right;
                }
            }
        }
    }
    .ly-scroller-wrap{
        height: calc(100% - 70px);
        .pad16{
            height: 16px;
        }
        .ly-scroller{
            height: 100%;
            position: relative;
            overflow-y: auto;
        }
    }
    .gs-scroller-wrap{
        height: calc(100% - 68px);
        .pad16{
            height: 16px;
        }
        .height-rank-tab{
            padding-top:20px;
            padding-bottom:20px;
            background: #fff;
            position: relative;
            width: 100vw;
            border-top:$border-color 1px solid;
            border-bottom:$border-color 1px solid;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            .wrap{
                width:1350px;
                // margin: auto;
                // border-radius: 34px;
                // background: #f2f2f2;
                padding-left:30px;
                overflow: hidden;
                position: relative;
                span{
                    // display: block;
                    float: left;
                    // width: 200px;
                    padding-left:50px;
                    padding-right:50px;
                    margin-right:30px;
                    height: 68px;
                    line-height: 68px;
                    font-size: 30px;
                    color:#999;
                    text-align: center;
                    background: #f2f2f2;
                    border-radius: 34px;
                }
                span.active{
                    background: $theme-color;
                    color:#fff;
                }
            }
        }
        .gs-scroller{
            height: calc(100% - 128px);
            position: relative;
        }
    }
}
.tie-list{
    min-height: 150px;
}
</style>
