import Vue from "vue";
import VueRouter from "vue-router";
import { obtenerDatoCookie } from "./utils";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/registro",
    name: "registro",
    component: () => import("@/views/Registro.vue"),
  },
  {
    path: "/panel-compras",
    name: "panel-compras",
    component: () => import("@/views/PanelCompras.vue"),
  },
  {
    path: "/panel-chat",
    name: "panel-chat",
    component: () => import("@/views/PanelChat.vue"),
  },
  {
    path: "/productos/:id",
    name: "producto",
    component: () => import("@/views/Producto.vue"),
    props: true,
  },
  {
    path: "/no-encontrado",
    name: "no-encontrado",
    component: () => import("@/views/NoEncontrado.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

// Guard para verificar si el usuario está registrado
router.beforeEach((to, from, next) => {
  // Obtener el nombre del usuario de la cookie
  const usuario = obtenerDatoCookie("usuario");
  // Obtener el rol del usuario de la cookie
  const rol = obtenerDatoCookie("rol");

  // Si el usuario no existe, redireccionar a la página de registro
  if ((!usuario || !rol) && to.name !== "registro") {
    return next({ name: "registro" });
  }

  if (usuario && rol) {
    store.dispatch("setDatosUsuario", { usuario, rol });

    // Si el usuario existe y está en la página de registro, redireccionar a la página de inicio
    if (to.name === "registro") {
      return next({ name: "home" });
    }
  }

  return next();
});

export default router;
