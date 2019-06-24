<template>
<div class="content">
    <div class="title">{{componentName[currCom]}}</div>
    <div class="content-scroll">
        <div class="pad16"></div>
        <!-- <div class="issue">第001期至第{{issue}}期</div> -->
        <components :is="currCom"></components>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="bottom" class="my-pop">
        <div class="pop-title">
            选择公式
            <span @click="popupVisible=false" class="iconfont icon-close1"></span>
        </div>
        <div class="pop-select">
            <mt-picker :slots="slots" :valueKey="'name'" @change="onValuesChange"></mt-picker>
        </div>
        <div class="pop-comfir" @click="select()">确定</div>
    </mt-popup> -->
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            issue:JSON.parse(localStorage.getItem('HistoryOpen')).length,
            popupVisible:null,
            currCom:'',
            stepCom:'',
            offset:0,
            slots:[
                {
                    flex:1,
                    values:['头数走势','大小走势','家野走势','红蓝走势','特码走势','五行走势','特尾走势','生肖走势','单双走势','平特走势','遗漏','前后肖走势','半波走势','阴阳肖走势','男女肖走势','四季肖走势','门数走势','天地肖走势','单双笔走势','方位走势','色波走势','段数走势','吉凶肖走势','八卦肖走势']
                }
            ],
            componentName:{
                kjzs:'开奖走势',
                tszs:'头数走势',
                dxzs:'大小走势',
                jyzs:'家野走势',
                hlzs:'红蓝走势',
                tmzs:'特码走势',
                wxzs:'五行走势',
                twzs:'特尾走势',
                sxzs:'生肖走势',
                oddzs:'单双走势',
                ptzs:'平特走势',
                ylzs:'遗漏',
                qhxzs:'前后肖走势',
                bbzs:'半波走势',
                yyxzs:'阴阳肖走势',
                nnzs:'男女肖走势',
                sjxzs:'四季肖走势',
                mszs:'门数走势',
                tdxzs:'天地肖走势',
                dsbzs:'单双笔走势',
                fwxzs:'方位走势',
                dszs:'段数走势',
                jxxzs:'吉凶肖走势',
                bgxzs:'八卦肖走势',
            }
        }
    },
    created(){
        this.currCom = this.$route.params.id;
        console.log(this.currCom);
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        onValuesChange(picker,values){
            for(var key in this.componentName){
                if(this.componentName[key]==values[0]){
                    this.stepCom = key
                }
            }
        },
        select(){
            this.$router.push({path:'/main/zslist/cont/'+this.stepCom})
            this.currCom = this.stepCom;
            this.popupVisible = false;
        }
    },
    components:{
        tszs(){
            return {
                component:import('@/page/liuhe/zoushi/头数走势'),
            }
        },
        dxzs(){
            return {
                component:import('@/page/liuhe/zoushi/大小走势'),
            }
        },
        jyzs(){
            return {
                component:import('@/page/liuhe/zoushi/家野走势'),
            }
        },
        hlzs(){
            return {
                component:import('@/page/liuhe/zoushi/红蓝走势'),
            }
        },
        jyzs(){
            return {
                component:import('@/page/liuhe/zoushi/家野走势'),
            }
        },
        tmzs(){
            return {
                component:import('@/page/liuhe/zoushi/特码走势'),
            }
        },
        wxzs(){
            return {
                component:import('@/page/liuhe/zoushi/五行走势'),
            }
        },
        twzs(){
            return {
                component:import('@/page/liuhe/zoushi/特尾走势'),
            }
        },
        sxzs(){
            return {
                component:import('@/page/liuhe/zoushi/生肖走势'),
            }
        },
        oddzs(){
            return {
                component:import('@/page/liuhe/zoushi/单双走势'),
            }
        },
        ptzs(){
            return {
                component:import('@/page/liuhe/zoushi/平特走势'),
            }
        },
        ylzs(){
            return {
                component:import('@/page/liuhe/zoushi/遗漏'),
            }
        },
        qhxzs(){
            return {
                component:import('@/page/liuhe/zoushi/前后肖走势'),
            }
        },
        bbzs(){
            return {
                component:import('@/page/liuhe/zoushi/半波走势'),
            }
        },
        yyxzs(){
            return {
                component:import('@/page/liuhe/zoushi/阴阳肖走势'),
            }
        },
        nnzs(){
            return {
                component:import('@/page/liuhe/zoushi/男女肖走势'),
            }
        },
        sjxzs(){
            return {
                component:import('@/page/liuhe/zoushi/四季肖走势'),
            }
        },
        mszs(){
            return {
                component:import('@/page/liuhe/zoushi/门数走势'),
            }
        },
        tdxzs(){
            return {
                component:import('@/page/liuhe/zoushi/天地肖走势'),
            }
        },
        dsbzs(){
            return {
                component:import('@/page/liuhe/zoushi/单双笔走势'),
            }
        },
        fwxzs(){
            return {
                component:import('@/page/liuhe/zoushi/方位肖走势'),
            }
        },
        jxxzs(){
            return {
                component:import('@/page/liuhe/zoushi/吉凶肖走势'),
            }
        },
        bgxzs(){
            return {
                component:import('@/page/liuhe/zoushi/八卦肖走势'),
            }
        },
        dszs(){
            return {
                component:import('@/page/liuhe/zoushi/段数走势'),
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.issue{
    color:$text-table-color;
    padding-top:30px;
    padding-bottom:10px;
}
.title{
    position: relative;
    height: 80px;
    line-height: 80px;
    background: $bg-color;
    font-size: 30px;
    .right{
        width: 40px;
        display: block;
        position: absolute;
        z-index: 2;
        top: 0px;
        right: 20px;
        transform: rotate(180deg);
        font-size: 40px;
    }
}
.content{
    height: 100%;
    overflow: hidden;
}
.content-scroll{
    height: calc(100% - 80px);
    background: $bg-color;
    position: relative;
    background: #f2f2f2;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .pad16{
        height: 16px;
    }
    .spinner-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-18px;
        margin-top:-18px;
    }
}
.my-pop{
    width:100%;
}
.pop-title{
    font-size: 32px;
    line-height: 80px;
    position: relative;
    border-bottom:$border-color 1px solid;
    span{
        position: absolute;
        top: 20px;
        right:20px;
        width:40px;
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 40px;
        color: $subtitle-color;
    }
}
.pop-comfir{
    height: 80px;
    line-height: 80px;
    background: $theme-color;
    color:#fff;
    font-size: 32px;
}
</style>
