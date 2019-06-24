<template>
<div class="content">
    <h1>本周已签到<span>{{res}}</span>天</h1>
    <p>恭喜您获得{{total_reward_coin}}金币</p>
    <div class="jindu"><div><div ref="jindu"></div></div></div>
    <div class="week">
        <div class="spinner-wrap" v-show="isChecking"><spinner type='ios' size='40px'></spinner></div>
        <ul class="first" ref="card1" v-show="!isChecking">
            <li>
                <p>第一天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>60金币</p>
            </li>
            <li>
                <p>第二天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>120金币</p>
                <span>明日可领</span>
            </li>
            <li>
                <p>第三天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>180金币</p>
                <span>明日可领</span>
            </li>
            <li>
                <p>第四天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>240金币</p>
                <span>明日可领</span>
            </li>
            <li>
                <p>第五天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>300金币</p>
                <span>明日可领</span>
            </li>
            <li>
                <p>第六天</p>
                <div class="img"><img src="/static/images/icons/qd_icon1.png"></div>
                <p>360金币</p>
                <span>明日可领</span>
            </li>
            <li>
                <p>第七天</p>
                <div class="lastimg"></div>
                <div class="first">420金币</div>
                <span>明日可领</span>
                <div class="last">抽奖券一张</div>
                <div class="hongbao"></div>
            </li>
        </ul>
    </div>
    <div class="tip">每周签到最多可得1680</div>
    <div class="pad"></div>
    <div class="miscellaneous">
        <h1>玩转金币</h1>
        <ul>
            <li>
                <div class="img"><img src="/static/images/icons/qd_icon7.png"></div>
                <div class="next">
                    <h2>阅读文章</h2>
                    <p>阅读100篇文章再送一张抽奖券</p>
                </div>
                <div class="last" @click="$router.push({path:'/main'})">去阅读</div>
            </li>
            <li>
                <div class="img"><img src="/static/images/icons/qd_icon3.png"></div>
                <div class="next">
                    <h2>大转盘</h2>
                    <p>每日送出一台iPhone X</p>
                </div>
                <div class="last" @click="$router.push({path:'/activity-cont/3'})">去抽取</div>
            </li>
            <li>
                <div class="img"><img src="/static/images/icons/qd_icon8.png"></div>
                <div class="next">
                    <h2>邀请好友</h2>
                    <p>与好友齐分享</p>
                </div>
                <div class="last" @click="$router.push({path:'/mypromotion'})">去邀请</div>
            </li>
            <li>
                <div class="img"><img src="/static/images/icons/qd_icon6.png"></div>
                <div class="next">
                    <h2>聊天室投注</h2>
                    <p>竞猜得金币</p>
                </div>
                <div class="last" @click="$router.push({path:'/chat'})">去竞猜</div>
            </li>
            <li>
                <div class="img"><img src="/static/images/icons/qd_icon4.png"></div>
                <div class="next">
                    <h2>聊天室整点红包</h2>
                    <p>最高可得8000金币</p>
                </div>
                <div class="last" @click="$router.push({path:'/chat'})">抢红包</div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            res:'',
            total_reward_coin:'',
            isChecking:true,
        }
    },
    async created(){
        var result = await this.checkSignUp();
        if(result.code==0){
            this.goAnimate();
            this.isChecking = false
        }else{
            this.isChecking = true
        }
    },
    methods:{
        goAnimate(){
            this.$nextTick(()=>{
                var that = this
                that.$refs.jindu.style.width = that.res*(100 / 7) + '%'
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[0].style.transform = 'rotateY(0deg)'
                    if(that.res>=1){
                        that.$refs.card1.children[0].style.opacity = .5;
                    }
                },100)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[1].style.transform = 'rotateY(0deg)'
                    if(that.res>=2){
                        that.$refs.card1.children[1].style.opacity = .5;
                    }
                },200)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[2].style.transform = 'rotateY(0deg)'
                    if(that.res>=3){
                        that.$refs.card1.children[2].style.opacity = .5;
                    }
                },300)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[3].style.transform = 'rotateY(0deg)'
                    if(that.res>=4){
                        that.$refs.card1.children[3].style.opacity = .5;
                    }
                },400)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[4].style.transform = 'rotateY(0deg)'
                    if(that.res>=5){
                        that.$refs.card1.children[4].style.opacity = .5;
                    }
                },500)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[5].style.transform = 'rotateY(0deg)'
                    if(that.res>=6){
                        that.$refs.card1.children[5].style.opacity = .5;
                    }
                },600)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    that.$refs.card1.children[6].style.transform = 'rotateY(0deg)'
                    if(that.res>=7){
                        that.$refs.card1.children[6].style.opacity = .5;
                    }
                },700)
                setTimeout(()=>{
                    if(!that.$refs.card1) return true;
                    if(that.res!=7){
                        that.$refs.card1.children[that.res].children[3].style.transform = 'rotateY(0deg)'
                        that.$refs.card1.children[that.res].children[3].style.opacity = 1;
                    }
                },1000)
            })
        },
        qiandao(day){
            var d = new Date()
            var timeStr = d.getFullYear()+'/'+(d.getMonth()*1+1)+'/'+d.getDate()
            var d1 = new Date(timeStr);
            var maxDay = this.MathMonthLen();
            if(day>d1.getDay()){
                console.log(d.getDate()+(day-d1.getDay()));
                if(d.getDate()+(day-d1.getDay())>maxDay){
                    
                }
            }
            if(d1.getDay()>day){
                console.log(d.getDate()-(d1.getDay()-day));
            }
            if(d1.getDay()==day){
                console.log('今天');
            }
        },
        //检测今天是否签到
        checkSignUp(){
            var that = this;
            return new Promise(resolve=>{
                that.$http.post('/v1/user/sign').then(res=>{
                    that.res = res.data.num
                    that.total_reward_coin = res.data.total_reward_coin
                    resolve(res)
                })
            })
        },
        //求某个月有多少天
        MathMonthLen(){
            var d = new Date()
            var timeStr = d.getFullYear()+'/'+(d.getMonth()*1+1)+'/'+d.getDate()
            var selectedDate = new Date(timeStr);
            var selectedMonth = selectedDate.getMonth()+1;
            selectedDate.setMonth(selectedMonth);
            selectedDate.setDate(0);
            var dayMany = selectedDate.getDate();
            return dayMany;
        },
    }
}
</script>
<style lang="scss" scoped>
.content{
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    >h1{
        font-size: 34px;
        color:#333;
        font-weight: 700;
        padding-top:30px;
        line-height: 35px;
        padding-bottom:20px;
        span{
            color:#f6524e;
        }
    }
    >p{
        font-size: 24px;
        color:#333;
        line-height: 25px;
        margin-bottom:30px;
    }
    .jindu{
        width:640px;
        height: 30px;
        background: #f5f2f2;
        border-radius: 20px;
        padding:20px;
        margin: 0 auto 20px;
        >div{
            height: 30px;
            width: 100%;
            background: #f5dddc;
            border-radius: 20px;
            >div{
                width:0;
                height: 30px;
                transition: all 1.2s ease;
                border-radius: 20px;
                background: #f6524e;
            }
        }
    }
    .week{
        height: 380px;
        width: 100%;
        padding-bottom:20px;
        position: relative;
        .spinner-wrap{
            position: absolute;
            top:50%;
            left: 50%;
            margin-left:-40px;
            margin-top:-50px;
        }
        ul{
            height: 380px;
            margin: auto;
            width: 682px;
            li{
                list-style: none;
                width:160px;
                height: 180px;
                background: radial-gradient(#ffa46c,#f6524e);
                float: left;
                border-radius: 12px;
                margin-right:14px;
                text-align: center;
                position: relative;
                transform: rotateY(90deg);
                transition: all .7s ease;
                >div.img{
                    display: block;
                    width:60px;
                    height: 60px;
                    margin:auto;
                    margin-bottom: 25px;
                    font-size: 0;
                    img{
                        width:100%;
                    }
                }
                span{
                    position: absolute;
                    top:-50px;
                    right: -30px;
                    display: block;
                    padding:10px;
                    width:120px;
                    height: 30px;
                    line-height: 30px;
                    background: #fff22f;
                    font-size: 24px;
                    color:#000;
                    border-radius: 12px;
                    transform: rotateY(90deg);
                    transition: all .75s ease;
                    opacity: 0;
                }
                span::before{
                    content:'';
                    position: absolute;
                    z-index: 2;
                    bottom:-25px;
                    left: 60px;
                    width: 30px;
                    height: 30px;
                    background: url('/static/images/icons/qd_icon9.png') no-repeat;
                }
                p{
                    line-height: 25px;
                    font-size: 24px;
                    color:#fff;
                }
                p:first-child{
                    padding-top:10px;
                    padding-bottom:25px;
                }
                >div.last{
                    color:#fff;
                    line-height: 25px;
                    font-size: 24px;
                    text-align: left;
                    padding-left:30px;
                }
                >div.first{
                    margin-top:40px;
                    margin-bottom:20px;
                    color:#fff;
                    line-height: 25px;
                    font-size: 24px;
                    text-align: left;
                    padding-left:30px;
                }
                >div.lastimg{
                    position: absolute;
                    right:0px;
                    bottom:-20px;
                    width:160px;
                    height: 160px;
                    img{
                        width:100%;
                    }
                }
            }
            li:nth-child(4){
                margin-right:0;
            }
            li:nth-child(1),li:nth-child(2),li:nth-child(3),li:nth-child(4){
                margin-bottom:20px;
            }
            li:last-child{
                margin-right:0;
                width:334px;
                position: relative;
                p{
                    text-align: left;
                    padding-left:30px;
                }
                p:last-child{
                    margin-top:83px;
                }
                .lastimg{
                    width:100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: radial-gradient(#ffa46c,#f6524e);
                    z-index: -1;
                    border-radius: 12px;
                }
                .hongbao{
                    width:100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: url('/static/images/icons/qd_icon2.png') no-repeat;
                    background-size: 120px 120px;
                    background-position: 215px 90px;
                    border-radius: 12px;
                }
            }
        }
    }
    .tip{
        width:300px;
        margin: auto;
        color:#999;
        margin-bottom:20px;
        line-height: 25px;
        position: relative;
    }
    .tip::before{
        content: "*";
        display: block;
        width:20px;
        height: 20px;
        position: absolute;
        top: 7px;
        left: 0;
    }
    .tip::after{
        content: "*";
        display: block;
        width:20px;
        height: 20px;
        position: absolute;
        top: 7px;
        right: 0;
    }
    .pad{
        height: 20px;
        background: #f2f2f2;
    }
    .miscellaneous{
        padding:20px 26px 0 26px;
        h1{
            font-size: 34px;
            text-align: left;
            line-height: 38px;
        }
        ul{
            width:100%;
            margin-top:40px;
            li{
                list-style: none;
                font-size: 0;
                height: 64px;
                margin-bottom:50px;
                position: relative;
                .img{
                    float: left;
                    width:64px;
                    height: 64px;
                    margin-right:20px;
                    img{
                        width:100%;
                    }
                }
                .next{
                    float: left;
                    text-align: left;
                    h2{
                        font-weight: 700;
                        font-size: 28px;
                        line-height: 30px;
                        padding-bottom:10px;
                    }
                    p{
                        line-height: 25px;
                        font-size: 24px;
                        color:#999;
                    }
                }
                .last{
                    float: right;
                    width:200px;
                    height: 64px;
                    line-height: 64px;
                    text-align: center;
                    font-size: 28px;
                    font-weight: 600;
                    color:#fff;
                    border-radius: 32px;
                    background: $theme-color;
                }
            }
        }
    }
}
</style>
