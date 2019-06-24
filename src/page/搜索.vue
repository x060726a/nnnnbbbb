<template>
<div class="content">
    <header class="header">
        <div class="search-wrap">
            <div class="index-search">
                <i class="iconfont icon-search" @click="search()"></i>
                <form action="" id="myform" ref="searchForm"><input type="search" ref="input" @keyup="searchChange" placeholder="请输入关键字" v-model="text"></form>
            </div>
            <span class="search-cencel" @click="$router.push({path:'/main'})">取消</span>
        </div>
    </header>
    <div class="tab webTop">
        <span :class="{active:searchActive==0}" @click="tabChange(0)">帖子</span>
        <span :class="{active:searchActive==1}" @click="tabChange(1)">公众号</span>
        <span :class="{active:searchActive==2}" @click="tabChange(2)">高手</span>
        <div class="line" :class="{posi1:searchActive==0,posi2:searchActive==1,posi3:searchActive==2}"></div>
    </div>
    <div class="search-res web">
        <div class="webResult" ref='result' @scroll="scrollPosition">
            <div class="hackpad"></div>
            <!-- 历史搜索 -->
            <div class="history-wrap" v-if="searchData.searchRes.length==0&&searchData.searchHistory.length>0">
                <searchHistory :searchHistory='searchData.searchHistory' :active='searchActive' @searchStep='search'/>
            </div>
            <!-- 历史搜索 -->

            <div class="res-wrap">
                <!-- 热门推荐的内容 -->
                <div v-if="resStatus=='shareData'">
                    <div class="title" v-if="isShowShareBtn">
                        <span>热门推荐</span>
                        <span @click="isShowShareBtn=!isShowShareBtn"><i class="iconfont icon-yanjing-bi"></i></span>
                    </div>
                    <div class="share-wrawp" v-if="isShowShareBtn">
                        <HOTSHARE v-if="searchActive==0" :searchShare="searchData.searchShare" :type="1"/>
                        <ul v-if="searchActive==1" class="puplic-list">
                            <li v-for="ele in searchData.searchShare">
                                <USERLIST :text="ele" :isshow="true"/>
                            </li>
                        </ul>
                        <ul v-if="searchActive==2" class="puplic-list">
                            <li v-for="ele in searchData.searchShare">
                                <USERLIST :text="ele" :isshow="true" :isUser="true"/>
                            </li>
                        </ul>
                    </div>
                    <div v-if="isShareEmpty" class="nofound">暂无热门推荐</div>
                    <div v-if="!isShowShareBtn" @click="isShowShareBtn=!isShowShareBtn" class="show-hot-share-btn"><i class="iconfont icon-yanjing1"></i><span>查看热门推荐</span></div>
                    <div class="share-loading" v-if="isHttpLoading">
                        <div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
                    </div>
                </div>
                <!-- 热门推荐的内容 -->

                <!-- 搜索的内容 -->
                <div v-if="resStatus=='searchData'">
                    <div class="search-res-wrap" ref="searchRes">
                        <ul :class="{'puplic-list':searchActive==1||searchActive==2}">
                            <li v-for="ele in searchData.searchRes">
                                <TEXTLIST :text="ele" :isShowthat="false" :highLight='true' :type="1" :highLightStr='$store.state.searchTextStr' v-if="searchActive==0"/>
                                <USERLIST :text="ele" :isshow="true" v-if="searchActive==1"/>
                                <USERLIST :text="ele" :isshow="true" :isUser="true" v-if="searchActive==2"/>
                            </li>
                            <li v-if="isUpHttpLoading">
                                <div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
                            </li>
                            <li v-if="isNomore">没有更多了</li>
                        </ul>
                    </div>
                    <div class="nofound" v-if="isNofound">未查找到相关内容</div>
                    <div class="search-loading" v-if="isHttpLoading">
                        <div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
                    </div>
                </div>
                <!-- 搜索的内容 -->
            </div>
        </div>
    </div> 
