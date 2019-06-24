<template>
<components :is="currCom"></components>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    data(){
        return {
            comList:{

            }
        }
    },
    computed:{
        ...mapGetters(['isApp']),
        currCom(){
            switch (this.$route.params.id*1) {
                case 1:
                    return 'cash'
                    break;
                case 2:
                    return 'huafei'
                    break;
                case 3:
                    return 'zhuanpan'
                    break;
                // default:
                //     return 'defaultcompponent'
                //     break;
            }
        }
    },
    components:{
        cash(){
            return {
                component:import('@/page/mymoney/现金券'),
            }
        },
        huafei(){
            return {
                component:import('@/page/mymoney/话费券'),
            }
        },
        zhuanpan(){
            return {
                component:import('@/page/mymoney/转盘活动'),
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.wrap{
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
