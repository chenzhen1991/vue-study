import { createApp } from './main';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context)
        console.log(111, context.url);

        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 400 })
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state
                // Promise 应该 resolve 应用程序实例，以便它可以渲染
                resolve(app)
            })
        }, reject)
    })
}