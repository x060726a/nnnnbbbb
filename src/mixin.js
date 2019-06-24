import { mapActions } from 'Vuex'
export default{
    created(){
        if(this.$store.state.socket!=''){
            this.$store.state.socket.close();
        }
        this.getLocalConf();
        this.creatLiuhe();
        this.getStoreSystem();
        var user = localStorage.getItem('user');
        if(user){
            this.$store.commit('user',JSON.parse(user));
        }
    },
    methods:{
        ...mapActions(['getStoreSystem']),
        getLocalConf(){
            var that = this;
            that.$http.get('../../../static/js/host.json').then(res=>{
                that.$store.commit('isApp',res.data.isApp)
            })
        },
        getHistoryNum(){
            var that = this;
            this.$http.get('v1/liuhe/kj-records').then(res=>{
                if(res.data.code!=0){
                    localStorage.setItem('HistoryNum',JSON.stringify(res.data.data));
                    var HistoryBall = [];
                    var issue = [];
                    res.data.data.forEach(ele => {
                        HistoryBall.push(ele.data);
                        issue.push(ele.qihao);
                    });
                    localStorage.setItem('HistoryBall',JSON.stringify(HistoryBall));
                    localStorage.setItem('HistoryIssue',JSON.stringify(issue));
                }
            });
        },
        creatLiuhe(){
            var liuhe={
                ballpanel:{
                    // '狗':[1,13,25,37,49],
                    // '鸡':[2,14,26,38],
                    // '猴':[3,15,27,39],
                    // '羊':[4,16,28,40],
                    // '马':[5,17,29,41],
                    // '蛇':[6,18,30,42],
                    // '龙':[7,19,31,43],
                    // '兔':[8,20,32,44],
                    // '虎':[9,21,33,45],
                    // '牛':[10,22,34,46],
                    // '鼠':[11,23,35,47],
                    // '猪':[12,24,36,48],

                    '猪':[1,13,25,37,49],
                    '狗':[2,14,26,38],
                    '鸡':[3,15,27,39],
                    '猴':[4,16,28,40],
                    '羊':[5,17,29,41],
                    '马':[6,18,30,42],
                    '蛇':[7,19,31,43],
                    '龙':[8,20,32,44],
                    '兔':[9,21,33,45],
                    '虎':[10,22,34,46],
                    '牛':[11,23,35,47],
                    '鼠':[12,24,36,48]
                },//生肖与号码
                ballcolor:{
                    '红':[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],
                    '蓝':[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48],
                    '绿':[5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49]
                },//色波与号码
                ballwx:{
                    '金':[2,3,16,17,24,25,32,33,46,47],
                    '木':[6,7,14,15,28,29,36,37,44,45],
                    '水':[4,5,12,13,20,21,34,35,42,43],
                    '火':[1,8,9,22,23,30,31,38,39],
                    '土':[10,11,18,19,26,27,40,41,48,49]
                },
            }
            var ball = localStorage.getItem('liuhe');
            if(!ball){
                localStorage.setItem('liuhe',JSON.stringify(liuhe));
            }
        }
    }
}