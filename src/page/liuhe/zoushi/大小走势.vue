<template>
<div class="table-wrap">
    <table>
        <tr>
            <th rowspan="2" width="12%">期数</th>
            <th rowspan="2" width="12%">特码</th>
            <th colspan="3" width="25.3%">特码大小</th>
            <th colspan="3" width="25.3%">尾数大小</th>
            <th colspan="3" width="25.3%">合数大小</th>
        </tr>
        <tr class="first">
            <td>大</td>
            <td>小</td>
            <td>和</td>
            <td>大</td>
            <td>小</td>
            <td>大</td>
            <td>小</td>
            <td>大</td>
            <td>小</td>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue">{{tm_big}}</td>
            <td class="blue">{{tm_sma}}</td>
            <td class="blue">{{tm_he}}</td>
            <td class="blue">{{ws_big}}</td>
            <td class="blue">{{ws_sma}}</td>
            <td class="blue">{{tm_he}}</td>
            <td class="blue">{{hs_big}}</td>
            <td class="blue">{{hs_sma}}</td>
            <td class="blue">{{tm_he}}</td>
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

            <td>{{ele.tm<=24?'小':''}}</td>
            <td>{{(ele.tm<=48&&ele.tm>24)?'大':''}}</td>
            <td>{{ele.tm==49?'和':''}}</td>

            <td>{{ele.tm!=49?ele.tm<10?(ele.tm<=4?'':'大'):( (ele.tm.toString().substring(1,2)*1)<=4?'':'大'):''}}</td>
            <td>{{ele.tm!=49?ele.tm<10?(ele.tm<=4?'小':''):( (ele.tm.toString().substring(1,2)*1)<=4?'小':''):''}}</td>
            <td>{{ele.tm==49?'和':''}}</td>

            <td>{{ele.tm1=49?(ele.tm.toString().substring(0,1)*1+ele.tm.toString().substring(1,2)*1)>=7?'大':'':''}}</td>
            <td>{{ele.tm!=49?(ele.tm.toString().substring(0,1)*1+ele.tm.toString().substring(1,2)*1)<=6?'小':'':''}}</td>
            <td>{{ele.tm==49?'和':''}}</td>
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
            tm_big:0,
            tm_sma:0,

            ws_big:0,
            ws_sma:0,

            hs_big:0,
            hs_sma:0,

            tm_he:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var that = this;
            this.ball.forEach(ele => {
                if(ele.tm<=24){
                    this.tm_sma++;
                }
                if(ele.tm<=48&&ele.tm>=25){
                    this.tm_big++;
                }
                if(ele.tm==49){
                    this.tm_he++;
                }

                if(ele.tm<10){
                    if(ele.tm<=4){
                        this.ws_sma++;
                    }else{
                        this.ws_big++;
                    }
                }else{
                    if(ele.tm!=49){
                        var ts = ele.tm.toString().substring(0,1)
                        var ws = ele.tm.toString().substring(1,2)
                        if(ws<=4){
                            this.ws_sma++;
                        }else{
                            this.ws_big++;
                        }

                        if((ts*1+ws*1)>=7){
                            this.hs_big++
                        }else{
                            this.hs_sma++
                        }
                    }
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
