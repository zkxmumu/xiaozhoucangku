import { getGoodsCount, getGoodsList } from '../../util/axios'

const state = {
    goodsList: [],
    size: 2,
    page: 1,
    total: 0

}

const getters = {
    getGoodsList() {
        return state.goodsList
    },
    getGoodsCount() {
        return state.total
    },
    getGoodsSize() {
        return state.size
    },
}

const mutations = {
    GOODS(state, payload) {
        state.goodsList = payload
    },
    GOODSCOUNT(state, payload) {
        state.total = payload
    },
    PAGE(state, payload) {
        state.page = payload
    }

}


const actions = {
    getGoodsAction(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page,

        })
            .then(res => {
                if (res.data.code === 200) {
                    context.commit("GOODS", res.data.list)
                    let datad = res.data.list ? res.data.list : []
                    if (context.state.page !== 1 && datad.length == 0) {
                        context.dispatch('changePageAction', context.state.page - 1)
                        context.dispatch('getGoodsAction')
                    }
                }
            })
            .catch(err => {
                console.log(err, "456");
            })
    },
    // 总数
    getCountAction({ commit }) {
        getGoodsCount().then(res => {
            // console.log(res,2345670000)
            if (res.data.code == 200) {
                commit("GOODSCOUNT", res.data.list[0].total);
            }
        });
    },

    //   page
    changePageAction(context, payload) {
        // console.log(context,'页码哈哈哈哈哈')
        context.commit('PAGE', payload)
        context.dispatch('getGoodsAction')
    }


}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}