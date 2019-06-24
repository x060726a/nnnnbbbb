<template>
<div class="table-wrap">
    <table>
        <tr>
            <th width="25%">期数</th>
            <th width="15%">特码</th>
            <th colspan="3" width="20%">红</th>
            <th colspan="3" width="20%">蓝</th>
            <th colspan="3" width="20%">绿</th>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td colspan="3" class="blue">{{hong_total}}</td>
            <td colspan="3" class="blue">{{lan_total}}</td>
            <td colspan="3" class="blue">{{lv_total}}</td>
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

            <td colspan="3">{{ballpanel.ballcolor['红'].indexOf(ele.tm*1)>-1?'红':''}}</td>
            <td colspan="3">{{ballpanel.ballcolor['蓝'].indexOf(ele.tm*1)>-1?'蓝':''}}</td>
            <td colspan="3">{{ballpanel.ballcolor['绿'].indexOf(ele.tm*1)>-1?'绿':''}}</td>
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
            hong_total:0,
            lan_total:0,
            lv_total:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var that = this;
            this.ball.forEach(ele => {
                var step;
                for(var key in this.ballpanel.ballcolor){
                    if(this.ballpanel.ballcolor[key].indexOf(ele.tm*1)>-1){
                        step = key
                    }
                }
                if(step=='红'){
                    this.hong_total++
                }
                if(step=='蓝'){
                    this.lan_total++
                }
                if(step=='绿'){
                    this.lv_total++
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
        font-size: 24px;
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
