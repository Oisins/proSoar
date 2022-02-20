<template>
  <div style="display: flex; flex-direction: column;" class="sidebar">
    <h1>SIDEBAR</h1>
    <sidebar-task></sidebar-task>
  </div>
</template>

<script>
import SidebarTask from "./sidebar/sidebar-task.vue";

export default {
  name: "sidebar",
  components: {SidebarTask}
}
</script>

<style scoped>
  .sidebar {
    box-shadow: rgba(0, 0, 0, 0.1) 10px 0 10px;
    z-index: 1;
  }
</style>