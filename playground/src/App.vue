<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <div id="app">
    <h1>Playground</h1>

    <div id="mlbr">
      <MapLibre />
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;

  height: 100vh;
  width: 100vw;
}

#app {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
}

#mlbr {
  flex-grow: 1;
  background-color: aliceblue;
}

#mlbr,
.maplibregl-map {
  height: 100%;
  width: 100%;
}
</style>
