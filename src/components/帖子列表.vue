<template>
    <div :class="{'card':text.category!=99,'card-banner':text.category==99}">
        <router-link class="content-wrap" v-if="imgArr.length==0 && text.category!=99" :to="{path:'/detailcont/'+(text.tie_id||text.id),query:{offset:index,tab:tab,type:type,title: title}}">
            <p class="text onetitle" v-html="text&&text.title"></p>
            <div class="username">
                <!-- <div class="avatar" v-if="title == 6"><img :src="'/static/images/avatar/'+text.avatar+'.jpg'"></div>
                <div class="avatar" v-else><img :src="text.avatar"></div>
                <span v-if="text.category!=9">{{text.username}}</span>
                <span v-if="text.category==9">{{text.nickname}}</span>
                <span v-if="isShowthat">阅读{{text.read_times==null?0:text.read_times}}</span>
                <span v-if="isShowthat">{{timeago(text.updated_at)}}</span> -->
                <span>{{text.read_times}}阅读</span>
                <span>{{text.zan_times}}点赞</span>
                <span>{{text.count}}评论</span>
            </div>
        </router-link>

        <router-link class="content-wrap content-wrap-table" :to="{path:'/detailcont/'+(text.tie_id||text.id),query:{offset:index,tab:tab,type:type}}" v-if="imgArr.length<3 && imgArr.length!=0 && text.category!=99">
            <div class="left">
                <p class="text" v-html="text&&text.title"></p>
            </div>
            <div class="right">
                <span><img :src="imgArr[0]"></span>
            </div>
            <div style="clear:both"></div>
            <div class="username">
                <!-- <div class="avatar" v-if="text.category==9"><img :src="'/static/images/avatar/'+text.avatar+'.jpg'"></div>
                <div class="avatar" v-if="text.category!=9"><img :src="text.avatar"></div>
                <span class="text-name">{{text.username}}</span> -->
                <span>{{text.read_times}}阅读</span>
                <span>{{text.zan_times}}点赞</span>
                <span>{{text.count}}评论</span>
            </div>
        </router-link>

        <router-link class="content-wrap" :to="{path:'/detailcont/'+(text.tie_id||text.id),query:{offset:index,tab:tab,type:type}}" v-if="imgArr.length>=3 && text.category!=99">
            <p class="text lasttitle" v-html="text&&text.title"></p>
            <ul>
                <li class="img-item" v-for="(ele,idx) in imgArr" v-if="idx<=2"><img :src="ele"></li>
            </ul>
            <div class="username">
                <!-- <div class="avatar" v-if="text.category==9"><img :src="'/static/images/avatar/'+text.avatar+'.jpg'"></div>
                <div class="avatar" v-if="text.category!=9"><img :src="text.avatar"></div>
                <span>{{text.username}}</span> -->
                <span>{{text.read_times}}阅读</span>
                <span>{{text.zan_times}}点赞</span>
                <span>{{text.count}}评论</span>
            </div>
        </router-link>
        <a v-if="text.category==99" class="tie-banner" :href="text.link">
            <img :src="text.img" alt="">
            <span @click="close" class="iconfont icon-close1 icon-custom"></span>
        </a>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return {
            isdianz:false,
            imgArr:[],
        }
    },
    props:['text','isShowBtn','isShowthat','highLight','highLightStr','index','tab','type', 'title'],
    watch:{
        text(val,oval){
            this.text = val;
            this.imgArr = [];
            this.checkImg();
        }
    },
    created(){
        this.checkImg();
        if(this.highLight){
            this.highLightStrReplace()
        }
    },
    computed:{
        ...mapGetters(['sysTem'])
    },
    methods:{
        select(id){
            this.$router.push({path:'/detailcont/'+id})
        },
        //是查找的的相关信息高亮
        highLightStrReplace(){
            var str = this.text.title
            var re = new RegExp(this.highLightStr,"g")
            var txt = str.replace(re,"<span style='color:#2f86ff'>"+this.highLightStr+"</span>")
            this.text.title = txt;
        },
        //点击关注
        notePublic(uid){
            var that = this;
            if(this.$store.state.user==''){
                this.$vux.toast.text('请先登录','middle')
                return;
            }
            var postData = that.$qs.stringify({
                id:uid
            })
            that.$http.post('/v1/user/follow-add',postData).then(res=>{
                if(res.code==0){
                    that.$store.commit('noteSomeOne',uid);
                    that.getMynote();
                }
            })
        },
        //取消关注
        cancelNote(id){
            var that = this;
            var postData = that.$qs.stringify({
                id:id
            })
            that.$http.post('/v1/user/follow-sub',postData).then(res=>{
                if(res.code==0){
                    that.getMynote();
                    that.$store.commit('cancelNoteSomeOne',id);
                }
            })
        },
        //点赞
        dzPost(id){
            var that = this;
            if(that.isdianz) return;
            var postData = that.$qs.stringify({
                tie_id:id
            })
            that.$http.post('/v1/home/zans-add',postData).then(res=>{
                if(res.code==0){
                    that.isdianz = !that.isdianz;
                    that.text.zan_times = res.data.zannums;
                }
            })
        },
        //转化时间
        timeago(TimeStamp){
            var date = new Date(TimeStamp*1000);
            var nowDate = new Date();
            var sec = parseInt((nowDate.getTime() - date.getTime()) / 1000);//默认秒
            if(sec<=60) return sec+'秒前';
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
        //获取关注
        getMynote(){
            var that = this;
            if(that.$store.state.user=='') return;
            that.$http.get('/v1/user/follows-records').then(res=>{
                if(res.code==0){
                    localStorage.setItem('myNote',JSON.stringify(res.data));
                }
            })
        },
        //检查图片数量
        checkImg(){
            var str = this.text.content;
            if(!str) return;
            var patt1 = /<img[^>]+src="http([^">]+)/g
            var arr = str.match(patt1)==null?[]:str.match(patt1)
            if(arr.length>0){
                arr.forEach(ele=>{
                    this.imgArr.push(ele.replace(/(<img src=")/g,""));
                })
            }
        },
        // 关闭广告栏
        close() {
            event.preventDefault();
            this.$store.commit('deleteSomeOntList',this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
.card-banner{
    background: #fff;
    padding: 0 16px;
    // height: 160px;
    a{
        display: block;
        font-size: 0;
        padding: 30px 0;
        border-bottom: 1px solid #e1e1e1;
        position: relative;
        img{
            width: 100%;
        }
    }
    .icon-custom {
        color: #ededed;
        position: absolute;
        display: block;
        font-size: 40px;
        width:70px;
        height: 70px;
        line-height: 70px;
        right: 0px;
        top: 30px;
    }
}
.card{
    position: relative;
    background: $bg-color;
    padding-top:30px;
    .content-wrap-table{
        .text{
            min-height: 92px;
        }
    }
    a{
        text-decoration:none;
        color:#000;
    }
    .content-wrap{
        margin-left:20px;
        margin-right:20px;
        border-bottom:1px solid $border1;
        padding-bottom:30px;
        overflow: hidden;
        display: block;
        ul{
            overflow: hidden;
            margin-bottom:20px;
            height: 148px;
            .img-item{
                float: left;
                list-style: none;
                background: #d2cfcf;
                margin-right:10px;
                width:230px;
                height: 148px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            li:last-child{
                margin-right:0px;
            }
        }
        .onetitle,.lasttitle{
            -webkit-line-clamp: 2!important;
        }
        .lasttitle{
            -webkit-line-clamp: 2!important;
            margin-bottom:16px;
        }
        .text{
            // max-height: 92px;
            display: -webkit-box;
            font-size: 34px;
            text-align: justify;
            // margin-bottom:20px;
            word-break:break-all;
            color: #000;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
        .left{
            display: block;
            float: left;
            width: 460px;
            // height: 150px;
            padding-right:20px;
            a{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
        .right{
            display: block;
            float: left;
            width: calc(100% - 480px);
            height: 150px;
            background: #d2cfcf;
            overflow: hidden;
            font-size: 0px;
            text-align: center;
            span{
                width: 230px;
                height: 150px;
                font-size: 0px;
                display: inline-block;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .username{
            text-align: left;
            overflow: hidden;
            margin-top:20px;
            position: relative;
            .avatar{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                position: absolute;
                left:0;
                top: 0;
                background: #d2cfcf;
                img{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
            span{
                display: block;
                float: left;
                height: 40px;
                line-height: 43px;
                margin-right:20px;
                // margin-left:60px;
                color: $subtitle-color;
                font-size: 22px;
            }
            span.text-name{
                max-width: calc(100% - 50px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            span:last-child{
                margin-right:0;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
