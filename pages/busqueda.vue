<template>
    <section class="c-primary ">
        <navprimary />
        <h1>Pagina de busqueda</h1>
        <div class="filters">
            <input type="text" v-model="localidad" placeholder="Localidad" />
            <input type="text" v-model="provincia" placeholder="Provincia" />
            <input type="text" v-model="codigoPostal" placeholder="Código Postal" />
            <select v-model="tipo">
                <option value="">Seleccionar tipo</option>
                <option value="Yacimiento arqueológico">Yacimiento arqueológico</option>
                <option value="Iglesia-Ermita">Iglesia-Ermita</option>
                <option value="Monasterio-Convento">Monasterio-Convento</option>
                <option value="Castillo-Fortaleza-Torre">Castillo-Fortaleza-Torre</option>
                <option value="Edificio singular">Edificio singular</option>
                <option value="Puente">Puente</option>
                <option value="Otros">Otros</option>
            </select>
        </div>
        <button id="load-button" @click="loadMonuments">Buscar Monumentos</button>
        <div id="map"></div>
        <div class="table-container">
            <h2>Lista de Monumentos</h2>
            <table>
                <thread>
                    <tr>
                        <th>Nombre</th>
                        <td>Tipo</td>
                        <td>Dirección</td>
                        <td>Cód. postal</td>
                        <td>Descripción</td>
                        <td>Localidad</td>
                    </tr>
                </thread>
                <tbody>
                    <tr v-for="monumento in monumentos" : key="monumento.nombre">
                        <td>{{ monumento.nombre }}</td>
                        <td>{{ monumento.tipo }}</td>
                        <td>{{ monumento.direccion }}</td>
                        <td>{{ monumento.codigo_postal }}</td>
                        <td>{{ monumento.descripcion }}</td>
                        <td>{{ monumento.en_localidad }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import L from 'leaflet';

    let map;

    const localidad = ref("");
    const provincia = ref("");
    const codigoPostal = ref("");
    const tipo = ref("");
    const monumentos = ref([]);

    onMounted(() => {

        map = L.map('map').setView([40.4168, -3.7038], 6);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    });
    async function loadMonuments() {
        try {
            const queryParams = new URLSearchParams();

            if (localidad.value) queryParams.append("Nombre de la localidad", localidad.value);
            if (provincia.value) queryParams.append("Nombre de la provincia", provincia.value);
            if (codigoPostal.value) queryParams.append("Codigo postal", codigoPostal.value);
            if (tipo.value) queryParams.append("Tipo de monumento", tipo.value);

            const response = await fetch(
                `http://127.0.0.1:8000/search/?${queryParams.toString()}`
            );

            if (!response.ok) {
                throw new Error("Error al obtener los monumentos");
            }

            const data = await response.json();

            monumentos.value = data;

            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) map.removeLayer(layer);
            });


            data.forEach((monumento) => {
                L.marker([monumento.latitud, monumento.longitud])
                    .addTo(map)
                    .bindPopup(`<strong>${monumento.nombre}</strong>`);
            });
        } catch (err) {
            console.error("Error:", err);
        }
    }
    }
</script>

<style scoped>
    #map {
        height: 500px;
        width: 100%;
        margin-top: 20px;
    }

    .filters {
        margin-bottom: 10px;
    }

        .filters input,
        .filters select {
            margin-right: 10px;
            padding: 5px;
        }

        .filters button {
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }

            .filters button:hover {
                background-color: #0056b3;
            }

    .table-container {
        margin-top: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
</style>