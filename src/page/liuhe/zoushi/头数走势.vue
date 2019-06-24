<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" width="12%">期数</th>
            <th rowspan="2" width="12%">特码</th>
            <th colspan="5" width="54%">特头走势</th>
            <th colspan="2" width="21%">特头单双</th>
        </tr>
        <tr class="first">
            <td>0头</td>
            <td>1头</td>
            <td>2头</td>
            <td>3头</td>
            <td>4头</td>
            <td>双头</td>
            <td>单头</td>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue">{{a_tou}}</td>
            <td class="blue">{{b_tou}}</td>
            <td class="blue">{{c_tou}}</td>
            <td class="blue">{{d_tou}}</td>
            <td class="blue">{{e_tou}}</td>
            <td class="blue">{{even_tou}}</td>
            <td class="blue">{{odd_tou}}</td>
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
            <td>{{ele.tm<10?0:''}}</td>
            <td>{{(ele.tm<20&&ele.tm>=10)?1:''}}</td>
            <td>{{(ele.tm<30&&ele.tm>=20)?2:''}}</td>
            <td>{{(ele.tm<40&&ele.tm>=30)?3:''}}</td>
            <td>{{(ele.tm<50&&ele.tm>=40)?4:''}}</td>
            <td>{{ele.tm<10?'双':(ele.tm.toString().substring(0,1)%2==0?'双':'')}}</td>
            <td>{{ele.tm>=10?(ele.tm.toString().substring(0,1)%2==1?'单':''):''}}</td>
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
            a_tou:0,
            b_tou:0,
            c_tou:0,
            d_tou:0,
            e_tou:0,
            odd_tou:0,
            even_tou:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                var str = ele.tm.toString().substring(0,1);
                if(ele.tm*1<10){
                    this.a_tou++;
                }
                if(str*1==1){
                    this.b_tou++;
                }
                if(str*1==2){
                    this.c_tou++;
                }
                if(str*1==3){
                    this.d_tou++;
                }
                if(str*1==4){
                    this.e_tou++;
                }
                if(str%2==0){
                    this.even_tou++;
                }
                if(str%2==1){
                    this.odd_tou++;
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
