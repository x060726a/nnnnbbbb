<template>
<div class="regular-panel">
    <!-- <div class="title"><mt-field placeholder="请输入标题" type="text" v-model="title"></mt-field></div> -->
    <div class="title"><input type="text" v-model="title" placeholder="请输入标题" maxlength="60"></div>
    <!-- <div class="content"><mt-field placeholder="说点什么" type="textarea" rows="4" v-model="message"></mt-field></div> -->
    <div class="content"><textarea v-model="text" placeholder="说点什么" maxlength="400"></textarea></div>
    <!-- <div class="send-btn" @click="sendText()">发送</div> -->
</div>
</template>
<script>
import {mapGetters,mapActions,mapMutations, mapState} from 'Vuex'
export default {
    data(){
       return {
           title:'',
           text:''
       }
    },
    watch:{
        title(val,oval){
            this.$store.commit('fatietitle',val)
        },
        text(val,oval){
            this.$store.commit('chooseObj',val)
        }
    },
    methods:{
        sendText(){
            var that = this
            if(this.title==''||this.message==''){
                this.$vux.toast.text('标题或者内同不能为空','middle')
                return;
            };
            console.log('['+this.$store.state.nextIssue.qihao+'期]'+this.title,);
            this.$messagebox({
                title: '['+this.$store.state.nextIssue.qihao+'期]'+this.title,
                message: "<p>"+this.message+"</p>",
                showCancelButton: true,
                callback:(res)=>{
                    if(res=='confirm'){
                        var postData = that.$qs.stringify({
                            title:this.title,
                            content:this.message
                        })
                        that.$http.post('/v1/user/ties-publish',postData).then(res=>{
                            if(res.code==0){
                                that.$vux.toast.text('发送成功','middle')
                            }else{
                                that.$vux.toast.text(res.msg_zh,'middle')
                            }
                        })
                    }
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.regular-panel{
    .title{
        height: 80px;
        line-height: 80px;
        margin-bottom:20px;
        border-bottom:$border-color 1px solid;
        input{
            width: calc(100% - 16px);
            font-size: 30px;
            text-align: left;
        }
    }
    .content{
        margin-bottom:100px;
        textarea{
            border:none;
            outline:none;
            resize:none;
            width:calc(100vw - 42px);
            height: 500px;
            font-size: 28px;
            color:#333;
            padding-left:10px;
        }
    }
    .send-btn{
        height: 80px;
        line-height: 80px;
        width: 70%;
        margin: 20px auto;
        background: $theme-color;
        color: #fff;
        border-radius: 44px;
        font-size: 32px;
    }
}
</style>
