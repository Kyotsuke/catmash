<template>
    <v-row>
        <v-col cols="6" align="center" v-for="cat in selectedCats" :key="cat.url">
            <div class="img_container" @click="voteForCat(cat)">
                <img :src="cat.url" :alt="cat.url">
            </div>
        </v-col>

        <v-col cols="4" offset="4" align="center">
            <button class="neither_btn" @click="selectTwoCats()">Neither of those two</button>
        </v-col>
    </v-row>
</template>

<script>

import firebase from 'firebase/app'
// import $ from 'jquery';

export default {
  name: "CatMash",
  data () {
      return { 
        loaded: false,
        cats : [],
        catsCount : 0,
        selectedCats : [],
        notEnough: false
      }
  },
  methods: {
    // function to get all Cats from a database and store then in this.cats
    // after that, get two cats from selectTwoCats function
    getCats: function() {
        // let self = this;
        const dbRef = firebase.database().ref();
        dbRef.child("cats").get().then((snapshot) => {
        if (snapshot.exists()) {
            this.cats = snapshot.val()
            this.catsCount = Object.keys(this.cats).length;

            this.selectTwoCats();
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
        });

        // $.getJSON('https://latelier.co/data/cats.json', function(data) {
        //     self.cats = data.images;
        //     self.catsCount = data.images.length
        //     self.selectTwoCats();
        // });
    },
        
    // function to get a cat from this.cats with is id
    getCat: function(id) {
        // let cat = this.cats[id];
        let cat = this.cats[Object.keys(this.cats)[id]]
        this.selectedCats.push(cat);
    },

    // function to select two cats, randomly, with getCat() function and
    // prevent duplicate cats and/or cats that have already been selected
    // by pushing them in this.alreadySelected
    selectTwoCats: function() {
        this.selectedCats = [];
        let first = Math.floor(Math.random() * this.catsCount);
        let second = Math.floor(Math.random() * this.catsCount);
        let duplicate = false;

        if (second == first){
            duplicate = true;
        }

        while (duplicate !== false) {
            second = Math.floor(Math.random() * this.catsCount);
            console.log("DUPLICATE");

            if (second != first){
                console.log("OK");
                duplicate = false;
            }
        }

        this.getCat(first);
        this.getCat(second);
    },

    // get vote count from a cat then push it in this.cats
    getVote: function(cat){
        const dbRef = firebase.database().ref();
        let id = cat.id;
        dbRef.child("cats").child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().vote === undefined){
                this.cats[id].vote = 0;
            } else {
                this.cats[id].vote = snapshot.val().vote;
            }
            // this.cats[id].vote = snapshot.val().vote;
        } else {
            console.log("No votes");
        }
        }).catch((error) => {
            console.error(error);
        });
    },

    // get vote of the specific cat then add one vote before pushing in database
    voteForCat: function(cat){
        this.getVote(cat);
        firebase.database().ref('cats/'+cat.id).update({    
          vote: cat.vote+1
        });

        this.selectTwoCats();
    }
  },
  mounted() {
    // when created, get all Cats
    this.getCats();
  }
};
</script>

<style scoped>
    .img_container{
        width: 40vw;
        height: 55vh;
        margin-top: 5rem;
        background-color: #F4F4F4;
        -webkit-mask-size: cover;
        mask-size: cover;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-image: url("../assets/cat_mask.svg");
        mask-image: url("../assets/cat_mask.svg");
        cursor: pointer;
    }

    .img_container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .neither_btn{
        margin-top: 5vh;
        padding: 0.5rem 2rem;
        border: 3px solid rgb(86, 117, 255);
        border-radius: 10px;
        font-weight: bold;
        background-color: #ddd;
    }

    button:hover{
        background-color: #eee;
    }
</style>
