<template>
  <v-container>
      <Navbar />
      <CatMash />
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar";
import CatMash from "../components/CatMash";

export default {
  name: "Home",

  components: {
    Navbar,
    CatMash
  },
};
</script>

<style scoped>

</style>