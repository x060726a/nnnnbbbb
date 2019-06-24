<template>
<div class="table-wrap">
    <table>
        <tr>
            <th>期数</th>
            <th>特码</th>
            <th v-for="idx in 49">{{idx}}</th>
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
            <td v-for="idx1 in 49" :class="{active:ele.tm*1==idx1}">{{idx1}}</td>
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
        }
    },
}
</script>
<style lang="scss" scoped>
.table-wrap{
    background: #fff;
    overflow-x: scroll;
    table{
        border-spacing:0;
        width: 3650px;
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
                color: #e8e2e2;
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
            td:first-child{
                color:$subtitle-color
            }
        }
        tr.hong{
            td.active{
                color:#da460c;
            }
        }
        tr.lan{
            td.active{
                color:#3a79e4;
            }
        }
        tr.lv{
            td.active{
                color:#4db67e;
            }
        }
    }
}
</style>
