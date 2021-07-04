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
   // get all Cats from a JSON on web via an URL and push them in firebase database
    pushCats: function () {
      const dbRef = firebase.database().ref();
      let cats = [];
      let self = this;

      $.getJSON('https://latelier.co/data/cats.json', function(data) {
          cats = data.images;
      });

      dbRef.child("cats").get().then((snapshot) => {
        if (snapshot.exists()) { // if there is already data in /cats
          let dbValue = snapshot.val()

          if(Object.keys(dbValue).length !== cats.length) { // if there is a difference between the JSON file and database lenght then update database
            self.updateCats(cats);
          } else { // if the JSON file and  database have the same length then do nothing
            console.log("Data already available");
          }
        } else { // if there is no data in /cats then push all the JSON file in database
          self.createCats(cats);
        }
        }).catch((error) => {
            console.error(error);
        });
    },

   // create new data in database from an array
    createCats: function (cats){
      for (let index = 0; index < cats.length; index++) {
        let cat = cats[index];

        firebase.database().ref('cats/'+cat.id).set({    
          id: cat.id,
          img: cat.url
        });
      }
    },

   // function to only update data that are missing in database using an array
    updateCats: function (cats){
      for (let index = 0; index < cats.length; index++) {
        let cat = cats[index];

        firebase.database().ref('cats/'+cat.id).update({    
          id: cat.id,
          img: cat.url
        });
      }
    },

   // get a boolean value from Navbar component that is use to show or not a specific component
    getResults: function(target) {
      this.results = target;
    }
  },

  created() {
    this.pushCats();
  },
};
</script>

<style scoped>

</style>