<template>
  <div id="uploadwill">
    <v-dialog v-model="willDialog" width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          x-small
          fab
          dark
          color="grey"
            v-bind="attrs" v-on="on">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card
        white
        body-2
        elevation="1"
        height="200"
        width="400"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <v-card-title>
          Will for {{ this.saylorName }}, {{ this.dateOfWill }}
        </v-card-title>
        <form
          @submit.prevent="submit"
          id="formElem"
          method="post"
          enctype="multipart/form-data"
        >
          <v-file-input
            name="willFile"
            id="willFile"
            @change="onChange"
            v-model="file"
            accept=".pdf"
            label="Drag a pdf will file here or click"
          >
          </v-file-input>
          <!-- Data that needs to go in the query string, 
            provided by the prop -->
          <input type="hidden" name="saylorName" v-model="saylorName" />
          <input type="hidden" name="dateOfWill" v-model="dateOfWill" />
          <div class="d-flex flex-row-reverse">
            <v-expand-x-transition>
              <v-btn
                type="submit"
                color="blue-grey"
                id="loadWill"
                class="ma-2 white--text"
                elevation="2"
                x-small
                v-if="file"
              >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-expand-x-transition>
            <v-btn
              class="ma-2"
              elevation="2"
              x-small
              @click="
                willDialog = false;
                remove();
              "
            >
              Cancel
            </v-btn>
          </div>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "UploadWill",
  props: {
    saylor: {
      type: Object,
      required: true,
    },
 },
  data: function () {
    return {
      willDialog: false,
      file: null,
      willFile: null,
      dateOfWill: null,
      saylorName: null,
      url: null,
    };
  },
  mounted: function() {
    this.saylorName = this.saylor.nameLast+'-'+this.saylor.nameFirst;
    this.dateOfWill = this.saylor.dateOfWill;
    this.url = '/saylors/'+this.saylor.saylorId+'/wills';
  },
  methods: {
    onChange(e) {
      this.file = e;
    },
    remove() {
      this.file = null;
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      event.currentTarget.classList.add("theme--dark");
    },
    dragleave(event) {
      event.preventDefault();
      // Clean up
      event.currentTarget.classList.remove("theme--dark");
      event.currentTarget.classList.add("theme--light");
    },
    drop(event) {
      event.preventDefault();
      this.onChange(event.dataTransfer.files[0]); // Trigger the onChange event manually
      event.currentTarget.classList.remove("theme--dark");
      event.currentTarget.classList.add("theme--light");
    },
    async submit() {
      const formData = new FormData();
      formData.append('fileb', this.file);
      formData.append('saylorName', this.saylorName);
      formData.append('dateOfWill', this.dateOfWill);
      
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      await axios.post(this.url, formData, config)
        .then(response => {
          if (response.status == 201) {
            this.willFile = response.data.willFile;
          }
          else {
            alert("Oh, oh... Status Code is "+ response.status);
          }
        })
        .catch(e => {
          alert("Unable to upload will: "+e);
          alert(this.url);
        });
      this.willDialog = false;
      this.saylorName = null;
      this.dateOfWill = null;
      this.saylor.documentName = this.willFile;
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
