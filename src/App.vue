<template>
  <div id="app">
    <h1 style="text-align: center">
      <router-link to="/">带参查询</router-link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <router-link to="/noargs">不带参查询</router-link>
    </h1>
    <router-view style="width:800px;margin:20px auto"></router-view>
  </div>
</template>

<script>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.flex {
  display: flex;
}

</style>
