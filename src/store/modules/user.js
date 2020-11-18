import { getUserCount, getUserList } from '../../util/axios'

const state = {
    userList: [],
    size: 2,
    page: 1,
    total: 0

}

const getters = {
    getUserList() {
        return state.userList
    },
    getUserCount() {
        return state.total
    },
    getUserSize() {
        return state.size
    },
}

const mutations = {
    USER(state, payload) {
        state.userList = payload
    },
    USERCOUNT(state, payload) {
        state.total = payload
    },
    PAGE(state, payload) {
        state.page = payload
    }

}


const actions = {
    getUserAction(context) {
        getUserList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code === 200) {
                    context.commit("USER", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, "456");
            })
    },
    // 条数
    getCountAction({ commit }) {
        getUserCount().then(res => {
            console.log(res,2345670000)
            if (res.data.code == 200) {
                commit("USERCOUNT", res.data.list[0].total);
            }
        });
    },

    //   page
    changePageAction(context, payload) {
        // console.log(context,'页码哈哈哈哈哈')
        context.commit('PAGE', payload)
        context.dispatch('getUserAction')
    }


}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}