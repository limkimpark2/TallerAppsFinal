<script>
import {
  BNavbar,
  BNavbarBrand,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BNavbarToggle,
  BNavForm,
  BFormInput,
  BButton,
  BNavItemDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "BarraNavegacion",
  components: {
    BNavbar,
    BNavbarBrand,
    BCollapse,
    BNavbarNav,
    BNavItem,
    BNavbarToggle,
    BNavForm,
    BFormInput,
    BButton,
    BNavItemDropdown,
    BDropdownItem,
  },
  computed: {
    ...mapGetters(["getDatosUsuario"]),
  },
};
</script>

<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand :to="{ name: 'home' }">Inicio</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-if="!getDatosUsuario.usuario || !getDatosUsuario.rol"
          :to="{ name: 'registro' }"
          >Registro</b-nav-item
        >
        <b-nav-item :to="{ name: 'panel-compras' }"
          >Panel de compras</b-nav-item
        >
        <b-nav-item :to="{ name: 'panel-chat' }">Panel de chat</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <div>
          <strong class="d-block text-white mr-2">{{
            getDatosUsuario.usuario
          }}</strong>
          <small class="d-block text-white mr-2">{{
            getDatosUsuario.rol
          }}</small>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>