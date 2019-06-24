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
            <td v-for="(ele1,idx1) in yilouArr" :class="{active:(ele.tm*1)-1==idx1}">{{ele1[ele.qihao.substring(4,7)*1-1]<10?'0'+ele1[ele.qihao.substring(4,7)*1-1]:ele1[ele.qihao.substring(4,7)*1-1]}}</td>
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
            yilouArr:null
        }
    },
    created(){
        this.yilou();
    },
    methods:{
        async yilou(){
            this.yilouArr = await this.matchYilou();
            console.log(this.yilouArr);
        },
        matchYilou(res){
            var bigArr = [];
            var len = 0;
            while (len<49) {
                var smaArr = [];
                this.ball.forEach((ele,idx) => {
                    var strlen = ele.qihao.length;
                    var str = ele.qihao.substring(4,strlen)
                    if(len==ele.tm*1-1){
                        smaArr[str*1-1] = ele.tm*1
                    }else{
                        smaArr[str*1-1] = 0;
                    }
                });
                bigArr.push(smaArr);
                len++
            }
            bigArr.forEach(ele=>{
                var step = 0
                ele.forEach((ele1,idx1)=>{
                    if(ele[idx1]==0){
                        step ++
                        ele[idx1] = step
                    }else{
                        step = 0
                    }
                })
            })
            return new Promise(resolve=>{
                resolve(bigArr)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.table-wrap{
    background: #fff;
    overflow-x: scroll;
    table{
        border-spacing:0;
        width: 3550px;
        tr{
            th{
                border-bottom:$border-color 1px solid;
                border-right:$border-color 1px solid;
                color:$subtitle-color;
                font-weight: 500;
                height: 80px;
                width: 50px;
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
