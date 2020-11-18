import { getMenuAdd, getMenuList } from "../../util/axios"

const state = {
    menuList: []
}

const getters = {
    getMenuList() {
        return state.menuList
    }
}

const mutations = {
    BEN(state, payload) {
        state.menuList = payload
    }
}

const actions = {
    getMenuListAction({ commit }) {
        getMenuList({istree:true})
            .then(res => {
                console.log(res, "123");
                if (res.data.code === 200) {
                    commit('BEN', res.data.list)
                }
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