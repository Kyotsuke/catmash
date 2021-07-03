import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import vuetify from "./plugins/vuetify";

import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyB5VAAiZEB5n4UUt5OEwO5RUIbT_tTGSCs",
  authDomain: "catmash-0721.firebaseapp.com",
  databaseURL: "https://catmash-0721-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "catmash-0721",
  storageBucket: "catmash-0721.appspot.com",
  messagingSenderId: "1080028359105",
  appId: "1:1080028359105:web:41acfda77ee4a06010e740",
  measurementId: "G-YR0VLSETLE"
}

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
