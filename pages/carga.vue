/<template>
  <section class="c-primary ">
      <navprimary />
      <section class="section-input">
        <div class="caja-input">
          <h1>Pagina de carga</h1>
          <div class="contenedor-input" ref="checkboxContainer">
            <div>
              <h2>Seleccione fuente: </h2>
            </div>
            <div class="caja-inputs">
              <div class="input">
                <input type="checkbox" name="seleccionar_todas" id="" value="Seleccionar_todas" v-model="checkedNames"/>
                <label for="seleccionar_todas">Seleccionar todas</label>
              </div>
              <div class="input" >
                <input type="checkbox" name="" id="" value="Castilla_leon" v-model="checkedNames"/>
                <label for="">Castilla y León</label>
              </div>
              <div class="input">
                <input type="checkbox" name="" id="" value="Comunitat_Valenciana" v-model="checkedNames"/>
                <label for="">Comunitat Valenciana</label>
              </div>
              <div class="input">
                <input type="checkbox" name="" id="" value="Euskadi" v-model="checkedNames"/>
                <label for="">Euskadi</label>
              </div>
            </div>
          </div>

          <div class="c-boton">
              <div class="c-boton-parte">
                <button class="cancelar" @click="borrardatos()">Borrar</button>
              </div>
              <div class="c-boton-parte">
                <button class="cargar" @click="cargardatos()">Cargar</button>
              </div>
            </div>

        </div>
        <div>
          <h1>Resultados de carga:</h1>
          <div class="resultado" id="insertar_res">
          </div>
        </div>
      </section>
      
  </section>
</template>

<script setup lang="ts">

const checkedNames = ref([])

async function cargardatos() {
    let miDiv = document.getElementById("insertar_res");
    let correctos = 0
    let reparados = [];
    let rechazados = [];

    for(let i=0; i < checkedNames.value.length; i++){
      if(checkedNames.value[i] == "Seleccionar_todas"){
        try {
          let res = await $fetch('http://127.0.0.1:8000/load/CLE/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido
            },
            body: JSON.stringify({
              // Tu formulario o datos aquí
              ejemplo: "valor",
            }),
          });
          correctos+=parseInt(res[0]?.correctos)
          reparados.push(res[0]?.reparados)
          rechazados.push(res[0]?.rechazados)

          res = await $fetch('http://127.0.0.1:8000/load/CV/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido
            },
            body: JSON.stringify({
              // Tu formulario o datos aquí
              ejemplo: "valor",
            }),
          });
          correctos+=parseInt(res[0]?.correctos)
          reparados.push(res[0]?.reparados)
          rechazados.push(res[0]?.rechazados)

          res = await $fetch('http://127.0.0.1:8000/load/EUS/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido
            },
            body: JSON.stringify({
              // Tu formulario o datos aquí
              ejemplo: "valor",
            }),
          });
          correctos+=parseInt(res[0]?.correctos)
          reparados.push(res[0]?.reparados)
          rechazados.push(res[0]?.rechazados)

          miDiv.innerHTML = `
                          <H2>Número de registros cargados correctamente:</H2> <p> ${correctos}</p>
                          <H2>Registrados con errores y reparados:</H2"><p> ${reparados}</p>
                          <H2>Registrados con errores y rechazados:</H2><p> ${rechazados}</p>
                        `;
          

        } catch (error) {
          console.error("Error en la solicitud:", error);
        }

        break

      }else if (checkedNames.value[i] != "Seleccionar_todas"){
        if(checkedNames.value[i] == "Castilla_leon"){
          //console.log("Dentro de Castilla_leon")

          try {
            const res = await $fetch('http://127.0.0.1:8000/load/CLE/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Especifica el tipo de contenido
              },
              body: JSON.stringify({
                // Tu formulario o datos aquí
                ejemplo: "valor",
              }),
            });
            //console.log("Respuesta:", res); // Imprime la respuesta en consola
            miDiv.innerHTML = `
                          <H2>Número de registros cargados correctamente:</H2> <p> ${res[0]?.correctos || "0"}</p>
                          <H2>Registrados con errores y reparados:</H2"><p> ${res[0]?.reparados || "0"}</p>
                          <H2>Registrados con errores y rechazados:</H2><p> ${res[0]?.rechazados || "0"}</p>
                        `;
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }

        }else if(checkedNames.value[i] == "Comunitat_Valenciana"){
          //console.log("Dentro de Comunitat_Valenciana")

          try {
            const res = await $fetch('http://127.0.0.1:8000/load/CV/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Especifica el tipo de contenido
              },
              body: JSON.stringify({
                // Tu formulario o datos aquí
                ejemplo: "valor",
              }),
            });
            //console.log("Respuesta:", res); // Imprime la respuesta en consola
            miDiv.innerHTML = `
                          <H2>Número de registros cargados correctamente:</H2> <p> ${res[0]?.correctos || "0"}</p>
                          <H2>Registrados con errores y reparados:</H2"><p> ${res[0]?.reparados || "0"}</p>
                          <H2>Registrados con errores y rechazados:</H2><p> ${res[0]?.rechazados || "0"}</p>
                        `;
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }


        }else if(checkedNames.value[i] == "Euskadi"){
          //console.log("Dentro de Euskadi")
          try {
            const res = await $fetch('http://127.0.0.1:8000/load/EUS/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Especifica el tipo de contenido
              },
              body: JSON.stringify({
                // Tu formulario o datos aquí
                ejemplo: "valor",
              }),
            });
            console.log("Respuesta:", res); // Imprime la respuesta en consola
            miDiv.innerHTML = `
                          <H2>Número de registros cargados correctamente:</H2> <p> ${res[0]?.correctos || "0"}</p>
                          <H2>Registrados con errores y reparados:</H2"><p> ${res[0]?.reparados || "0"}</p>
                          <H2>Registrados con errores y rechazados:</H2><p> ${res[0]?.rechazados || "0"}</p>
                        `;
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }
        }
      }

    }
  }

