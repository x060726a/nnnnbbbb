<template>
    <div class="content">
        <div class="top">
            <div class="icon"></div>
            <p>充值申请已经提交</p>
        </div>
        <div class="block"><span>充值号码:</span><span>{{$route.query.phone}}</span></div>
        <div class="block"><span>充值金额:</span><span>{{$route.query.name}}</span></div>
        <div class="block last"><span>提交时间:</span><span>{{time}}</span></div>
        <div class="submit-btn" @click="$router.push({path:'/mythings',query:{active:1}})">确认</div>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    computed:{
        ...mapGetters(['isApp']),
        time(){
            if(this.$route.query.created_at){
                var d = new Date();
                d.setTime(this.$route.query.created_at*1000)
                var year = d.getFullYear();
                var m = d.getMonth() + 1;//月
                var day = d.getDate()<10?'0'+d.getDate():d.getDate();//日
                var h = d.getHours();//小时
                var min = d.getMinutes();
                return year+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day)+' '+(h<10?'0'+h:h)+':'+(min<10?'0'+min:min);
            }else{
                new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()
                var year = new Date().getFullYear()
                var mon = new Date().getMonth()*1+1<10?'0'+(new Date().getMonth()*1+1):new Date().getMonth()*1+1
                var day = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()
                var h =  new Date().getHours();//小时
                var min =  new Date().getMinutes();
                var str = year+'-'+mon+'-'+day
                return year+'-'+mon+'-'+day +' '+h+':'+min;
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    -webkit-overflow-scrolling:touch;
    overflow-y: scroll;
}
.top{
    border-bottom:$border-color 1px solid;
    background: #fff;
    padding-top:50px;
    padding-bottom:50px;
    p{
        margin-top:30px;
        font-size: 34px
    }
    .icon{
        width: 120px;
        height: 120px;
        background: $theme-color;
        border-radius: 50%;
        margin: auto;
        position: relative;
    }
    .icon:before{
        content: "";
        display: block;
        width:50px;
        height: 8px;
        border-radius: 12px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top:-4px;
    }
    .icon:after{
        content: "";
        display: block;
        width:50px;
        height: 8px;
        border-radius: 12px;
        background: #fff;
        position: absolute;
        top: 32px;
        left: 40px;
        transform: rotate(90deg);
    }
}
.block{
    background: #fff;
    padding-top:40px;
    font-size: 26px;
    padding-left:16px;
    padding-right:16px;
    overflow: hidden;
    span:first-child{
        float: left;
    }
    span:last-child{
        float: right;
    }
}
.last{
    padding-bottom:40px;
    margin-bottom:100px;
}
.block:last-child{
    padding-bottom:40px;
}
.submit-btn{
    background: $theme-color;
    color:$bg-color;
    font-size: 34px;
    width: 70%;
    height: 88px;
    line-height: 88px;
    border-radius: 10px;
    margin: 50px auto;
}
</style>
