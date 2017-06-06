<template>
  <div id="app">
    <section>
      <header>
        <input placeholder="Add Task"
               v-model="name"
               @keyup.enter = "saveTask"
               v-if="addMode"/>
        <h2 v-else>TODO-шечка</h2>
        <span class="add" @click="switchToAdd">+</span>
      </header>
      <ul>
        <vue-list
          v-for="(task, index) in allTasks"
          :task="task"
          :key="index"/>
      </ul>

    </section>
  </div>
</template>

<script type="text/babel">
import { mapState } from 'vuex';
import VueList from './components/List.vue';

export default {
  name: 'app',
  data() {
    return {
      addMode: false,
      name: ''
    }
  },
  created() {
    this.$store.dispatch('getAllTasks');
  },
  computed: mapState([
    'allTasks'
  ]),
  methods: {
    switchToAdd() {
      this.$set(this, 'addMode', !this.addMode);
      this.$set(this, 'name', '');
    },
    saveTask() {
      const len = this.allTasks.length;
      this.$store.commit({
        type: 'setNewTask',
        task: {
          id: len ? this.allTasks[len - 1].id + 1 : 1,
          name: this.name,
          isComplete: false
        }
      });

      this.switchToAdd();
    }
  },
  components: {
    VueList
  }
}
</script>

<style lang="scss">

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, section {
    overflow: hidden;
  }

  #app {
    display: flex;
    height: 100vh;

    section {
      margin: auto;
      width: 350px;
      height: 580px;
      border: 1px solid rgb(200, 200, 200);
      border-radius: 5px;

      header {
        display: flex;
        padding: 20px 0;
        background: #eaeaea;
        border-radius: 5px 5px 0 0;

        h2 {
          text-align: center;
          font-size: 2em;
          flex-grow: 1;
        }

        .add {
          font-size: 2em;
          position: fixed;
          transform: translateX(310px);
          border: 1px solid;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          text-align: center;
          line-height: 1.1;
          cursor: pointer;
        }

        input {
          margin-left: 15px;
          width: 280px;
          font-size: 1.4em;
          border: none;
          border-bottom: 1px solid;
          padding-bottom: 5px;
          outline: none;
          background: transparent;
        }
      }

      ul {
        max-height: calc(100% - 65px);
        overflow-y: auto;
        list-style: none;
        font-size: 1.6em;
      }


    }
  }

</style>
