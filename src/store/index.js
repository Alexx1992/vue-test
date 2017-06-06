/**
 * Created by alexeyformanyuk on 06.06.17.
 */
import {get} from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  allTasks: []
};

const mutations = {
  setAllTasks(state, { tasks }) {
    state.allTasks.push(...tasks);
  },
  setNewTask(state, { task }) {
    state.allTasks.push(task);
  },
  setUpdateTask(state, { task }) {
    Object.assign(state.allTasks[state.allTasks.findIndex(item => item.id === task.id)], {name: task.name});
  },
  setDestroyTask(state, { id }) {
    state.allTasks.splice(state.allTasks.findIndex(item => item.id === id), 1);
  }
};

const actions = {
  getAllTasks({commit}) {
    get('http://localhost:8080/src/data.json')
      .then(({data}) => commit({type: 'setAllTasks', tasks: data}))
      .catch(err => console.error(err));
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
});