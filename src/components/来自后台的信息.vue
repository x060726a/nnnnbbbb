<template>
<div class="message-admin">

    <div class="type-wrap">
        <span class="avatar"><img src="/static/images/admin_avatar.png"></span>
        <div class="cont">
            <div class="name"><span>管理员</span></div>
            <!-- 红包 -->
            <div v-if="message.event=='envelop'" class="redpack-wrap">
                <div class="not-open" @click="getRedPack(message.id)"></div>
            </div>
            <!-- 红包 -->

            <!-- 统计结果 -->
            <div class="text" v-if="message.event=='bet_statistics'">
                <div class="type-line"></div>
                <div class="type-bose">
                    <div class="title">{{message.game_name}}竞猜排行</div>
                    <div class="text-cont total">
                        <div class="odd" :class="{hong:key=='红',lan:key=='蓝',lv:key=='绿'}" v-for="(val,key) in message.data"  >
                            <span>{{key}}</span>
                            <span>
                                <div class="line"><span :style="'width:'+(val/total)*100+'%'"></span></div>
                            </span>
                            <span>{{val}}人投注</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 统计结果 -->

            <!--  -->
            <div class="admin-text" v-if="message.event=='notice'" v-html="message.content"></div>
            <!--  -->
        </div>
    </div>
    <!-- <div class="comin-time" v-if="message.type">
        <span>{{getTextTime()}} {{new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours()}}:{{new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()}}</span>
    </div> -->
</div>
</template>
<script>
export default {
    data(){
        return {
            total:0
        }
    },
    props:['message'],
    created(){
        for(var key in this.message.data){
            this.total += this.message.data[key]
        }
    },
    methods:{
        //抢红包
        getRedPack(id){
            var that = this
            if(that.$store.state.user==''){
                that.$vux.confirm.show({
                    content:'红包功能需要登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            var postData = that.$qs.stringify({
                id:id
            })
            this.$vux.loading.show({
                text:'加载中'
            })
            that.$http.post('/v1/chat/get-envelop',postData).then(res=>{
                if(res.code==0){
                    this.$store.commit('redPackPop',true)
                    this.$store.commit('redPackRes',res.data)
                    this.$store.commit('changeMoney',res.data.money)
                }else{
                    that.$vux.toast.text(res.msg_zh,'middle')
                }
                that.$vux.loading.hide()
            })
        },
        getTextTime(){
            var d = new Date();
            var h = d.getHours();
            if(h>=0&&h<6){
                return '凌晨'
            }
            if(h>=6&&h<12){
                return '早上'
            }
            if(h>=12&&h<18){
                return '下午'
            }
            if(h>=18&&h<=24){
                return '晚上'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.comin-time{
    padding-top:10px;
    padding-bottom:10px;
    span{
        display: block;
        width:144px;
        height: 40px;
        line-height: 42px;
        text-align: center;
        font-size: 26px;
        background: #d4d1d1;
        border-radius: 20px;
        margin: auto;
        color:#666;
        padding-left:10px;
        padding-right:10px;
    }
}
.redpack-wrap{
    width:calc(100% - 40px);
    float: left;
    .not-open{
        width:252px;
        height: 311px;
        background: url('/static/images/redpack.png') no-repeat;
        background-size:100%;
        margin-left: 7px;
        margin-top: 5px;
    }
}
.type-wrap{
    overflow: hidden;
}
.message-admin{
    padding:10px;
    overflow: hidden;
    .avatar{
        float: left;
        display: block;
        width: 80px;
        height: 80px;
        background: $theme-color;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .cont{
        float: left;
        width:calc(100% - 80px);
        padding-bottom:20px;
        .name{
            text-align: left;
            span{
                padding-left:16px;
                font-size: 26px;
                color:#666;
            }
        }
        .admin-text{
            font-size: 30px;
            color: #333;
            text-align: justify;
            margin-left: 16px;
            background: #f9dd00;
            border-radius: 0 20px 20px 20px;
            display: block;
            padding: 16px;
            box-shadow: 1px 1px 5px 0px #b29e02;
            margin-top:5px;
            margin-bottom:2px;
            float: left;
            max-width:500px;
            word-wrap: break-word;
        }
        .text{
            width: calc(82% - 20px);
            min-width: 250px;
            margin:25px 25px;
            position: relative;
            z-index: 2;
            box-shadow: 0px 25px 15px #dad8d8;
            .type-bose{
                font-size: 28px;
                background: #fff;
                .title{
                    overflow: hidden;
                    border-bottom:$border-color 1px solid;
                    line-height: 68px;
                    font-size: 26px;
                    color:#333;
                }
                .total{
                    .odd{
                        height: 68px;
                        width:100%;
                        overflow: hidden;
                        border-bottom:$border-color 1px solid;
                        span{
                            display: block;
                            float: left;
                            height: 68px;
                            line-height: 68px;
                            font-size: 28px;
                            position: relative;
                        }
                        span:nth-child(1){
                            margin-left:20px;
                            margin-right:20px;
                        }
                        span:nth-child(2){
                            width:220px;
                            margin-right:20px;
                        }
                        span:nth-child(3){
                            float: right;
                            margin-right:20px;
                        }
                        .line{
                            height: 20px;
                            border:#ffb400 1px solid;
                            border-radius: 40px;
                            margin-top:23px;
                            overflow: hidden;
                            span{
                                background: #ffb400;
                                margin:0;
                                height: 20px;
                                border-radius: 0px 40px 40px 0;
                            }
                        }
                    }
                    .odd:last-child{
                        border-bottom:none;
                    }
                }
                .next,.first{
                    overflow: hidden;
                    span{
                        float: left;
                        width: 33%;
                    }
                }
                .last{
                    overflow: hidden;
                    height: 25px;
                    padding-bottom:5px;
                }
            }
            .bot{
                height: 56px;
                background: #fff;
                border-top:$border-color 1px solid;
                img{
                    width: 100%;
                }
            }
            .type-line{
                height: 20px;
                width: 535px;
                display: block;
                position: absolute;
                top: -10px;
                left: -11px;
                z-index: -1;
                background: #ffb400;
                border-radius: 50px;
            }
        }
    }
}
</style>
