const mainlist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/首页'], component => {
        Vue.$vux.loading.hide()
        resolve(component);
    })
}
const liuhedaquan = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/六合大全'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const chat = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/聊天室'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const login = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/登录'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const reg = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/注册'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const manage = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/个人中心'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const detailcont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/帖子详情'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const search = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/搜索'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const mymoney = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的金币'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const cjquan = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/抽奖券'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const golddetail = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/金币明细'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const wodewupin = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/我的物品'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const wpuse = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/物品使用'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const ddstatus = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/订单提交页面'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const activitycont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/活动详情'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const collection = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的收藏'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const mypost = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的帖子'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const mynote = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的关注'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const reward = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的打赏'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const recording = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/竞猜记录'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const wdtuiguang = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/我的推广'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const download = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/下载APP'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const about = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/关于我们'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const forum = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/六合论坛'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const lotteryopen = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/开奖日期'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const cslist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/changshi/六合常识列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const csCont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/changshi/六合常识内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const tukulist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/tuku/六合图库列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const tkcont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/tuku/六合图库内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const historyissue = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/历史期数'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const gslist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/gongshi/六合公式列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const gscont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/gongshi/六合公式内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const tjlist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/tongji/六合统计列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const tjcont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/tongji/六合统计内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const zslist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/zoushi/走势图列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const zscont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/zoushi/走势图内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const zllist = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/quannian/全年资料列表'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const zlcont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/liuhe/quannian/全年资料内容'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const gaoshouyuce = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/高手榜预测信息'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const sendcont = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/发帖'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const yhtuijian = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/用户推荐'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const setavatar = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/设置头像'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const publictie = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/公众号帖子'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const usertie = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/用户帖子'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const showdownapp = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/下载教程'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const chakandd = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/mymoney/查看现金订单'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const setting = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/设置'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const findpassword = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/忘记密码'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const qiandao = resolve => {
    Vue.$vux.loading.show({
        text: '加载中',
    })
    require(['@/page/签到'],component => {
        Vue.$vux.loading.hide()
        resolve(component)
    })
}
const router = new VueRouter({
    mode: 'history',
    linkActiveClass:'main-active',
    routes: [
        { path: '/', redirect: '/main' },
        {
            path: '/main',
            component: mainlist,
            name:'首页',
            meta: {
                title:{
                    name:'首页',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:false,
                rightIcon:{
                    className:'fatie',
                    routerPath:'/sendcont'
                },
                isHasFooter:true,
                keepAlive:true
            }
        },
        // 选择你喜欢的资料类型
        {
            path: '/loveType',
            component: resolve => require(['@/page/loveType'], resolve),
            name: '选择喜好',
            meta: {
                title:{
                    name:'选择喜好',
                    isTab:false
                }
            }
        },
        // 选择你喜欢的资料类型
        {
            path: '/expertInfo',
            component: resolve => require(['@/page/expertInfo'], resolve),
            name: '专家资料',
            meta: {
                title:{
                    name:'专家资料',
                    isTab:false
                },
                leftBackIcon:{name:'',path:'/main'}
            }
        },
        {
            path: '/liuhe',
            component: liuhedaquan,
            name:'六合大全',
            meta: {
                title:{
                    name:'六合大全',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:false,
                rightIcon:false,
                isHasFooter:true,
                keepAlive:true
            }
        },
        {
            path: '/chat',
            component: chat,
            name:'聊天室',
            meta: {
                title:{
                    name:'聊天室',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/main'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path: '/login',
            component: login,
            name:'登录',
            meta: {
                title:{
                    name:'登录',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/main'},
                rightIcon:false,
                isHasFooter:false,
                isHideHeader:false,
                keepAlive:false
            }
        },
        {
            path: '/reg',
            component: reg,
            name:'注册',
            meta: {
                title:{
                    name:'注册',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/login'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path: '/manage',
            component: manage,
            name:'个人中心',
            meta: {
                title:{
                    name:'个人中心',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:false},
                rightIcon:false,
                isHasFooter:true,
                isHideHeader:true,
                keepAlive:false
            }
        },
        {
            path:'/detailcont/:id',
            component:detailcont,
            name:'帖子详情',
            meta: {
                title:{
                    name:'帖子详情',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/main'},
                rightIcon:{className:'fatie',routerPath:'/sendcont'},
                isHasFooter:false,
                keepAlive:false,
            }
        },
        {
            path:'/search',
            component:search,
            name:'搜索',
            meta: {
                title:{
                    name:'搜索',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/main'},
                rightIcon:false,
                isHasFooter:false,
                isHideHeader:true,
                keepAlive:true
            }
        },
        {
            path:'/mymoney',
            component:mymoney,
            meta: {
                title:{
                    name:'我的金币',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/cjquan',
            component:cjquan,
            meta: {
                title:{
                    name:'抽奖券',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'兑换',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/golddetail',
            component:golddetail,
            meta: {
                title:{
                    name:'金币明细',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'兑换',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/golddetail',
            component:golddetail,
            meta: {
                title:{
                    name:'金币明细',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'兑换',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/mythings',
            component:wodewupin,
            meta: {
                title:{
                    name:'我的物品',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'兑换',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:true
            }
        },
        {
            path:'/wpuse',
            component:wpuse,
            name:'物品使用',
            meta: {
                title:{
                    name:'物品使用',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/ddstatus',
            component:ddstatus,
            name:'订单状态',
            meta: {
                title:{
                    name:'订单状态',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'我的物品',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/activity-cont/:id',
            component:activitycont,
            name:'活动',
            meta: {
                title:{
                    name:'',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'兑换',path:'/mymoney'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/collection',
            component:collection,
            meta: {
                title:{
                    name:'我的收藏',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:{className:'fatie',routerPath:'/sendcont'},
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/mypost',
            component:mypost,
            meta: {
                title:{
                    name:'我的帖子',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:{className:'fatie',routerPath:'/sendcont'},
                isHasFooter:false
            }
        },
        {
            path:'/mynote',
            component:mynote,
            meta: {
                title:{
                    name:'我的关注',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/reward',
            component:reward,
            meta: {
                title:{
                    name:'我的打赏',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/recording',
            component:recording,
            meta: {
                title:{
                    name:'竞猜记录',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/mypromotion',
            component:wdtuiguang,
            meta: {
                title:{
                    name:'我的推广',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/download',
            component:download,
            name:'APP下载',
            meta: {
                title:{
                    name:'APP下载',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/about',
            component:about,
            meta: {
                title:{
                    name:'关于我们',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/manage'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/forum',
            component:forum,
            meta: {
                title:{
                    name:'六合论坛',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/lotteryopen',
            component:lotteryopen,
            meta: {
                title:{
                    name:'开奖日期',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/cslist',
            component:cslist,
            meta: {
                title:{
                    name:'六合常识',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/cscont/:id',
            component:csCont,
            meta: {
                title:{
                    name:'六合常识',
                    isTab:false,
                    tabList:['']
                } ,
                leftBackIcon:{name:'六合常识',path:'/liuhe'},
                rightIcon:false,isHasFooter:false
            }
        },
        {
            path:'/tukulist',
            component:tukulist,
            name:'图库解析',
            meta: {
                title:{
                    name:'图库解析',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:true
            }
        },
        {
            path:'/tkcont/:id',
            component:tkcont,
            name:'六合图库',
            meta: {
                title:{
                    name:'六合图库',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'图库解析',path:'/tukulist'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/historyissue',
            component:historyissue,
            meta: {
                title:{
                    name:'历史期数',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/gslist',
            component:gslist,
            meta: {
                title:{
                    name:'六合公式',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/gscont/:id',
            component:gscont,
            meta: {
                title:{
                    name:'公式内容',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合公式',path:'/gslist'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/tjlist',
            component:tjlist,
            meta:{
                title:{
                    name:'六合统计',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/tjcont/:id',
            component:tjcont,
            name:'六合统计',
            meta: {
                title:{
                    name:'六合统计',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合统计',path:'/tjlist'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/zslist',
            component:zslist,
            meta: {
                title:{
                    name:'走势图',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/zscont/:id',
            component:zscont,
            meta: {
                title:{
                    name:'',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'走势图',path:'/zslist'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/zllist',
            component:zllist,
            meta: {
                title:{
                    name:'全年资料',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/liuhe'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path:'/zlcont/:id',
            component:zlcont,
            name:'全年资料',
            meta: {
                title:{
                    name:'全年资料',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'六合大全',path:'/zllist'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path: '/sendcont',
            component: sendcont,
            name:'发帖',
            meta: {
                title:{
                    name:'发帖',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/main'},
                rightIcon:false,
                isHasFooter:false
            }
        },
        {
            path: '/recommend',
            component: yhtuijian,
            meta: {
                title:{
                    name:'用户推荐',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/main'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:true
            }
        },
        {
            path:'/yuce/:id',
            component:gaoshouyuce,
            meta: {
                title:{
                    name:'六友高手',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/main'},
                rightIcon:false,
                isHasFooter:false,
            }
        },
        {
            path:'/setavatar',
            component:setavatar,
            meta: {
                title:{
                    name:'设置头像',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'个人中心',path:'/setting'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:true
            }
        },
        {
            path:'/publictie/:id',
            component:publictie,
            name:'公众号帖子',
            meta: {
                title:{
                    name:'公众号帖子',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/recommend'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/usertie/:id',
            component:usertie,
            name:'用户帖子',
            meta: {
                title:{
                    name:'用户帖子',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'首页',path:'/recommend'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/showdownapp',
            component:showdownapp,
            name:'下载教程',
            meta: {
                title:{
                    name:'下载教程',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/download'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/xjdetail',
            component:chakandd,
            name:'查看现金订单',
            meta: {
                title:{
                    name:'物品使用',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/mythings'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/setting',
            component:setting,
            name:'设置',
            meta: {
                title:{
                    name:'设置',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/manage'},
                rightIcon:false,
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/findpassword',
            component:findpassword,
            name:'忘记密码',
            meta: {
                title:{
                    name:'忘记密码',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/login'},
                rightIcon:{className:'kefu',routerPath:'/sendcont',text:'联系客服'},
                isHasFooter:false,
                keepAlive:false
            }
        },
        {
            path:'/qiandao',
            component:qiandao,
            name:'签到',
            meta: {
                title:{
                    name:'签到',
                    isTab:false,
                    tabList:['']
                },
                leftBackIcon:{name:'',path:'/manage'},
                isHasFooter:false,
                keepAlive:false
            }
        },
    ],
})
export default router
