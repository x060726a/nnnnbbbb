<template>
    <div class="content">
        <div class="list-wrap">
            <div class="item">物品名称：{{$route.query.p_name}}</div>
            <div class="item">游戏网址：{{$route.query.partner_site}}<input ref="input1" type="text" id="linktext1" :value="$route.query.partner_site" /><span @click="goRouter" class="game-btn">进入游戏</span></div>
            <div class="item">订 &nbsp单&nbsp 号：{{$route.query.serial_id}}<input ref="input2" type="text" id="linktext2" :value="$route.query.serial_id" /><span  @click="copy2()" data-clipboard-target="#linktext2" ref="copylink2">复制</span></div>
            <div class="item">用 &nbsp户&nbsp 名：{{$route.query.username}}</div>
            <div class="item">登录密码：{{$route.query.password}}</div>
            <div class="item">取款密码：{{$route.query.coinpwd}}</div>
        </div>
        <div class="text">
            <p>使用规则：</p>
            <div class="item"><span>1、</span><p>现金券只限六友合作官网使用</p></div>
            <div class="item"><span>2、</span><p>现金券有效期为7天，请参考截止网址</p></div>
            <div class="item"><span>3、</span><p>其他相关条款请咨询合作网站</p></div>
            <div class="item"><span>4、</span><p>在交易中发生违反六友相关监管规定、欺诈、套利等行为六友有权取消所有积分兑换</p></div>
            <div class="item"><span>5、</span><p>六友拥有本次活动的最终解释权，如有疑问可邮件咨询：qingpengda55@163.com或QQ：65530941</p></div>
        </div>
        <a class="kefu" :href="sysTem&&sysTem.online_service.value">联系客服</a>
    </div>
</template>
<script>
import { mapGetters } from "Vuex";
export default {
    created(){
        this.$nextTick(()=>{
            this.copyFun2 = new ClipboardJS(this.$refs.copylink2);
        })
    },
    computed:{
        ...mapGetters(['sysTem'])
    },
    methods:{
        // copy1(){
        //     if(this.res==''){
        //         this.$vux.toast.text('请稍后','middle')
        //         return;
        //     }
        //     this.copyFun1.on('success',()=>{
        //         this.$vux.confirm.show({
        //             content:'复制成功',
        //         })
        //     })
        //     this.copyFun1.on('error',()=>{
        //         this.$refs.input1.style.display = 'none'
        //         this.$vux.toast.text('请长按链接复制！','middle')
        //     })
        // },
        copy2(){
            if(this.res==''){
                this.$vux.toast.text('请稍后','middle')
                return;
            }
            this.copyFun2.on('success',()=>{
                this.$vux.confirm.show({
                    content:'复制成功',
                })
            })
            this.copyFun2.on('error',()=>{
                this.$refs.input2.style.display = 'none'
                this.$vux.toast.text('请长按链接复制！','middle')
            })
        },
        goRouter(){
            window.location.href=this.$route.query.partner_site
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    overflow-y: scroll;
    .list-wrap{
        background: #fff;
        margin-bottom:20px;
        .item{
            font-size: 26px;
            color:#333;
            line-height: 80px;
            padding-left:16px;
            text-align: left;
            border-bottom:1px solid $border-color;
            position: relative;
            user-select: auto;
            span{
                position: absolute;
                right:14px;
                top: 0;
                height: 80px;
                line-height: 80px;
                width:70px;
                color:$theme-color;
                cursor: pointer;
            }
            span.game-btn{
                width:110px;
                right:26px;
            }
            input{
                position: absolute;
                top: 0px;
                left: 0;
                opacity: 0;
                z-index: -10;
            }
        }
    }
    .text{
        padding:16px;
        background: #fff;
        font-size: 24px;
        color:#999;
        >p{
            line-height: 28px;
            text-align: left;
            margin-bottom:10px;
        }
        .item{
            overflow: hidden;
            span,p{
                float: left;
            }
            span{
                display: block;
                width:30px;
            }
            p{
                line-height: 40px;
                width:calc(100% - 30px);
                text-align: justify;
                word-break: normal;
            }
        }
    }
    .kefu{
        display: block;
        background: $theme-color;
        color:$bg-color;
        font-size: 34px;
        width: 75%;
        height: 88px;
        line-height: 88px;
        border-radius: 8px;
        margin: 100px auto 50px auto;
    }
}
</style>
