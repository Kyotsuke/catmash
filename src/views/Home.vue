<template>
  <v-container>
      <Navbar @results="getResults" />
      <CatMash v-if="results != true" />
      <Results v-if="results != false" />
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import $ from 'jquery';

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
      results: false
    }
  },
  methods: {
    createCats: function () {
      const dbRef = firebase.database().ref();
      let cats = [];
      let self = this;

      $.getJSON('https://latelier.co/data/cats.json', function(data) {
          cats = data.images;
      });

      dbRef.child("cats").get().then((snapshot) => {
        if (snapshot.exists()) {
          let dbValue = snapshot.val()
          if(Object.keys(dbValue).length !== cats.length) {
            self.updateCats(cats);
          } else {
            console.log("Data already available");
          }
        } else {
          self.createCat(cats);
        }
        }).catch((error) => {
            console.error(error);
        });
    },

    createCat: function (cats){
      for (let index = 0; index < cats.length; index++) {
        let cat = cats[index];

        firebase.database().ref('cats/'+cat.id).set({    
          id: cat.id,
          img: cat.url
        });
      }
    },

    updateCats: function (cats){
      for (let index = 0; index < cats.length; index++) {
        let cat = cats[index];

        firebase.database().ref('cats/'+cat.id).update({    
          id: cat.id,
          img: cat.url
        });
      }
    },

    getResults: function(target) {
      this.results = target;
    }
  },

  created() {
    this.createCats();
  },
};
</script>

<style scoped>

</style>