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
            <div>
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
                <button class="cancelar" >Cancelar</button>
              </div>
              <div class="c-boton-parte">
                <button class="cargar" @click="cargardatos()">Cargar</button>
              </div>
            </div>

        </div>
        <div>
          <h1>Resultados de carga</h1>
          <div class="resultado"></div>
        </div>
      </section>
      
  </section>
</template>

<script setup lang="ts">

const checkedNames = ref([])

const checkboxContainer = ref(null);

async function cargardatos() {
    console.log("DEntro")

    for(let i=0; i < checkedNames.value.length; i++){
      if(checkedNames.value[i] == "Seleccionar_todas"){
        console.log("Dentro de todas")
        break
      }else if (checkedNames.value[i] != "Seleccionar_todas"){
        if(checkedNames.value[i] == "Castilla_leon"){
          console.log("Dentro de Castilla_leon")

        }else if(checkedNames.value[i] == "Comunitat_Valenciana"){
          console.log("Dentro de Comunitat_Valenciana")

        }else if(checkedNames.value[i] == "Euskadi"){
          console.log("Dentro de Euskadi")
        }
      }

    }
    
    // const checkboxes = checkboxContainer.value.querySelectorAll("input[type='checkbox']");
    // for(let i=0; i < checkboxes.length; i++){
    //   console.log(checkboxes.value)
    // }
    // const checked = Array.from(checkboxes).filter(cb => cb.checked).length > 0;
    // console.log(checked.valueOf);


    /*try {
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
      console.log("Respuesta:", res); // Imprime la respuesta en consola
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }*/
    
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
  width: 500px
  margin: 0 auto
  h1
    margin: 20px 0px

.contenedor-input
  display: flex
  align-content: center
  h2
    font-size: 30px

.input
  padding: 10px 15px
  display: flex
  align-content: center
  input
    height: 20px
    width: 20px
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
  margin-top: 25px
  width: 100%
  height: 20vh
  /* background-color: brown; */
  border: 2px solid black
  border-radius: 15px
</style>