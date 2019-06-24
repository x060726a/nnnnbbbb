import FastClick from 'fastclick'
import App from './components/ndd'
import qs from 'qs'
import 'amfe-flexible'
import router from './router'
import store from './store/store.js'
import mixin from './mixin.js'
import './assets/iconfont.js'
// import './assets/clipboard.min.js'
import  { ToastPlugin,LoadingPlugin,ConfirmPlugin,DatetimePlugin } from 'vux'
import { Spinner } from 'vux'
import { XDialog } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)
Vue.component('spinner', Spinner)
Vue.component('x-dialog', XDialog)
Vue.prototype.$qs = qs
FastClick.attach(document.body)

Vue.config.productionTip = false
router.beforeEach((to,from,next) => {
    setTimeout(()=>{
        (()=>{
            document.getElementById('ymtj') && document.getElementById('ymtj').remove();
            var cnzz_s_tag = document.createElement("script");
            cnzz_s_tag.type = 'text/javascript'
            cnzz_s_tag.async = true;
            cnzz_s_tag.charset = 'uft-8'
            cnzz_s_tag.id = 'ymtj'
            cnzz_s_tag.src = "https://s13.cnzz.com/z_stat.php?id=1275047771&web_id=1275047771"
            var root_s = document.getElementsByTagName('script')[0]
            root_s.parentNode.insertBefore(cnzz_s_tag,root_s);
        })()
    },0)
    store.commit('routerBackName',from.name)
    if(from.name=="帖子详情"){
        to.meta.isRefresh = false
    }else{
        to.meta.isRefresh = true
    }
    store.commit('routerStatus',to.meta);
    store.commit('lastRouterStatus',from.meta);
    var data = JSON.parse(localStorage.getItem('user'))
    if(to.path=='/setting'){
        if(data){
            next();
        }else{
            next('/main');
        }
        return true;
    }
    if(to.path=='/login'){
        if(data){
            next('/manage');
        }else{
            next();
        }
        return true;
    }
    if(to.path=='/manage'){
        if(data){
            next();
        }else{
            next('/login');
        }
        return true;
    }
    next();
})
new Vue({
    router,
    store,
    mixins:[mixin],
    render: h => h(App)
}).$mount('#app-box')
//axios请求拦截器
Vue.axios.interceptors.request.use(config=>{
    var token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = 'Bearer ' + token;
    }else{
        if(config.url!='/v1/user/login'&&config.url!='/v1/liuhe/kj-records'){
        // console.log('还没登录');
        }
    }
    return config;
    },error=>{
        console.log('请求失败');
        return error
    });
// axios响应拦截器
Vue.axios.interceptors.response.use(response => {
    if(response.data.code==401){
        Vue.$vux.loading.hide()
        Vue.$vux.confirm.show({
        content:'您的登录已过期',
        confirmText:'确认',
        showCancelButton:false,
        onConfirm () {
            // store.commit('goLogin');
            localStorage.removeItem('user');
            localStorage.removeItem('myNote');
            localStorage.removeItem('token');
            store.commit('user','');
            response.config.headers['Authorization'] = ''
            Vue.$vux.loading.hide()
            router.push({path:'/login'})
        }
        });
    }
    //如果不是登录接口
    if(response.config.url!='/v1/user/login'){
        var token = localStorage.getItem('token');
        if(token){
            response.config.headers['Authorization'] = 'Bearer ' + token;
        }else{
            // console.log('请先登录');
        }
    }else{
        if(response.data.code!=1001){
            localStorage.setItem('token',response.data.data.token);
        }
    }
    return response.data
    }, error => {
        console.log('响应失败');
        return Promise.reject(error)
    })
