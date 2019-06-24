<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" style="min-width:50px">期数</th>
            <th rowspan="2" width="10%" style="min-width:35px">特码</th>
            <th colspan="9" width="20%">一门</th>
            <th colspan="9" width="20%">二门</th>
            <th colspan="9" width="20%">三门</th>
            <th colspan="10" width="20%">四门</th>
            <th colspan="12" width="30%">五门</th>
        </tr>
        <tr class="first">
            <td v-for="(ele,idx) in yi">{{ele}}</td>
            <td v-for="(ele,idx) in er">{{ele}}</td>
            <td v-for="(ele,idx) in san">{{ele}}</td>
            <td v-for="(ele,idx) in si">{{ele}}</td>
            <td v-for="(ele,idx) in wu">{{ele}}</td>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue" colspan="9">{{a_total}}</td>
            <td class="blue" colspan="9">{{b_total}}</td>
            <td class="blue" colspan="9">{{c_total}}</td>
            <td class="blue" colspan="10">{{d_total}}</td>
            <td class="blue" colspan="12">{{e_total}}</td>
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
            yi:[1,2,3,4,5,6,7,8,9],
            er:[10,11,12,13,14,15,16,17,18],
            san:[19,20,21,22,23,24,25,26,27],
            si:[28,29,30,31,32,33,34,35,36,37],
            wu:[38,39,40,41,42,43,44,45,46,47,48,49],
            a_total:0,
            b_total:0,
            c_total:0,
            d_total:0,
            e_total:0,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                if(ele.tm*1<=9){
                    this.a_total++
                }
                if(ele.tm*1>=10&&ele.tm*1<=18){
                    this.b_total++
                }
                if(ele.tm*1>=19&&ele.tm*1<=27){
                    this.c_total++
                }
                if(ele.tm*1>=28&&ele.tm*1<=37){
                    this.d_total++
                }
                if(ele.tm*1>=39&&ele.tm*1<=49){
                    this.e_total++
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
