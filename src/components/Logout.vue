<template>
  <v-container
    flat 
    class="d-flex justify-around"
  >
    <v-col
      cols="10"
    >
      <em>Welcome aboard, {{ user.userName }}!</em>
    </v-col>
    <v-col
      cols="2"
    >
      <v-btn
        :loading="loading"
        plain
        class="ma-1 justify-start"
        @click="logout"
      >
        Disembark
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
/*
 * Need this to access Vuex store computed properties and methods
 */
import {mapActions, mapGetters} from 'vuex';
import axios from 'axios';

export default {
  name: "Logout",
  data: function () {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'signedIn']),
  },
  methods: {
     ...mapActions(['setUser', 'setSignedIn']),
    updateUser(user) {
      this.setUser(user);
    },
    updateSignIn(signedIn) {
      this.setSignedIn(signedIn);
    },
    async logout () {
      this.loading = true;
      axios
      .delete(process.env.BASE_URL+"/sessions",)
      this.updateSignIn(false);
      this.updateUser( {
        userName: "", 
        userId: -1, 
        userEmail: "",
      });
      this.loading = false;
    },
  },
};
/*    logout: function () {
      this.axios
        .delete(
          "http://192.168.2.118:8000/sessions",
          { withCredentials: true },
          {}
        )
        .then((response) => {
          alert(response.status);
          this.user = {
            userName: "",
            userEmail: "",
            userId: null,
          };
          this.updateUser;
        })
        .catch((err) => {
          alert(err);
        });
    },*/

</script>

<style></style>
