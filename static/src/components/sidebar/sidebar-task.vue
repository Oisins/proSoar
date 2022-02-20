<template>
  <div class="sidebar-item d-flex flex-column">
    <h3 class="task-header">Task</h3>
    <div class="task-container">
      <div id="task-options d-flex justify-content-center">
        <button class="button" @click="newTask">New &amp; Load</button>
        <button class="button" onclick="javascript:proSoar.saveTask('open');">Save &amp; Export</button>
      </div>
      <div id="task-turnpoints-container">
        <div id="task-turnpoints"></div>
      </div>
      <div class="task-total">
        Total task distance: <span id="task-total-distance">{{ current_task.taskLength }} km</span>
        <br/>
        <span id="task-is-fai"></span>
      </div>
      <!--
                <div id="task-options-link">
                  <a onclick="javascript:proSoar.taskGeneralOptions();">General task options</a>
                </div>
      -->
    </div>
  </div>
  <popup ref="popup"></popup>
</template>

<script>
import Popup from "../popup/task/task_popup.vue";
import {mapState} from "vuex";

export default {
  name: "sidebar-task",
  components: {Popup},
  computed: mapState([
    // map this.count to store.state.count
    'current_task'
  ]),
  methods: {
    newTask() {
      this.$refs.popup.show()

    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-item {
  flex: 1;
}

.task-container {
  display: flex;
  flex-direction: column;
  flex: 1;

  .task-total {
    background-color: #d5d5d5;
    margin-top: auto;
    padding: 1em;
  }
}

.task-header {
  background-color: #e1e1e1;
  color: #515151;
  font-weight: bold;
  padding-left: 0.5em;
  margin: 4px 0 0 0;
  cursor: pointer;
}
</style>