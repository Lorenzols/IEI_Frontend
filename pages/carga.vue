/<template>
  <section class="c-primary ">
      <navprimary />
      <section class="section-input">
        <div class="caja-input">
          <h1>Pagina de carga</h1>
          <div class="contenedor-input">
            <div>
              <h2>Seleccione fuente: </h2>
            </div>
            <div>
              <div class="input">
                <input type="checkbox" name="seleccionar_todas" id=""/>
                <label for="seleccionar_todas">Seleccionar todas</label>
              </div>
              <div class="input">
                <input type="checkbox" name="" id=""/>
                <label for="">Castilla y León</label>
              </div>
              <div class="input">
                <input type="checkbox" name="" id=""/>
                <label for="">Comunitat Valenciana</label>
              </div>
              <div class="input">
                <input type="checkbox" name="" id=""/>
                <label for="">Euskadi</label>
              </div>
            </div>
          </div>

          <div class="c-boton">
              <div class="c-boton-parte">
                <button class="cancelar">Cancelar</button>
              </div>
              <div class="c-boton-parte">
                <button class="cargar">Cargar</button>
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

<script>
export default {

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

.cancelar
  background-color: #ff5a5a
  color: white

.cargar
  background-color: #72a1fd
  color: white

.resultado
  margin-top: 25px
  width: 100%
  height: 20vh
  /* background-color: brown; */
  border: 2px solid black
  border-radius: 15px
</style>