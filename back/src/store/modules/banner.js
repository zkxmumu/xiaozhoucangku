import { getBannerList } from '../../util/axios'

const state = {
    bannerList: []
}

const getters = {
    getBannerList() {
        return state.bannerList
    },
}

const mutations = {
    BANNER(state, payload) {
        state.bannerList = payload
    }
}

const actions = {
    getBannerListAction({ commit }) {
        getBannerList()
            .then(res => {
                console.log(res, "123");
                if (res.data.code === 200) {
                    commit("BANNER", res.data.list)
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