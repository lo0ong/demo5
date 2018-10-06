
import DoHeader from "./DoHeader.vue";
import DoFooter from "./DoFooter.vue";
import DoNavMenuLeft from "./DoNavMenuLeft.vue";

import DoContentTableOperate from './DoContentTableOperate.vue';
import DoContentTitle from "./DoContentTitle.vue";
import DoContentPagination from "./DoContentPagination.vue";

import DoTreeDept from "./DoTreeDept.vue";
import DoTreeDeptSelect from './DoTreeDeptSelect.vue';

import DoTreeChannel from "./DoTreeChannel.vue"

export default (Vue)=>{
  Vue.component('DoHeader',DoHeader);
  Vue.component('DoFooter',DoFooter);
  Vue.component('DoNavMenuLeft',DoNavMenuLeft);

  Vue.component('DoContentTableOperate',DoContentTableOperate);
  Vue.component('DoContentTitle',DoContentTitle);
  Vue.component('DoContentPagination',DoContentPagination);

  Vue.component('DoTreeDept',DoTreeDept);
  Vue.component('DoTreeDeptSelect',DoTreeDeptSelect);

  Vue.component('DoTreeChannel',DoTreeChannel);
}

