<script>
import { BContainer, BRow, BCol, BTable } from "bootstrap-vue";
import socket from "@/socket.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { generarColoresAleatorios } from "@/utils.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "PanelCompras",
  components: {
    BContainer,
    BRow,
    BCol,
    BTable,
    Bar,
  },
  data() {
    return {
      productosComprados: [],
      campos: [
        { key: "id", label: "Id." },
        { key: "nombre", label: "Nombre" },
        { key: "cantidad", label: "Cantidad" },
        { key: "precio", label: "Precio" },
        { key: "subtotal", label: "Subtotal" },
      ],
      chartOptions: {
        responsive: true,
      },
      coloresFondo: generarColoresAleatorios(10),
    };
  },
  created() {
    socket.on("nueva-compra", (datos) => {
      const { precio } = datos.producto;
      // Comprobar si el producto ya esta en la lista de productos comprados
      const indiceProductoDentroListaProductos =
        this.productosComprados.findIndex(
          (producto) => producto.id === datos.producto.id
        );

      if (indiceProductoDentroListaProductos !== -1) {
        // Aumentar la cantidad del producto
        this.productosComprados[indiceProductoDentroListaProductos].cantidad++;
        // Aumentar el subtotal del producto
        this.productosComprados[indiceProductoDentroListaProductos].subtotal +=
          precio;
      } else {
        // Agregar el producto a la lista de productos comprados
        this.productosComprados.push({
          cantidad: 1,
          subtotal: precio,
          ...datos.producto,
        });
      }
    });
  },
  computed: {
    chartData() {
      return {
        labels: this.productosComprados.map((producto) => producto.nombre),
        datasets: [
          {
            label: "Cantidad",
            backgroundColor: this.coloresFondo,
            data: this.productosComprados.map((producto) => producto.cantidad),
          },
        ],
      };
    },
  },
};
</script>

<template>
  <b-container>
    <b-row class="mt-4">
      <b-col cols="12">
        <h3 class="text-center">Productos comprados</h3>

        <b-table
          bordered
          hover
          :items="productosComprados"
          :fields="campos"
          show-empty
        >
          <template #empty="scope">
            <h6 class="text-center">No hay registros para mostrar</h6>
          </template>
          <template #emptyfiltered="scope">
            <h6 class="text-center">No hay registros para mostrar</h6>
          </template></b-table
        >
      </b-col>

      <b-col cols="12">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
      </b-col>
    </b-row>
  </b-container>
</template>

