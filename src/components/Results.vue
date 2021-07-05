<template>
    <v-row>
        <v-col cols="12" align="center" v-if="more == false">
            <div class="img_container">
                <img src="../assets/podium.png" alt="podium">
            </div>
            <div class="cat_container first">
                <img :src="numberOne.url" alt="cat_1">
                <p class="vote">Votes : {{numberOne.vote}}</p>
            </div>
            <div class="cat_container second">
                <img :src="numberTwo.url" alt="cat_2">
                <p class="vote">Votes : {{numberTwo.vote}}</p>
            </div>
            <div class="cat_container third">
                <img :src="numberThree.url" alt="cat_3">
                <p class="vote">Votes : {{numberThree.vote}}</p>
            </div>
            <div class="more_btn">
                <button @click="seeMore(true)">Show other cats results</button>
            </div>
        </v-col>
        <v-col cols="12" class="more_cats" v-if="more == true">
            <v-row>
                <v-col align="center" v-for="cat in currentPage" :key="cat.id">
                    <div class="cat_container_more">
                    <img :src="cat.url" alt="cat_4">
                        <p class="vote">Votes : {{cat.vote}}</p>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" align="center" class="return_btn">
                    <button @click="seeMore(false)">Podium</button>
                </v-col>
                <v-col cols="2" offset="2" align="center" class="change_page_btn">
                    <button @click="changePage('prev')" v-if="page > 1">Previous</button>
                </v-col>
                <v-col cols="2" align="center" class="change_page_btn">
                    <button @click="changePage('next')" v-if="page < numberOfPages">Next</button>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

import firebase from 'firebase/app'

export default {
  name: "Results",
  props: {
    // msg: String,
  },
  data () {
      return{
          more: false,
          cats: {},
          numberOne: {},
          numberTwo: {},
          numberThree: {},
          pages: {},
          page: 1,
          currentPage: [],
          numberOfPages: 0
      }
  },
  methods: {
    seeMore: function(more) {
        this.more = more;
    },

    getCats: function() {
        // let self = this;
        const dbRef = firebase.database().ref();
        dbRef.child("cats").get().then((snapshot) => {
        if (snapshot.exists()) {
            this.cats = snapshot.val();
            this.sortCatsByVotes();
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

    sortCatsByVotes: function(){
        let cats = this.cats;
        cats = Object.keys(cats).map(key => {
            return cats[key];
        })
        cats.sort((a, b) => {
            return b.vote - a.vote;
        });

        this.numberOne = cats[0];
        this.numberTwo = cats[1];
        this.numberThree = cats[2];

        cats.splice(0, 3);

        this.splitRanking(cats);

        this.cats = cats;
    },

    splitRanking: function(cats){
        let catsLength = cats.length;
        let numberPerPages = 36;
        let numberOfPages = Math.ceil(catsLength / numberPerPages);
        let pages = {};
        for (let index = 1; index <= numberOfPages; index++) {
            pages['page_'+index] = cats.splice(0, numberPerPages);
        }

        this.pages = pages;
        this.currentPage = this.pages["page_"+this.page];
        this.numberOfPages = numberOfPages;
    },

    changePage: function(value){
        if (value == "next"){
            this.page++;
            this.currentPage = this.pages["page_"+this.page];
        } else {
            this.page--
            this.currentPage = this.pages["page_"+this.page];
        }
    }
  },

  mounted() {
      this.getCats();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .img_container{
        height: 20rem;
        margin-top: 15rem;
        position: relative;
        top: 0;
    }

    .img_container img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .cat_container{
        width: 14rem;
        height: 14rem;
        margin-top: 5rem;
    }

    .cat_container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }

    .first{
        position: relative;
        top: -34rem;
    }

    .first img{
        border: 5px solid rgb(255, 187, 0);
    }

    .second{
        position: relative;
        top: -50rem;
        right: 16.5rem;
    }

    .second img{
        border: 5px solid rgb(156, 156, 156);
    }

    .third{
        position: relative;
        top: -68rem;
        left: 16rem;
    }

    .third img{
        border: 5px solid rgb(179, 126, 48);
    }

    .first p.vote{
        color: rgb(255, 187, 0);
        font-weight: bold;
    }

    .second p.vote{
        color: rgb(156, 156, 156);
        font-weight: bold;
    }

    .third p.vote{
        color: rgb(179, 126, 48);
        font-weight: bold;
    }

    p.vote{
        color: #fff;
        font-weight: bold;
        text-shadow: 0 1px 4px #000;        
    }

    .more_btn{
        position: relative;
        top: -55rem;
    }

    .more_btn button{
        padding: 0.5rem 2rem;
        border: 3px solid #1d3557;
        font-weight: bold;
        color: #1d3557;
        background-color: #f1faee;
    }

    .cat_container_more{
        width: 8rem;
        height: 8rem;
        margin-top: 5rem;
    }

    .cat_container_more img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
    }

    .return_btn button{
        margin-top: 2rem;
        padding: 0.5rem 2rem;
        width: 100%;
        border: 3px solid rgb(255, 196, 86);
        font-weight: bold;
        color: rgb(255, 196, 86);
        background-color: #eee;
    }

    .return_btn button:hover{
        background-color: #fff;
    }

    .change_page_btn button{
        margin-top: 2rem;
        padding: 0.5rem 2rem;
        width: 100%;
        border: 3px solid #1d3557;
        font-weight: bold;
        color: #1d3557;
        background-color: #f1faee;
    }

    button:hover{
        background-color: #a8dadc;
    }
</style>
