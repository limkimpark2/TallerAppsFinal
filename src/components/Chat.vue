<script>
import socket from "@/socket.js";

export default {
  name: "Chat",
  props: {
    mensajeInicial: {
      type: String,
      default: "",
    },
  },
  computed: {
    usuario() {
      return this.$store.state.usuario;
    },
  },
  created() {
    // Escuchar los mensajes del chat que envía el servidor
    socket.on("chat", ({ usuario, mensaje }) => {
      this.chats.push({ usuario, mensaje });

      // Hacer scroll hacia abajo
      this.$nextTick(() => {
        this.$refs.chatRef.scrollTop = this.$refs.chatRef?.scrollHeight;
      });
    });
  },
  data() {
    return {
      mensaje: this.mensajeInicial,
      chats: [],
    };
  },
  methods: {
    enviarMensaje() {
      const mensaje = this.mensaje;

      if (mensaje) {
        socket.emit("chat", {
          usuario: this.usuario,
          mensaje: mensaje.replace(/\r?\n/g, "<br>"),
        });

        this.mensaje = null;
      }
    },
  },
};
</script>

<template>
  <div class="chat-container">
    <div class="chat" ref="chatRef">
      <div
        v-for="(chat, indice) in chats"
        :key="indice"
        class="chat__fila"
        :class="[
          chat.usuario === usuario
            ? 'chat__fila--izquierda'
            : 'chat__fila--derecha',
        ]"
      >
        <div class="burbuja">
          <span class="burbuja__usuario">{{
            chat.usuario === usuario ? "Yo" : chat.usuario
          }}</span>
          <p class="burbuja__texto" v-html="chat.mensaje"></p>
        </div>
      </div>
    </div>

    <div class="chat__container-formulario">
      <b-form @submit.prevent="enviarMensaje">
        <b-row>
          <b-col cols="12" lg="10">
            <div class="form-floating">
              <b-form-textarea
                v-model.trim="mensaje"
                placeholder="Escribe un mensaje"
                rows="3"
              ></b-form-textarea>
            </div>
          </b-col>

          <b-col cols="12" lg="2">
            <b-button type="submit" variant="primary" block>Enviar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<style scoped>
.chat {
  height: calc(100vh - 20rem);
  border: 1px solid #dfdfdf;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.chat__container-formulario {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #dfdfdf;
  padding: 1rem;
}

.chat__fila {
  display: flex;
  margin-bottom: 1rem;
}

.chat__fila--izquierda {
  justify-content: flex-start;
}

.chat__fila--derecha {
  justify-content: flex-end;
}

.burbuja {
  position: relative;
  background-color: #fff;
  border: 1px solid #1e3441bb;
  padding: 0.5rem;
  width: fit-content;
  max-width: 100%;
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .burbuja {
    max-width: 70%;
  }
}

@media (min-width: 1400px) {
  .burbuja {
    max-width: 50%;
  }
}

.chat__fila--izquierda .burbuja {
  border-radius: 0 0.5rem 0.5rem 0;
  border-left: 0.5rem solid #0a1014;
}

.chat__fila--derecha .burbuja {
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: 0.5rem solid #0a1014;
}

.burbuja__usuario {
  font-size: 0.8rem;
  color: #0a1014;
  font-weight: bold;
}

.burbuja__texto {
  font-size: 0, 90625rem;
  padding: 0.5rem 0;
  margin: 0;
  font-size: 1rem;
  color: #0a1014;
}
</style>