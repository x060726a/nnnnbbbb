<template>
<div class="content">
    <div class="tab">
        <span @click="active=0" :class="{active:active==0}">未使用</span>
        <span @click="active=1" :class="{active:active==1}">已使用</span>
        <span @click="active=2" :class="{active:active==2}">已派送</span>
        <div :class="{activeLine1:active==0,activeLine2:active==1,activeLine3:active==2}"></div>
    </div>
    <div class="res-content">
        <scroller 
            v-if="list.length!=0"
            height="100%"
            lock-x
            scrollbar-y
            :use-pullup='isUsePullUp'
            :pullup-config="pullUpObj"
            @on-pullup-loading='giftList'
            ref="my_scroller">
            <div class="scroll">
                <div class="pad16"></div>
                <div v-for="(ele,idx) in list" class="list">
                    <div class="wrap">
                        <div class="block">
                            <span v-if="ele.refer==1" :class="referClassName[ele.p_id]"></span>
                            <span v-if="ele.refer==0" :class="dhClassName[ele.p_id]"></span>
                        </div>
                        <div class="block">
                            <h1 v-if="ele.refer==1">{{ele.p_name}}</h1>
                            <h1 v-if="ele.refer==0 && ele.p_id!=1">{{ele.p_name}}</h1>
                            <h1 v-if="ele.refer==0 && ele.p_id==1">{{ele.p_name}} x{{ele.nums}}</h1>
                            <p>获取时间：{{trfTime(ele.created_at)}}</p>
                        </div>
                        <div class="block" v-if="!ele.is_expired">
                            <span class="unuse" v-if="ele.status==0" @click="useThing(ele,idx)">立即使用</span>
                            <span class="unuse" v-if="ele.status==1" @click="checkOrider(ele,ele.gift_type)">查看</span>
                            <span class="used" v-if="ele.status==2&&ele.p_id!=3&&ele.p_id!=21">已派送</span>
                            <span class="unuse" v-if="ele.status==2&&(ele.p_id==3||ele.p_id==21||(ele.p_id>=11&&ele.p_id<=16))" @click="checkOrider(ele,ele.gift_type)">查看</span>
                        </div>
                        <div class="block" v-else>
                            <span class="used">已过期</span>
                        </div>
                    </div>
                    <div class="pad16"></div>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </div>
        </scroller>
        <div class="spinner" v-if="ischangTab"><div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div></div>
        <DATANONE v-if="isNotData"/>
    </div>
