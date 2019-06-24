<template>
<div class="table-wrap">
    <table>
        <tr>
            <th width="12%">期数</th>
            <th width="12%">特码</th>
            <th width="15.2%">金</th>
            <th width="15.2%">木</th>
            <th width="15.2%">水</th>
            <th width="15.2%">火</th>
            <th width="15.2%">土</th>
        </tr>
        <tr>
            <td colspan="2">次数</td>
            <td class="blue">{{jin_total}}</td>
            <td class="blue">{{mu_total}}</td>
            <td class="blue">{{shui_total}}</td>
            <td class="blue">{{huo_total}}</td>
            <td class="blue">{{tu_total}}</td>
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
            <td>{{jin.indexOf(ele.tm)>-1?'金':''}}</td>
            <td>{{mu.indexOf(ele.tm)>-1?'木':''}}</td>
            <td>{{shui.indexOf(ele.tm)>-1?'水':''}}</td>
            <td>{{huo.indexOf(ele.tm)>-1?'火':''}}</td>
            <td>{{tu.indexOf(ele.tm)>-1?'土':''}}</td>
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
            jin:[1,2,15,16,23,24,31,32,45,46],
            mu:[5,6,13,14,27,28,35,36,43,44],
            shui:[3,4,11,12,19,20,33,34,41,42,49],
            huo:[7,8,21,22,29,30,37,38],
            tu:[9,10,17,18,25,26,39,40,47,48],
            jin_total:0,
            mu_total:0,
            shui_total:0,
            huo_total:0,
            tu_total:0,
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var that = this;
            this.ball.forEach(ele => {
                if(this.jin.indexOf(ele.tm)>-1){
                    this.jin_total++;
                }
                if(this.mu.indexOf(ele.tm)>-1){
                    this.mu_total++;
                }
                if(this.shui.indexOf(ele.tm)>-1){
                    this.shui_total++;
                }
                if(this.huo.indexOf(ele.tm)>-1){
                    this.huo_total++;
                }
                if(this.tu.indexOf(ele.tm)>-1){
                    this.tu_total++;
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
