<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" width="5%">期数</th>
            <th rowspan="2" width="4%">特码</th>
            <th colspan="2" width="8%">乾（离）</th>
            <th colspan="2" width="8%">巽（坤）</th>
            <th colspan="1" width="3%">坎（兑）</th>
            <th colspan="2" width="8%">艮（乾）</th>
            <th colspan="1" width="3%">坤（坎）</th>
            <th colspan="2" width="8%">震（艮）</th>
            <th colspan="1" width="3%">离（震）</th>
            <th colspan="2" width="8%">兑（巽）</th>
        </tr>
        <tr class="first">
            <td v-for="(ele1,idx1) in yi">{{ele1}}</td>
            <td v-for="(ele2,idx2) in er">{{ele2}}</td>
            <td v-for="(ele3,idx3) in san">{{ele3}}</td>
            <td v-for="(ele4,idx4) in si">{{ele4}}</td>
            <td v-for="(ele5,idx5) in wu">{{ele5}}</td>
            <td v-for="(ele6,idx6) in liu">{{ele6}}</td>
            <td v-for="(ele7,idx7) in qi">{{ele7}}</td>
            <td v-for="(ele8,idx8) in ba">{{ele8}}</td>
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
            <td class="blue">{{m_total}}</td>
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
            <td v-for="ele1 in all">{{ele1==ele.sx.split(',')[6]?ele1:''}}</td>
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
            yi:['马','兔'],
            er:['羊','猴'],
            san:['鸡'],
            si:['狗','猪'],
            wu:['鼠'],
            liu:['牛','虎'],
            qi:['兔'],
            ba:['龙','蛇'],
            all:['马','兔','羊','猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇'],
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
            l_total:0,
            m_total:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                var sx = ''
                for(var key in this.ballpanel.ballpanel){
                    if(this.ballpanel.ballpanel[key].indexOf(ele.tm*1)>-1){
                        sx = key
                    }
                }
                switch (sx) {
                    case '马':
                        this.a_total++;
                        break;
                    case '兔':
                        this.b_total++;
                        break;
                    case '羊':
                        this.c_total++;
                        break;
                    case '猴':
                        this.d_total++;
                        break;
                    case '鸡':
                        this.e_total++;
                        break;
                    case '狗':
                        this.f_total++;
                        break;
                    case '猪':
                        this.g_total++;
                        break;
                    case '鼠':
                        this.h_total++;
                        break;
                    case '牛':
                        this.i_total++;
                        break;
                    case '虎':
                        this.j_total++;
                        break;
                    case '龙':
                        this.k_total++;
                        break;
                    case '蛇':
                        this.l_total++;
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
        border-spacing:0;
        background: #fff;
        width: 1200px;
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
