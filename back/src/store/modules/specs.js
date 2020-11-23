import { getSpecsList, getSpecsCount } from '../../util/axios'

const state = {
    specsList: [],
    size: 2,
    page: 1,
    total: 0
}

const getters = {
    getSpecsList() {
        return state.specsList
    },
    getSpecsCount() {
        return state.total
    },
    getSpecsSize() {
        return state.size
    },
}

const mutations = {
    SPECS(state, payload) {
        state.specsList = payload
    },
    SPECSCOUNT(state, payload) {
        state.total = payload
    },
    PAGE(state, payload) {
        state.page = payload
    }
}


const actions = {

    getSpecsAction(context) {
        getSpecsList({
             size: context.state.size,
            page: context.state.page 
        }).then(res => {
            if (res.data.code == 200) {
                context.commit("SPECS", res.data.list);
                let specsdata=res.data.list?res.data.list:[]
                if(context.state.page!==1&&specsdata.length==0){
                    context.dispatch("changePageAction",context.state.page-1)
                    context.dispatch('getSpecsAction')
                }
            }
        });
    },
    getCountAction({ commit }) {
        getSpecsCount().then(res => {
            console.log(res, 2345670000)
            if (res.data.code == 200) {
                commit("SPECSCOUNT", res.data.list[0].total);
            }
        });
    },

    //   page
    changePageAction(context, payload) {
        // console.log(context,'页码哈哈哈哈哈')
        context.commit('PAGE', payload)
        context.dispatch('getSpecsAction')
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}