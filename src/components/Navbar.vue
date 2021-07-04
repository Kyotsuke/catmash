<template>
    <v-row>
        <v-col cols="4">
          <a href="/"><img src="../assets/catmash_logo.png" alt="Logo" class="logo"></a>
        </v-col>
        <v-col cols="4" offset="4" align="right" class="nav_btn">
            <div @click="openResults(true)" v-if="results != true">
                <router-link to="/">Show results</router-link>
            </div>
            <div @click="openResults(false)" v-if="results != false">
                <router-link to="/">Back to Catmash</router-link>
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

  .nav_btn a{
      margin-top: 5rem;
      padding: 0.5rem 2rem;
      border: 3px solid rgb(86, 117, 255);
      border-radius: 10px;
      font-weight: bold;
      color: #000;
      background-color: #ddd;
      text-decoration: none;
  }

  .nav_btn a:hover{
    background-color: #eee;
  }
</style>
