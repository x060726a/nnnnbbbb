<template>
<div class="content" ref="content">
    <div class="title">
        <div class="block">{{res.title}}</div>
    </div>
    <div class="ball-panel-wrap" v-html="res.content">
        {{res.content}}
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
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default { 
    data(){
        return {
            textArr:JSON.parse(localStorage.getItem('allYearTitle')),
            recommend:[],
            lastText:'',
            nextText:'',
            res:{}
        }
    },
    watch:{
        '$route'(){
            if(this.$route.name=='全年资料'){
                this.navCtroInit();
                // this.getWenZhang();
            }
        }
    },
    created(){
        this.navCtroInit();
        // this.getWenZhang();
        this.recommend = JSON.parse(localStorage.getItem('tjList'))
    },
    computed:{
        ...mapGetters(['isApp']),
        currentComponent(){
            return this.$route.params.id;
        }
    },
    methods:{
        async navCtroInit(){
            this.$nextTick(()=>{
                if(!this.$refs.content) return
                this.$refs.content.scrollTop = 0
            })
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
            var data = JSON.parse(localStorage.getItem('allYear'));
            data.forEach(ele => {
                if(ele.title==this.nextText){
                    id = ele.id
                }
            });
            this.$router.push({path:'/zlcont/'+id})
            this.navCtroInit();
        },
        last(){
            var id;
            if(this.lastText=='没有更多了') return;
            var data = JSON.parse(localStorage.getItem('allYear'));
            data.forEach(ele => {
                if(ele.title==this.lastText){
                    id = ele.id
                }
            });
            this.$router.push({path:'/zlcont/'+id})
            this.navCtroInit();
        },
        getDetail(id){
            var that = this;
            var postData = that.$qs.stringify({
                id:id
            })
            return new Promise(resolve=>{
                that.$http.post('/v1/liuyou/annual-specify',postData).then(res=>{
                    if(res.code==0){
                        that.res = res.data.records
                        resolve(res.data.records.title);
                    }else{
                        resolve('fail');
                    }
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
        }
    },
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}
.title{
    background: $bg-color;
    font-size: 34px;
    .block{
        border-bottom:$border-color 1px solid;
        height: 68px;
        line-height: 68px;
        margin-left:16px;
        margin-right:16px;
    }
}
.banner{
    height: 160px;
    background: #fff;
    img{
        width:100%;
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
    padding: 30px 16px;
    height: 652px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background: #fff;
    text-align: left;
    font-size: 32px;
    color: #333;
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
</style>
