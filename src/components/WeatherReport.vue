<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from 'vue'

type WeatherData = {
  location : {
    localTime : Date;
    name : string;
    region : string;
  };
  current : {
    temp_c : number;
    temp_f : number;
    precip_mm : number;
    condition : {
      text : string;
      icon: string;
    };
    wind_degree: number;
    wind_kpf: number;
    wind_mph: number;
  };
};

type Coords = {
  latitude : number;
  longitude : number;
}
interface Props {
  coords : Coords;
}
const props = defineProps<Props>();

const data: Ref<WeatherData | undefined> = ref();

const fetchWeather = async (coords: Coords): Promise<WeatherData> => {
  const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const { latitude, longitude } = coords;
  const q = `${ latitude },${ longitude }`;
  const request_url = `https://api.weatherapi.com/v1/current.json?key=${ WEATHER_API_KEY }&q=${ q }`;

  const response = await fetch(request_url);
  const data = await response && response.json();

  return data;
}


onMounted( async () => {
    const { latitude, longitude } = props.coords;
    const weatherResponse = await fetchWeather({ latitude, longitude });
    data.value = weatherResponse;
  }
);



</script>

<template>
  <div>
    <article
      v-if="data && data.current"
      class="max-w-md w-96 rounded-lg shadow-lg p-4 flex bg-white text-black"
    >
      <div class="basis-1/4 text-left">
        <img :src="data.current.condition.icon" class="h-16 w-16" />
      </div>
      <div class="basis-1/4 text-left">
        <h1 class="text3x1 font-bold">
          {{ data.current.condition.text }}
          <span class="text-2xl block">{{ data.current.temp_c }}&#8451;</span>
        </h1>
        <p>{{ data.location.name }} {{ data.location.region }}</p>
        <p>Precipitation: {{ data.current.precip_mm }}mm</p>
      </div>
    </article>
    <div v-else>Loading ...</div>
  </div>
</template>

<style scoped>

</style>