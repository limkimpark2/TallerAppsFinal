<script>
// Importar componentes de BootstrapVue que se utilizarán
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BFormGroup,
  BForm,
  BFormInput,
  BFormSelect,
  BFormSelectOption,
  BButton,
} from "bootstrap-vue";

export default {
  name: "Registro",
  // Componentes de BootstrapVue que se utilizarán
  components: {
    BContainer,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BFormGroup,
    BForm,
    BFormInput,
    BFormSelect,
    BFormSelectOption,
    BButton,
  },
  data() {
    return {
      // Datos del formulario
      form: {
        usuario: null,
        rol: null,
      },
      // Opciones para el campo rol
      roles: [
        { text: "Administrador", value: "admin" },
        { text: "Usuario", value: "user" },
      ],
    };
  },
  methods: {
    ingresar() {
      // Crear cookie con el nombre del usuario
      document.cookie = `usuario=${this.form.usuario}`;
      // Crear cookie con el rol del usuario
      document.cookie = `rol=${this.form.rol}`;

      // Crear objeto con los datos del usuario
      const datosUsuario = {
        usuario: this.form.usuario,
        rol: this.form.rol,
      };

      this.$store.dispatch("setDatosUsuario", datosUsuario);

      // Redireccionar a la página de productos
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-card class="mt-4" title="Registro">
          <b-card-body>
            <b-form @submit.prevent="ingresar">
              <b-form-group class="mb-2" label="Usuario:" label-for="usuario">
                <b-form-input
                  id="usuario"
                  v-model.trim="form.usuario"
                  type="email"
                  placeholder="Ingrese su usuario"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group class="mb-2" label="Rol:" label-for="rol">
                <b-form-select
                  id="rol"
                  v-model.trim="form.rol"
                  :options="roles"
                  required
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>
                      Seleccione una opción
                    </b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>

              <b-button class="mt-2" type="submit" variant="primary"
                >Ingresar</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>