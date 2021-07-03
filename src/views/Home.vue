<template>
  <v-container>
      <Navbar />
      <CatMash />
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Home",

  components: {
    Navbar
  },
};
</script>