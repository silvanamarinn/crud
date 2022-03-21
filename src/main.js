import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { initializeApp } from "firebase/app";
import vuetify from './plugins/vuetify'

// Asigna aquí el objeto de configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnhpzJOZt3Wi37DHrQCCvWadQRq3mH04s",
  authDomain: "crud-e06e0.firebaseapp.com",
  projectId: "crud-e06e0",
  storageBucket: "crud-e06e0.appspot.com",
  messagingSenderId: "145230597438",
  appId: "1:145230597438:web:930b34f6946483efd9306f"

};

const app = initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
