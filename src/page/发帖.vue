<template>
<div class="sendcont-wrap">
    <div class="tab">
        <span  @click="$store.commit('headerActive',0)" :class="{active:$store.state.headerActive==0}">快速发帖</span>
        <span  @click="$store.commit('headerActive',1)" :class="{active:$store.state.headerActive==1}">常规发帖</span>
        <div class="line" :class="{
                'ac1':$store.state.headerActive==0,
                'ac2':$store.state.headerActive==1}"
        ></div>
    </div>
    <div class="sendcont-one" v-if="headerActive==0">
        <div class="hackpad"></div>
        <FASTSEND></FASTSEND>
    </div>
    <div class="sendcont-two" v-if="headerActive==1">
        <div class="hackpad"></div>
        <REGULAR></REGULAR>
    </div>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'Vuex'
export default {
    data() {
        return {
            title:'',
            isActive: true,
            isShow:false
        }
    },
    created(){
        this.$store.commit('headerActive',0);
        this.getNextIssue();
    },
    methods:{
        ...mapActions(['getNextIssue','chooseBall']),
        back(){
            this.$router.go(-1);
        },
        custom(){
            if (this.isActive) {
                this.isShow = true;
                this.isActive = false;
            }
        },
        cancel() {
            if (!this.isActive) {
                this.isShow = false;
                this.isActive = true;
            }
        }
    },
    computed:{
        ...mapGetters(['headerActive','isApp']),
        ...mapGetters(['routerStatus','headerActive','isActiveToday','isApp'])
    },
    components:{
        'FASTSEND'(){
            return {
                component:import('@/components/快速发帖'),
            }
        },
        'REGULAR'(){
            return {
                component:import('@/components/常规发帖'),
            }
        }
    },
    destroyed(){
        this.$store.commit('headerActive',1);
    }
}
</script>
<style lang="scss" scoped>
.sendcont-wrap{
    height: 100%;
    padding-bottom:0;
}
.sendcont-header{
    width: 100%;
    height: $top-height;
    background: $bg-color;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 1;
    border-bottom:$border-color 1px solid;
    .back{
        position: absolute;
        top: 17px;
        left:10px;
        font-size: 24px;
        >i{
            font-size: 26px;
        }
    }
    .sendcont-tab{
        padding-top:20px;
        >span{
            display: inline-block;
            padding-left:10px;
            padding-right:10px;
            color:#999;
        }
        .active{
            color:#000;
            position: relative;
        }
        .active::before{
            content:'';
            display: block;
            position: absolute;
            top: 27px;
            left: 29px;
            width: 25px;
            height: 2px;
            background: #000;
            border-radius: 2px;
            transition: all .2s;
        }
    }
}
.sendcont-one,.sendcont-two{
    height: calc(100% - 68px);
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    background: #fff;
    .write-panel,.regular-panel{
        padding-left:16px;
        padding-right:16px;
    }
}
.sendcont-two{
    min-height: calc(100vh - (32px + #{$top-height}))
}
.title {
    height: 76px;
    background: #fff;
    font-size: 30px;
    display: flex;
    >span {
        line-height: 76px;
        &.title1 {
            flex: 1;
            display: inline;
            text-align: left;            
            color: #000;
            padding-left: 16px;
        }
        &.custom {
            flex: 1;
            text-align: right;
            padding-right: 13px;
        }
        &.cancel {
            flex: 1;
            color: #999;
           text-align: right;
            padding-right: 13px;
        }
    }
    .inp {
            padding-left:16px; 
            width: 80%;
        }
} 
.tab{
    height: 68px;
    line-height: 68px;
    background: #fff;
    position: relative;
    display: flex;
    span{
        flex: 1;
        display: block;
        color:#000;
        margin-right:50px;
        font-size: 34px;
    }
    span:last-child{
        margin-right:0px;
    }
    span.active {
        position: relative;
        color: $theme-color;
    }
    .line{
        position: absolute;
        left: (calc(10px+(100px) / 2));
        display: block;
        width: 100px;
        height: 5px;
        background: $theme-color;
        bottom:0px;
        transition: all .5s ease;
    }
    .ac1{
        transform: translateX(calc((100px) / 2));
    }
    .ac2{
        transform: translateX(calc(50vw + (100px) / 2));
    }
}
.hackpad {
    height: 20px;
    background: #f2f2f2;
}
</style>
