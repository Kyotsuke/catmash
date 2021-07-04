<template>
    <v-row>
        <v-col cols="6" align="center" v-for="cat in selectedCats" :key="cat.url">
            <div class="img_container">
                <img :src="cat.url" :alt="cat.url">
            </div>
        </v-col>

        <v-col cols="4" offset="4" align="center">
            <button class="neither_btn" @click="selectTwoCats()">Neither of those two</button>
        </v-col>
    </v-row>
</template>

<script>
import $ from 'jquery';

export default {
  name: "CatMash",
  data () {
      return { 
        loaded: false,
        cats : [],
        catsCount : 0,
        selectedCats : [],
        alreadySelected : [],
        notEnough: false
      }
  },
  methods: {
    // function to get all Cats from a JSON on web via an URL and store then in this.cats
    // after that, get two cats from selectTwoCats function
      getCats: function() {
        let self = this;

        $.getJSON('https://latelier.co/data/cats.json', function(data) {
            self.cats = data.images;
            self.catsCount = data.images.length
            self.selectTwoCats();
        });
      },
      
    // function to get a cat from this.cats with is id
      getCat: function(id) {
        let cat = this.cats[id]
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

        if (this.alreadySelected.length > this.catsCount-1) {
            this.notEnough = true
        }

        if (this.notEnough != true) {
            while (this.alreadySelected.indexOf(first) != -1) {
                first = Math.floor(Math.random() * this.catsCount);
            }

            while (this.alreadySelected.indexOf(second) != -1) {
                second = Math.floor(Math.random() * this.catsCount);

                if (second == first){
                    duplicate = true;
                }

                while (duplicate !== false) {
                    second = Math.floor(Math.random() * this.catsCount);
                    console.log("DUPLICATE");

                    if (second != first){
                        duplicate = false;
                    }
                }
            }

            this.alreadySelected.push(first, second);

            this.getCat(first);
            this.getCat(second);

            console.log(first+" "+second);          
        }
      }
  },
  created() {
    // when created, get all Cats
    this.getCats();
  }
};
</script>

<style scoped>
    .img_container{
        width: 40rem;
        height: 30rem;
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
        margin-top: 5rem;
        padding: 0.5rem 2rem;
        border: 3px solid rgb(86, 117, 255);
        border-radius: 10px;
        font-weight: bold;
        background-color: #ddd;
    }
</style>
