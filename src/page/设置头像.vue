<template>
<div class="content">
    <div class="top">
        <img :src="'/static/images/img/'+(user.avatar==null?1:user.avatar)+'.jpg'">
        <span class="btn">当前使用头像</span>
    </div>
    <div class="bottom">
        <div class="text">选择头像</div>
        <div class="img-list">
            <div class="line">
                <div @click="changeAvatar(1)"><img :src="'/static/images/avatar/1.jpg'"></div>
                <div @click="changeAvatar(2)"><img :src="'/static/images/avatar/2.jpg'"></div>
                <div @click="changeAvatar(3)"><img :src="'/static/images/avatar/3.jpg'"></div>
            </div>
            <div class="line">
                <div @click="changeAvatar(4)"><img :src="'/static/images/avatar/4.jpg'"></div>
                <div @click="changeAvatar(5)"><img :src="'/static/images/avatar/5.jpg'"></div>
                <div @click="changeAvatar(6)"><img :src="'/static/images/avatar/6.jpg'"></div>
            </div>
            <div class="line">
                <div @click="changeAvatar(7)"><img :src="'/static/images/avatar/7.jpg'"></div>
                <div @click="changeAvatar(8)"><img :src="'/static/images/avatar/8.jpg'"></div>
                <div @click="changeAvatar(9)"><img :src="'/static/images/avatar/9.jpg'"></div>
            </div>
            <div class="line">
                <div @click="changeAvatar(10)"><img :src="'/static/images/avatar/10.jpg'"></div>
                <div @click="changeAvatar(11)"><img :src="'/static/images/avatar/11.jpg'"></div>
                <div @click="changeAvatar(12)"><img :src="'/static/images/avatar/12.jpg'"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return{
            isSeting:false,
        }
    },
    computed:{
        ...mapGetters(['user'])
    },
    methods:{
        changeAvatar(id){
            var that = this;
            if(that.isSeting){
                return;
            }
            that.isSeting = true;
            var postData = that.$qs.stringify({
                avatar:id
            })
            this.$vux.loading.show({
                text: '设置中'
            })
            that.$http.post('/v1/user/profile-update',postData).then(res=>{
                if(res.code==0){
                    that.$vux.toast.text('设置成功','middle')
                    that.$store.commit('changeAvatar',res.data.avatar);
                }else{
                    that.$vux.toast.text('保存失败','middle')
                }
                that.isSeting = false;
                that.$vux.loading.hide()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.pageWebHeight{
    padding-top:$web-height;
    min-height: calc(100vh - #{$web-height});
}
.pageAppHeight{
    padding-top:$app-height;
    min-height: calc(100vh - #{$app-height});
}
.content{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .top{
        height: 485px;
        font-size: 0;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        img[lazy=loading] {
            object-fit: none!important;
            margin: auto;
        }
        .btn{
            width:169px;
            height: 48px;
            line-height: 48px;
            display: block;
            position: absolute;
            bottom:20px;
            right:16px;
            border-radius: 50px;
            border:#f9dd00 2px solid;
            text-align: center;
            font-size: 24px;
            color:#fff;
        }
    }
    .bottom{
        background: #fff;
        .text{
            height: 70px;
            line-height: 70px;
            padding-left:16px;
            font-size: 28px;
            color:#666;
            text-align: left;
            border-bottom:$border-color 1px solid;
        }
        .img-list{
            padding:16px;
            .line{
                display: flex;
                margin-bottom:16px;
                >div{
                    flex: 1;
                    margin-right:14px;
                    font-size: 0;
                    img{
                        width: 100%;
                    }
                }
                >div:last-child{
                    margin-right:0;
                }
            }
            .line:last-child{
                margin-bottom:0;
            }
        }
    }
}
</style>
