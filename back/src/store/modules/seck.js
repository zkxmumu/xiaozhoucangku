import { getSeckList } from '../../util/axios'

const state = {
    seckList: []
}

const getters = {
    getSeckList() {
        return state.seckList
    }
}

const mutations = {
    RLOE(state, payload) {
        state.seckList = payload
    }
}


const actions = {
    getSeckAction({ commit }) {
        getSeckList()
            .then(res => {
                console.log(res, "123");
                if (res.data.code === 200) {
                    commit("RLOE", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, "456");
            })
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}