const role = {
    state:{
        obj:{},
        view:'add',//add或update
        viewData:{},//修改时的数据
        roleTableData:[],//表格数据
        roleTablePage:{},//表格分页
    },
    mutations:{
        setRoleView(state,val){
            state.view = val;
        },
        setRoleViewData(state,val){
            state.viewData = val;
        },
        setRoleTableData(state,val){
            state.roleTableData = val;
        },
        setRoleTablePage(state,val){
            state.roleTablePage = val;
        }
    },
    getters:{
        getRoleTablePage:(state)=>{//分页数据
            if(Object.keys(state.roleTablePage).length == 0){
                return {
                    currentPage:1,
                    total:0
                }
            }
            return state.roleTablePage;
        },
    }
}

export default role;