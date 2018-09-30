const dictItem = {
    state:{
        obj:{},
        view:'add',//add或update
    },
    mutations:{
        setDictItemObj(state,val){
            state.obj = val;
        },
        setDictItemView(state,val){
            state.view = val;
        }
    }
}

export default dictItem;