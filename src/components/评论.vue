<template>
<div class="comment-wrap" :class="{last:last}">
    <span class="user-avatar" v-if="comment.uid!=0"><img :src="'/static/images/avatar/'+(comment.avatar==null?1:comment.avatar)+'.jpg'"></span>
    <span class="user-avatar" v-if="comment.uid==0"><img src="/static/images/avatar/nm.png"></span>
    <div class="comment-text">
        <span class="comment-user" v-if="comment.uid!=0">{{comment&&comment.nickname}}</span>
        <span class="comment-user" v-if="comment.uid==0">匿名用户</span>
        <p>{{comment&&comment.content}}</p>
        <div class="comment-footer"><span>{{timeago(comment.updated_at)}}</span><span @click="conmitDz()" ref="act"><i class="iconfont" :class="{'icon-appreciate_light':isdefault,'icon-dianzan':isdefaultFull}"></i>{{comment.zans}}</span></div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            isDianzan:0,
            isdefault:true,
            isdefaultFull:false,
            
        }
    },
    props:['comment','last'],
    methods:{
        //评论点赞
        conmitDz(){
            var that = this;
            if(that.$store.state.user==''){
                this.$vux.confirm.show({
                    content:'此功能需登录',
                    confirmText:'登录',
                    onConfirm () {
                        that.$router.push({path:'/login'});
                    }
                })
                return;
            }
            if(that.isDianzan) return;
            var postData = that.$qs.stringify({
                id:this.comment.id,
                tie_type:that.$route.query.type
            })
            var nowT = new Date().getTime();
            that.$http.post('/v1/home/comments-zans-add',postData).then(res=>{
                if(res.code==0){
                    var time = new Date().getTime();
                    that.isDianzan = true;
                    that.comment.zans = res.data.zanNums;
                }
            }),
            this.$refs.act.style.color = "#ffb400";
            if (this.isdefault) {
                this.isdefaultFull = true;
                this.isdefault =false;
                this.$vux.toast.text('点赞成功','middle')
            } 
        },
        //转化时间
        timeago(TimeStamp){
            var date = new Date(TimeStamp*1000);
            var nowDate = new Date();
            var sec = parseInt((nowDate.getTime() - date.getTime()) / 1000);//默认秒
            if(sec<=60) return '刚刚';
            var parseMin = parseInt(sec / 60);//转成分
            var parseHur = parseInt(parseMin/60);//转成时
            var parseDay = parseInt(parseHur/24);//转成天
            var parseWee = parseInt(parseDay/7);//转成周
            var parseMon = parseInt(parseDay/30);//转成月
            var parseYea = parseInt(parseMon/12);//转成年
            //分-时-天-周-月-年
            var Arr = [parseMin,parseHur,parseDay,parseWee,parseMon,parseYea];
            //给个规则
            var gzArr = [60,24,7,4,12,999]
            var gzArrName = ['分前','小时前','天前','周前','月前','年前']
            var res;
            Arr.forEach((ele,idx) => {
                if(ele<=gzArr[idx]&&ele!=0){
                    res = ele+gzArrName[idx];
                }
            });
            return res;
        }
    }
}
</script>
<style lang="scss" scoped>
.last{
    border-bottom:none!important;
}
.comment-wrap{
    padding: 10px 0 10px 0;
    margin-left:16px;
    margin-right:16px;
    overflow: hidden;
    border-bottom:$border-color 1px solid;
    .user-avatar{
        width: 80px;
        height: 80px;
        float: left;
        display: block;
        border:$border-color 1px solid;
        border-radius: 50%;
        overflow: hidden;
        margin-top:10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .comment-text{
        float: right;
        width:calc(100% - 106px);
        padding-left:20px;
        .comment-user{
            text-align: left;
            display: block;
            font-size: 26px;
            color:#666;
            padding-top:10px;
            padding-bottom:10px;
        }
        >p{
            font-size: 30px;
            display: block;
            text-align: left;
            margin-bottom:20px;
            color:#333;
        }
        .comment-footer{
            font-size: 24px;
            height: 30px;
            line-height: 30px;
            color:$subtitle-color;
            line-height: 25px;
            padding-bottom:10px;
            span:first-child{
                float: left;
            }
            span:nth-child(2){
                float: right;
                line-height: 25px;
                font-size: 22px;
                color:#333;
                i{
                    font-size: 40px;
                    margin-right:5px;
                }
            }
            span.active{
                color:$theme-color;
            }
        }
    }
}
</style>
