<template>
    <section class="openCode">
        <p class="info clearfix">
            <strong v-if="surplusTen">
                第<i class="bd">{{qihao}}</i>期
                <i class="bd" v-if="!lottery">即将摇奖</i><i class="bd" v-else>正在摇奖</i>
                <em>[自动更新]</em>
            </strong>
            <strong v-else>第<i class="bd">{{issue}}</i>期开奖结果<em>[自动更新]</em></strong>
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
        <p class="time" v-show="surplusTen && !lottery" >
            距离摇奖还有&nbsp;<CountDowm :serverTime="serverTime" :endTime="openTime" :issue="issue" @time="stopTime" @surplus="surplus" />
        </p>
        <p class="time" v-if="!surplusTen && !lottery">第{{qihao}}期开奖时间 <i>{{timeArr[0]}}</i>年<i>{{timeArr[1]}}</i>月<i>{{timeArr[2]}}</i>号 <i>{{timeArr[3]}}</i></p>
        <p class="time" v-if="lottery">正在摇奖中</p>
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
                oldVal: false,
                created_at: '', // 号码实际开出时间
                timer: null, // 定时器
                openTime: '', // 开奖时间
                serverTime: '', // 服务器当期时间
                issue: '', // 当期期数
                qihao: '', // 下一期
                surplusTen: false, // 是否剩余10分钟
                lottery: false, // 摇奖中
                openNumber: [], // 开奖号码’
                sx: [], // 生肖
                wuxing: [], // 五行
                colorList: [], // 颜色数组
                timeArr: [], // 开奖时间数组
                openCode: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        methods: {
            get_Info () {
                this.$http.get('/v1/liuyou/lottery-time', {}).then(res => {
                    let data = res.data, time = new Date(data.openTime * 1000), lastOpenData = data.lastOpenData
                    this.created_at = lastOpenData.created_at, this.openTime = data.openTime, this.serverTime = data.now, this.issue = lastOpenData.qihao, this.qihao = data.qihao
                    this.openNumber = lastOpenData.openNumber.split(','), this.sx = lastOpenData.sx.split(','), this.wuxing = lastOpenData.wuxing
                    this.colorList = lastOpenData.color, this.timeArr = formatDate(time, 'yyyy-MM-dd-hh:mm').split('-')
                    if (this.serverTime) {
                        setTimeout(() => {
                            if (!this.oldVal) this.codeTime()
                        })
                    }
                })
            },
            surplus (t) { // 剩余10分钟
                if (t) this.surplusTen = true, this.openCode = []
            },
            stopTime (t) { // 倒计时截止，请求开奖结果（显示正在摇奖中状态）
                if (t) {
                    clearInterval(this.timer)
                    this.lottery = true, this.timer = setInterval(() => this.get_Info(), 10000)
                }
            },
            codeTime () { // 开奖号码
                let time = Number(this.serverTime) - Number(this.created_at)
                // console.log(2, time)
                if (time < 70 && time > 0) {
                    console.log(1)
                    this.openCode = []
                    this.key = Math.round(time / 10)
                    for (let i = 0; i < this.key; i++) {
                        this.openCode.push(this.openNumber[i])
                    }
                    console.log(this.openNumber)
                    this.key -= 1
                    let timer = setInterval(() => {
                        this.key++
                        this.openCode.push(this.openNumber[this.key])
                        if (this.key == 7) {
                            clearInterval(timer)
                            this.key = -1
                        }
                    }, 8000)
                }
            }
        },
        watch: { // 开奖结果返回停止倒计时
            issue(val, oldVal) {
                if (oldVal) {
                    clearInterval(this.timer), this.oldVal = true
                    // 模拟开奖效果
                    let timer = setInterval(() => {
                        this.openCode.push(1)
                        if (this.openCode.length == 7) {
                            clearInterval(timer)
                            this.surplusTen = false, this.lottery = false
                        }
                    }, 8000)
                }
            }
        },
        created () {
            this.get_Info()
        },
        destroyed () {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    .openCode {
        padding: 6px 0 0; background: white;
        .info {
            padding: 0 10px 0 20px; color: #333; font-size: 28px;
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
                float: right; height: 48px; margin-top: 10px; padding: 0 10px; color: white; font-size: 26px; text-align: center; line-height: 50px; background: #2F86FF; border-radius: 8px;
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
    }
</style>
