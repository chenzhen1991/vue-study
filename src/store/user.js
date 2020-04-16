// import { login, getInfo } from '@/api/user';

const state = {
    token: localStorage.getItem('token'),
    // 其他用户信息
    roles: []
};

const getters = {
    roles: state => state.roles
}

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setRoles: (state, roles) => {
        state.roles = roles
    }
};

const actions = {
    login({ commit }, userInfo) {
        const { username } = userInfo;
        console.log(">>>>>>>>>>>>>>>>>.user Login");
        // console.log(commit, username);
        
        // return;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' || username === 'jerry'){
                    commit('setToken', username);
                    localStorage.setItem('token', username)
                    console.log('token', username)
                    // return
                    resolve();
                } else {
                    reject('用户名、密码错误')
                }
            }, 1000)
        })
    },
    getInfo({ commit, state }) {
        // 模拟获取用户角色信息
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = state.token === 'admin' ? ['admin'] : ['editor']
                commit('setRoles', roles);
                resolve({ roles })
            }, 1000)
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('setToken', '');
            commit('setRoles', []);
            localStorage.removeItem('token');
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}