</div>
</template>
<script>
const searchHistory = new Promise(resolve=>{
    require.ensure(['@/components/历史搜索'],()=>{
        setTimeout(()=>{
            resolve(require('@/components/历史搜索'))
        },500)
    })
})
const HOTSHARE = new Promise(resolve=>{
    require.ensure(['@/components/搜索热门推荐'],()=>{
        resolve(require('@/components/搜索热门推荐'))
    })
})
const USERLIST = new Promise(resolve=>{
    require.ensure(['@/components/用户列表'],()=>{
        resolve(require('@/components/用户列表'))
    })
});
const TEXTLIST = new Promise(resolve=>{
    require.ensure(['@/components/帖子列表'],()=>{
        resolve(require('@/components/帖子列表'))
    })
});
import {mapGetters} from 'Vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            scrollY:0,
            /****全部需要重置****/
            text:'',
            offset:0,
            isNomore:false,//搜索的时候小于20条内容属于没有更多了
            isNofound:false,//未查找到相关内容
            resStatus:'shareData',//资源返回的内容是什么
            isHttpLoading:false,//请求是否正在发送中
            isUpHttpLoading:false,//上拉请求是否正在发送中
            isShowShareBtn:true,//togle推荐的内容
            isShareEmpty:false,//推荐的内容是否未空
            /****全部需要重置****/
        }
    },
    watch:{
        '$store.state.searchActive'(val,oval){
            this.$store.commit('searchData',{searchShare:[]})
            this.$store.commit('searchData',{searchRes:[]})
            this.getTuiJian();
        },
    },
    activated(){
        var localData = JSON.parse(localStorage.getItem('searchHistorys'))
        if(localData){
            this.$store.commit('searchData',{searchHistory:localData})
        }else{
            this.$store.commit('searchData',{searchHistory:[]})
        }
        this.search();
    },
    created(){
        this.init();
        this.$nextTick(()=>{
            this.$refs.searchForm.onsubmit = this.searchSubmit
            this.$refs.result.scrollTop = this.$store.state.indexScrollTop
        })
    },
    computed:{
        ...mapGetters(['isApp','searchActive','searchData','searchTextStr']),
    },
    methods:{
        scrollPosition(){
            if(!this.$refs.searchRes) return;
            var scrollPos = (this.$refs.result.scrollTop+event.target.clientHeight);//滚动到高度
            var listHeight = this.$refs.searchRes.clientHeight//可以滚动的高度
            if(event.target.scrollTop>this.scrollY){
                //往下拉
                if(listHeight-scrollPos<=50){
                    this.searchText('up');
                }
            }
            if(!this.$refs.result) return;
            this.$store.commit('indexScrollTop',this.$refs.result.scrollTop)
            this.scrollY = event.target.scrollTop;
        },
        init(){
            var localData = JSON.parse(localStorage.getItem('searchHistorys'))
            if(localData){
                this.$store.commit('searchData',{searchHistory:localData})
            }else{
                this.$store.commit('searchData',{searchHistory:[]})
            }
            this.getTuiJian();
        },
        searchChange(){
            if(this.text==''&&this.$store.state.searchData.searchShare.length==0){
                this.$store.commit('searchData',{searchShare:[]})
                this.$store.commit('searchData',{searchRes:[]})
                this.getTuiJian();
            }
            this.$store.commit('searchTextStr',this.text)
        },
        tabChange(idx){
            if(this.isHttpLoading) return;//请求正在发送中是不能切换TAB的
            this.isAllLoad = false
            this.isNofound = false
            this.isNomore = false
            this.isShareEmpty = false
            this.$store.commit('searchActive',idx)
        },
        searchSubmit(){
            event.preventDefault();
            this.search();
        },
        search(){
            if(this.$store.state.searchTextStr==='') return
            this.text = this.$store.state.searchTextStr
            this.addLocalStorage(this.$store.state.searchTextStr);
            this.searchText('down');
        },
        //往本地LocalStorage添加数据
        addLocalStorage(text){
            var localData = JSON.parse(localStorage.getItem('searchHistorys'))
            if(localData){
                if(localData.indexOf(text)==-1){
                    localData.unshift(text)
                    this.$store.commit('searchData',{searchHistory:localData})
                    localStorage.setItem('searchHistorys',JSON.stringify(localData))
                }
            }else{
                this.$store.commit('searchData',{searchHistory:[text]})
                localStorage.setItem('searchHistorys',JSON.stringify([text]))
            }
        },
        // 获取推荐的内容
        getTuiJian(){
            var that = this;
            var str = {}
            if(this.isHttpLoading) return;
            this.isHttpLoading = true
            if(this.$store.state.user===''){
                str = {
                    params:{
                        type:this.$store.state.searchActive+1,
                    }
                }
            }else{
                str = {
                    params:{
                        type:this.$store.state.searchActive+1,
                        uid:this.$store.state.user.id
                    }
                }
            }
            that.$http.get('/v1/home/hot-recommend',str).then(res=>{
                this.resStatus = 'shareData'//返回的资源是推荐内容的
                this.isHttpLoading = false//请求已经完成
                var step = false;
                for(var k in res){
                    if(k==='config'){
                        step = true
                    }
                }
                if(step){
                    if(res.data.code==0){
                        that.$store.commit('searchData',{searchShare:res.data.data})
                        if(res.data.data.length==0){
                            this.isShareEmpty = true
                        }
                    }else{
                        that.$store.commit('searchData',{searchShare:[]})
                        this.isShareEmpty = true
                    }
                }else{
                    if(res.code==0){
                        that.$store.commit('searchData',{searchShare:res.data})
                        if(res.data.length==0){
                            this.isShareEmpty = true
                        }
                    }else{
                        that.$store.commit('searchData',{searchShare:[]})
                        this.isShareEmpty = true
                    }
                }
            })
        },
        // 要搜索的内容
        searchText(booh){
            var that = this;
            if(that.$store.state.searchTextStr=='') return
            that.$store.commit('searchData',{searchShare:[]})
            if(booh=='down'){
                if(this.isHttpLoading) return;
                this.isHttpLoading = true
                that.$store.commit('searchData',{searchRes:[]})
            }
            if(booh == 'up'){
                if(this.isAllLoad) return;//已经全部加载完毕的时候不能再上拉加载更多了
                if(this.isUpHttpLoading) return
                this.isUpHttpLoading = true
                // this.$indicator.open({
                //     text: '正在加载更多',
                //     spinnerType: 'snake'
                // });
            }
            var str = {}
            if(this.$store.state.user==''){
                str = {
                    params:{
                        type:that.$store.state.searchActive+1,
                        offset:booh=='up'?that.offset:0,word:that.$store.state.searchTextStr,
                        uid:0
                    }
                }
            }else{
                str = {
                    params:{
                        type:that.$store.state.searchActive+1,
                        offset:booh=='up'?that.offset:0,word:that.$store.state.searchTextStr,
                        uid:this.$store.state.user.id
                    }
                }
            }
            that.$http.get('/v1/home/search',str).then(res=>{
                this.resStatus = 'searchData'//返回的资源是搜索的内容
                this.isHttpLoading = false//请求已经完成
                this.isUpHttpLoading = false//上拉求情完成
                if(res.code==0){
                    if(res.data.records.length<20){
                        //没有更多的内容
                        this.isNomore = true
                        this.isNofound = false
                    }
                    if(booh=='up'){
                        if(res.data.records.length==0){
                            //上拉的时候如果返回空，就全部加载完毕
                            this.isAllLoad = true
                            this.isNofound = false
                            this.isNomore = true
                        }
                        that.$store.commit('searchData',{searchRes:that.$store.state.searchData.searchRes.concat(res.data.records)})
                    }else{
                        if(res.data.records.length==0){
                            //未找到相关内容
                            this.isNofound = true
                            this.isNomore = false
                        }
                        that.$store.commit('searchData',{searchRes:res.data.records})
                    }
                    that.offset = res.data.offset
                    that.$nextTick(()=>{
                        that.$refs.result.scrollTop = that.$store.state.indexScrollTop
                    })
                }
            })
        }
    },
    destroyed(){
        this.$store.commit('searchData',{
            searchHistory:[],
            searchShare:[],
            searchRes:[]
        })
    },
    components:{
        'searchHistory'(){
            return{
                component:searchHistory,
            }
        },
        'HOTSHARE'(){
            return{
                component:HOTSHARE,
                loading:{
                    template:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
                }
            }  
        },
        'USERLIST'(){
            return{
                component:USERLIST,
                loading:{
                    template:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
                }
            }  
        },
        'TEXTLIST'(){
            return{
                component:TEXTLIST,
                loading:{
                    template:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
                }
            }  
        }
    }
}
</script>
<style lang="scss" scoped>
.hackpad{
    height: 20px;
    background: #f2f2f2;
}
.show-hot-share-btn{
    padding-top:30px;
    i,span{
        vertical-align: middle
    }
    i{
        color:#999;
        font-size: 38px;
        margin-right:10px;
    }
    span{
        font-size: 28px;
        color:#999;
    }
}
.share-loading,.search-loading{
    height: 858px;
    position: relative;
    >div{
        width: 70px;
        height: 70px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -35px;
        margin-top:-35px;
    }
}
.nofound{
    padding-top:30px;
    padding-bottom:30px;
    font-size: 28px;
    color:#999;
}
.search-res-wrap{
    ul{
        li{
            padding-top:30px;
            background: #fff;
        }
        li:last-child{
            padding-top:30px;
            padding-bottom:30px;
            font-size: 28px;
            color:#999;
        }
    }
}
.puplic-list{
    li{
        padding:30px 20px 0 16px;
        background: #fff;
    }
}
.res-wrap{
    .title{
        line-height: 68px;
        height: 68px;
        font-size: 28px;
        color: #999;
        border-bottom:#e1e1e1 1px solid;
        background: #fff;
        span:first-child{
            float: left;
            margin-left:16px;
        }
        span:last-child{
            float: right;
            height: 68px;
            display: block;
            margin-right:26px;
            i{
                display: inline-block;
                height: 68px;
                line-height: 68px;
                color:#999;
                font-size: 48px;
            }
        }
    }
}
.hot-btn{
    padding-top:30px;
    padding-bottom:20px;
    background: #fff;
    .hide-btn{
        width:300px;
        margin: auto;
        i,span{
            vertical-align: middle;
            color:#999;
        }
        span{
            font-size: 28px;
        }
        i{
            font-size: 38px;
            margin-right:10px;
        }
    }
}
.search-res{
    .webResult{
        height: calc(100vh - (#{$web-height} + 68px));
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        .history-wrap{
            width: 100vw;
            position: relative;
            .spinner-wrap{
                position: absolute;
                top:50%;
                left: 50%;
                margin-left:-35px;
                margin-top:-35px;
                width: 70px;
                height: 70px;
            }
        }
    }
}
.webTop{
    top:$web-height;
}
.appTop{
    top:128px;
}
.tab{
    height: 68px;
    line-height: 68px;
    display: flex;
    background: #fff;
    position: fixed;
    z-index: 4;
    width: 100%;
    span{
        font-size: 34px;
        flex: 1;
        text-align: center;
    }
    span.active{
        color:$theme-color;
    }
    .line{
        position: absolute;
        z-index: 1;
        bottom: 0;
        height: 5px;
        width:100px;
        background: $theme-color;
        transition: all .5s ease;
    }
    .posi1{
        left: calc(((100% / 3) - 100px) / 2);
    }
    .posi2{
        left: calc((100% / 3) + ((100% / 3) - 100px) / 2);
    }
    .posi3{
        left: calc((100% / 3) * 2 + ((100% / 3) - 100px) / 2);
    }
}
.web{
    padding-top:156px;
}
.app{
    padding-top:196px;
}
.pad{
    height: 40px;
    background: $theme-color;
}
.search-cencel{
    font-size: 32px;
    line-height: 56px;
    position: absolute;
    right:26px;
    bottom: 17px;
    color:#fff;
}
.header{
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
}
.search-wrap{
    height: 73px;
    background: $theme-color;
    padding-top:15px;
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
        width:538px;
        height: 56px;
        padding-left:70px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        >div{
            line-height: 56px;
            color:#999;
            font-size: 28px;
            text-align: left;
        }
        input{
            height: inherit;
            width:100%;
            font-size: 28px;
            line-height: 56px;
            display: block;
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
}
</style>
