const storePagination = {
    state:{
        pageSize:10,
    },
    mutations:{
        setPageSize(state,val){
            state.pageSize = val;
        }
    }
}

export default storePagination;