<template>
    <section class="loveType">
        <span class="cancel" @click="$router.push({path:'/main'})">取消</span>
        <div class="redpack-mask" v-if="redPop">
            <div class="redpack-pancel" ref="redpack">
                <span @click="closeRedPack()"></span>
            </div>
        </div>
        <div class="content">
            <p class="title">请选择你喜欢的资料类型</p>
            <p class="more">可多选，根据选择为你提供精准资料</p>
            <div class="list clearfix">
                <span v-for="(item, key) in cateType" :key="key" :class="{sr: item.id % 3 == 0, betSelected: item.selected}" @click="betCheck(item)">{{item.name}}</span>
            </div>
            <span v-if="ids.length > 0" class="subType" @click="subInfo">已选择{{ids.length}}个，立即开启</span>
            <span v-else class="subType" @click="subInfo">立即开启</span>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'Vuex'
    export default {
        name: "loveType",
        data () {
            return {
                cateType: [],
                redPop:false,
                ids: []
            }
        },
        methods: {
            //打开注册红包弹窗
            redPackPop(){
                var that = this
                this.redPop = true;
                setTimeout(()=>{
                    that.$refs.redpack.className = "redpack-pancel active"
                },50)
            },
            //关闭红包弹窗
            closeRedPack(){
                var that = this
                this.$refs.redpack.className = "redpack-pancel"
                setTimeout(()=>{
                    that.redPop = false;
                },200)
            },
            // 获取类型
            getInfo () {
                if (JSON.parse(localStorage.getItem('sysTem'))) {
                    // console.log(1)
                    let cate = JSON.parse(localStorage.getItem('sysTem')).cate
                    Object.keys(cate).forEach(i => {
                        this.cateType.push({
                            id: Number(i),
                            name: cate[i],
                            selected: false
                        })
                    })
                } else {
                    // console.log(2)
                    this.$http.get('/v1/home/settings').then(res=>{
                        if (res.code != 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                        let cate = res.data.records.cate
                        Object.keys(cate).forEach(i => {
                            this.cateType.push({
                                id: Number(i),
                                name: cate[i],
                                selected: false
                            })
                        })
                        localStorage.setItem('sysTem',JSON.stringify(res.data.records))
                    })
                }
                return new Promise(resolve=>{
                    resolve('done')
                })
            },
            betCheck (res) {
                res.selected = !res.selected
                if (res.selected) {
                    this.ids.push(res.id)
                } else {
                    this.ids.forEach((item, i) => {
                        if (item == res.id) this.ids.splice(i, 1)
                    })
                }
            },
            subInfo () {
                if (this.ids.length < 1) return this.$vux.toast.text('至少选择一个喜欢的类型', 'middle')
                let postData = this.$qs.stringify({
                    ids: this.ids.join(',')
                })
                this.$http.post('/v1/user/add-user-catery', postData).then(res => {
                    if (res.code != 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.$vux.toast.text('添加成功!', 'middle')
                    setTimeout(() => {
                        this.$router.push({path:'/main'})
                    }, 100)
                })
            },
            cancel () {
                let postData = this.$qs.stringify({
                    ids: 0
                })
                this.$http.post('/v1/user/add-user-catery', postData).then(res => {
                    if (res.code != 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.$vux.toast.text('已取消', 'middle')
                    setTimeout(() => {
                        this.$router.push({path:'/main'})
                    }, 100)
                })
            }
        },
        activated(){
            var regHongbao = JSON.parse(localStorage.getItem('regHongbao'))
            if(regHongbao*1==1){
                this.redPackPop()
                localStorage.setItem('regHongbao',0)
            }
        },
        async created () {
            var that = this
            if(this.user.nickname===this.user.username && this.user!=''){
                this.$vux.confirm.show({
                    content:`<p>请完善个人资料填写用户昵称</p><div class="c-i-i"><input type="text" placeholder="请输入昵称" id="nb"/></div>`,
                    showCancelButton:false,
                    closeOnConfirm:false,
                    onConfirm:()=>{
                        var postData = that.$qs.stringify({
                            nickname:document.getElementById('nb').value
                        })
                        if(document.getElementById('nb').value!=''){
                            that.$http.post('/v1/user/profile-update',postData).then(res=>{
                                if(res.code==0){
                                    that.$store.commit("user", res.data);
                                    var user = JSON.stringify(res.data);
                                    localStorage.setItem("user", user);
                                    that.$vux.toast.text('更新成功','middle')
                                    this.$vux.confirm.hide()
                                }else{
                                    that.$vux.toast.text(res.msg_zh,'middle')
                                }
                            })
                        }
                    }
                })
            }
            var res = await this.getInfo()
            localStorage.getItem('user_category').split(',').forEach(idx=>{
                this.cateType[idx*1-1<0?0:idx*1-1].selected = true
                this.ids.push(idx*1==0?1:idx*1)
            })
            let regHongbao = JSON.parse(localStorage.getItem('regHongbao'))
            if(regHongbao*1==1){
                this.redPackPop()
                localStorage.setItem('regHongbao',0)
            }
            // let cate = JSON.parse(localStorage.getItem('sysTem')).cate
            // Object.keys(cate).forEach(i => {
            //     this.cateType.push({
            //         id: Number(i),
            //         name: cate[i],
            //         selected: false
            //     })
            // })
        },
        computed:{
            ...mapState(['user'])
        },
    }
</script>

<style scoped lang="scss">
    .loveType {
        .cancel {
            position: fixed; top: 0; right: 0; z-index: 99; width: 120px; font-size: 28px; height: 86px; line-height: 86px; text-align: center; color: white;
        }
        height: 100%; background: white;
        .redpack-mask{
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            width:100%;
            height: 100vh;
            background: rgba(0,0,0,.5);
            .redpack-pancel{
                width:95%;
                height: 610px;
                background: url('/static/images/activity/reg_redPack2.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top:-300px;
                margin-left: -43%;
                opacity: 0;
                transform: scale(.7);
                transition: all .2s ease;
                span{
                    position: absolute;
                    bottom:44px;
                    left: 250px;
                    width:150px;
                    height: 60px;
                }
            }
            .active{
                opacity: 1;
                transform: scale(1)
            }
        }
        .content {
            padding-top: 59px;
            .title {
                color: #333; font-size: 46px; margin: 0 0 22px;
            }
            .more {
                color: #666; font-size: 28px; line-height: 28px;
            }
            .list {
                margin: 234px 0 100px 0; padding: 0 0 0 20px;
                span {
                    float: left; width: 192px; height: 80px; margin: 0 67px 40px 0; line-height: 80px; text-align: center; color: #333; background: #f5f6f9; font-size: 28px; border-radius: 40px;
                }
                .sr { margin-right: 0; }
                span:last-child { padding: 0 38px; }
                .betSelected {
                    color: white; background: #2f86ff;
                }
            }
            .subType {
                display: block; width: 550px; height: 88px; margin: 0 auto; line-height: 88px; text-align: center; background: #2f86ff; border-radius: 44px; font-size: 34px; color: white;
            }
        }
    }
</style>
