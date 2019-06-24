<template>
    <div>
        <div class="header">
            <i class="iconfont icon-fanhui" @click="$store.commit('pinglunPancel',false)"></i>
            <span>评论帖子</span>
            <span class="send">发送</span>
        </div>
        <div class="content">
            <textarea placeholder="请输入..." maxlength="70"></textarea>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.header{
    background: $theme-color;
    color:#fff;
    height: 120px;
    line-height: 120px;
    position: relative;
    i{
        font-size: 50px;
        position: absolute;
        left: 16px;
        text-align: center;
    }
    span{
        font-size: 34px;
    }
    .send{
        position: absolute;
        right:20px;
    }
}
.content{
    textarea{
        border:none;
        outline:none;
        resize:none;
        width:calc(100vw - 32px);
        height: 500px;
        padding:16px;
        font-size: 28px;
        color:#333;
    }
}
</style>
