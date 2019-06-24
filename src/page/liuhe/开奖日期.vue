<template>
<div class="open-date">
    <div class="hldata-wrap">
        <div class="wrap-title">{{Yeas}}年{{Month+1}}月{{curDay}}日 &nbsp; {{curWeekArr[curWeek]}} &nbsp; {{hldate.lunarYear}}年【{{hldate.sxn}}年】{{hldate.tianganyue}}月 &nbsp; {{hldate.tianganri}}日</div>
        <span class="huawen huawen1"></span>
        <span class="huawen huawen2"></span>
        <span class="huawen huawen3"></span>
        <span class="huawen huawen4"></span>
        <div class="day-content">
            <div class="left">
                <div class="curday">{{curDay<10?'0'+curDay:curDay}}</div>
                <ul class="mes">
                    <li class="chong">冲:</li>
                    <li>{{hlMessage&&hlMessage['d'+(Month+1<10?'0'+(Month+1)*1:Month+1)+''+(curDay<10?'0'+curDay:curDay)]['c'].substring(3,4)}}</li>
                    <li class="sha">煞:</li>
                    <li>{{hlMessage&&hlMessage['d'+(Month+1<10?'0'+(Month+1)*1:Month+1)+''+(curDay<10?'0'+curDay:curDay)]['s'].substring(1,2)}}</li>
                </ul>
            </div>
            <div class="right">
                <div class="line"><span class="byi"><span class="yi">宜</span></span><span class="txt">{{hlMessage&&hlMessage['d'+(Month+1<10?'0'+(Month+1)*1:Month+1)+''+(curDay<10?'0'+curDay:curDay)]['y']}}</span></div>
                <div class="line"><span class="byi"><span class="yi">忌</span ></span><span class="txt">{{hlMessage&&hlMessage['d'+(Month+1<10?'0'+(Month+1)*1:Month+1)+''+(curDay<10?'0'+curDay:curDay)]['j']}} </span></div>
            </div>
        </div>
        <div class="kaijiang">
            <div class="sj">
                <span>下期开奖时间：{{new Date(nextOpen).getFullYear()}}年{{new Date(nextOpen).getMonth()+1<10?'0'+(new Date(nextOpen).getMonth()+1):new Date(nextOpen).getMonth()+1}}月{{new Date(nextOpen).getDate()}}日 {{curWeekArr[new Date(nextOpen).getDay()]}} 下午9：30</span> 
                <span :class="{yellow:nextOpenDayName=='今天开奖'}">【{{nextOpenDayName}}】</span>
            </div>
            <div class="sfm">
                <span class="shi">{{Countdown.sy_h<10?'0'+Countdown.sy_h:Countdown.sy_h}}</span>
                <span class="feng">{{Countdown.sy_m<10?'0'+Countdown.sy_m:Countdown.sy_m}}</span>
                <span>{{Countdown.sy_s<10?'0'+Countdown.sy_s:Countdown.sy_s}}</span>
            </div>
        </div>
        <div class="date-title"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>
    </div>
    <div class="title">
        <span class="mintui " @click="lastMonth()"></span>
        <!-- {{Yeas}}年 -->
        {{Month+1}}月
        <span class="mintui " @click="nextMonth()"></span>
    </div>
    <div class="date-content" @touchstart="MathStart" @touchmove="huadong">
        <div class="date-day" v-for="(ele,idx) in 6">
            <div  
                v-for="(ele1,idx1) in 7" 
                :key="idx1" @click="seleteDate(getRenderDay(idx,idx1),idx1)" 
                :class="{
                    active:result.indexOf(getRenderDay(idx,idx1)*1)>-1,
                    curName:curDay*1==getRenderDay(idx,idx1)*1,
                    today:new Date().getDate()==getRenderDay(idx,idx1)
                }">
                <div :class="{openDay:result.indexOf(new Date().getDate())>-1&&new Date().getDate()==getRenderDay(idx,idx1)}">
                    <span>{{getRenderDay(idx,idx1)}}</span>
                    <span v-if="getRenderDay(idx,idx1)!=''">{{sloarToLunar(Yeas,Month+1,getRenderDay(idx,idx1)).lunarDay}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'Vuex'
export default {
    data(){
        return {
            index:0,
            hackReset:true,
            
            t_clientX_s:0,
            t_clientX_e:0,
            isSlide:false,

            Yeas:new Date().getFullYear(),//视图里渲染的年
            Month:'',//视图里渲染的月

            firstDay:'',//开始的第一天
            MonthLen:'',//这个月有多少天

            openYear:'',//开奖年
            openMonth:'',//开奖月
            openDay:'',//开奖日

            curDay:'',//手动选择的日
            curWeek:'',//手动选择的周
            curWeekArr:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            slideMonArr:[],
            slideClassArr:['-100vw','0vw','100vw'],

            result:[],
            Countdown:{
                sy_h:0,
                sy_m:0,
                sy_s:0
            },
            setIntervalId:'',
            nextOpen:'',
            nextOpenDayName:'????',

            hldate:'',//黄历数据
            hlMessage:false,//黄历一天的相关信息
             // 农历1949-2100年查询表
            lunarYearArr:[
                0x0b557, //1949
                0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
                0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
                0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
                0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
                0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
                0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
                0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
                0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
                0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
                0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
                0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
                0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
                0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
                0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
                0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
                0x0d520 //2100
            ],
            lunarMonth:['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
            lunarDay:['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'],
            tianGan:['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            diZhi:['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
            chinaZodiac:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','狗','鸡','猪'],
            active:true,
        }
        
    },
    watch:{
        'Yeas'(val,oval){
            this.gethlDate();
        }
    },
    computed:{
        ...mapGetters(['sysTem','isApp'])
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            var date = new Date();
            this.curDay = date.getDate();//当前日
            this.curWeek = date.getDay();//当前周

            this.Yeas = date.getFullYear();//年
            this.Month = date.getMonth();//月

            this.firstDay = this.MathFirstDay();//求1号是星期几
            this.MonthLen = this.MathMonthLen();//求某个月有多少天

            this.gethlDate();//获取农历数据
            this.MatchhlDate()//头部渲染的农历信息
            var res = await this.getOpenForMonth();
        },
        //求1号是星期几
        MathFirstDay(){
            var date = new Date();
            date.setFullYear(this.Yeas,this.Month,1);
            return date.getDay();
        },
        //求某个月有多少天
        MathMonthLen(){
            var timeStr = this.Yeas+"/"+(this.Month*1+1)+"/1"
            var selectedDate = new Date(timeStr);
            var selectedMonth = selectedDate.getMonth()+1;
            selectedDate.setMonth(selectedMonth);
            selectedDate.setDate(0);
            var dayMany = selectedDate.getDate();
            return dayMany;
        },
        //下一个月
        nextMonth(){
            var date = new Date();
            if(this.Month==11){
                this.Month = 0;
                this.Yeas = this.Yeas + 1;
            }else{
                this.Month = this.Month + 1;//月
            }
            this.firstDay = this.MathFirstDay();
            this.MonthLen = this.MathMonthLen();
            if(this.curDay>this.MonthLen){
                this.curDay = this.MonthLen
            }
            this.getOpenForMonth();
            this.MatchhlDate()
        },
        //上一个月
        lastMonth(){
            var date = new Date();
            if(this.Month==0){
                this.Month = 11;
                this.Yeas = this.Yeas - 1;
            }else{
                this.Month = this.Month - 1;//月
            }
            this.firstDay = this.MathFirstDay();
            this.MonthLen = this.MathMonthLen();
            this.result = [];
            this.MatchhlDate()
        },
        //返回的日期
        getRenderDay(idx,idx1){
            var hang = idx+1;
            var one  = idx1+1;
            if(idx==0){
                return (one*hang)-this.firstDay>0?(one*hang)-this.firstDay:'';
            }else{
                var day = (((hang-1)*7)+one)-this.firstDay;
                if(day<=this.MonthLen){
                    return day;
                }else{
                    return '';
                }
            }
        },
        //获取当月开奖日期
        getOpenForMonth(str){
            var that = this;
            var monstr;
            if(str){
                monstr = str;
            }else{
                monstr = this.Yeas+''+((this.Month*1+1)<10?'0'+(this.Month*1+1):(this.Month*1+1))
            }
            return new Promise(resolve=>{
                that.$http.get('/v1/liuyou/month-open',{params:{month:monstr}}).then(res=>{
                    var arr = []
                    that.result = []
                    if(res.code==0){
                        res.data.records.forEach(ele=>{
                            arr.push(ele.time.substring(0,10))
                            that.result.push(ele.time.substring(8,10)*1);
                        })
                        that.nextOpen = res.data.next_kj_record.time*1000;
                        that.nextOpenDay(res.data.next_kj_record.time*1000);
                        that.openCountdown(res.data.next_kj_record.time*1000);
                        resolve(arr)
                    }else{
                        resolve('err')
                    }
                })
            })
        },
        nextOpenDay(time){
            var f = new Date().getDate()
            var n = new Date(time).getDate()
            switch (n-f) {
                case 0:
                    this.nextOpenDayName = '今天开奖'
                    break;
                case 1:
                    this.nextOpenDayName = '明天开奖'
                    break;
                case 2:
                    this.nextOpenDayName = '后天开奖'
                    break;
                default:
                    this.nextOpenDayName = (n-f)+'天后开奖'
                    break
            }
        },
        //倒计时
        openCountdown(time){
            var that = this;
            var h,m,s,sy_h,sy_m,sy_s;
            var sy_time = time - Date.parse(new Date());
            s = sy_time / 1000
            sy_s = s % 60
            m = (s / 60).toFixed() * 1
            sy_m = m % 60
            sy_h = (m / 60).toFixed() * 1
            that.Countdown.sy_h = sy_h
            that.Countdown.sy_m = sy_m
            that.Countdown.sy_s = sy_s
            var intetId = setInterval(()=>{
                if(sy_s==0){
                    sy_s=59
                    sy_m--
                    that.$set(that.Countdown,'sy_m',sy_m)
                    if(sy_m==0){
                        sy_m=59
                        sy_h--
                        that.$set(that.Countdown,'sy_h',sy_h)
                        if(sy_h==0){
                            clearInterval(intetId)
                            that.getOpenForMonth();
                        }
                    }
                }else{
                    sy_s--
                    that.$set(that.Countdown,'sy_s',sy_s)
                }
            },1000)
        },
        MathStart(){
            this.t_clientX_s = event.touches[0].clientX
        },
        huadong(){
            var timeStr = this.Yeas+"-"+(this.Month*1+1)+"-1"
            this.t_clientX_e = event.touches[0].clientX
            if(this.t_clientX_s - this.t_clientX_e>=50){
                if(this.isSlide) return;
                //this.isSlide = true;
                console.log('左滑');
                //this.nextMonth();
            }
            if(this.t_clientX_e - this.t_clientX_s>=50){
                if(this.isSlide) return;
                //this.isSlide = true;
                console.log('右滑');
                //this.lastMonth();
            }
        },
        slideStop(){
            this.isSlide = false;
        },
        handleChange(index){
            // var size = this.index+'-'+index;
            // var arr_right = ['0-2','2-1','1-0'];
            // var arr_left = ['0-1','1-2','2-0']
            // if(arr_right.indexOf(size)>-1){
            //     //右滑--上个月
            //     this.lastMonth();
            // }
            // if(arr_left.indexOf(size)>-1){
            //     //左滑--下个月
            //     this.nextMonth();
            // }
            // this.index = index;
        },
        //选择日期
        seleteDate(d,week){
            if(d===''||week==='') return;
            this.curDay = d;
            this.curWeek = week;
            this.MatchhlDate()
        },
        //计算黄历日期
        MatchhlDate(){
            this.hldate = this.sloarToLunar(this.Yeas,this.Month+1,this.curDay)
            this.hldate["sxn"] = this.getYearZodiac(this.Yeas)
            this.hldate['tianganyue'] = this.getEraMonth(this.Yeas,this.Month)
            this.hldate['tianganri'] = this.getEraDay(this.Yeas,this.Month,this.curDay)
        },
        /* 公历转农历代码思路：
        1、建立农历年份查询表
        2、计算输入公历日期与公历基准的相差天数
        3、从农历基准开始遍历农历查询表，计算自农历基准之后每一年的天数，并用相差天数依次相减，确定农历年份
        4、利用剩余相差天数以及农历每个月的天数确定农历月份
        5、利用剩余相差天数确定农历哪一天 */
        // 公历转农历函数
        gethlDate(){
            var that = this;
            var url = '../../static/js/hl'+this.Yeas+'.json'
            that.$http.get(url).then(res=>{
                that.hlMessage = {}
                that.hlMessage = res
            })
        },
        sloarToLunar(sy, sm, sd) {
            // 输入的月份减1处理
            sm -= 1;

            // 计算与公历基准的相差天数
            // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
            let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
            let ly, lm, ld;
            // 确定输出的农历年份
            for (let j = 0; j < this.lunarYearArr.length; j++) {
                daySpan -= this.lunarYearDays(this.lunarYearArr[j]);
                if (daySpan <= 0) {
                ly = 1949 + j;
                // 获取农历年份确定后的剩余天数
                daySpan += this.lunarYearDays(this.lunarYearArr[j]);
                break
                }
            }

            // 确定输出的农历月份
            for (let k = 0; k < this.lunarYearMonths(this.lunarYearArr[ly - 1949]).length; k++) {
                daySpan -= this.lunarYearMonths(this.lunarYearArr[ly - 1949])[k];
                if (daySpan <= 0) {
                // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
                if (this.hasLeapMonth(this.lunarYearArr[ly - 1949]) && this.hasLeapMonth(this.lunarYearArr[ly - 1949]) <= k) {
                    if (this.hasLeapMonth(this.lunarYearArr[ly - 1949]) < k) {
                    lm = k;
                    } else if (this.hasLeapMonth(this.lunarYearArr[ly - 1949]) === k) {
                    lm = '闰' + k;
                    } else {
                    lm = k + 1;
                    }
                } else {
                    lm = k + 1;
                }
                // 获取农历月份确定后的剩余天数
                daySpan += this.lunarYearMonths(this.lunarYearArr[ly - 1949])[k];
                break
                }
            }

            // 确定输出农历哪一天
            ld = daySpan;

            // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
            if (this.hasLeapMonth(this.lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
                lm = `闰${this.lunarMonth[/\d/.exec(lm) - 1]}`
            } else {
                lm = this.lunarMonth[lm - 1];
            }

            // 将计算出来的农历年份转换为天干地支年
            ly = this.getTianGan(ly) + this.getDiZhi(ly);

            // 将计算出来的农历天数转换成汉字
            if (ld < 11) {
                ld = `${this.lunarDay[10]}${this.lunarDay[ld-1]}`
            } else if (ld > 10 && ld < 20) {
                ld = `${this.lunarDay[9]}${this.lunarDay[ld-11]}`
            } else if (ld === 20) {
                ld = `${this.lunarDay[1]}${this.lunarDay[9]}`
            } else if (ld > 20 && ld < 30) {
                ld = `${this.lunarDay[11]}${this.lunarDay[ld-21]}`
            } else if (ld === 30) {
                ld = `${this.lunarDay[2]}${this.lunarDay[9]}`
            }

            // console.log(ly, lm, ld);

            return {
                lunarYear: ly,
                lunarMonth: lm,
                lunarDay: ld,
            }
        },
        // 计算农历年是否有闰月，参数为存储农历年的16进制
        // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
        hasLeapMonth(ly) {
            // 获取16进制的最后1位，需要用到&与运算符
            if (ly & 0xf) {
                return ly & 0xf
            } else {
                return false
            }
        },
        // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
        // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
        leapMonthDays(ly) {
            if (this.hasLeapMonth(ly)) {
                // 获取16进制的第1位（0x除外）
                return (ly & 0xf0000) ? 30 : 29
            } else {
                return 0
            }
        },
        // 计算农历一年的总天数，参数为存储农历年的16进制
        // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
        lunarYearDays(ly) {
            let totalDays = 0;

            // 获取正常月的天数，并累加
            // 获取16进制的第2-4位，需要用到>>移位运算符
            for (let i = 0x8000; i > 0x8; i >>= 1) {
                let monthDays = (ly & i) ? 30 : 29;
                totalDays += monthDays;
            }
            // 如果有闰月，需要把闰月的天数加上
            if (this.hasLeapMonth(ly)) {
                totalDays += this.leapMonthDays(ly);
            }

            return totalDays
        },
        // 获取农历每个月的天数
        // 参数需传入16进制数值
        lunarYearMonths(ly) {
            let monthArr = [];

            // 获取正常月的天数，并添加到monthArr数组中
            // 获取16进制的第2-4位，需要用到>>移位运算符
            for (let i = 0x8000; i > 0x8; i >>= 1) {
                monthArr.push((ly & i) ? 30 : 29);
            }
            // 如果有闰月，需要把闰月的天数加上
            if (this.hasLeapMonth(ly)) {
                monthArr.splice(this.hasLeapMonth(ly), 0, this.leapMonthDays(ly));
            }

            return monthArr
        },
        // 将农历年转换为天干，参数为农历年
        getTianGan(ly) {
            let tianGanKey = (ly - 3) % 10;
            if (tianGanKey === 0) tianGanKey = 10;
            return this.tianGan[tianGanKey - 1]
        },
        // 将农历年转换为地支，参数为农历年
        getDiZhi(ly) {
            let diZhiKey = (ly - 3) % 12;
            if (diZhiKey === 0) diZhiKey = 12;
            return this.diZhi[diZhiKey - 1]
        },
        /**
		 * 获取干支纪月
		 */
        getEraMonth(y,m) {
            return this.calculate((y-1900)*12+m+12); // 1900年1月小寒以前为丙子月，在60进制中排12
        },
        /**
		 * 获取干支纪日
		 */
        getEraDay(y,m,d) {
            return this.calculate(Math.ceil((new Date(y,m-1,d)-new Date(1900,0,1))/86400000+10));// 甲戌
        },
		/**
		 * num 60进制中的位置(把60个天干地支编码成60进制的数)
		 */
		calculate (num) {
            return this.tianGan[num%10]+this.diZhi[num%12]
        },
        /**
		 * 获取生肖 干支所在年(默认以立春前的公历年作为基数)
		 */
		getYearZodiac(y){
			 var num=y-1900+35; //参考干支纪年的计算，生肖对应地支
			 return this.chinaZodiac[num%12];
        },
        popupVisible () {
            console.log(aaa)
        }
    }
}
</script>
<style lang="scss" scoped>
.date-content-wrap{
    height: 750px;
}
.date-slide{
    width:750px;
    height: 600px;
    position: relative;
    overflow-x: hidden;
    .date-content{
        position: absolute;
        top: 0;
        transition: all ease 1s;
        width:750px;
        height: 600px;
        background: #fff;
    }
}
.open-date{
    height: 100%;
    background: $bg-color;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    font-size: 24px;
    .hldata-wrap {
        margin: 16px 16px 0;
        background: #d6273e;
        position: relative;
        .huawen {
            position: absolute;
            display: block;
            width: 25px;
            height: 25px;
            background: url('/static/images/huawen.png');
            background-size: 100% 100%;
            &.huawen1 {
                left: 5px;
                top: 5px;;
                transform: rotate(90deg);
                -webkit-transform: rotate(90deg); /* Safari and Chrome */
            }
            &.huawen2 {
                left:5px;
                bottom: 70px;
            }
            &.huawen3 {
                top: 5px;
                right:5px;
                transform: rotate(-180deg);
                -webkit-transform: rotate(-180deg); /* Safari and Chrome */
            }
            &.huawen4 {
                right: 5px;
                bottom: 70px;
                transform: rotate(-90deg);
                -webkit-transform: rotate(-90deg); /* Safari and Chrome */
            }
        }
        .wrap-title {
            color: #fff;
            padding: 20px 30px 0;
            font-size: 22px; 
        }
           
    }
    .day-content {
        display: flex;
        padding-top:20px;
        .left {
            position: relative;
            width: 270px;
            .curday {
                line-height: 118px;
                font-size: 128px;
                color: #fed200;
                text-shadow: 5px 5px 5px rgba(0,0,0,.3);
            }
            .mes {
                li {
                    display: inline-block;
                    vertical-align: middle;
                    color: #fff;
                    position: relative;
                }
                li:nth-child(1n){
                    margin-right:10px;
                }
                li:nth-child(2){
                    margin-right:20px;
                }
                .sha::after {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #ff7c7c;
                    left: -10px;
                    top: 15px;
                    content: '';
                }
                li:first-child::after {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #ff7c7c;
                    left: -10px;
                    top: 15px;
                    content: '';
                    
                }
                
            }
        }
        .right{
            flex: 1;
            overflow: hidden;
            .line{
                text-align: left;
                >span{
                    display: inline-block;
                    vertical-align: middle;
                }
                >span.byi{
                    width:40px;
                    height: 40px;
                    border:1px solid #fff;
                    border-radius: 50%;
                    padding:4px;
                    span{
                        display: block;
                        width:40px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 50%;
                        background: #fff;
                        font-size: 28px;
                        color:#d6273e;
                        text-align: center;
                    }
                }
                span.txt{
                    width:calc(100% - 80px);
                    overflow: hidden;
                    width: 350px;
                    // text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left:10px;
                    font-size: 24px;
                    color:#fff7ea;
                }
            }
            >div:first-child{
                padding-top:10px;
                padding-bottom:20px;
            }
        }
    }
    .kaijiang {
        padding: 20px 10px 0;
        color: #fff;
        .sj {
            padding-top: 10px;
            border-top: 1px solid #fff;
            display: flex;
            .yellow{
                color: #fde200;
            }
        }
        .sfm {
            margin: 20px 0;
            > span {
                display: inline-block;
                height: 60px;
                width: 60px;
                border: 1px solid #fff;
                border-radius: 50%;
                font-size: 34px;
                color: #fde200;
                line-height: 60px;
                margin-left: 20px;
                &.shi {
                    position: relative;
                }
                &.shi::after {
                    left: 70px;
                    position: absolute;
                    content: ':';
                }
                &.feng {
                    position: relative;
                }
                &.feng::after {
                    content: ':';
                    position: absolute;
                    left: 70px;
                }
            }
            
        }
    }
    .title{
        padding-left: 120px;
        padding-top:60px;
        height: 30px;
        line-height: 30px;
        color:#ff3b30;
        font-size: 40px;
        text-align: left;
    }
    .date-title{
        border-top: 1px solid #fff;
        color: #fff;
        display: flex;
        font-size: 30px;
        background: #ba152b;
        span{
            flex: 1;
            line-height: 64px;
        }
    }
    .date-content {
        padding: 0 30px;    
        position: relative;
        margin-top: 10px;
        >.date-day:last-child {
            border: none;
        }
    }
   
    .date-day{
        display: flex;
        color: #333;
        border-bottom: 1px solid #e1e1e1;
        >div{
            padding: 20px 0;
            flex: 1;
            text-align: center;
            position: relative;
            font-size: 30px;
            height: 80px;
            >div{
                height: 80px;
                //background: red;
                span{
                    display: block;
                    width:100%;
                }
                span:first-child{
                    font-size: 34px;
                    line-height: 25px;
                    padding-top:15px;
                    padding-bottom:2px;
                    font-weight: bold;
                }
                span:last-child{
                    font-size: 22px;
                }
            }
            .openDay{
                background: #ff3b30!important;
                span{
                    color:#fff!important;
                }
            }
        }
        .active>div{
            width:80px;
            height: 80px;
            margin: auto;
            border-radius: 50%;
            background: #ffe2e0;
        }
        .curName{
            color:#ff3b30;
        }
        .today>div,.curName>div{
            width:80px;
            height: 80px;
            margin: auto;
            border-radius: 50%;
            background: #ff3b30;
            color:#fff;
        }
    }
}
@media screen and (max-width: 364px) {
    .sj {
        display: flex;
        flex-direction:column;
    }
}
</style>

