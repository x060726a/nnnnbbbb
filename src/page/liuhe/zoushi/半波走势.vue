<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" width="12%">期数</th>
            <th rowspan="2" width="12%">特码</th>
            <th colspan="3" width="32%">色波</th>
            <th colspan="2" width="22%">特单双</th>
            <th colspan="2" width="22%">特大小</th>
        </tr>
        <tr class="first">
            <td>红</td>
            <td>蓝</td>
            <td>绿</td>
            <td>单</td>
            <td>双</td>
            <td>大</td>
            <td>小</td>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue"></td>
            <td class="blue"></td>
            <td class="blue"></td>
            <td class="blue"></td>
            <td class="blue"></td>
            <td class="blue"></td>
            <td class="blue"></td>
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
            <td>{{ballpanel.ballcolor['红'].indexOf(ele.tm*1)>-1?'红':''}}</td>
            <td>{{ballpanel.ballcolor['蓝'].indexOf(ele.tm*1)>-1?'蓝':''}}</td>
            <td>{{ballpanel.ballcolor['绿'].indexOf(ele.tm*1)>-1?'绿':''}}</td>
            <td>{{ele.tm%2==1?'单':''}}</td>
            <td>{{ele.tm%2==0?'双':''}}</td>
            <td>{{ele.tm*1>=25&&ele.tm*1<=48?'大':''}}</td>
            <td>{{ele.tm*1<=24?'小':''}}</td>
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
            jiaqin:['鼠','牛','虎','兔','龙','蛇'],
            yeshou:['马','羊','猴','鸡','狗','猪'],
            a_total:0,
            b_total:0,
            c_total:0,
            d_total:0,
            e_total:0,
            f_total:0,
            g_total:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                var color;
                for(var key in this.ballpanel.ballcolor){
                    if(this.ballpanel.ballcolor[key].indexOf(ele.tm*1)>-1){
                        color = key
                    }
                }
                switch (color) {
                    case '红':
                        this.a_total++;
                        break;
                    case '蓝':
                        this.b_total++;
                        break;
                    case '绿':
                        this.c_total++;
                        break;
                }
                if(ele.tm*1%2==1){
                    this.d_total++
                }
                if(ele.tm*1%2==0){
                    this.e_total++
                }
                if(ele.tm*1<=48&&ele.tm>=25){
                    this.f_total++
                }
                if(ele.tm*1<=24){
                    this.g_total++
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
