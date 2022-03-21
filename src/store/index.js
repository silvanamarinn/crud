import Vue from 'vue'
import Vuex from 'vuex'
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    GET_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    getUsers({ commit }) {
      const db = getFirestore();
      const q = query(collection(db, "usuarios"));
      onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, data: doc.data() });
        });
        commit("GET_USERS", users)
      });
    }
  },

})



export default store