import Vue from 'vue';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//其他
import Login from '@/view/page/Login.vue';
import Home from '@/view/page/Home.vue';

//系统管理
import User from '@/view/system/User.vue';
import Org from '@/view/system/Org.vue';
import Dept from '@/view/system/Dept.vue';
import Dict from '@/view/system/Dict.vue';
import Role from '@/view/system/Role.vue';

//视听
import Channel from '@/view/media/Channel.vue';
import Media from '@/view/media/Media.vue';
import Topic from '@/view/media/Topic.vue';
import PlayBill from '@/view/media/PlayBill.vue';


//图文
import ArticleDraft from '@/view/column/ArticleDraft.vue';
import ArticleSubmit from '@/view/column/ArticleSubmit.vue';
import Column from '@/view/column/Column.vue';
import ReviewAffer from '@/view/column/ReviewAffer.vue';
import ReviewBefore from '@/view/column/ReviewBefore.vue';


const routes = [
  { path: '/',redirect: '/login'},
  { path: '/login', component: Login },
  { path: '/playbill', component: PlayBill,name: "playbill" },
  { path: '/', 
    component: Home,
    children:[
      //系统管理
      { path: '/user', component: User },
      { path: '/org', component: Org },
      { path: '/dept', component: Dept },
      { path: '/dict', component: Dict },
      { path: '/role', component: Role },

      //视听
      { path: '/channel', component: Channel },
      { path: '/media', component: Media },
      { path: '/topic', component: Topic },


      //图文
      { path: '/articleDraft', component: ArticleDraft },
      { path: '/articleSubmit', component: ArticleSubmit },
      { path: '/column', component: Column },
      { path: '/reviewAffer', component: ReviewAffer },
      { path: '/reviewBefore', component: ReviewBefore },

    ]
  },
  
];

const router = new VueRouter({
  routes 
});

export default router;