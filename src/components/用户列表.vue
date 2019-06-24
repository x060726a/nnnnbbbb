<template>
<div class="user-item" v-if="text">
    <span class="avatar" v-if="!isUser" @click="$router.push({path:'/publictie/'+text.id})"><img :src="text.avatar"></span>
    <span class="avatar" v-if="isUser" @click="$router.push({path:'/yuce/'+text.game_type+'-'+text.uid})"><img :src="'/static/images/avatar/'+text.avatar+'.jpg'"></span>
    <!-- 公众号 -->
    <div class="username" v-if="!isUser">
        <h1 @click="$router.push({path:'/publictie/'+text.id})">{{text.name}}</h1>
        <h2 class="gzh">公众号</h2>
        <h3>{{text.ties}}帖子<span>·</span>{{text.follows}}关注</h3>
        <div class="mynote" v-if="isshow">
            <div  class="note-btn" @click="toggleNote(text.id,true)" v-if="!text.isFollowed">
                <span class="spinner" v-if="isNoteSending"><spinner type="spiral" size="16px"></spinner></span>
                <span v-if="!isNoteSending">关注</span>
            </div>
            <div  class="note-btn yi" :class="{active:myNoteData.indexOf(text.id*1)>-1}" @click="toggleNote(text.id,false)" v-if="text.isFollowed">
                <span class="spinner" v-if="isNoteSending"><spinner type="spiral" size="16px"></spinner></span>
                <span v-if="!isNoteSending">已关注</span>
            </div>
        </div>
    </div>

    <!-- 个人 -->
    <div class="username" v-if="isUser">
        <h1 @click="$router.push({path:'/yuce/'+text.game_type+'-'+text.id})">{{text.name}}</h1>
        <h2 class="gzh">高手</h2>
        <h3 v-if="!isMyNote">{{text.win_probability}}%胜率<span>·</span>最大连中{{text.continue_win_num}}期</h3>
        <h3 v-if="isMyNote">{{arr[text.game_type-1]}}<span> · </span>胜率{{text.win_probability}}%</h3>
        <div class="mynote" v-if="isshow">
            <div  class="note-btn" @click="toggleNote(text.id,true)" v-if="!text.isFollowed">
                <span class="spinner" v-if="isNoteSending"><spinner type="spiral" size="16px"></spinner></span>
                <span v-if="!isNoteSending">关注</span>
            </div>
            <div  class="note-btn yi" :class="{active:myNoteData.indexOf(text.id*1)>-1}" @click="toggleNote(text.id,false)" v-if="text.isFollowed">
                <span class="spinner" v-if="isNoteSending"><spinner type="spiral" size="16px"></spinner></span>
                <span v-if="!isNoteSending">已关注</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'Vuex'
export default {
    data(){
        return {
            noteList:[],
            isNoteSending:false,
            arr:['色波','大小','单双']
        }
    },
    props:['text','isshow','isUser','isMyNote','idx'],
    computed:{
        ...mapGetters(['myNoteData','user','sysTem'])
    },
    methods:{
        ...mapActions(['sendNote','cancelNote']),
        //必须先序列化参数后再提交到Actions
        async toggleNote(uid,flg){
            var that = this;
            this.isNoteSending = true;
            var postData = {}
            if(this.isUser){
                postData = this.$qs.stringify({
                    id:this.text.id,
                    category:2,
                    game_type:this.text.game_type
                })
            }else{
                postData = this.$qs.stringify({
                    id:this.text.id,
                    category:1,
                })
            }
            // console.log(postData,this.text.uid);
            if(flg){
                //关注
                var res = await this.sendNote(postData);
                if(res==='unlogin'){
                    this.isNoteSending = false;
                    return
                }
                if(res==0){
                    this.text.isFollowed = flg;
                }
                this.isNoteSending = false;
            }else{
                //取关 
                var res = await this.cancelNote(postData)
                if(res==='unlogin'){
                    this.isNoteSending = false;
                    return
                }
                if(res==0){
                    if(this.isMyNote){
                        this.$emit('delete',this.idx)
                    }
                    this.text.isFollowed = flg;
                }
                this.isNoteSending = false;
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.user-item{
    position: relative;
    background: $bg-color;
    padding-bottom: 30px;
    border-bottom:$border-color 1px solid; 
    .avatar{
        width:100px;
        height: 100px;
        display: block;
        position: absolute;
        left: 0px;
        top: 4px;
        border-radius: 50%;
        overflow: hidden;
        background: #d2cfcf;
        z-index: 1;
        img{
            width:100%;
            height: 100%;
        }
        img[lazy=loading] {
            object-fit: none!important;
            margin: auto;
        }
    }
    .username{
        min-height: 100px;
        padding-left:110px;
        overflow: hidden;
        position: relative;
        h1{
            font-weight: 500;
            font-size: 30px;
            text-align: left;
            color:$theme-color;
            line-height: 34px;
        }
        h2{
            font-weight: 500;
            font-size: 22px;
            text-align: left;
            color:#666;
        }
        h3{
            color:#999;
            font-size: 22px;
            text-align: left;
            font-weight: 500;
        }
        .note-btn{
            position: absolute;
            top: 30px;
            right: 0;
            line-height: 48px;
            height: 48px;
            width: 110px;
            border:#999 1px solid;
            text-align: center;
            font-size: 26px;
            color:#fff;
            border:$theme-color 1px solid;
            border-radius: 8px;
            background: $theme-color;
            >span.spinner{
                display: flex;
                justify-content:center;
                align-items:center;
                height: 48px;
            }
        }
        .yi{
            font-size: 26px;
            width: 110px;
            background: #fff;
            color: #999;
            border: 2px solid #e1e1e1;
        }
    }
}
</style>
