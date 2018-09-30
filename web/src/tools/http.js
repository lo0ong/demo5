import { Message,Loading } from 'element-ui';
import VueResource from 'vue-resource';

export default (Vue)=>{
    Vue.use(VueResource);
    //通信-post的参数类型
    Vue.http.options.emulateJSON = true;
    Vue.http.options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    //通信-拦截器
    Vue.http.interceptors.push((request, next)  =>{
      //头部Token设置
      request.headers.set('Authorization', 'yexiaodong');
      request.headers.set('loginid', '123');
      //Loading
      const loading = Loading.service({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "transparent"
      });
      
      next((response) => {
        loading.close();

        if(response.status == 200){
          let returnObj = JSON.parse(response.bodyText);
          response.data = returnObj.resultData;
          response.total = returnObj.resultCount;
          response.code = returnObj.resultCode;
    
          if(returnObj.resultMsg == '数据保存成功' || returnObj.resultMsg == '数据删除成功' || returnObj.resultMsg == '数据更新成功'){
            Message.success(returnObj.resultMsg + '！');
          }
          if(returnObj.resultCode != '000'){
            Message.warning(returnObj.resultMsg + '！');
          }
          return response;
        }
        else{
          Message.error('接口请求错误:' + response.body.statusText);
        }
        return response;
      });
    });
}
