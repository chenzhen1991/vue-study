//服务器入口
//1, 导航至首屏
//2,
import { createApp } from './main';

export default context => {
    return new Promise((resolve,reject) =>{
        const { app, router, store } = createApp(context)

        //导航到首屏
        router.push(context.url)
        //导航首屏可能是异步的
        router.onReady(()=>{
            //就绪后可能有异步数据请求
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length){
                return reject({code:400})
            }
            Promise.all(matchedComponents.map(Component => {
                console.log(11,Component);
                
                if(Component.asyncData){
                    console.log(234);
                    
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                console.log(567,context,store.state);
                
                context.state = store.state
                resolve(app)
            })
        },reject)
    })
}