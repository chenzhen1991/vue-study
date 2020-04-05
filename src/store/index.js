import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state:{
            count:122
        },
        mutations:{
            add(){
                this.state.count += 1
            }
        }
    })
}