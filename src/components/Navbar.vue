<template>
    <v-row>
        <v-col col="4">
            <img src="../assets/catmash_logo.png" alt="Logo" class="logo">
        </v-col>
        <v-col col="4" offest="4" align="right">
            <div @click="openResults(true)" v-if="results != true">
                <router-link to="/">Afficher les résultats</router-link>
            </div>
            <div @click="openResults(false)" v-if="results != false">
                <router-link to="/">Retour aux choix</router-link>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: "Navbar",
  data () {
      return { 
        results: false
      }
  },
  computed: {
      currentRouteName() {
        return this.$route.name;
    }
  },
  methods: {
      openResults: function(result) {
          this.results = result;
        this.$emit('results', result)
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  max-width: 5vw;
}
</style>
