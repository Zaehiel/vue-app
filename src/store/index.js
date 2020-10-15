import Vue from 'vue';
import Vuex from 'vuex';
import Api from '../api';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [],
    usersStartIndex: 0,

  },
  getters: {
    allUsers: state => {
      return state.users;
    },
    usersStartIndex: state => {
      return state.usersStartIndex;
    },
    selectedUsersCount: state => {
      return state.users.filter(user => user.isSelected === true).length;
    },
  },
  mutations: {
    ADD_USERS(state, newUsers) {
      const normalisedUsers = newUsers.map(user => ({
        ...user,
        isSelected: false,
      }));

      state.users = [
        ...state.users,
        ...normalisedUsers,
      ];
    },
    UPDATE_START_INDEX(state, index) {
      state.usersStartIndex = index;
    },
    TOGGLE_USER(state, id) {
      state.users = state.users.map((user) => {
        if (user.id === id) {
          user.isSelected = !user.isSelected;
        }

        return { ...user };
      });
    },
    TOGGLE_ALL_USERS(state, isSelected) {
      state.users = state.users.map(user => ({
        ...user,
        isSelected,
      }));
    }
  },
  actions: {
    fetchUsers ({ commit }, {start, step}) {
      return new Promise((resolve) => {
        const endpoint = new Api();
        endpoint.fetchUsers(start, step).then((result) => {
          commit('ADD_USERS', result.data.users);
          commit('UPDATE_START_INDEX', result.data.newStart);
          resolve();
        });
      });
    },
    toggleUserSelection({ commit }, id) {
      commit('TOGGLE_USER', id);
    },
    toggleSelectAllUsers({ commit }, isSelected) {
      commit('TOGGLE_ALL_USERS', isSelected);
    }
  },
});