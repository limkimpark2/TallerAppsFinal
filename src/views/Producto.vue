<script>
import {
  BContainer,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BCard,
} from "bootstrap-vue";
import productos from "@/productos.js";
import socket from "@/socket.js";

export default {
  name: "Producto",
  components: {
    BContainer,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BCard,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  created() {
    socket.on("nuevo-comentario", (datos) => {
      this.comentarios.push(datos);
    });
  },
  data() {
    return {
      productos: productos,
      comentarios: [],
      comentario: null,
    };
  },
  computed: {
    usuario() {
      return this.$store.state.usuario;
    },
    producto() {
      const productoId = parseInt(this.id);

      return this.productos.find((producto) => producto.id === productoId);
    },
  },
  methods: {
    comprar() {
      socket.emit("compra", {
        usuario: this.usuario,
        producto: this.producto,
      });
    },
    agregarComentario() {
      if (this.comentario) {
        socket.emit("comentario", {
          usuario: this.usuario,
          producto: this.producto,
          comentario: this.comentario,
        });

        this.comentario = null;
      }
    },
  },
};
</script>

<template>
  <b-container>
    <template v-if="producto">
      <b-row>
        <b-col cols="12">
          <h3 class="mt-4">{{ producto.nombre }}</h3>
        </b-col>

        <b-col cols="12" md="4">
          <img :src="`/imagenes/${producto.imagen}`" class="img-fluid w-100" />
        </b-col>

        <b-col cols="12" md="8">
          <p class="mt-4">{{ producto.descripcion }}</p>

          <p class="mt-4">
            {{ producto.descripcionLarga }}
          </p>

          <b-button variant="primary" @click="comprar">Comprar</b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <h4 class="mt-4">Comentarios</h4>
        </b-col>

        <b-col cols="12">
          <b-form @submit.prevent="agregarComentario">
            <b-form-group>
              <b-form-textarea
                v-model.trim="comentario"
                placeholder="Realiza un comentario"
                required
              />
            </b-form-group>

            <b-button variant="primary" type="submit">
              Agregar comentario
            </b-button>
          </b-form>
        </b-col>

        <b-col cols="12">
          <template v-if="comentarios.length > 0">
            <h5 class="mt-4">Hay {{ comentarios.length }} comentario(s)</h5>

            <b-card
              class="mb-3"
              v-for="comentario in comentarios"
              :key="comentario.id"
            >
              <b-card-text>
                <b>{{ comentario.usuario }}</b>
                <p>{{ comentario.comentario }}</p>
              </b-card-text>
            </b-card>
          </template>

          <p v-else class="text-center mt-4">No hay comentarios</p>
        </b-col>
      </b-row>
    </template>

    <b-row v-else>
      <b-col cols="12">
        <h1 class="text-center mt-5">Producto no encontrado</h1>

        <router-link class="d-block text-center" to="/">
          Ir a la página principal
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>