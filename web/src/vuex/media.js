const media = {
    state: {
        obj: {},
        view: 'add',//add或update
        viewData: {},//修改时的数据
        channelTreeData: [],//表格数据
    },
    mutations: {
        setChannelTreeData(state, val) {
            state.channelTreeData = val;
        }
    },
    getters: {
        // getRoleTablePage: (state) => {//分页数据
        //     if (Object.keys(state.roleTablePage).length == 0) {
        //         return {
        //             currentPage: 1,
        //             total: 0
        //         }
        //     }
        //     return state.roleTablePage;
        // },
    }
}

export default media;