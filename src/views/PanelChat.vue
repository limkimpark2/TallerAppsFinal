<script>
import Chat from "@/components/Chat.vue";

export default {
  name: "PanelChat",
  components: {
    Chat,
  },
  data() {
    return {
      mensajeInicial: "",
    };
  },
};
</script>

<template>
  <b-container>
    <b-col cols="12">
      <Chat class="mt-4" :mensajeInicial="mensajeInicial" />
    </b-col>
  </b-container>
</template>

<style>
</style>