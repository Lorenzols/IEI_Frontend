/<template>
  <section class="c-primary ">
      <nav-primary />
      <Nuxt :key="$route.fullPath"/>
      <footer-primary class="footer-primary"/>
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

.c-primary 
    display: flex
    flex-direction: column
    min-height: 100vh

</style>