async function borrardatos() {
  let miDiv = document.getElementById("insertar_res");
  try {
    const res = await $fetch('http://127.0.0.1:8000/clear-database/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Especifica el tipo de contenido
      },
      body: JSON.stringify({
        // Tu formulario o datos aquí
        ejemplo: "valor",
      }),
    });
    //console.log("Respuesta:", res); // Imprime la respuesta en consola
    miDiv.innerHTML = res.message;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

</script>

<style lang="sass">

*
  margin: 0
  padding: 0

.section-input
  width: 70%
  margin: 0 auto
  padding-top: 10px

.caja-input
  width: 600px
  margin: 0 auto
  h1
    margin: 20px 0px
    text-align: center
    font-size: 36px

.contenedor-input
  display: flex
  align-content: center
  h2
    font-size: 30px
.caja-inputs
  padding-top: 26px

.input
  padding: 5px 15px
  display: flex
  align-content: center
  input
    height: 20px
    width: 20px
    margin: 4px
  label
    margin-left: 10px
    font-size: 20px

.c-boton
  width: 300px
  margin: 0 auto
  display: flex
  padding: 20px 0px

  &-parte
    margin: 0 20px
    button
      padding: 10px 25px
      border: none
      border-radius: 5px
      font-size: 20px
      cursor: pointer
      

.cancelar
  background-color: #ff5a5a
  color: white

.cancelar:hover
  background-color: #d51b1b
  color: white

.cargar
  background-color: #72a1fd
  color: white
.cargar:hover
  background-color: #0095ff
  color: white

.resultado
  padding: 20px
  margin-top: 25px
  width: 100%
  height: auto
  /* background-color: brown; */
  border: 2px solid #5473ca
  border-radius: 15px

  p
    margin-top: 5px
    margin-bottom: 10px
    font-weight: normal

  h2
    font-weight: bold
</style>