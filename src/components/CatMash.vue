<template>
    <v-row>
        <v-col col="6" align="center">
            <div class="img_container">
                <img src="../assets/cat_1.jpg" alt="cat_01">
            </div>
        </v-col>
        <v-col col="6" align="center">
            <div class="img_container">
                <img src="../assets/cat_2.jpg" alt="cat_02">
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: "CatMash",
  props: {
    // msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .img_container{
        width: 40rem;
        height: 30rem;
        margin-top: 5rem;
    }

    .img_container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-image: url("../assets/cat_mask.svg");
        mask-image: url("../assets/cat_mask.svg");
        cursor: pointer;
    }
</style>
