<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" style="min-width:50px">期数</th>
            <th rowspan="2" width="10%" style="min-width:35px">特码</th>
            <th colspan="7" width="20%">一段</th>
            <th colspan="8" width="20%">二段</th>
            <th colspan="5" width="20%">三段</th>
            <th colspan="5" width="20%">四段</th>
            <th colspan="5" width="30%">五段</th>
            <th colspan="5" width="30%">六段</th>
            <th colspan="5" width="30%">七段</th>
            <th colspan="5" width="30%">八段</th>
            <th colspan="4" width="30%">九段</th>
        </tr>
        <tr class="first">
            <td v-for="(ele,idx) in yi">{{ele}}</td>
            <td v-for="(ele,idx) in er">{{ele}}</td>
            <td v-for="(ele,idx) in san">{{ele}}</td>
            <td v-for="(ele,idx) in si">{{ele}}</td>
            <td v-for="(ele,idx) in wu">{{ele}}</td>
            <td v-for="(ele,idx) in liu">{{ele}}</td>
            <td v-for="(ele,idx) in qi">{{ele}}</td>
            <td v-for="(ele,idx) in ba">{{ele}}</td>
            <td v-for="(ele,idx) in jiu">{{ele}}</td>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue" colspan="7">{{a_total}}</td>
            <td class="blue" colspan="8">{{b_total}}</td>
            <td class="blue" colspan="5">{{c_total}}</td>
            <td class="blue" colspan="5">{{d_total}}</td>
            <td class="blue" colspan="5">{{e_total}}</td>
            <td class="blue" colspan="5">{{f_total}}</td>
            <td class="blue" colspan="5">{{g_total}}</td>
            <td class="blue" colspan="5">{{h_total}}</td>
            <td class="blue" colspan="4">{{i_total}}</td>
        </tr>
        <tr v-for="(ele,idx) in ball"  
            :class="{
                    hong:ballpanel.ballcolor['红'].indexOf(ele.tm*1)>-1,
                    lan:ballpanel.ballcolor['蓝'].indexOf(ele.tm*1)>-1,
                    lv:ballpanel.ballcolor['绿'].indexOf(ele.tm*1)>-1
                }"
        >
            <td>{{ele.qihao}}</td>
            <td class="tema">{{ele.tm<10?'0'+ele.tm:ele.tm}}</td>
            <td v-for="(ele1,idx1) in 49">{{ele.tm==ele1?ele.tm:''}}</td>
        </tr>
    </table>
</div>
</template>
<script>
export default {
    data(){
        return {
            ball:JSON.parse(localStorage.getItem('HistoryOpen')),
            ballpanel:JSON.parse(localStorage.getItem('liuhe')),
            jiaqin:['牛','马','羊','鸡','狗','猪'],
            yeshou:['鼠','虎','龙','蛇','兔','猴'],
            yi:[1,2,3,4,5,6,7],
            er:[8,9,10,11,12,13,14,15],
            san:[16,17,18,19,20],
            si:[21,22,23,24,25],
            wu:[26,27,28,29,30],
            liu:[31,32,33,34,35],
            qi:[36,37,38,39,40],
            ba:[41,42,43,44,45],
            jiu:[46,47,48,49],
            a_total:0,
            b_total:0,
            c_total:0,
            d_total:0,
            e_total:0,
            f_total:0,
            g_total:0,
            h_total:0,
            i_total:0,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                if(ele.tm*1<=7){
                    this.a_total++
                }
                if(ele.tm*1>=8&&ele.tm*1<=15){
                    this.b_total++
                }
                if(ele.tm*1>=16&&ele.tm*1<=20){
                    this.c_total++
                }
                if(ele.tm*1>=21&&ele.tm*1<=25){
                    this.d_total++
                }
                if(ele.tm*1>=26&&ele.tm*1<=30){
                    this.e_total++
                }
                if(ele.tm*1>=31&&ele.tm*1<=35){
                    this.f_total++
                }
                if(ele.tm*1>=36&&ele.tm*1<=40){
                    this.g_total++
                }
                if(ele.tm*1>=41&&ele.tm*1<=45){
                    this.h_total++
                }
                if(ele.tm*1>=46&&ele.tm*1<=49){
                    this.i_total++
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.table-wrap{
    background: #fff;
    table{
        width: 3250px;
        border-spacing:0;
        background: #fff;
        tr{
            th{
                border-bottom:$border-color 1px solid;
                border-right:$border-color 1px solid;
                color:$subtitle-color;
                font-weight: 500;
                height: 80px;
                width: 80px;
            }
            th:last-child{
                border-right:none;
            }
            td.blue{
                color:$theme-color;
            }

            td{
                color: $subtitle-color;
                border-right:1px solid $border-color;
                border-bottom:1px solid $border-color;
                height: 80px;
                width: 80px;
            }
            td:last-child{
                border-right:none;
            }
            td.tema{
                color:#000;
            }
        }
        tr.hong{
            td:nth-child(n+3){
                color:#da460c;
            }
        }
        tr.lan{
            td:nth-child(n+3){
                color:#3a79e4;
            }
        }
        tr.lv{
            td:nth-child(n+3){
                color:#4db67e;
            }
        }
    }
}
</style>
