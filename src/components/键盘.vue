<template>
<div class="bottom-input" ref="keypo">
    <div class="keypo">
        <div class="line"><span @click="touchKey(1)">1</span><span @click="touchKey(2)">2</span><span @click="touchKey(3)">3</span></div>
        <div class="line"><span @click="touchKey(4)">4</span><span @click="touchKey(5)">5</span><span @click="touchKey(6)">6</span></div>
        <div class="line"><span @click="touchKey(7)">7</span><span @click="touchKey(8)">8</span><span @click="touchKey(9)">9</span></div>
        <div class="line"><span class="back" @click="back">返回</span><span @click="touchKey(0)">0</span><span class="delete" @click="deleteKey()"><i class="iconfont icon-close"></i></span></div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            keypoinput:'请输入金额',
            isbetPending:false
        }
    },
    methods:{
        touchKey(key){
            var that = this;
            if(that.$store.state.keypoNum=='请输入金额'){
                that.$store.commit('keypoNum',key);
            }else{
                that.$store.commit('keypoNum',parseInt(that.$store.state.keypoNum + '' + key));
            }
        },
        back(){
            this.$store.commit('lotteryPancel',!this.$store.state.lotteryPancel);
        },
        deleteKey(){
            var that = this;
            if(that.$store.state.keypoNum == "请输入金额") return;
            var arr = that.$store.state.keypoNum.toString().split('');
            arr.pop();
            // that.keypoinput = arr.join('');
            that.$store.commit('keypoNum',arr.join(''));
            if(that.$store.state.keypoNum==""){
                that.$store.commit('keypoNum','请输入金额');
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.down-in-enter{
    bottom:-100%!important;
}
.down-in-enter-to,.down-in-leave{
    bottom:0
}
.down-in-leave-to{
    bottom:-100%;
}
.active{
    bottom: 0!important;
}
.keypo-mask{
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 10;
    width: 100%;
}
.bottom-input{
    width: 100vw;
    z-index: 3;
    background: #fff;
    .keypo{
        .line{
            display: flex;
            border-bottom:#535353 1px solid;
            span{
                flex: 1;
                line-height: 90px;
                border-right:#535353 1px solid;
                background: #868686;
                color:#fff;
                font-size: 36px;
            }
            span:last-child{
                border-right:none;
            }
            span.back{
                font-size: 32px;
            }
            span.back,span.delete{
                background: #535353;
            }
            span.delete{
                i{
                    display: block;
                    height: 90px;
                    margin: auto;
                    font-size: 45px;
                }
            }
        }
        .line:last-child{
            border-bottom:none;
        }
    }
}
</style>
