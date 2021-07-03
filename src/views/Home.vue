<template>
  <v-container>
      <Navbar />
      <CatMash v-if="results != true" />
      <Results v-if="results != false" />
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar";
import CatMash from "../components/CatMash";
import Results from "../components/Results";

export default {
  name: "Home",

  components: {
    Navbar,
    CatMash,
    Results
  },
  data () {
    return {
      results: true
    }
  }
};
</script>

<style scoped>

</style>