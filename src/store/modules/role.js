import { getRoleList } from '../../util/axios'

const state = {
    roleList: []
}

const getters = {
    getRoleList() {
        return state.roleList
    }
}

const mutations = {
    RLOE(state, payload) {
        state.roleList = payload
    }
}


const actions = {
    getRoleAction({ commit }) {
        getRoleList()
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