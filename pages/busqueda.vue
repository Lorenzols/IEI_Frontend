<template>
    <section class="c-primary ">
        <navprimary />
        <h1 class="titulo1">Pagina de busqueda</h1>
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
        <button id="load-button" @click="loadMonuments" class="boton-buscar">Buscar Monumentos</button>
        <div id="map" class="mapa"></div>
        <div class="table-container">
            <h2 class="titulo2">Lista de Monumentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Dirección</th>
                        <th>Cod. postal</th>
                        <th>Descripción</th>
                        <th>Localidad</th>
                        <th>Provincia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="monumento in monumentos" :key="monumento.nombre">
                        <td>{{ monumento.nombre }}</td>
                        <td>{{ monumento.tipo }}</td>
                        <td>{{ monumento.direccion }}</td>
                        <td>{{ monumento.codigo_postal }}</td>
                        <td>{{ monumento.descripcion }}</td>
                        <td>{{ monumento.en_localidad }}</td>
                        <td>{{ monumento.en_provincia }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    let map;

    const localidad = ref("");
    const provincia = ref("");
    const codigoPostal = ref("");
    const tipo = ref("");
    const monumentos = ref([]);

    onMounted(async() => {
        if (typeof window !== 'undefined') {
            const L = await import('leaflet');
            await import('leaflet/dist/leaflet.css');
        
        map = L.map('map').setView([40.4168, -3.7038], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        }
    });
    async function loadMonuments() {
        try {
            const queryParams = new URLSearchParams();

            if (localidad.value) queryParams.append("localidad", localidad.value);
            if (provincia.value) queryParams.append("provincia", provincia.value);
            if (codigoPostal.value) queryParams.append("codigo_postal", codigoPostal.value);
            if (tipo.value) queryParams.append("tipo", tipo.value);

            const response = await fetch(
                `http://127.0.0.1:8004/search/?${queryParams.toString()}`
            )

            if (!response.ok) {
                monumentos.value = [];
                map.eachLayer((layer) => {
                if (layer instanceof L.Marker) map.removeLayer(layer);
            });
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
</script>

<style scoped>
    #map {
        height: 500px;
        width: calc(80%);
        margin: auto;
        border-radius: 10px;
    }

    .titulo1 {
      padding: 20px 30px;
    }
    .filters {
        margin-bottom: 10px;
        margin-left: 30px;
    }

    .boton-buscar{
      padding: 10px 14px;
      margin: 5px 30px;
      background-color: #72a1fd;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 20px;
      cursor: pointer;
      margin-bottom: 25px;
    }

        .filters input,
        .filters select {
            margin-right: 15px;
            padding: 10px 14px;
            font-size: 16px;
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
      margin: 20px 30px;
    }
    .titulo2{
      margin-top: 20px;
      margin-bottom: 10px;
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