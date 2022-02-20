<template>
    <table id="task-table" class="table table-striped table-sm">
      <thead>
      <tr>
        <th>
          <div><span class="table-th-sort-span"></span>Aufgabenname</div>
        </th>
        <th>
          <div><span class="table-th-sort-span"></span>Typ</div>
        </th>
        <th>
          <div><span class="table-th-sort-span"></span>Distanz</div>
        </th>
        <th>
          <div><span class="table-th-sort-span"></span>Wendepunkte</div>
        </th>
        <th class="table-th-sort">
          <div><span class="table-th-sort-span"></span>Letzte Änderung</div>
        </th>
        <th>
          <div><span class="table-th-sort-span"></span></div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="table-tr-odd table-tr-group-head table-tr-selected ">
        <td class="name">tes</td>
        <td class="">Rennaufgabe</td>
        <td class="">150.6&nbsp;km</td>
        <td class="">4</td>
        <td class="table-td-sort">18.02.2022, 22:44:27</td>
        <td class=""><img src="images/delete.png"></td>
      </tr>
      </tbody>
    </table>
  <div class="buttons">
    <button class="button">Aufgabe laden</button>
    <button class="button">Abbrechen</button>
  </div>
</template>

<script>
export default {
  name: "load_tab"
}
</script>

<style scoped>

</style>