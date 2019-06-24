<template>
    <section class="codeBox" v-show="isShow">
        <p class="info clearfix">
            <strong v-show="surplusTen">
                <em v-if="lottery">第<i class="bd">{{qihao}}</i>期<i class="bd">正在摇奖</i></em>
                <em v-else>距离第<i class="bd">{{qihao}}</i>期摇奖还有<CountDowm :serverTime="serverTime" :endTime="openTime" :issue="issue" @time="stopTime" @surplus="surplus" /></em>
            </strong>
            <strong v-if="!surplusTen">第<i class="bd">{{issue}}</i>期开奖结果</strong>
            <router-link to="/historyissue" class="lottery">往期开奖结果</router-link>
        </p>
        <section class="code">
            <div class="list clearfix">
                <i class="iconJ">+</i>
                <strong v-for="(res, key) in openNumber" :key="key" :class="colorList[key]" v-if="openCode[key]"><em>{{res}}</em></strong>
                <strong v-else class="noSt">?</strong>
            </div>
            <p class="zodiac clearfix">
                <span v-for="(res,key) in sx" :key="key" v-if="openCode[key]">{{res}}+{{wuxing[key]}}</span>
                <span v-else>未摇奖</span>
            </p>
        </section>
        <strong class="alertCode" :class="colorList[key] + 'alert'" v-if="openCode[key]">
            <i class="box">
                <span class="zh" v-if="key < 6">正码 <i>{{key + 1}}</i></span>
                <span class="zh" v-else>特码</span>
                <em>{{openCode[key]}}</em>
                <span>{{sx[key]}}+{{wuxing[key]}}</span>
            </i>
        </strong>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    export default {
        name: "openCode",
        components: {
            CountDowm(){
                return{
                    component: import('./count_Down')
                }
            }
        },
        data () {
            return {
                timer: null, // 定时器
                timerT: null,
                oldVal: false,
                created_at: '', // 号码实际开出时间
                openTime: '', // 最新期开奖时间
                actTime: '', // 上期开奖时间
                serverTime: '', // 服务器当期时间
                issue: '', // 当期期数
                qihao: '', // 下一期
                isShow: false, // 弹窗只显示10分钟
                surplusTen: false, // 是否剩余10分钟
                lottery: false, // 摇奖中
                openNumber: [], // 开奖号码
                sx: [], // 生肖
                wuxing: [], // 五行
                colorList: [], // 颜色数组
                timeArr: [], // 开奖时间数组
                key: -1,
                openCode: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        methods: {
            get_Info () {
                this.$http.get(`/v1/liuyou/lottery-time`, {}).then(res => {
                    let data = res.data, time = new Date(data.openTime * 1000), lastOpenData = data.lastOpenData
                    this.openTime = data.openTime, this.actTime = data.actTime, this.serverTime = data.now, this.created_at = lastOpenData.created_at, this.issue = lastOpenData.qihao, this.qihao = data.qihao
                    this.openNumber = lastOpenData.openNumber.split(','), this.sx = lastOpenData.sx.split(','), this.wuxing = lastOpenData.wuxing
                    this.colorList = lastOpenData.color, this.timeArr = formatDate(time, 'yyyy-MM-dd-hh:mm').split('-')
                    if (this.serverTime) {
                        this.getTimes()
                        setTimeout(() => {
                            if (!this.oldVal) this.codeTime()
                        })
                    }
                })
            },
            surplus (t) { // 剩余10分钟
                if (t) this.surplusTen = true, this.isShow = true, this.openCode = []
            },
            stopTime (t) { // 倒计时截止，请求开奖结果（显示正在摇奖中状态）
                if (t) {
                    clearInterval(this.timer)
                    this.lottery = true, this.timer = setInterval(() => this.get_Info(), 10000)
                }
            },
            getTimes () { // 停留20分钟
                let time = Number(this.serverTime) - Number(this.actTime), newTime = 1800
                let serverTime = new Date(this.serverTime * 1000), actTime = new Date(this.actTime * 1000)
                let obj = {
                    serverTime: formatDate(serverTime, 'yyyy-MM-dd hh:mm:ss'),
                    actTime: formatDate(actTime, 'yyyy-MM-dd hh:mm:ss'),
                    value: this.serverTime - this.actTime
                }
                // console.log(obj, '停留时长')
                if (time > newTime) {
                    this.isShow = false
                }
                if (time < newTime && time > 0){
                    this.isShow = true
                    clearInterval(this.timerT)
                    this.timerT = setInterval(() => {
                        time++
                        if (time > newTime) {
                            this.isShow = false, clearInterval(this.timerT)
                        }
                    }, 1000)
                }
                // let date = new Date().getTime(), time = 600000
                // if (date - Number(this.actTime * 1000) < time && date - Number(this.actTime * 1000) > 0) {
                //     clearInterval(this.timerT)
                //     this.isShow = true
                //     this.timerT = setInterval(() => {
                //         // console.log((new Date().getTime() - Number(this.actTime * 1000)))
                //         if ((new Date().getTime() - Number(this.actTime * 1000)) > time) {
                //             clearInterval(this.timerT)
                //             this.isShow = false
                //         }
                //     }, 1000)
                // }
            },
            codeTime () { // 开奖号码
                let time = Number(this.serverTime) - Number(this.created_at)
                let serverTime = new Date(this.serverTime * 1000), created_at = new Date(this.created_at * 1000)
                let obj = {
                    serverTime: formatDate(serverTime, 'yyyy-MM-dd hh:mm:ss'),
                    created_at: formatDate(created_at, 'yyyy-MM-dd hh:mm:ss'),
                    value: this.serverTime - this.created_at
                }
                // console.log(obj, '开出第几个球')
                if (time < 70 && time > 0) {
                    this.openCode = []
                    this.key = Math.round(time / 10)
                    for (let i = 0; i < this.key; i++) {
                        this.openCode.push(this.openNumber[i])
                    }
                    this.key -= 1
                    let timer = setInterval(() => {
                        this.key++
                        this.openCode.push(this.openNumber[this.key])
                        if (this.key == 7) {
                            clearInterval(timer)
                            this.key = -1
                        }
                    }, 9000)
                }
            }
        },
        watch: { // 开奖结果返回停止倒计时
            issue(val, oldVal) {
                if (oldVal) {
                    clearInterval(this.timer)
                    this.surplusTen = false, this.oldVal = true
                    // 模拟开奖效果
                    let timer = setInterval(() => {
                        this.key++
                        this.openCode.push(this.openNumber[this.key])
                        sessionStorage.setItem('openCode', JSON.stringify(this.openCode))
                        if (this.key == 7) {
                            clearInterval(timer)
                            this.getTimes()
                            this.lottery = false, this.key = -1
                        }
                    }, 9000)
                }
            }
        },
        created () {
            this.get_Info()
        },
        destroyed () {
            clearInterval(this.timer)
            clearInterval(this.timerT)
        }
    }
</script>

<style scoped lang="scss">
    .codeBox {
        position: relative; background: white;
        .info {
            padding: 0 20px; color: #333; font-size: 30px;
            strong {
                float: left;
                .bd {
                    color: #2F86FF; font-size: 38px; padding: 0 3px;
                }
                em {
                    color: #999; font-size: 26px; padding: 0 5px;
                }
            }
            .lottery {
                float: right; height: 48px; margin-top: 10px; padding: 0 10px;  color: white; font-size: 26px; text-align: center; line-height: 50px; background: #2F86FF; border-radius: 8px;
            }
        }
        .code {
            padding: 20px 20px 13px; border-bottom: 1px solid #E1E1E1;
            .list {
                position: relative;
                .iconJ {
                    position: absolute; right: 70px; width: 70px; line-height: 70px; color: #999; font-size: 40px; text-align: center;
                }
                .noSt {
                   color: #999; border: 1px solid #999; box-sizing: border-box; border-radius: 50%;
                }
                strong {
                    float: left; width: 70px; height: 70px; margin-right: 30px; font-size: 34px; text-align: center; line-height: 72px;
                }
                strong:nth-child(7) { margin-right: 70px; }
                strong:last-child { margin: 0; }
                strong.lan {
                    color: #4785f7; background: url("/static/images/codeL1.png") no-repeat center; background-size: 100% 100%;
                }
                strong.lv {
                    color: #8acf3f; background: url("/static/images/codeLv1.png") no-repeat center; background-size: 100% 100%;
                }
                strong.hong {
                    color: #e9587a; background: url("/static/images/codeH1.png") no-repeat center; background-size: 100% 100%;
                }
            }
            .zodiac span {
                float: left; width: 96px; padding-left: 4px; color: #666; font-size: 26px; text-align: left; line-height: 37px; margin: 10px 0 0 0;
            }
            .zodiac span:nth-child(6) { margin-right: 10px; }
            .zodiac span:last-child { margin-right: 0; text-align: right; }
        }
        .time {
            padding: 0 20px;  color: #333; font-size: 30px; line-height: 68px; text-align: left;
            i { color: #2F86FF; }
        }
        .alertCode {
            position: fixed; left: 0; width: 750px; height: 760px;
            .box {
                display: block; padding-top: 180px;
                span {
                    position: relative; display: block; height: 70px; color: white; font-size: 60px; line-height: 70px;
                }
                .zh {
                    margin-bottom: 90px;
                    i {
                        position: absolute; top: 1px;
                    }
                }
                em {
                    display: block; height: 120px; margin-bottom: 75px; line-height: 120px; font-size: 120px; font-weight: bold; text-align: center;
                }
            }
        }
        strong.hongalert {
            background: url("/static/images/codeH.png")no-repeat center; background-size: cover;
            em { color: #FF4B78; }
        }
        strong.lanalert {
            background: url("/static/images/codeL.png")no-repeat center; background-size: cover;
            em { color: #2F86FF; }
        }
        strong.lvalert {
            background: url("/static/images/codeLv.png")no-repeat center; background-size: cover;
            em { color: #7CD321; }
        }
    }
</style>
