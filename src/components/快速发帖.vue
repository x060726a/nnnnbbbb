<template>
<div class="write-panel">
    <div class="title">
        <span class="title1" v-if="isActive">{{title}}</span>
        <input class="inp" type="text" v-if="!isActive" placeholder="请输入自定义标题" v-model="couTitle">
        <span class="custom" v-if="isActive" @click="customizeTitle()">自定义</span>
        <span v-if="!isActive" @click="doneTitle()" class="cancel">取消</span>
    </div>
    <!-- 选特码 -->
    <div class="write-title">
        <span class="block">号码</span>
        <div class="text">(最多可选<span>20</span>个，已选<span>{{chooseObj.ball.length}}</span>个)</div>
    </div>
    <div class="choose-ball tema-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx<7"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>6&&idx<14"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>13&&idx<21"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>20&&idx<28"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>27&&idx<35"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>34&&idx<42"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in ball" v-if="idx>41&&idx<49"><span @click="chooseBall(ele,'ball')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选特肖 -->
    <div class="write-title">
        <span class="block">特肖</span>
        <div class="text">(最多可选<span>6</span>个，已选<span>{{chooseObj.texiao.length}}</span>个)</div>
    </div>
    <div class="choose-ball texiao-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in xiao"   v-if="idx<6"><span @click="chooseTeXiao(ele,'texiao')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in xiao"   v-if="idx>5&&idx<12"><span @click="chooseTeXiao(ele,'texiao')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选色波 -->
    <div class="write-title">
        <span class="block">色波</span>
        <div class="text">(最多可选<span>1</span>个，已选<span>{{chooseObj.colorBall.length}}</span>个)</div>
    </div>
    <div class="choose-ball color-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in colorBall"  ><span @click="chooseColorBall(ele,'colorBall')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选大小 -->
    <div class="write-title">
        <span class="block">大小</span>
        <div class="text">(最多可选<span>1</span>个，已选<span>{{chooseObj.daxiao.length}}</span>个)</div>
    </div>
    <div class="choose-ball daxiao-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in daxiao"  ><span @click="chooseDaxiao(ele,'daxiao')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选单双 -->
    <div class="write-title">
        <span class="block">单双</span>
        <div class="text">(最多可选<span>1</span>个，已选<span>{{chooseObj.danshuang.length}}</span>个)</div>
    </div>
    <div class="choose-ball danshuang-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in danshuang"  ><span @click="chooseDanshaung(ele,'danshuang')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选平特肖 -->
    <div class="write-title">
        <span class="block">平特肖</span>
        <div class="text">(最多可选<span>8</span>个，已选<span>{{chooseObj.pingtexiao.length}}</span>个)</div>
    </div>
    <div class="choose-ball texiao-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in xiao"   v-if="idx<6"><span @click="choosePingTeXiao(ele,'pingtexiao')">{{ele}}</span></div>
        </div>
        <div class="ball-line">
            <div v-for="(ele,idx) in xiao"   v-if="idx>5&&idx<12"><span @click="choosePingTeXiao(ele,'pingtexiao')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选特尾 -->
    <div class="write-title">
        <span class="block">特尾</span>
        <div class="text">(最多可选<span>6</span>个，已选<span>{{chooseObj.tewei.length}}</span>个)</div>
    </div>
    <div class="choose-ball tewei-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in tewei"  ><span @click="chooseTewei(ele,'tewei')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选特头 -->
    <div class="write-title">
        <span class="block">特头</span>
        <div class="text">(最多可选<span>3</span>个，已选<span>{{chooseObj.tetou.length}}</span>个)</div>
    </div>
    <div class="choose-ball tetou-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in tetou"  ><span @click="chooseTetou(ele,'tetou')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选五行 -->
    <div class="write-title">
        <span class="block">五行</span>
        <div class="text">(最多可选<span>3</span>个，已选<span>{{chooseObj.wuxing.length}}</span>个)</div>
    </div>
    <div class="choose-ball wuxing-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in wuxing"  ><span @click="chooseWuxing(ele,'wuxing')">{{ele}}</span></div>
        </div>
    </div>
    <!-- 选家野 -->
    <div class="write-title">
        <span class="block">家野</span>
        <div class="text">(最多可选<span>1</span>个，已选<span>{{chooseObj.jiaye.length}}</span>个)</div>
    </div>
    <div class="choose-ball jiaye-ball">
        <div class="ball-line">
            <div v-for="(ele,idx) in jiaye"  ><span @click="chooseJiaye(ele,'jiaye')">{{ele}}</span></div>
        </div>
    </div>
