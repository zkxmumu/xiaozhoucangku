import { getCateList } from '../../util/axios'

const state = {
    cateList: []
}

const getters = {
    getCateList() {
        return state.cateList
    },
}

const mutations = {
    CATE(state, payload) {
        state.cateList = payload
    }
}

const actions = {
    getCateListAction({ commit }) {
        getCateList({ istree:true})
            .then(res => {
                console.log(res, "123");
                if (res.data.code === 200) {
                    commit("CATE", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, "456");
            })
    },
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}