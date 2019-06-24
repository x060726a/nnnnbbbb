<template>
    <section class="expertInfo">
        <div class="codeList">
            <p v-for="res in last5Record">
                {{res.qihao.toString().slice(4)}}：赛马会三码中特 【<strong><i v-if="res.codeList[0].length < 2">0</i>{{res.codeList[0]}} - <i v-if="res.codeList[1].length < 2">0</i>{{res.codeList[1]}} - <i v-if="res.codeList[2].length < 2">0</i>{{res.codeList[2]}}</strong>】一
                <span>开<i v-if="res.tm.toString().length < 2">0</i>{{res.tm}}</span> 准
            </p>
            <p>
               {{NextQihao.toString().slice(4)}}：赛马会三码中特 【<span class="sp">添加微信已公开</span>】
            </p>
        </div>
        <p class="p-text">
            <i></i>点击下方微信二维码，添加专家微信<i class="ir"></i>
        </p>
        <p class="pt sp">获取免费精准资料</p>
        <!-- <a class="ig"><img :src="weichat_img" alt="专家微信" @click="openWe()" /></a> -->
        <a class="ig"><img :src="weichat_img" alt="专家微信" @click="openWe()" /></a>
        <p class="pt">专业六合解析团队</p>
        <p class="pt sp">独创解料公式准确率高达90%</p>
    </section>
</template>

<script>
    export default {
        name: "expertInfo",
        data () {
            return {
                last5Record: [], // 期数列表
                weichat_img: '', // 微信二维码图片
                NextQihao: '', // 最新一期
                weichat: '' // 微信号
        }
        },
        methods: {
            getInfo () {
                this.$vux.loading.show({text: '加载中'})
                this.$http.get('/v1/home/get-info').then(res => {
                    this.$vux.loading.hide()
                    if (res.code != 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    res.data.last5Record.forEach(res => {
                        res.codeList = res.forecast.split(',')
                    })
                    this.last5Record = res.data.last5Record
                    this.weichat_img = res.data.weichat_img
                    this.NextQihao = res.data.NextQihao
                    this.weichat = res.data.weichat
                })
            },
            openWe () {
                this.Clipboard.on('success',()=>{
                    this.$vux.confirm.show({
                        content:'请打开微信添加'+ this.weichat,
                        confirmText:'确认',
                        onConfirm () {
                            window.location.href = "weixin://"
                            return
                        }
                    })
                })
                this.Clipboard.on('error',()=>{
                    this.$vux.confirm.show({
                        content:'请打开微信添加'+ this.weichat,
                        confirmText:'确认',
                        onConfirm () {
                            window.location.href = "weixin://"
                            return
                        }
                    })
                })
            }
        },
        mounted () {
            this.$nextTick(()=>{
                this.Clipboard = new ClipboardJS('.ig',{
                    text:()=>{
                        return this.weichat
                    }
                });
            })
        },
        created () {
            this.getInfo()
        }
    }
</script>

<style scoped lang="scss">
    .expertInfo {
        width: 100%; height: 100%; padding-top: 165px; background: url('/static/images/banner/expertBg.png') no-repeat center; background-size: 100% 100%; box-sizing: border-box;
        .codeList {
            width: 85%; margin: 0 auto; padding: 36px 32px; background: white; border-radius: 6px;
            p {
                height: 30px; color: #000; font-size: 28px; line-height: 30px; text-align: left; margin-bottom: 25px;
                strong {
                    display: inline-block; width: 160px; color: #006bff; text-align: center;
                }
                span { color: #006bff; }
                .sp {
                    padding: 0 0 0 11px; letter-spacing: 8px; text-align: center;
                }
            }
            p:last-child { margin: 0; }
        }
        .p-text {
            width: 92%; height: 28px; margin: 30px auto 0; color: white; font-size: 28px; text-align: center; line-height: 28px;
            i {
                float: left; width: 80px; margin-top: 13px; height: 1px; background: white;
            }
            .ir { float: right; }
        }
        .pt {
            color: white; font-size: 28px; line-height: 28px;
        }
        .sp { margin-top: 10px; }
        .ig {
            display: block; width: 262px; height: 262px; margin: 20px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
