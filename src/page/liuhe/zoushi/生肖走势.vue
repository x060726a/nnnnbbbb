<template>
<div class="table-wrap">
    <table>
        <tr>
            <th width="12%">期数</th>
            <th width="12%">特码</th>
            <th width="6.2%" v-for="(val,idx,key) in ballpanel.ballpanel">{{idx}}</th>
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
            <td class="blue">{{k_total}}</td>
            <td class="blue">{{l_total}}</td>
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
            <td v-for="(val,idx,key) in ballpanel.ballpanel">{{idx==ele.sx.split(',')[6]?idx:''}}</td>
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
            k_total:0,
            l_total:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var that = this;
            this.ball.forEach(ele => {
                var res;
                for(var key in this.ballpanel.ballpanel){
                    if(this.ballpanel.ballpanel[key].indexOf(ele.tm*1)>-1){
                        res = key
                    }
                }
                switch (res) {
                    case '狗':
                        this.a_total++
                        break;
                    case '鸡':
                        this.b_total++;
                        break;
                    case '猴':
                        this.c_total++
                        break;
                    case '羊':
                        this.d_total++
                        break;
                    case '马':
                        this.e_total++
                        break;
                    case '蛇':
                        this.f_total++
                        break;
                    case '龙':
                        this.g_total++
                        break;
                    case '兔':
                        this.h_total++
                        break;
                    case '虎':
                        this.i_total++
                        break;
                    case '牛':
                        this.j_total++
                        break;
                    case '鼠':
                        this.k_total++
                        break;
                    case '猪':
                        this.l_total++
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
