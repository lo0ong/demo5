import Vue from 'vue';
import Vuex from 'vuex';

import pagination from './pagination';
import dictItem from './dictItem';
import dept from './dept';
import role from './role';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        pagination:pagination,
        dictItem:dictItem,
        dept:dept,
        role:role,
        user:user,
    }
});

export default store;