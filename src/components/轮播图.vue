<template>
<div class="banner-wrap">
    <div class="lunbo-loading" v-if="imgList.length==0"><div class="spinner-wrap"><spinner type='ios' size='40px'></spinner></div></div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="ele in imgList">
                <a ref="copywx" v-if="ele.category==2" id="copywx" class="copywx"><img :src="ele.img" :goRouter="ele.link" :category="ele.category"></a>
                <a v-else><img :src="ele.img" :goRouter="ele.link" :category="ele.category"></a>
            </div>
        </div>
    </div>
    <div class="swiper-pagination my-pagination"></div>
</div>
</template>
<script>
export default {
    data(){
        return{
            imgList:[],
            Clipboard1:'',
        }
    },
    async mounted(){
        var res = await this.getBanner();
        var that = this
        var mySwiper = new Swiper ('.swiper-container', {
            centeredSlides:true,
            autoplay: true,
            delay:3000,
            loop: true, // 循环模式选项\
            pagination:{
                el: '.swiper-pagination',
            },
            on:{
                init:function(index){
                    var text
                    res.data.forEach(ele => {
                        if(ele.category==2){
                            text = ele.link
                        }
                    });
                    that.Clipboard1 = new ClipboardJS('.copywx',{
                        text:()=>{
                            return text;
                        }
                    });
                    that.Clipboard1.on('success',()=>{
                        that.$vux.confirm.show({
                            content:'微信'+text+'复制成功',
                            confirmText:'确认',
                            cancelText:false,
                            showCancelButton:false,
                            onConfirm () {
                                window.location.href = "weixin://"
                                return
                            }
                        })
                    })
                    that.Clipboard1.on('error',()=>{
                        that.$vux.confirm.show({
                            content:'微信'+text+'复制成功',
                            confirmText:'确认',
                            showCancelButton:false,
                            onConfirm () {
                                window.location.href = "weixin://"
                                return
                            }
                        })
                    })
                },
                click:function(e){
                    var category = e.target.getAttribute('category'),link = e.target.getAttribute('goRouter');
                    if(category*1==1){
                        window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin="+link+"&version=1&src_type=web&web_src=b.qq.com"
                    }
                    if(category*1==2){
                        that.Clipboard1.on('success',()=>{
                            that.$vux.confirm.show({
                                content:'微信'+link+'复制成功',
                                confirmText:'确认',
                                cancelText:false,
                                showCancelButton:false,
                                onConfirm () {
                                    window.location.href = "weixin://"
                                    return
                                }
                            })
                        })
                        that.Clipboard1.on('error',()=>{
                            that.$vux.confirm.show({
                                content:'微信'+link+'复制成功',
                                confirmText:'确认',
                                showCancelButton:false,
                                onConfirm () {
                                    window.location.href = "weixin://"
                                    return
                                }
                            })
                        })
                    }
                    if(category*1==3){
                        if(link==''){
                            return
                        }else{
                            window.location.href=link;
                        }
                    }
                }
            }
        })
    },
    created(){
        // this.imgList[0].url = this.$store.state.sysTem.quick_bet.value
        //this.getBanner();
    },
    methods:{
        //获取轮播图
        getBanner(){
            var that = this
            return new Promise(resolve=>{
                that.$http.get('/v1/home/banners').then(res=>{
                    if(res.code==0){
                        this.imgList = res.data
                        resolve(res)
                    }else{
                        resolve([])
                    }
                })
            })
        }
    }
}
</script>
<style>
.swiper-pagination-bullet{
    margin-right:10px;
    width:25px;
    height:25px;
}
.swiper-pagination-bullet:last-child{
    margin-right:0;
}
</style>

<style lang="scss" scoped>
.spinner-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-40px;
    margin-top:-40px;
}
.banner-wrap{
    position: relative;
}
.lunbo-loading{
    position: relative;
    height: 250px;
}
.swiper-slide{
    font-size: 0;
    height: 250px;
    a{
        height: 100%;
        display: block;
    }
    img{
        width:100%;
        height: 100%;
        object-fit: cover;
    }
}
.my-pagination{
    height:30px;
    width:140px;
    right:20px;
    bottom:10px;
}
</style>