</div>
</template>
<script>
import {mapGetters,mapActions,mapMutations, mapState} from 'Vuex'
export default {
    data(){
        return {
            ball:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
            xiao:['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'],
            colorBall:['红','蓝','绿'],
            daxiao:['大','小'],
            danshuang:['单','双'],
            tewei:[1,2,3,4,5,6,7,8,9],
            tetou:[0,1,2,3,4],
            wuxing:['金','木','水','火','土'],
            jiaye:['家','野'],
            chooseObj:{
                ball:[],
                texiao:[],
                colorBall:[],
                daxiao:[],
                danshuang:[],
                pingtexiao:[],
                tewei:[],
                tetou:[],
                wuxing:[],
                jiaye:[],
            },
            isActive: true,
            title:'',
            isCustomTitle:false,
            couTitle:''
        }
    },
    watch:{
        title(val,oval){
            console.log(val);
            this.$store.commit('fatietitle',val)
        },
        couTitle(val,oval){
            console.log(val);
            this.isCustomTitle = true
            this.$store.commit('fatietitle',val)
        },
        chooseObj:{
            handler(val,oldVal){
                var obj = {
                    ball:'特码',
                    texiao:'特肖',
                    colorBall:'色波',
                    daxiao:'大小',
                    danshuang:'单双',
                    pingtexiao:'平特肖',
                    tewei:'特尾',
                    tetou:'特头',
                    wuxing:'五行',
                    jiaye:'家野',
                }
                var arr = []
                for(var key in val){
                    if(val[key].length>0){
                        arr.push(obj[key])
                    }
                }
                if(!this.isCustomTitle){
                    this.title = arr.join('|')
                }
            },
            deep: true
        }
    },
    methods:{
        //自定义标题
        customizeTitle(){
            this.isActive = !this.isActive
        },
        //取消
        doneTitle() {
            this.isCustomTitle = false
            this.isActive = !this.isActive
            var arr = []
            var obj = {
                ball:'特码',
                texiao:'特肖',
                colorBall:'色波',
                daxiao:'大小',
                danshuang:'单双',
                pingtexiao:'平特肖',
                tewei:'特尾',
                tetou:'特头',
                wuxing:'五行',
                jiaye:'家野',
            }
            for(var key in this.chooseObj){
                if(this.chooseObj[key].length>0){
                    arr.push(obj[key]+':'+this.chooseObj[key].join(','))
                }
            }
            if(!this.isCustomTitle){
                this.title = arr.join('|')
            }
        },
        // 选特码
        async chooseBall(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.ball.indexOf(ele);
                this.chooseObj.ball.splice(index,1);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.ball.length>=20){
                    // console.log(this.chooseObj.ball);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.ball.push(ele);
                }
            }
        },
        // // //选特肖
        async chooseTeXiao(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.texiao.indexOf(ele);
                this.chooseObj.texiao.splice(index,1);
                console.log(this.chooseObj.texiao);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.texiao.length>=6){
                    console.log(this.chooseObj.texiao);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.texiao.push(ele);
                }
            }
        },
        async choosePingTeXiao(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.pingtexiao.indexOf(ele);
                this.chooseObj.pingtexiao.splice(index,1);
                // console.log(this.chooseObj.pingtexiao);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.pingtexiao.length>=6){
                    // console.log(this.chooseObj.pingtexiao);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.pingtexiao.push(ele);
                }
            }
        },
        // //选色波
        async chooseColorBall(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.colorBall.indexOf(ele);
                this.chooseObj.colorBall.splice(index,1);
                console.log(this.chooseObj.colorBall);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.colorBall.length>=1){
                    console.log(this.chooseObj.colorBall);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.colorBall.push(ele);
                }
            }
        },
        //大小
        async chooseDaxiao(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.daxiao.indexOf(ele);
                this.chooseObj.daxiao.splice(index,1);
                console.log(this.chooseObj.daxiao);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.daxiao.length>=1){
                    console.log(this.chooseObj.daxiao);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.daxiao.push(ele);
                }
            }
        },
        // //单双
        async chooseDanshaung(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.danshuang.indexOf(ele);
                this.chooseObj.danshuang.splice(index,1);
                console.log(this.chooseObj.danshuang);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.danshuang.length>=1){
                    console.log(this.chooseObj.danshuang);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.danshuang.push(ele);
                }
            }
        },
        // //特尾
        async chooseTewei(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.tewei.indexOf(ele);
                this.chooseObj.tewei.splice(index,1);
                console.log(this.chooseObj.tewei);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.tewei.length>=6){
                    console.log(this.chooseObj.tewei);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.tewei.push(ele);
                }
            }
        },
        // //特头
        async chooseTetou(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.tetou.indexOf(ele);
                this.chooseObj.tetou.splice(index,1);
                console.log(this.chooseObj.tetou);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.tetou.length>=3){
                    console.log(this.chooseObj.tetou);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.tetou.push(ele);
                }
            }
        },
        // //五行
        async chooseWuxing(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.wuxing.indexOf(ele);
                this.chooseObj.wuxing.splice(index,1);
                console.log(this.chooseObj.wuxing);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.wuxing.length>=3){
                    console.log(this.chooseObj.wuxing);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.wuxing.push(ele);
                }
            }
        },
        // //家野
        async chooseJiaye(ele,key){
            if(event.target.className=='active'){
                //删除
                event.target.setAttribute('class',' ');
                var index = this.chooseObj.jiaye.indexOf(ele);
                this.chooseObj.jiaye.splice(index,1);
                console.log(this.chooseObj.jiaye);
            }else{
                //添加
                var res = await this.checkLen();
                if(res==3){
                    var result = this.chooseWarin(key);
                    if(result){
                        return;
                    }
                };
                if(this.chooseObj.jiaye.length>=1){
                    console.log(this.chooseObj.jiaye);
                }else{
                    event.target.setAttribute('class','active')
                    this.chooseObj.jiaye.push(ele);
                }
            }
        },
        // //检测长度
        checkLen(){
            //console.log(this.chooseObj);
            var that = this
            return new Promise(resolve=>{
                let len=0;
                let keyArr = []
                for(var k in that.chooseObj){
                    if(that.chooseObj[k].length>0){
                        len+=1;
                        keyArr.push(k)
                    }
                }
                that.$store.commit('chooseObj',that.chooseObj)
                resolve(len)
            })
        },
        // //超过长度提示
        chooseWarin(key){
            if(this.chooseObj[key].length==0){
                this.$vux.toast.text('最多选3个','middle')
                return true;
            }else{
                return false;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.submit-btn{
    height: 88px;
    line-height: 88px;
    width:70%;
    margin:20px auto;
    background: $theme-color;
    color:#fff;
    border-radius: 44px;
    font-size:36px;
}
.write-title{
    overflow: hidden;
    line-height: 54px;
    .block{
        display: block;
        float: left;
        background: $theme-color;
        width: 120px;
        height: 54px;
        line-height: 54px;
        text-align: center;
        color:#fff;
        border-radius: 6px;
        margin-right:7px;
        font-size:26px;
    }
    .text{
        display: block;
        float: left;
        span{
            color:$theme-color;
        }
    }
}
.choose-ball{
    .ball-line{
        display: flex;
        margin-bottom:20px;
        >div{
            flex: 1;
            width: 30px;
            margin-right:5px;
            text-align: center;
            span{
                display: block;
                width:60px;
                height: 60px;
                line-height: 60px;
                border:$border-color 1px solid;
                border-radius: 50%;
                margin: auto;
            }
            span.active{
                background: $theme-color;
                border:$theme-color 1px solid;
                color:#fff;
                border:none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
            }
        }
        >div:last-child{
            margin-right:0;
        }
    }
}
.tema-ball{
    padding:20px 40px;
}
.texiao-ball{
    padding:20px 45px;
}
.color-ball{
    padding:20px 105px;
}
.daxiao-ball{
    padding:20px 135px;
}
.danshuang-ball{
    padding:20px 135px;
}
.tewei-ball{
    padding:20px 0px;
}
.tetou-ball{
    padding:20px 85px;
}
.wuxing-ball{
    padding:20px 85px;
}
.jiaye-ball{
    padding:20px 135px;
}
.title {
    height: 76px;
    background: #fff;
    font-size: 30px;
    margin-bottom:16px;
    border-bottom:1px solid $border-color;
    >span{
        width:105px;
        height: 76px;
        line-height: 76px;
        display: inline-block;
        float: right;
    }
    .title1{
        width:calc(100% - 105px);
        text-align: left;
        float: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    >input{
        float: left;
        height: 76px;
        width:calc(100% - 105px);
    }
} 
</style>
