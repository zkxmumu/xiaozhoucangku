import { getMemberList } from '../../util/axios'

const state = {
    memberList: []
}

const getters = {
    getMemberList() {
        return state.memberList
    }
}

const mutations = {
    RLOE(state, payload) {
        state.memberList = payload
    }
}


const actions = {
    getMemberAction({ commit }) {
        getMemberList()
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