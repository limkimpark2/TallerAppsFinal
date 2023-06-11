<script>
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BCardText,
  BButton,
} from "bootstrap-vue";
import productos from "@/productos.js";
import socket from "@/socket.js";
import Chat from "@/components/Chat.vue";

export default {
  name: "Home",
  components: {
    BContainer,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BButton,
    Chat,
  },
  data() {
    return {
      productos: productos,
      productoSeleccionado: null,
    };
  },
  computed: {
    mensajeInicial() {
      return this.productoSeleccionado
        ? `Hola, alguien me puede comentar sobre el producto ${this.productoSeleccionado.nombre}`
        : "";
    },
  },
  methods: {
    comprar(productoId) {
      this.productoSeleccionado = this.productos.find(
        (producto) => producto.id === productoId
      );

      socket.emit("compra", {
        usuario: this.usuario,
        producto: this.productoSeleccionado,
      });
    },
    mostrarModalChat(productoId) {
      this.productoSeleccionado = this.productos.find(
        (producto) => producto.id === productoId
      );

      this.$bvModal.show("modalChat");
    },
  },
};
</script>

<template>
  <b-container>
    <b-row class="mt-4">
      <!-- Se recorre el arreglo de productos y se muestra cada uno -->
      <b-col
        cols="12"
        md="4"
        xl="3"
        v-for="producto in productos"
        :key="producto.id"
      >
        <b-card
          class="mb-4"
          :title="producto.nombre"
          :img-src="`imagenes/${producto.imagen}`"
          :img-alt="producto.nombre"
          img-top
        >
          <b-card-text>
            {{ producto.descripcion }}

            <router-link
              class="d-inline"
              :to="{ name: 'producto', params: { id: producto.id } }"
            >
              Ver más
            </router-link>
          </b-card-text>

          <b-button
            class="my-1"
            variant="primary"
            @click="comprar(producto.id)"
          >
            Comprar
          </b-button>

          <b-button
            class="ml-2 my-1"
            variant="secondary"
            @click="mostrarModalChat(producto.id)"
            >Chatear</b-button
          >
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modalChat" title="Chat" size="xl" hide-footer>
      <Chat :mensajeInicial="mensajeInicial" />
    </b-modal>
  </b-container>
</template>