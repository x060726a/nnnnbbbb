<template>
<div class="content">
    <div class="first">
        <div class="empty-pad"></div>
        <div class="eweima">
            <div class="spinner-wrap" v-show="isLoading"><spinner type='ios' size='40px'></spinner></div>
            <x-img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+res.pLink" @on-success="success" @on-error="error"></x-img>
            <div v-show="loadfall" class="loadfall">加载失败</div>
        </div>
        <span class="link-text">
            <span>推广链接:</span>
            <span class="link">{{res.pLink}}</span>
            <span @click="copy()" class="copydom" data-clipboard-action="copy">复制</span>
        </span>
        <p>您已成功推荐<span>{{res.pPeople}}</span>人，累计获得金币<span>{{res.pCoin}}</span>，{{res.pCoin==0?'':'已添加到个人账户'}}</p>
    </div>
    <div class="text">
        <p>兑换规则:</p>
        <p><span>1.</span><span>每推广一人获取金币1000</span></p>
        <p><span>2.</span><span>每人每日获取金币最高为3000</span></p>
        <p><span>3.</span><span>六友拥有本次活动的最终解释权，如有疑问可咨询在线客服或QQ65530941</span></p>
    </div>
    <div class="copy-btn-wrap"><div class="submit-btn copydom" @click="copy()" data-clipboard-action="copy">复制链接</div></div>
</div>
</template>
<script>
import { XImg } from 'vux'
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            host:null,
            res:'',
            copyFun:'',
            copyFun1:'',
            isLoading:true,
            loadfall:false
        }
    },
    created(){
        this.getLink();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        success(src,ele){
            this.isLoading = false;
        },
        error(src,ele,msg){
            this.loadfall = true
        },
        copy(){
            var that = this
            if(this.res==''){
                this.$vux.toast.text('请稍后','middle')
                return;
            }
            var clipboard = new ClipboardJS('.copydom',{
                text:function(){
                    return that.res.pLink
                }
            });
            clipboard.on('success',()=>{
                this.$vux.confirm.show({
                    content:'复制成功',
                })
            })
            clipboard.on('error',()=>{
                this.$vux.confirm.show({
                    content:'复制成功',
                })
            })
        },
        getLink(){
            this.host = window.location.host;
            var postData = this.$qs.stringify({
                link:this.host+'/reg'
            })
            this.$http.post('/v1/user/promoted',postData).then(res=>{
                if(res.code==0){
                    this.res = res.data;
                }
            })
        },
    },
    components:{
        XImg
    }
}
</script>
<style lang="scss" scoped>
.content{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    .first{
        background: #fff;
        padding-bottom:30px;
        .empty-pad{
            padding-top:150px;
        }
        .eweima{
            width:320px;
            height: 320px;
            margin: 0 auto 30px;
            background: #fff;
            padding:16px;
            border:$border-color 1px solid;
            font-size: 0;
            position: relative;
            .spinner-wrap{
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left:-40px;
                margin-top:-40px;
            }
            .loadfall{
                width:100%;
                height: 100%;
                line-height: 300px;
                font-size: 30px;
            }
            img{
                width: 100%;
                height: 100%;
            }
            img[lazy=loading] {
                object-fit: none!important;
                margin: auto;
            }
        }
        .link-text{
            margin: auto;
            border:$border-color 1px solid;
            line-height: 70px;
            border-radius: 100px;
            font-size: 26px;
            color:#666;
            background: #fff;
            overflow: hidden;
            padding:20px 30px;
            position: relative;
            span:first-child{
                font-size: 28px;
            }
            span.link{
                font-size: 26px;
                margin-left:15px;
                margin-right:15px;
                color:#666;
            }
            span:last-child{
                font-size: 32px;
                color:$theme-color;
            }
            input{
                position: absolute;
                top: -10px;
                left: 0;
                opacity: 0;
                z-index: -10;
            }
        }
        >p{
            padding-top:30px;
            font-size: 26px;
            color:#999;
            text-align: center;
            line-height: 26px;
            margin-bottom:30px;
            span{
                color:$theme-color;
            }
        }
    }
    .text{
        margin-top:20px;
        background: $bg-color;
        padding:16px;
        p{
            text-align: justify;
            font-size: 26px;
            color: $subtitle-color;
            padding-bottom:8px;
            display: table;
            >span{
                display: table-cell;
                text-align: justify;
            }
            >span:first-child{
                width:40px;
                display: table-cell;
            }
        }
        p:first-child{
            padding-bottom:10px;
            line-height: 27px;
        }
        p:last-child{
            padding-bottom:0;
        }
    }
    .copy-btn-wrap{
        padding-top:70px;
        .submit-btn{
            background: $theme-color;
            color:$bg-color;
            font-size: 34px;
            width: 75%;
            height: 88px;
            line-height: 88px;
            border-radius: 10px;
            margin: auto;
        }
    }
}
</style>
