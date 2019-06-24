<template>
<div class="table-wrap">
    <table>
        <tr>
            <th width="12%">期数</th>
            <th width="12%">特码</th>
            <th width="7.6%">1</th>
            <th width="7.6%">2</th>
            <th width="7.6%">3</th>
            <th width="7.6%">4</th>
            <th width="7.6%">5</th>
            <th width="7.6%">6</th>
            <th width="7.6%">7</th>
            <th width="7.6%">8</th>
            <th width="7.6%">9</th>
            <th width="7.6%">0</th>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue">{{a_total}}</td>
            <td class="blue">{{b_total}}</td>
            <td class="blue">{{c_total}}</td>
            <td class="blue">{{d_total}}</td>
            <td class="blue">{{e_total}}</td>
            <td class="blue">{{f_total}}</td>
            <td class="blue">{{g_total}}</td>
            <td class="blue">{{h_total}}</td>
            <td class="blue">{{i_total}}</td>
            <td class="blue">{{j_total}}</td>
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
            <td>{{ele.tm<10&&ele.tm==1?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==1?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==2?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==2?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==3?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==3?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==4?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==4?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==5?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==5?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==6?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==6?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==7?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==7?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==8?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==8?ele.tm:'')}}</td>
            <td>{{ele.tm<10&&ele.tm==9?'0'+ele.tm:(ele.tm.toString().substring(1,2)*1==9?ele.tm:'')}}</td>
            <td>{{ele.tm>=10?(ele.tm.toString().substring(1,2)*1==0?ele.tm:''):''}}</td>
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
            a_total:0,
            b_total:0,
            c_total:0,
            d_total:0,
            e_total:0,
            f_total:0,
            g_total:0,
            h_total:0,
            i_total:0,
            j_total:0,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var that = this;
            this.ball.forEach(ele => {
                var str = ele.tm<10?'0'+ele.tm:ele.tm;
                var ws = str.toString().substring(1,2)*1;
                switch (ws) {
                    case 1:
                        this.a_total++
                        break;
                    case 2:
                        this.b_total++;
                        break;
                    case 3:
                        this.c_total++
                        break;
                    case 4:
                        this.d_total++
                        break;
                    case 5:
                        this.e_total++
                        break;
                    case 6:
                        this.f_total++
                        break;
                    case 7:
                        this.g_total++
                        break;
                    case 8:
                        this.h_total++
                        break;
                    case 9:
                        this.i_total++
                        break;
                    case 0:
                        this.j_total++
                        break;
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
        width: 100%;
        border-spacing:0;
        tr{
            th{
                border-bottom:$border-color 1px solid;
                border-right:$border-color 1px solid;
                color:$subtitle-color;
                font-weight: 500;
                height: 80px;
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
