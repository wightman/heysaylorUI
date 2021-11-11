<template>
  <v-card 
      class="pa-md-11 elevation-4"
  >   
    <v-container>
      <v-row justify="space-between">
        <v-col cols="3">
        <v-img
          src="../assets/EICShip.png"
        ></v-img>
      </v-col>rr
      <v-col cols="9">
        <v-card-title>
          Hey Saylor!
        </v-card-title>
        <v-card-text>
          This is Commander Fury's buried treasure of 17th Century British East
          India Company saylors. If this is your jam, then your ship has come
          in!
        </v-card-text>
        <div v-if='!signedIn'>
          <Login />
        </div>
        <div v-else>
          <Logout />
        </div>
      </v-col>
    </v-row>
    </v-container>
  
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'

import Login from "./Login.vue";
import Logout from "./Logout.vue";

export default {
  name: "Header",
  components: {
    Login,
    Logout,
   },
  computed: {
    ...mapGetters(['signedIn']),
  },
};
</script>

<style lang="scss" scoped></style>
