<template>
  <section class="countDown">
    <span><i>{{timeTable.minute}}</i>分<i>{{timeTable.second}}</i>秒</span>
  </section>
</template>

<script>
export default {
  name: 'count_down',
  data () {
    return {
      timer: null, // 倒计时
      timeTable: {}, // 时间表
      deviceTime: +new Date(), // 设备时间
      currentTime: +new Date() // 倒计时当期时间
    }
  },
  props: {
    serverTime: { type: [String, Number] }, // 服务器当期时间
    endTime: { type: [String, Number] }, // 开奖、封盘时间（截止时间）
    issue: { type: [String, Number] } // 当期期数
  },
  methods: {
    getServerTime () {
      clearTimeout(this.timer)
      this.timeTable = this.getRemainTime(new Date(Number(this.endTime) * 1000).getTime(), this.currentTime, this.deviceTime)
      this.timer = setTimeout(this.getServerTime, 1000)
      // 倒计时截止10分钟返回一个状态
      if (this.timeTable.total <= 601000) this.$emit('surplus', 'ten')
      // 时间截止停止倒计时
      if (this.timeTable.total <= 1000 || this.timeTable.total <= 0) {
        clearTimeout(this.timer)
        this.$emit('time', 'stop')
      }
    },
    getRemainTime (endTime, serverTime, deviceTime) {
      let t = endTime - Date.parse(new Date()) - serverTime + deviceTime
      let second = Math.floor((t / 1000) % 60)
      let minute = Math.floor((t / 1000 / 60) % 60)
      let hour = Math.floor((t / (1000 * 60 * 60)) % 24)
      let day = Math.floor(t / (1000 * 60 * 60 * 24))
      return {
        'total': t,
        'day': day,
        'hour': this._padZero(hour),
        'minute': this._padZero(minute),
        'second': this._padZero(second)
      }
    },
    _padZero (str) { // 单数时间前加0
      return ('00' + str).substr(str.toString().length)
    }
  },
  watch: {
    issue () { // 监听游戏期数变化重新倒计时
      this.currentTime = new Date(Number(this.serverTime) * 1000).getTime()
      this.deviceTime = +new Date()
      this.getServerTime()
    }
  },
  created () {
    if (this.serverTime) {
      this.currentTime = new Date(Number(this.serverTime) * 1000).getTime()
      this.getServerTime()
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="scss">
    .countDown {
        display: inline-block;
        span {
            color: #333; font-size: 30px;
            i { color: #2f86ff; }
        }
    }
</style>
