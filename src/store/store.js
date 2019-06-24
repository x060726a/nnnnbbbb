// import Vue from 'vue';
import router from "../router/index.js";
import md5 from 'js-md5'
// import Vuex from 'vuex'
//https://vuex.vuejs.org/zh/guide/
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        indexHeadActive:1,
        headerActive:1,
        selectYear: 0, // 年份选择
        yearNum: 0, // 当期年份
        deleteSomeOntList:0,//点击关闭首页列表的广告
        tz_popupVisible:false,//聊天室投注的弹框
        isSending:false,//是否正在发送聊天室信息
        sendCuont:0,//发送聊天室信息成功总数
        message:[],//聊天信息列表
        guest:'',
        user:'',//用户信息
        HistoryNum:'',//历史号码
        socket:'',
        noteSomeOne:0,
        diaLog:{
            show:false,//弹窗的状态
            text:'',//弹窗的文本
            path:'',//弹窗的确认跳转路径
            reload:''
        },
        chatRoll:0,
        sysTem:'',//系统配置信息
        lastRouterStatus:false,//路由的状态信息
        routerStatus:'',//路由的状态信息
        myNoteTest:[],//关注的uid
        myNoteData:[],//关注的json数据
        betObj:'',//投注
        redPackPop:false,//红包弹窗
        redPackRes:'',//抢红包返回的信息
        openKeypo:false,
        betBroject:'',//投注提交参数
        nextIssue:'',//下一期期号
        qiandaoStatus:false,//签到弹窗
        isActiveToday:false,//是否签到
        resQiandaoDate:false,//签到成功时返回的信息
        pinglunPancel:false,//评论输入框的弹窗
        lotteryPancel:false,//投注弹窗
        keypoNum:'请输入金额',//键盘金额
        LostConnection:false,
        routerBackName:'',//上个路由名称
        fatieBackName:'',//发帖返回时头部的headerActive值时多少
        indexScrollTop:0,//记录滚动条的位置
        xqScrollTop:0,//详情页滚动的位置
        tukuScrollTop:0,//记录图库列表滚动的位置
        loginBackPath:null,//从哪里提示登录，登录后就返回哪里
        headRefresh:0,//点击头部刷新
        tukuTabIndex:1,//图库的tab
        heightRankActive:3,//高手榜的avtive
        searchActive:0,//搜索页里的active
        searchTextStr:'',
        searchData:{
            searchHistory:[],
            searchShare:[],
            searchRes:[],
        },
        slideName:'',
        isApp:false,
        chooseObj:'',
        fatietitle:'',
        isClickNextOneTie:false,//在帖子详情里是否点击了查看下一篇
        isScrolltoBottom:true,//聊天室是否滚动到底部
        newMessageNum:0,//在聊天室向上滑动的时候，如果有信息推送过来就提示
        socketUrl:'',
        sendLastMessage:0,
        a_someOne:'',//聊天室里面@某个人
    },
    getters:{
        selectYear(state) { // 年份选择
          return state.selectYear
        },
        yearNum (state) {
            return state.yearNum
        },
        isApp(state){
            return state.isApp
        },
        a_someOne(state){
            return state.a_someOne
        },
        deleteSomeOntList(state){
            return state.deleteSomeOntList
        },
        slideName(state){
            return state.slideName
        },
        tz_popupVisible(state){
            return state.tz_popupVisible
        },
        newMessageNum(state){
            return state.newMessageNum
        },
        searchText(state){
            return state.searchData
        },
        searchData(state){
            return state.searchData
        },
        searchActive(state){
            return state.searchActive
        },
        heightRankActive(state){
            return state.heightRankActive
        },
        indexHeadActive(state){
            return state.indexHeadActive
        },
        headerActive(state){
            return state.headerActive
        },
        myPostActive(state){
            return state.myPostActive
        },
        message(state){
            return state.message;
        },
        isSending(state){
            return state.isSending;
        },
        sendCuont(state){
            return state.sendCuont;
        },
        user(state){
            return state.user;
        },
        HistoryNum(state){
            return state.HistoryNum;
        },
        socket(state){
            return state.socket;
        },
        guest(state){
            return state.guest;
        },
        noteSomeOne(state){
            return state.noteSomeOne;
        },
        sysTem(state){
            return state.sysTem;
        },
        routerStatus(state){
            return state.routerStatus
        },
        lastRouterStatus(state){
            return state.lastRouterStatus
        },
        myNoteData(state){
            return state.myNoteData
        },
        myNoteTest(state){
            return state.myNoteTest
        },
        betObj(state){
            return state.betObj
        },
        redPackPop(state){
            return state.redPackPop
        },
        betBroject(state){
            return state.betBroject
        },
        openKeypo(state){
            return state.openKeypo
        },
        redPackRes(state){
            return state.redPackRes
        },
        nextIssue(state){
            return state.nextIssue
        },
        qiandaoStatus(state){
            return state.qiandaoStatus
        },
        isActiveToday(state){
            return state.isActiveToday
        },
        qiandaoDate(state){
            return state.qiandaoDate
        },
        resQiandaoDate(state){
            return state.resQiandaoDate
        },
        pinglunPancel(state){
            return state.pinglunPancel;
        },
        lotteryPancel(state){
            return state.lotteryPancel;
        },
        keypoNum(state){
            return state.keypoNum
        },
        routerBackName(state){
            return state.routerBackName
        },
        fatieBackName(state){
            return state.fatieBackName
        },
        indexScrollTop(state){
            return state.indexScrollTop
        },
        xqScrollTop(state){
            return state.xqScrollTop
        },
        tukuScrollTop(state){
            return state.tukuScrollTop
        },
        loginBackPath(state){
            return state.loginBackPath
        },
        headRefresh(state){
            return state.headRefresh
        },
        tukuTabIndex(state){
            return state.tukuTabIndex
        },
        chooseObj(state){
            return state.chooseObj
        },
        fatietitle(state){
            return state.fatietitle
        },
        isClickNextOneTie(state){
            return state.isClickNextOneTie
        },
        isScrolltoBottom(state){
            return state.isScrolltoBottom
        },
        diaLog(state){
            return state.diaLog
        },
        chatRoll(state){
            return state.chatRoll
        }
    },
    mutations:{
        selectYear (state, val) {
            state.selectYear = val
        },
        yearNum (state, val) {
            state.yearNum = val
        },
        a_someOne(state,val){
            state.a_someOne = val
        },
        deleteSomeOntList(state,val){
            state.deleteSomeOntList = val
        },
        newMessageNum(state,val){
            state.newMessageNum = val
        },
        tz_popupVisible(state,val){
            state.tz_popupVisible = val
        },
        chatRoll(state,val){
            state.chatRoll++
        },
        goLogin(state,val){
            router.push({path:'/login'});
        },
        diaLog(state,val){
            state.diaLog = val
        },
        pushLastMessage(state,val){
            Vue.set(state.message,[state.sendLastMessage-1],val)
        },
        sendLastMessage(state,val){
            state.sendLastMessage = val;
        },
        isApp(state,val){
            state.isApp = val;
        },
        slideName(state,val){
            state.slideName = val;
        },
        searchTextStr(state,val){
            state.searchTextStr = val;
        },
        searchData(state,val){
            Object.assign(state.searchData,val)
        },
        searchActive(state,val){
            state.searchActive = val;
        },
        heightRankActive(state,val){
            state.heightRankActive = val;
        },
        indexHeadActive(state,val){
            state.indexHeadActive = val;
        },
        headerActive(state,val){
            state.headerActive = val;
        },
        closeSidebar(state,val){
            state.sidebar = val;
        },
        pushMessage(state,val){
            state.message.push(val);
        },
        //重制聊天记录
        resetMessage(state,val){
            state.message = val;
        },
        LostConnection(state,val){
            state.LostConnection = val
        },
        isSending(state,val){
            state.isSending = val;
        },
        sendCuont(state){
            state.sendCuont++;
        },
        user(state,val){
            state.user = val;
        },
        HistoryNum(state,val){
            state.HistoryNum = val;
        },
        socket(state,val){
            state.socket = val;
        },
        guest(state,val){
            state.guest = val;
        },
        noteSomeOne(state,val){
            state.noteSomeOne = val;
        },
        sysTem(state,val){
            state.sysTem = val;
        },
        routerStatus(state,val){
            state.routerStatus = val;
        },
        lastRouterStatus(state,val){
            state.lastRouterStatus = val;
        },
        //修改头部的title
        changeRoutertTitle(state,val){
            state.routerStatus.title.name = val;
        },
        myNoteTest(state,val){
            state.myNoteTest = state.myNoteTest.concat(val)
        },
        cancelNote(state){
            state.myNoteData = [];
            state.myNoteTest = [];
        },
        betObj(state,val){
            state.betObj = val;
        },
        redPackPop(state,val){
            state.redPackPop = val;
        },
        betBroject(state,val){
            state.betBroject = val;
        },
        openKeypo(state,val){
            state.openKeypo = val;
        },
        //禁言
        changeChat(state,val){
            state.user.chat = val
            localStorage.setItem('chat',JSON.stringify(state.user))
        },
        //修改金币
        changeMoney(state,val){
            state.user.money = val
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        //修改抽奖次数
        changeRollTime(state,val){
            state.user.roll_nums = val
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        //修改头像
        changeAvatar(state,val){
            state.user.avatar = val
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        redPackRes(state,val){
            state.redPackRes = val
        },
        nextIssue(state,val){
            state.nextIssue = val
        },
        qiandaoStatus(state,val){
            state.qiandaoStatus = val
        },
        isActiveToday(state,val){
            state.isActiveToday = val
        },
        qiandaoDate(state,val){
            state.qiandaoDate = val
        },
        resQiandaoDate(state,val){
            state.resQiandaoDate = val
        },
        pinglunPancel(state,val){
            state.pinglunPancel = val
        },
        lotteryPancel(state,val){
            state.lotteryPancel = val
        },
        keypoNum(state,val){
            state.keypoNum = val
        },
        routerBackName(state,val){
            state.routerBackName = val
        },
        fatieBackName(state,val){
            state.fatieBackName = val
        },
        indexScrollTop(state,val){
            state.indexScrollTop = val
        },
        xqScrollTop(state,val){
            state.xqScrollTop = val
        },
        tukuScrollTop(state,val){
            state.tukuScrollTop = val
        },
        loginBackPath(state,val){
            state.loginBackPath = val
        },
        headRefresh(state){
            state.headRefresh++
        },
        tukuTabIndex(state,val){
            state.tukuTabIndex = val
        },
        chooseObj(state,val){  //数据的修改
            // Object.assign(state.chooseObj,val)
            state.chooseObj = val
        },
        fatietitle(state,val){
            state.fatietitle = val
        },
        isClickNextOneTie(state,val){
            state.isClickNextOneTie = val
        },
        isScrolltoBottom(state,val){
            state.isScrolltoBottom = val
        },
        socketUrl(state,val){
            state.socketUrl = val
        },
        createWebSocket(state){
            var username,nickname;
            if(state.user==''){
                this.commit('socketUrl',md5(md5('!guest001!')+'^liuyou@#$liuyou&swoole$'))
                username = '!guest001!';
                nickname = '游客';
            }else{
                this.commit('socketUrl',md5(md5(state.user.username)+'^liuyou@#$liuyou&swoole$'))
                username = state.user.username;
                nickname = state.user.nickname;
            }
            var base_ws_url;
            Vue.axios.get('../../static/js/host.json').then(res=>{
                base_ws_url = res.HOST
                if(state.socket==''||state.socket.readyState==3){
                    // Vue.$indicator.open({
                    //     text: '正在连接聊天室',
                    //     spinnerType: 'snake'
                    // })
                    this.commit('socket',new WebSocket(base_ws_url+"?username="+username+"&nickname="+nickname+"&token="+state.socketUrl));
                    this.commit('connection')
                }
            })
        },
        connection(state){
            state.socket.onopen = ()=>{
                // console.log('连接');
            }
            state.socket.onclose = () =>{
                // console.log('关闭');
            }
            var i = 0;
            state.socket.onmessage = (e) => {
                // console.log('收到信息');
                var data = JSON.parse(e.data);
                //是否是自己发送的和文本信息
                var that = this
                if(data.event!=='welcome'&&data.uid!=state.user.id&&!state.isScrolltoBottom){
                    var i = state.newMessageNum
                    i++
                    this.commit('newMessageNum',i)
                }
                if(data.event=="msg"){
                    if(data.uid==state.user.id){
                        data['isSending'] = false
                        that.commit('pushLastMessage',data)
                    }else{
                        data['isMyself'] = false
                        this.commit('pushMessage',data);
                    }
                }
                //后台发言
                if(data.event=='notice'){
                    this.commit('pushMessage',data);
                }
                //红包
                if(data.event=='envelop'){
                    this.commit('pushMessage',data);
                }
                //统计结果
                if(data.event=='bet_statistics'){
                    this.commit('pushMessage',data);
                }
                //欢迎进入
                if(data.event=="welcome"){
                    this.commit('pushMessage',data);
                }
                //投注
                if(data.event=="bet"){
                    if(data.uid!=state.user.id){
                        data['isMyself'] = false
                    }
                    this.commit('pushMessage',data);
                }
                //禁言
                if(data.event=='forbidden'){
                    console.log(data.username==state.user.username);
                    if(data.username==state.user.username){
                        this.commit('changeChat',0);
                    }
                    this.commit('pushMessage',data);
                }
            };
        },
    },
    actions:{
        getSystem(){
            return new Promise(resolve=>{
                Vue.axios.get('/v1/home/settings').then(res=>{
                    if(res.data.code==0){
                        resolve(res.data.data.records)
                        localStorage.setItem('sysTem',JSON.stringify(res.data.data.records))
                    }else{
                        resolve(false);
                    }
                })
            })
        },
        async getStoreSystem({dispatch,commit}){
            var res = await dispatch('getSystem')
            commit('sysTem',res)
        },
        getNextIssue({dispatch,commit}){
            return new Promise(resolve=>{
                Vue.axios.get('/v1/liuyou/next-open').then(res=>{
                    if(res.code==0){
                        resolve(res.data.record)
                        commit('nextIssue',res.data.record);
                    }
                })
            })
        },
        //获取关注列表
        getMyNote(){
            return new Promise(resolve=>{
                Vue.axios.post('/v1/user/follows-records').then(res=>{
                    if(res.code==0){
                        resolve(res.data);
                    }else{
                        var arr = [];
                        resolve(arr);
                    }
                })
            })
        },
        //上拉关注
        upGetMyNote({dispatch,commit},fromObj){
            return new Promise(resolve=>{
                Vue.axios.post('/v1/user/follows-records',fromObj).then(res=>{
                    if(res.code==0){
                        resolve(res.data.records);
                    }else{
                        var arr = [];
                        resolve(arr);
                    }
                })
            })
        },
        //点击关注
        sendNote({state},postData){
            return new Promise(resolve=>{
                if(state.user==''){
                    Vue.$vux.confirm.show({
                        content:'关注功能需登录',
                        confirmText:'登录',
                        onConfirm () {
                            router.push({path:'/login'});
                        }
                    })
                    resolve('unlogin');
                    return;
                }
                Vue.axios.post('/v1/user/follow-add',postData).then(res=>{
                    resolve(res.code);
                    Vue.$vux.toast.text('关注成功', 'middle')
                })
            })
        },
        async AsSendNote({dispatch,commit},postData){
            console.log(postData);
            await dispatch('sendNote',postData);
        },
        //取消关注
        cancelNote({state},postData){
            return new Promise(resolve=>{
                Vue.axios.post('/v1/user/follow-sub',postData).then(res=>{
                    resolve(res.code)
                    Vue.$vux.toast.text('取关成功', 'middle')
                })
            })
        },
        async AsCancelNote({dispatch,commit},postData){
            await dispatch('cancelNote',postData);
            //取关成功之后
        },
        //获取签到信息
        getQiandao({commit},postData){
            return new Promise(resolve=>{
                Vue.axios.post('/v1/user/sign-check',postData).then(res=>{
                    if(res.code==0){
                        //签到状态
                        if(res.data.signed){
                            commit('isActiveToday',true)
                        }else{
                            commit('isActiveToday',false)
                        }
                        // commit('resQiandaoDate',res.data)
                    }
                    resolve(res)
                })
            })
        },
        //签到
        sendQiandao({commit},postData){
            return new Promise(resolve=>{
                Vue.axios.post('/v1/user/sign',postData).then(res=>{
                    if(res.code==0){
                        commit('isActiveToday',false)//签到小红点消失
                        commit('changeMoney',res.data.coin)
                        //commit('resQiandaoDate',res.data)//成功时返回的信息
                    }
                    resolve(res);
                })
            })
        },
        //获取个人信息
        getUserData({commit}){
            Vue.axios.post('/v1/user/user-profile').then(res=>{
                if(res.code==0){
                    commit('user',res.data);
                    localStorage.setItem('user',JSON.stringify(res.data))
                    localStorage.setItem('user_category',res.data.user_category)
                }
            })
        }

    },

})
