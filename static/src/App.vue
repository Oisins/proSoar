<template>
  <sidebar style="width: 20%"></sidebar>
  <moving-map style="width: 80%"></moving-map>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
}

</style>

<script>
import Sidebar from "./components/sidebar.vue";
import MovingMap from "./components/moving-map";


export default {
  components: {Sidebar, MovingMap},
  data() {
    return {
      name: "Vue",
    };
  },
};
</script>