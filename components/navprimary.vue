<template>
    <nav class="nav">
        <div class="nav-link">
            <NuxtLink to="/carga">Carga de monumentos</NuxtLink>
        </div>
        <div class="nav-link">
            <NuxtLink to="/busqueda">Busqueda de monumentos</NuxtLink>
        </div>
    </nav>
</template>
    
<script>
export default {

}
</script>

<style lang="sass" scoped>
.nav
    background-color: #3b84bd
    height: 65px
    display: flex
    align-items: center
    color: white
    justify-content: left
    padding: 0 25px
    z-index: 3
    position: relative

    &-link
        a
            text-decoration: none
            margin: 0px 25px
            font-size: 22px
            color: white




</style>