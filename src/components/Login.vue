<template>
    <v-form>
      <v-container
        flat 
        class="d-flex justify-between"
      >
        <v-col
          cols="5"
        >
          <v-text-field
              v-model="userName"
              name="username"
              label="User Name"
              value=""
          ></v-text-field>
        </v-col>
        <v-col
          cols="5"
        >
          <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              name="password"
              label="Password"
              value=""
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="2"
        >
          <v-btn
            :loading="loading"
            plain
            class="ma-1 justify-start"
            @click="login"
          >
            Request <br />to Board
          </v-btn>
        </v-col>
      </v-container>
    </v-form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
//import serviceURL from '../settings'
import axios from 'axios';

export default {
  name: "Login",
  data () {
    return {
      loading: false,
      showPassword: false,
      userName: '',
      password: '',
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
    async login () {
      this.loading = true;

  //    await new Promise(resolve => setTimeout(resolve, 3000));
    if (this.userName != "" && this.password != "") {
//        let url = serviceURL.concat('/sessions');
//        alert(url);
        axios
        .post(process.env.BASE_URL+"/sessions",{}, {
          auth: {
            "username": this.userName,
            "password": this.password
          }
        })
        .then(response => {
          if (response.status == 201) {
            this.updateSignIn(true);
            this.updateUser({
              userName: response.data.userName, 
              userId: response.data.userId, 
              userEmail: response.data.userEmail,
            });
          }
          else {
            alert("Oh, oh... Status Code is "+ response.status);
          }
          this.loading = false;
        })
        .catch(e => {
          alert("The username or password was incorrect, try again");
          this.userName = "";
          this.password = "";
          console.log(e);
          this.loading = false;
        });
      } else {
        alert("A username and password must be present");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
