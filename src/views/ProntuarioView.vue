<template>
  <div class="prontuario-view">
    <div class="input-group">
      <span class="input-group-text">First and last name</span>
      <input type="text" aria-label="First name" class="form-control">
      <input type="text" aria-label="Last name" class="form-control">
    </div>
  </div>

  <table class="table table-hover">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
  </table>
</template>

<script>

export default {
  name: 'ProntuarioView',
  components: {
  }
}
</script>

<style scoped>

</style>