</div>
</template>
<script>
const DATANONE = import('@/components/没有数据')
import { mapGetters } from 'Vuex'
import { Scroller } from 'vux'
import { TransferDomDirective as TransferDom } from 'vux'
export default {
    directives:{
        TransferDom
    },
    data(){
        return {
            oriderObj:'',
            list:[],
            textArr:['过期时间','使用时间','派送时间'],
            offset:0,
            active:0,
            showDialog:false,
            name:'',
            phone:'',
            qq:'',
            userObj:{},
            ischangTab:false,//是否正在切换tab
            isHttpSending:false,//请求是否在发送中
            isNoMoreData:false,//是否已经加载所有数据
            isUsePullUp:true,//是否开启上拉加载
            isNotData:false,//根本没有数据
            pullUpObj:{
                upContent:"<span class='loading-text'></span>", 
                downContent: "<span class='loading-text'>释放后加载</span>",
                loadingContent:"<div class='my-spinner'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>"
            },
            dhClassName:{
                1:'quan',
                11:'czk_1',
                12:'czk_2',
                13:'czk_3',
                14:'czk_4',
                15:'czk_5',
                16:'czk_6',
                21:'liu_1',
                22:'liu_2',
                23:'liu_3',
                24:'liu_4',
                25:'liu_5',
                26:'liu_6',
            },
            referClassName:{
                1:'lvyou',
                2:'iphone',
                3:'czk_1',
                4:'liu_2',
                5:'liuliu',
                6:'liuliu',
            }
        }
    },
    watch:{
        active(val,oval){
            this.list = [];
            this.offset = 0;
            this.ischangTab = true,//是否正在切换tab
            this.isHttpSending = false,//请求是否在发送中
            this.isNoMoreData = false,//是否已经加载所有数据
            this.isUsePullUp = true,//是否开启上拉加载
            this.isNotData = false,//根本没有数据
            this.giftList()
        }
    },
    // created(){
    //     console.log('created');
    //     if(this.$route.query.active){
    //         this.active = this.$route.query.active;
    //     }
    //     this.ischangTab = true
    //     this.giftList();
    // },
    activated(){
        var testArr = ['我的金币','现金券','话费券','大转盘','物品使用','订单状态']
        if(this.$store.state.lastRouterStatus.title&&testArr.indexOf(this.$store.state.lastRouterStatus.title.name)<0) return;
        if(this.$route.query.active){
            this.active = this.$route.query.active;
        }
        this.ischangTab = true
        this.offset = 0;
        this.giftList();
    },
    computed:{
        ...mapGetters(['isApp'])
    },
    methods:{
        checkOrider(ele,gift_type){
            var that = this;
            if(gift_type==2){
                var obj = {
                    phone:ele.phone,
                    name:ele.p_name,
                    created_at:ele.created_at
                }
                console.log(ele);
                that.$router.push({path:'/ddstatus',query:obj})
            }
            if(gift_type==1){
                var obj = {
                    p_name:ele.p_name,
                    serial_id:ele.serial_id,
                }
                this.$router.push({path:'/xjdetail',query:Object.assign(obj,that.oriderObj)})
            }
        },
        //转化时间戳
        trfTime(str){
            if(!str) return '';
            var d = new Date();
            d.setTime(str*1000)
            var year = d.getFullYear();
            var m = d.getMonth() + 1;//月
            var day = d.getDate()<10?'0'+d.getDate():d.getDate();//日
            var h = d.getHours();//小时
            var min = d.getMinutes();
            return year+'-'+(m<10?'0'+m:m)+'-'+(day<10?'0'+day:day)+' '+(h<10?'0'+h:h)+':'+(min<10?'0'+min:min);
        },
        giftList(){
            var that = this;
            that.isHttpSending = true
            var postData = that.$qs.stringify({
                offset:that.offset,
                status:that.active
            })
            that.$http.post('/v1/user/gifts-change-records',postData).then(res=>{
                this.ischangTab = false
                if(res.code==0){
                    that.oriderObj = res.data.partner
                    // if(that.offset!=0){
                    //     that.$refs.my_scroller.donePullup();
                    // }
                    if(that.offset==0&&res.data.records.length==0){
                        //根本没有数据
                        that.isNotData = true
                    }
                    if(that.offset!=0&&res.data.records.length<20){
                        //已经全部加载完数据
                        that.$refs.my_scroller.disablePullup()
                        that.isNoMoreData = true;
                    }
                    if(res.data.records.length<20){
                        //是否开启上拉加载更多
                        that.isUsePullUp = false
                    }
                    if(that.offset==0){
                        that.list = res.data.records
                    }else{
                        var newArr = that.list.concat(res.data.records)
                        that.list = newArr;
                    }
                    that.list.sort((a,b)=>{
                        return b.created_at - a.created_at
                    })
                    that.offset = res.data.offset;
                }
                that.isHttpSending = false
            })
        },
        useThing(ele,idx){
            var that = this;
            var testArrs = [4,21,22,23,24,25,26];
            if(testArrs.indexOf(ele.p_id)>-1){
                that.$vux.confirm.show({
                    content:'您确认兑换成现金吗？',
                    confirmText:'确认',
                    onConfirm () {
                        that.postApi(ele,idx)
                    }
                })
            }else{
                this.$router.push({path:'/wpuse',query:ele})
            }
        },
        postApi(ele,idx){
            var that = this;
            var postData = that.$qs.stringify({
                id:ele.id
            })
            that.$http.post('/v1/user/gifts-use',postData).then(res=>{
                if(res.code==1003){
                    that.showDialog = true
                    that.$vux.confirm.show({
                        content:res.msg_zh,
                        confirmText:'确认',
                        onConfirm () {
                            that.$router.push({path:'/setting'})
                        }
                    })
                }
                if(res.code==0){
                    var obj = {
                        p_name:ele.p_name,
                        serial_id:ele.serial_id,
                    }
                    that.list.splice(idx,1)
                    that.$router.push({path:'/xjdetail',query:Object.assign(obj,res.data)})
                }
                if(res.code!=0&&res.code!=1003){
                    that.$vux.toast.text(res.msg_zh, 'middle')
                }
                that.$vux.loading.hide();
            })
        },
        check(){
            var that = this
            var res;
            this.regChinese()&&this.regPhone()&&(this.qq||this.regQQ)&&(()=>{
                that.$vux.loading.show({
                    text: '请求中'
                })
                var postData = that.$qs.stringify({
                    realname:that.name,
                    phone:that.phone,
                    qq:that.qq,
                })
                //完善个人信息
                that.$http.post('/v1/user/improve',postData).then(res=>{
                    that.$vux.loading.hide();
                    if(res.code==0){
                        that.showDialog = false
                        that.$vux.toast.text('更新资料成功', 'middle')
                    }else{
                        that.$vux.toast.text(res.msg_zh, 'middle')
                    }
                })
            })()
        },
        regChinese(){
            var reg = /[\u4e00-\u9fa5]/;
            if(!reg.test(this.name)){
                this.$vux.toast.text('请输入中文名字', 'middle')
                return false;
            }else{
                return true;
            }
        },
        regPhone(){
            var phonereg=/^[1][3,4,5,7,8][0-9]{9}$/;
            console.log(phonereg.test(this.phone));
            if(!phonereg.test(this.phone)){
                this.$vux.toast.text('请输入正确的手机号码', 'middle')
                return false;
            }else{
                return true;
            }
        },
        regQQ(){
            this.$vux.toast.text('请输入正确的QQ号码', 'middle')
            return false
        }
    },
    components:{
        Scroller,
        DATANONE(){
            return {
                component:DATANONE,
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.submit-btn{
    background: $theme-color;
    color:$bg-color;
    font-size: 34px;
    width: 70%;
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    margin: 50px auto;
}
.ws-dialog{
    position: relative;
    .ws-dialog-close{
        position: absolute;
        top: 5px;
        right: 20px;
        font-size: 50px;
    }
    h1{
        font-weight: 500;
        padding-top:50px;
        padding-bottom:34px;
        font-size: 30px;
        color:$theme-color;
    }
    .mgr10{
        margin:0 auto 20px;
    }
    .mgr44{
        margin:0 auto 64px;
    }
    p{
        font-size: 24px;
        padding-left:50px;
        text-align: left;
        color:#fc0505;
    }
    .text-group{
        padding-left:50px;
        font-size: 28px;
        color:#000;
        text-align: left;
        width:530px;
        i.impty{
            display: inline-block;
            width: 14px;
            vertical-align: middle;
            font-size: 0;
        }
        span.texturl{
            display: block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        a.playgame{
            width:130px;
            height: 50px;
            line-height: 50px;
            font-size: 24px;
            color:#fff;
            background: $theme-color;
            text-align: center;
            display: inline-block;
            border-radius: 30px;
            margin-left:20px;
        }
    }
    .input-group:hover{
        border: $theme-color 1px solid;
        i{
            color: $theme-color;
        }
    }
    .input-group{
        position: relative;
        width: 480px;
        height: 66px;
        border: #d6d7dc 1px solid;
        border-radius: 10px;
        overflow: hidden;
        input{
            width: calc(100% - 80px);
            height: 66px;
            line-height: 66px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            padding-left:80px;
            font-size: 30px;
            cursor: pointer;
        }
        i{
            font-size: 42px;
            color:#d6d7dc;
            position: absolute;
            z-index: 2;
        }
        i.input-user{
            top: 0;
            left: 10px;
        }
        i.input-phone{
            font-size: 50px;
            top: -7px;
            left: 6px;
        }
        i.input-qq{
            top: 3px;
            left: 13px;
            font-size: 38px;
        }
    }
    .submit-btn{
        width: 480px;
    }
    .btn-group{
        font-weight: 500;
        overflow: hidden;
        margin-top:40px;
        a{
            display: block;
            width:calc(40% - 2px);
            float: left;
            height: 88px;
            line-height: 88px;
            border-radius: 44px;
            border-radius: 50px;
            font-size: 36px;
            border:$theme-color 1px solid;
            color:$theme-color;
        }
        a:first-child{
            margin-left:7%;
        }
        a:last-child{
            background: $theme-color;
            color:#fff;
            margin-left:6%;
        }
    }
}
.spinner{
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    margin-left:-100px;
}
.tab{
    height: 68x;
    line-height: 68px;
    background: #fff;
    display: flex;
    color:#333;
    font-size: 34px;
    position: relative;
    span{
        flex: 1;
    }
    span.active{
        color:$theme-color;
    }
    >div{
        position: absolute;
        z-index: 1;
        bottom:0;
        height: 5px;
        width:100px;
        background: $theme-color;
        transition: all .5s ease;
    }
    >div.activeLine1{
        transform: translateX( calc( ( 100vw / 3 - 100px) / 2 ) );
    }
    >div.activeLine2{
        transform: translateX( calc( ( 100vw / 3 - 100px) / 2 + 100vw / 3) );
    }
    >div.activeLine3{
        transform: translateX( calc( ( 100vw / 3 - 100px) / 2 + (100vw / 3) * 2) );
    }
}
.content{
    height: 100%;
    .res-content{
        height: calc(100% - 68px);
        -webkit-overflow-scrolling:touch;
        overflow-y: scroll;
    }
    .resList{
        padding-bottom:16px;
    }
    .pad16{
        height: 16px;
        display: block;
        width: 100%;
        background: #f2f2f2;
    }
    .list{
        margin:0px 16px 0px 16px;
        background: #fff;
        display: table;
        width: calc(100% - 32px);
        .wrap{
            padding:30px 20px;
            .block{
                display: table-cell;
                vertical-align: middle;
                h1{
                    font-weight: 500;
                    font-size: 26px;
                    margin-bottom:10px;
                    text-align: left;
                    color:#333;
                }
                p{
                    font-size: 20px;
                    color:#999;
                    text-align: left;
                }
                input{
                    opacity: 0;
                }
            }
            .block:first-child{
                width:17%;
                span{
                    width:82px;
                    height: 47px;
                    display: block;
                }
                span.liu_6{
                    background: url('/static/images/icons/cash_icon1.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liu_5{
                    background: url('/static/images/icons/cash_icon2.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liu_4{
                    background: url('/static/images/icons/cash_icon3.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liu_3{
                    background: url('/static/images/icons/cash_icon4.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liu_2{
                    background: url('/static/images/icons/cash_icon5.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liu_1{
                    background: url('/static/images/icons/cash_icon6.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_6{
                    background: url('/static/images/icons/hf_icon7.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_5{
                    background: url('/static/images/icons/hf_icon1.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_4{
                    background: url('/static/images/icons/hf_icon2.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_3{
                    background: url('/static/images/icons/hf_icon3.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_2{
                    background: url('/static/images/icons/hf_icon4.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.czk_1{
                    background: url('/static/images/icons/hf_icon5.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.liuliu{
                    background: url('/static/images/icons/zp_icon3.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.lvyou{
                    background: url('/static/images/icons/zp_icon1.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.iphone{
                    background: url('/static/images/icons/zp_icon2.png') no-repeat;
                    background-size: 100% 100%;
                }
                span.quan{
                    background: url('/static/images/icons/cjquan.png') no-repeat;
                    background-size: 100% 100%;
                    width:62px;
                    height: 62px;
                    margin-left:10px!important;
                    margin-right:0!important;
                }
            }
            .block:nth-child(2){
                width: 70%;
                padding-left:10px;
            }
            .block:nth-child(3){
                width: 20%;
                span{
                    display: block;
                    width: 140px;
                    height: 42px;
                    line-height: 44px;
                    font-size: 24px;
                    border-radius: 60px;
                    color:#fff;
                }
                .unuse{
                    background: $theme-color;
                }
                .used{
                    background: #999;
                }
                .hide{
                    display: block;
                }
            }
        }
    }
}
</style>
