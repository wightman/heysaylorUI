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
      .delete(process.env.VUE_APP_BASE_URL+"/sessions",)
      .then(response => {
        if (response.status == 204 || response.status == 403) {
          this.updateSignIn(false);
          this.updateUser( {
            userName: "", 
            userId: -1, 
            userEmail: "",
          })
        }
      })  
      .catch(e => {
        alert("Unable to logout on the server. Not sure what to do about that, but you're logged out here.");
          this.userName = "";
          this.password = "";
          console.log(e);
          this.loading = false;
      });

      this.loading = false;
    },
  },
};

</script>

<style></style>
