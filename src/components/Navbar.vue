<template>
    <v-row>
        <v-col col="4">
            <img src="../assets/catmash_logo.png" alt="Logo" class="logo">
        </v-col>
        <v-col col="4" offest="4" align="right">
            <router-link to="/">Afficher les résultats</router-link>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    // msg: String,
  },
  computed: {
      currentRouteName() {
        return this.$route.name;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  max-width: 5vw;
}
</style>
