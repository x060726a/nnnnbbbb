<template>
<div class="main">
    <div class="time-line" v-if="message.nextTime"><span>{{message.t_time}}</span></div>
    <div class="message-user" v-if="message.event!='welcome'&&message.event!='forbidden'">
        <span class="avatarself" v-if="message.isMyself"><img :src="'/static/images/avatar/'+$store.state.user.avatar+'.jpg'"></span>
        <span class="avatar" @click="$store.commit('a_someOne',message.nickname)" v-else><img :src="'/static/images/avatar/'+message.avatar+'.jpg'"></span>
        <div class="contUserSelf" v-if="message.isMyself">
            <div class="name">{{message.nickname}}</div>
            <div class="text">
                <div v-if="message.isSending" class="sending"><spinner type='ios' size='20px'></spinner></div>
                <div v-if="message.event!='bet'" v-text="message.content"></div>
                <div v-if="message.event=='bet'" class="bet-wrap">
                    <div class="bet-top"><span>期号: {{message.bet_issue}}期</span></div>
                    <div class="bet-top bot"><span>投注类型</span><span class="last">投注金额</span></div>
                    <div class="data-wrap" :class="{'height-hide':isHide}">
                        <div class="data-list" v-for="ele in message.content"><span>{{betType[message.bet_type*1-1]}}-{{ele}}</span><span>{{message.bet_num}}金币</span></div>
                    </div>
                    <div class="zkicon" v-if="message.content.length>6" :class="{'up':!isHide}" @click="isHide=!isHide"><div><span class="iconfont icon-zhankai"></span></div>{{isHide?'展开':'收起'}}</div>
                    <div class="bet-total">共{{message.content.length}}注，{{message.bet_num*message.content.length}}金币</div>
                </div>
            </div>
            <div stlye="clear:both"></div>
        </div>
        <div class="cont" v-if="message.isMyself==false">
            <div class="name">{{message.nickname}}</div>
            <div class="text">
                <div v-if="message.event!='bet'" v-text="message.content"></div>
                <div v-if="message.event=='bet'" class="bet-wrap bet-bg">
                    <div class="bet-top"><span>期号: {{message.bet_issue}}期</span></div>
                    <div class="bet-top bot"><span>投注类型</span><span class="last">投注金额</span></div>
                    <div class="data-wrap" :class="{'height-hide':isHide}">
                        <div class="data-list" v-for="ele in message.content"><span>{{betType[message.bet_type*1-1]}}-{{ele}}</span><span><em>{{message.bet_num}}金币</em></span></div>
                    </div>
                    <div class="zkicon" v-if="message.content.length>6" :class="{'up':!isHide}" @click="isHide=!isHide"><div><span class="iconfont icon-zhankai"></span></div>{{isHide?'展开':'收起'}}</div>
                    <div class="bet-total">共{{message.content.length}}注，{{message.bet_num*message.content.length}}金币</div>
                </div>
            </div>
            <div stlye="clear:both"></div>
        </div>
    </div>
    <div class="time-line" v-if="message.type">
        <span>{{getTextTime()}} {{new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours()}}:{{new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()}}</span>
    </div>
    <div class="welcome" v-if="message.event=='welcome'">
        <span> 欢迎<span> {{message.nickname}}</span> 进入</span>
    </div>
    <div class="welcome" v-if="message.event=='forbidden'">
        <span><span> {{message.username}}</span> 已被禁言！</span>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            transitionName:'downIn',
            betType:['色波','大小','单双','特码'],
            isHide:false
        }
    },
    watch:{
        '$store.state.message'(val,oval){
            this.message.isSending = false;
        }
    },
    created(){
        if(this.message.event=='bet'){
            if(this.message.content.length>6){
                this.isHide = true
            }
        }
    },
    props:['message','type'],
    methods:{
         getTextTime(){
            var d = new Date();
            var h = d.getHours();
            if(h>=0&&h<=6){
                return '凌晨'
            }
            if(h>=6&&h<=12){
                return '早上'
            }
            if(h>=12&&h<=18){
                return '下午'
            }
            if(h>=18&&h<=24){
                return '晚上'
            }
            if (h>=24&&h<=48) {
                return '昨天'
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    padding-top:10px;
    padding-bottom:10px;
}
.bet-total{
    padding-top:20px;
    padding-bottom:5px;
    border-top:1px solid #e0dfdf;
}
.message-user{
    padding:8px 16px 8px 16px;
    overflow: hidden;
    .avatar{
        float: left;
        display: block;
        width: 80px;
        height: 80px;
        background: #d4d1d1;
        border-radius: 50%;
            overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .cont{
        float: left;
        width:calc(82% - 40px);
        text-align: left;
        .name{
            text-align: left;
            overflow: hidden;
            margin-left:16px;
            color: #666;
            font-size: 24px;
            line-height: 30px;
        }
        .text{
            display: flex;
            justify-content: flex-start;
            >div{
                font-size: 30px;
                text-align: justify;
                margin-left:16px;
                margin-top:6px;
                background:#fff;
                padding:16px;
                box-shadow: 1px 1px 5px 0px #b1b1b1;
                border-radius: 0 20px 20px 20px;
                background: #fff;
                max-width:500px;
                word-wrap: break-word;
                color: #333;
            }
            .bet-bg{
                background: -webkit-linear-gradient(left top, #fefefe 0%, #e9e9e9 100%);
            }
            .bet-wrap{
                width:500px;
                padding-top:20px;
                padding-left:30px;
                padding-right:30px;
                font-size: 24px;
                color:#666;
                .bet-top{
                    overflow: hidden;
                    padding-bottom:20px;
                    span{
                        float: left;
                        display: block;
                        height: 28px;
                        line-height: 28px;
                        em{
                            font-style:normal;
                            color: $theme-color;
                        }
                    }
                    span:first-child{
                        width:40%;
                        text-align: left;
                    }
                    span.last{
                        width:60%;
                        text-align: center;
                    }
                }
                .bot{
                    margin-bottom:30px;
                    border-bottom:#e0dfdf 1px solid;
                }
                .height-hide{
                    height: 325px;
                }
                .data-wrap{
                    overflow: hidden;
                    .data-list{
                        overflow: hidden;
                        span{
                            float: left;
                            display: block;
                        }
                        span:first-child{
                            text-align: left;
                            width:40%;
                            color:$theme-color;
                        }
                        span:last-child{
                            width:60%;
                            text-align: center;
                            height: 28px;
                            line-height: 28px;
                            padding-bottom:30px;
                            em{
                                font-style:normal;
                                color: $theme-color;
                            }
                        }
                    }
                    .data-list:last-child{
                        span{
                            padding-bottom:0px;
                        }
                    }
                }
                .zkicon{
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                    color:$theme-color;
                    >div{
                        width:50px;
                        height: 50px;
                        display: inline-block;
                        position: relative;
                        span{
                            font-size: 24px;
                        }
                    }
                }
                .up{
                    vertical-align: middle;
                    >div{
                        vertical-align: middle;
                        span{
                            position: absolute;
                            top: -3px;
                            left: 12px;
                            transform: rotate(180deg)
                        }
                    }
                }
            }
        }
    }
    .avatarself{
        float: right;
        display: block;
        width: 80px;
        height: 80px;
        background: #d4d1d1;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
        img[lazy=loading] {
            object-fit: none!important;
            margin: auto;
        }
    }
    .contUserSelf{
        float: right;
        width:calc(82% - 40px);
        color:$theme-color;
        text-align: right;
        padding-top: 5px;
        .name{
            text-align: right;
            padding-right:16px;
            font-size: 24px;
            color: #333;
        }
        .text{
            display: flex;
            justify-content: flex-end;
            >div{
                font-size: 30px;
                margin-right:16px;
                padding:16px;
                background: $theme-color;
                color:#fff;
                border-radius: 20px 0 20px 20px;
                text-align: justify;
                margin-top:6px;
                float: right;
                max-width:500px;
                word-wrap: break-word;
                position: relative;
            }
            .bet-wrap{
                width:500px;
                padding-top:20px;
                padding-left:30px;
                padding-right:30px;
                font-size: 24px;
                color:#fff;
                .bet-top{
                    overflow: hidden;
                    padding-bottom:20px;
                    span{
                        float: left;
                        display: block;
                        height: 28px;
                        line-height: 28px;
                    }
                    span:first-child{
                        width:40%;
                        text-align: left;
                    }
                    span.last{
                        width:60%;
                        text-align: center;
                    }
                }
                .bot{
                    margin-bottom:30px;
                    border-bottom:#fff 1px solid;
                }
                .height-hide{
                    height: 325px;
                }
                .data-wrap{
                    overflow: hidden;
                    .data-list{
                        overflow: hidden;
                        span{
                            float: left;
                            display: block;
                            height: 28px;
                            line-height: 28px;
                            padding-bottom:30px;
                        }
                        span:first-child{
                            text-align: left;
                            width:40%;
                        }
                        span:last-child{
                            text-align: center;
                            width:60%;
                        }
                    }
                    .data-list:last-child{
                        span{
                            padding-bottom:0px;
                        }
                    }
                }
                .zkicon{
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                    >div{
                        width:50px;
                        height: 50px;
                        display: inline-block;
                        position: relative;
                        span{
                            font-size: 24px;
                        }
                    }
                }
                .up{
                    vertical-align: middle;
                    >div{
                        vertical-align: middle;
                        span{
                            position: absolute;
                            top: -3px;
                            left: 12px;
                            transform: rotate(180deg)
                        }
                    }
                }
            }
            .sending{
                display: flex;
                margin-top:6px;
                margin-right:10px;
                justify-content: center;
                align-items: center;
                background: #fff;
            }

        }
    }
}
.history {
    display: inline-block;
    padding: 0 10px;
    line-height: 40px;
    margin:16px auto 0;
    font-size: 26px;
    text-align: center;
    color: #fff;
    background: #cecece;
    border-radius: 10px;
}
.time-line{
    text-align: center;
    span{
        font-size: 26px;
        background: #cecece;
        color:#fff;
        display: block;
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        width:170px;
        margin: auto;
    }
} 
.welcome{
    display: flex;
    >span{
        font-size: 26px;
        background: #cecece;
        color:#fff;
        margin: auto;
        border-radius: 5px;
        padding-left:10px;
        padding-right:10px;
        >span{
            color:$theme-color;
        }
    }
}
</style>
