const user = {
    state:{
        obj:{},
        view:'add',//add或update
        viewData:{},//修改时的数据
        userTableData:[],//表格数据
        userTablePage:{},//表格分页
    },
    mutations:{
        setUserView(state,val){
            state.view = val;
        },
        setUserViewData(state,val){
            state.viewData = val;
        },
        setUserTableData(state,val){
            state.roleTableData = val;
        },
        setUserTablePage(state,val){
            state.roleTablePage = val;
        }
    },
    getters:{
        /*
        getUserTablePage:(state)=>{//分页数据
            if(Object.keys(state.roleTablePage).length == 0){
                return {
                    currentPage:1,
                    total:0
                }
            }
            return state.roleTablePage;
        },
        */
    }
}

export default user;