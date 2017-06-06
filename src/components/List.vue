<template lang="html">
    <li class="list" >
        <div class="num">{{task.id}}</div>
        <div v-if="updateMode">
            <input class="update"
               v-model="currentTask"
               @keyup.esc="switchToUpdate"
               @keyup.enter="updateTask">
            <span class="delete" @click="deleteTask">X</span>
        </div>
        <div class="name"
             :title="task.name"
             @dblclick="switchToUpdate"
             v-else>
            {{task.name}}
        </div>
    </li>
</template>

<script type="text/babel">


  export default {
    name: 'vue-list',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        updateMode: false,
        currentTask: this.task.name
      }
    },
    methods: {
      switchToUpdate() {
        this.$set(this, 'updateMode', !this.updateMode);
        this.$set(this, 'currentTask', this.task.name);
      },
      updateTask() {
        const {id, isComplete} = this.task;
        this.$store.commit({
          type: 'setUpdateTask',
          task: {
            id,
            isComplete,
            name: this.currentTask
          }
        });
        this.switchToUpdate();
      },
      deleteTask() {
        this.switchToUpdate();
        this.$store.commit({
          type: 'setDestroyTask',
          id: this.task.id
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
   li.list {
       display: flex;
       align-items: center;
       padding: 20px 15px;

       .num {
           width: 30px;
           height: 30px;
           border-radius: 50%;
           text-align: center;
           line-height: 1.9;
           background: rgb(205, 205, 205);
           color: #fff;
           margin-right: 10px;
       }

       .name {
           width: 270px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
       }

       input.update {
           width: 250px;
           font-size: 1em;
           border: none;
           border-bottom: 1px solid;
           padding-bottom: 5px;
           outline: none;
           background: transparent;
       }

       .delete {
           margin-left: 10px;
           color: red;
           cursor: pointer;
       }
   }
</style>