<template>
  <Teleport to="body">
    <div class="modal" tabindex="-1" id="mod">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New & Load Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab"
                        aria-controls="home" aria-selected="true">New
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab"
                        aria-controls="profile" aria-selected="false">Load
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active p-3" id="home" role="tabpanel" aria-labelledby="home-tab">
                <new-tab></new-tab>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <load_tab></load_tab>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>

import {Modal} from 'bootstrap';
import NewTab from './new_tab';
import Load_tab from "./load_tab";

export default {
  name: "popup",
  components: {Load_tab, NewTab},
  data() {
    return {
      modal: null
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('mod'));
  },
  methods: {
    show() {
      this.modal.show();
    }
  }
}
</script>

<style scoped>

</style>