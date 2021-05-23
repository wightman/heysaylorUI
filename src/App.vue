<template>
  <v-app>
    <Header />
    <div v-if='signedIn'>
      <Saylors />
    </div>
    <Footer />
  </v-app>
</template>

<script>

import Header from "./components/Header.vue";
import Saylors from "./components/Saylors.vue";
import Footer from "./components/Footer.vue";

/*
 * Need this to access Vuex store
 */
//import { mapGetters } from "vuex";
import {mapGetters} from 'vuex'

export default {
  name: "App",
//  computed: {
    /*
     * have to do with accessing the Vuex store
     */
//    ...mapGetters(["signedIn"]),
//  },
  components: {
    Header,
    Saylors,
    Footer,
  },
  computed: {
    ...mapGetters(['signedIn']),
  },
};
</script>

<style lang="scss" scoped></style>
