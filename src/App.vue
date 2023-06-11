<script>
import BarraNavegacion from "@/components/BarraNavegacion.vue";

export default {
  name: "App",
  components: {
    BarraNavegacion,
  },
};
</script>

<template>
  <div>
    <BarraNavegacion />

    <router-view></router-view>
  </div>
</template>
