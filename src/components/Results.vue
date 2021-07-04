<template>
    <v-row>
        <v-col col="12" align="center" v-if="more == false">
            <div class="img_container">
                <img src="../assets/podium.png" alt="podium">
            </div>
            <div class="cat_container first">
                <img src="../assets/cat_1.jpg" alt="cat_1">
                <p>Votes : 985474</p>
            </div>
            <div class="cat_container second">
                <img src="../assets/cat_2.jpg" alt="cat_2">
                <p>Votes : 98547</p>
            </div>
            <div class="cat_container third">
                <img src="../assets/cat_3.jpg" alt="cat_3">
                <p>Votes : 98547</p>
            </div>
            <div class="more">
                <button @click="seeMore(true)">Voir les autres chats</button>
            </div>
        </v-col>
        <v-col col="12" v-if="more == true">
            <v-row>
                <v-col align="center">
                    <div class="cat_container_more">
                    <img src="../assets/cat_4.jpg" alt="cat_4">
                        <p>Votes : 98547</p>
                    </div>
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

    .second{
        position: relative;
        top: -50rem;
        right: 16.5rem;
    }

    .third{
        position: relative;
        top: -68rem;
        left: 16rem;
    }

    .more{
        position: relative;
        top: -50rem;
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
</style>
