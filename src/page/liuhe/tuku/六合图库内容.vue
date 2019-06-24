<template>
<div class="content" ref="content">
    <div class="title">
        <span class="block">{{res.title}}</span>
    </div>
    <div class="ball-panel-wrap" ref="wrap">
        <div class="img-loading" v-if="isImgLoading"><spinner type="ios" size="30px"></spinner></div>
        <x-img v-if="res" :src="res&&res.content" @on-success="success" @on-error="error" error-class="ximg-error"></x-img>
    </div>
    <div class="banner"><img :src="'/static/images/banner/banner_v1.01.png'"></div>
    <div class="next-last">
        <div @click="last()">上一篇：{{this.lastText}}</div>
        <div @click="next()">下一篇：{{this.nextText}}</div>
    </div>
    <div class="tjgz-list" v-if="recommend">
        <div class="title">推荐关注</div>
        <ul>
            <li v-for="ele in recommend" @click="$router.push({path:'/detailcont/'+ele.id,query:{type:1}})">{{ele.title}}</li>
        </ul>
    </div>
    <div v-transfer-dom>
        <previewer :list="imgList" ref="previewer"></previewer>
    </div>
</div>         
</template>
<script>
const DATANONE = import('@/components/没有数据')
import { mapGetters } from 'Vuex';
import { XImg,Previewer,TransferDom } from 'vux'
import { setTimeout } from 'timers';
export default {
    directives: {
        TransferDom
    }, 
    data(){
        return {
            textArr:JSON.parse(localStorage.getItem('parseListTitle')),
            recommend:[],
            lastText:'',
            nextText:'',
            res:false,
            isImgLoading:true,
            isImgErr:false,
            imgList:[]
        }
    },
    watch:{
        '$route'(){
            if(this.$route.name=='六合图库'){
                this.navCtroInit();
                // this.getWenZhang();
            }
        }
    },
    created(){
        this.navCtroInit();
        this.recommend = JSON.parse(localStorage.getItem('tjList'))
        // this.getWenZhang();
    },
    computed:{
        ...mapGetters(['sysTem','isApp']),
    },
    methods:{
        success(){
            var that = this
            that.isImgLoading = false;
            that.isImgErr = false
            that.$nextTick(()=>{
                this.imgList = [{
                    src:that.res.content,
                    w:document.getElementsByClassName('ball-panel-wrap')[0].children[0].clientWidth,
                    h:document.getElementsByClassName('ball-panel-wrap')[0].children[0].clientHeight
                }]
                document.getElementsByClassName('ball-panel-wrap')[0].children[0].onclick = function(){
                    that.$refs.previewer.show(0)
                }
            })
        },
        error(){
            this.isImgLoading = false;
            this.isImgErr = true
        },
        async navCtroInit(){
            this.res = false;
            var name = await this.getDetail(this.$route.params.id);
            var curIndex = this.textArr.indexOf(name);
            if(curIndex==0){
                this.lastText = '没有更多了'
            }else{
                this.lastText = this.textArr[curIndex-1]
            }

            if(curIndex==this.textArr.length-1){
                this.nextText = '没有更多了'   
            }else{
                this.nextText = this.textArr[curIndex+1] 
            }
        },
        next(){
            var id;
            if(this.nextText=='没有更多了') return;
            this.isImgLoading = true
            var data = JSON.parse(localStorage.getItem('parseList'));
            data.forEach(ele => {
                if(ele.title==this.nextText){
                    id = ele.id
                }
            });
            this.$router.push({path:'/tkcont/'+id})
            this.navCtroInit();
        },
        last(){
            var id;
            if(this.lastText=='没有更多了') return;
            this.isImgLoading = true
            var data = JSON.parse(localStorage.getItem('parseList'));
            data.forEach(ele => {
                if(ele.title==this.lastText){
                    id = ele.id
                }
            });
            this.$router.push({path:'/tkcont/'+id})
            this.navCtroInit();
        },
        getDetail(id){
            var that = this;
            var postData = that.$qs.stringify({
                id:id
            })
            return new Promise(resolve=>{
                that.$http.post('/v1/liuyou/gallery-specify',postData).then(res=>{
                    setTimeout(()=>{
                        that.$refs.content.scrollTop = 0
                        if(res.code==0){
                            that.res = res.data.records
                            resolve(res.data.records.title);
                        }else{
                            resolve('fail');
                        }
                    },100)
                })
            })
        },
        getWenZhang(){
            var that = this;
            var postData = that.$qs.stringify({
                offset:0,
                limit:4
            })
            that.$http.post('/v1/home/ties',postData).then(res=>{
                if(res.code==0){
                    that.recommend = res.data.records
                }
            })
        },
    },
    components:{
        XImg,Previewer,
        DATANONE(){
            return {
                component:DATANONE,
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.img-loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    height: 400px;
    line-height: 400px;
}
.content{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}
.title{
    background: $bg-color;
    font-size: $normal-fontSize;
    .block{
        border-bottom:$border-color 1px solid;
        margin-left:16px;
        margin-right:16px;
        display: block;
        height: 110px;
        line-height: 110px;
    }
    >span::before{
        content: "";
        position: absolute;
        left: 0;
        bottom:0;
        height: 1px;
        width:100%;
        background: $border-color;
    }
}
.banner{
    height: 160px;
    background: #c1c1c1;
    img{
        width:100%;
    }
    img[lazy=loading]{
        width: 100%;
        height: 100%;
    }
}
.next-last{
    padding-top:30px;
    padding-bottom:30px;
    background: $bg-color;
    margin-bottom:16px;
    >div{
        padding-left:16px;
        font-size: 30px;
        text-align: left;
    }
    >div:first-child{
        padding-bottom:30px;
    }
}
.ball-panel-wrap{
    padding: 16px;
    overflow-y: auto;
    position: relative;
    background: #fff;
    text-align: left;
    font-size: 0px;
    min-height: 400px;
    img{
        width:100%!important;
    }
    .loading-wrap{
        min-height: 500px;
        .snake-wrap{
            height: 80px;
            width:80px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left:-35px;
            margin-top:-35px;
            overflow: hidden;
        }
    }
}
.tjgz-list{
    background: #fff;
    padding-left:16px;
    padding-right:16px;
    .title{
        height: 68px;
        line-height: 68px;
        padding-top:0;
        text-align: left;
        color:#666;
        font-size: 30px;
        border-bottom:$border-color 1px solid;
    }
    ul{
        li{
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
.bigImg {
    background: #000;
    height:100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 3;
    font-size: 0;
    display: table;
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
    }
}
</style>
