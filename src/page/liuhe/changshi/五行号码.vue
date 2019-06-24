<template>
<div class="content">
    <p>金:<br />5，6，19，20，27，28，35，36，49</p>
    <p>木:<br />1，2，9，10，17，18，31，32，39，40，47，48</p>
    <p>水:<br />7，8，15，16，23，24，37，38，45，46</p>
    <p>火:<br />3，4，11，12，25，26，33，34，41，42</p>
    <p>土:<br />13，14，21，22，29，30，43，44</p>
</div>
</template>
<script>
export default {
    data(){
        return {
            liuhe:JSON.parse(localStorage.getItem('liuhe'))
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: hidden;
    padding:30px 16px;
    >p{
        word-wrap: break-word;
        word-break: normal;
        text-align: left;
        font-size: $normal-fontSize;
    }
}
</style>
