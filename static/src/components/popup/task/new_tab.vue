<template>
  <div class="row g-3 mb-3">
    <label class="col-3 col-form-label" for="task-options-tab-fields-type">Auftabentyp:</label>
    <div class="col-9">
      <select id="task-options-tab-fields-type" class="form-select">
        <option selected="selected" value="racing">Rennaufgabe</option>
        <option value="aat">Assigned Area Task</option>
        <option value="fai">FAI Abzeichen/Rekord</option>
      </select>
    </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-success">Neue Aufgabe</button>
    <button class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
  </div>
</template>

<script>
export default {
  name: "new-tab"
}
</script>

<style scoped>

</style>