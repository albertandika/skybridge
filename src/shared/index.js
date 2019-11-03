import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    list: [],
    sortList: false,
    arrayList: 0
  },
  mutations: {
   changeList(state, data){
       state.list = data
   },
   changeSort(state, sort) {
       state.sortList = sort
   },
   changeArrayList(state, data) {
       state.arrayList = data
   }
  },
  getters: {
    list: state => state.list,
    sortList: state => state.sortList,
    arrayList: state => state.arrayList
  },
})
