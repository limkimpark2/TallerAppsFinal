import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    usuario: null,
    rol: null,
  },
  mutations: {
    setDatosUsuario(state, datos) {
      state.usuario = datos.usuario;
      state.rol = datos.rol;
    },
  },
  actions: {
    setDatosUsuario(context, datos) {
      context.commit("setDatosUsuario", datos);
    },
  },
  getters: {
    getDatosUsuario(state) {
      return {
        usuario: state.usuario,
        rol: state.rol,
      };
    },
  },
});

export default store;
