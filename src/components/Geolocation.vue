<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import WeatherReport from './WeatherReport.vue';

type Geolocation = {
  latitude : number;
  longitude : number;
};
const coords: Ref<Geolocation | undefined> = ref();
const geolocationByUser: Ref<boolean> = ref(false);

const getGeolocation = async (): Promise<void> => {
  await navigator.geolocation.getCurrentPosition(
    (position: { coords : Geolocation }) => {
      coords.value = position.coords;
    },
    (error: { message : string }) => {
      geolocationByUser.value = true;
      console.error(error.message);
    }
  );
};

onMounted(async () => {
  await getGeolocation();
});

</script>


<template>
  <WeatherReport v-if="coords && !geolocationByUser" :coords="coords" />
  <div v-if="geolocationByUser">User denied access</div>
</template>


<style scoped></style>