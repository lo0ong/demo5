const dept = {
    state:{
        obj:{},
        view:'add',//add或update
        viewData:{},//修改时的数据
        deptTreeData:[],//机构树的全部数据
        deptTreeActive:{},//机构树选择，即上级机构【组织页面】
        deptTableData:[],//下级部门的数据
        deptTablePage:{},//表格分页
        deptTableQuery:{},//查询字段

        userTableData:[],//部门成员的数据
        userTablePage:{},//表格分页
        userTableQuery:{},//查询字段

        //角色
        role:[],//可分配角色
        roleActive:{},//选择的角色
        roleUser:[],//该角色的人员

    },
    mutations:{
        setDeptObj(state,val){
            state.obj = val;
        },
        setDeptView(state,val){
            state.view = val;
        },
        setDeptViewData(state,val){
            state.viewData = val;
        },
        setDeptTreeData(state,val){
            state.deptTreeData = val;
        },
        setDeptTreeActive(state,val){
            state.deptTreeActive = val;
        },
        setDeptTableData(state,val){
            state.deptTableData = val;
        },
        setDeptTablePage(state,val){
            state.deptTablePage = val;
        },
        setDeptTableQuery(state,val){
            state.deptTableQuery = val;
        },
        setDeptUserTableData(state,val){
            state.userTableData = val;
        },
        setDeptUserTablePage(state,val){
            state.userTablePage = val;
        },
        setDeptUserTableQuery(state,val){
            state.userTableQuery = val;
        },
        setDeptRole(state,val){
            state.role = val;
        },
        setDeptRoleActive(state,val){
            state.roleActive = val;
        }

    },
    getters:{
        getDeptTreeActive:(state)=>{//获取当前机构数的选择
            if(Object.keys(state.deptTreeActive).length == 0){
                return {
                    name:'根组织',
                    id:''
                }
            }
            return state.deptTreeActive;
        },
        getDeptTablePage:(state)=>{//分页数据
            if(Object.keys(state.deptTablePage).length == 0){
                return {
                    currentPage:1,
                    total:0
                }
            }
            return state.deptTablePage;
        },
        getDeptTableQuery:(state)=>{//查询数据
            if(Object.keys(state.deptTableQuery).length == 0 || state.deptTableQuery.dept == ''){
                return '';
            }
            else{
                let r = '&deptname=' + state.deptTableQuery.dept;
                return r;
            }
        },
        getDeptUserTablePage:(state)=>{//分页数据【部门成员】
            if(Object.keys(state.userTablePage).length == 0){
                return {
                    currentPage:1,
                    total:0
                }
            }
            return state.deptTablePage;
        },
        getDeptUserTableQuery:(state)=>{//查询数据【部门成员】
            let r = ''
            if(Object.keys(state.userTableQuery).length == 0 ){
                return r;
            }
            if(state.userTableQuery.username != ''){
                r += '&username=' + state.userTableQuery.username;
            } 
            if(state.userTableQuery.loginid != ''){
                r += '&loginid=' + state.userTableQuery.loginid;
            }
            return r;
        },
        getDeptRoleId:(state)=>{//获取角色id数组
            let r = [];
            
            if(state.role.length != 0){
                r = state.role.map(o=>{
                    return o.id;
                })
            }
            return r;
        },
        getDeptRoleActive:(state)=>{//获取角色的选择
            if(Object.keys(state.roleActive).length == 0){
                return {
                    rolename:'',
                    id:''
                }
            }
            return state.deptTreeActive;
        },
    }
}

export default dept;