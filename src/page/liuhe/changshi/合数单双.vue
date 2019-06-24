<template>
<div class="content">
    <p>合数单：</p>
    <div>
        <p>单 1. 3. 5. 7. 9. 21. 23. 25. 27. 29. 41. 43. 45. 47. 49.</p>
    </div>
    <div>
        <p>双 10.12. 14. 16. 18. 32. 30. 34. 36. 38</p>
    </div>

    <p>合数双：</p>
    <div>
        <p>单 2. 4. 6. 8. 20. 22. 24. 26. 28. 40. 42. 44. 46. 48</p>
    </div>
    <div>
        <p>双 11. 13. 15. 17. 19. 31. 33. 35. 37. 39</p>
    </div>
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
        font-size: 32px;
    }
    >div{
        text-align: justify;
        >p {
            font-size: $normal-fontSize;
        }
    }
}
</style>
