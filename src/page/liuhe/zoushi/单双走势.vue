<template>
<div class="table-wrap">
    <table>
        <tr>
            <th>期数</th>
            <th width="11.5%">特码</th>
            <th width="11.5%">单</th>
            <th width="11.5%">双</th>
            <th width="11.5%">头单</th>
            <th width="11.5%">头双</th>
            <th width="11.5%">合单</th>
            <th width="11.5%">合双</th>
        </tr>
        <tr>
            <th colspan="2">次数</th>
            <th class="blue">{{odd}}</th>
            <th class="blue">{{even}}</th>
            <th class="blue">{{hodd}}</th>
            <th class="blue">{{heven}}</th>
            <th class="blue">{{allodd}}</th>
            <th class="blue">{{alleven}}</th>
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
            <td>{{ele.tm%2==1?'单':''}}</td>
            <td>{{ele.tm%2==0?'双':''}}</td>
            <td>{{ele.tm<10?'':(ele.tm.toString().substring(0,1)%2==1?'单':'')}}</td>
            <td>{{ele.tm<10?'双':(ele.tm.toString().substring(0,1)%2==0?'双':'')}}</td>
            <td>{{he_odd.indexOf(ele.tm*1)>-1?'单':''}}</td>
            <td>{{he_even.indexOf(ele.tm*1)>-1?'双':''}}</td>
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
            odd:0,
            even:0,
            hodd:0,
            heven:0,
            allodd:0,
            alleven:0,
            he_odd:[1,3,5,7,9,10,12,14,16,18,21,23,25,27,29,30,32,34,36,38,41,43,45,47,49],
            he_even:[2,4,6,8,11,13,15,17,19,20,22,24,26,28,31,33,35,37,39,40,42,44,46,48],
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.ball.forEach(ele => {
                if(ele.tm<10){
                    this.heven +=1;
                    if(ele.tm%2==0){
                        this.even +=1;
                        this.alleven +=1;
                    }else{
                        this.odd +=1;
                        this.allodd +=1;
                    }

                }else{
                    var str1 = ele.tm.toString().substring(0,1);
                    var str2 = ele.tm.toString().substring(1,2);
                    var str = str1*1 + str2*1
                    //大小
                    if(ele.tm%2==0){
                        this.odd += 1;
                    }else{
                        this.even +=1;
                    }

                    if(str1%2==0){
                        this.hodd +=1;
                    }else{
                        this.heven +=1;
                    }
                    //合数
                    if(str%2==0){
                        this.allodd +=1;
                    }else{
                        this.alleven +=1;
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
            th.blue{
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
