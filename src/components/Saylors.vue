<template>
  <div id="saylors">
    <v-card
      class="pa-md-11"
    >
      <v-card-title>
      Saylors
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
      </v-card-title>
      <v-data-table
          :loading="loading"
          loading-text="Saylors currently boarding..."
          :headers="headers"
          :items="saylors"
          :search="search"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="saylorId"
          show-expand
          class="elevation-1"
      >
          <template v-slot:top>
              <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-switch
                  v-model="singleExpand"
                  label="Expand All/One"
                  class="mt-2"
              ></v-switch>
              </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
              <strong>Notes:</strong> {{ item.notes }}<br/> 
              <strong>Created:</strong> {{ item.creationDate }} by {{ item.createdBy }}<br/> 
              <strong>Modified:</strong> {{ item.lastModified }}
              <div v-if="item.documentName">
                <v-btn 
                  class="my-4 x-small"
                  v-bind:href="'/saylors/'+item.saylorId+'/wills/1'"
                  target="_blank">
                  View Will
                </v-btn>
              </div>
              </td>
          </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Saylors",
  data () {
    return {
      loading: false,
      expand: "Expand One",
      search: '',
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'saylorId',
        },
        { text: 'Reference', value: 'reference' },
        { text: 'Court', value: 'court' },
        { text: 'First Name', value: 'nameFirst' },
        { text: 'Last Name', value: 'nameLast' },
        { text: 'Testator (Full Name)', value: 'testator' },
        { text: 'Ship Name', value: 'shipName' },
        { text: 'Will Date', value: 'dateOfWill' },
        { text: 'Probate Date', value: 'dateOfProbate' }, 
        { text: 'Ship Role', value: 'role' },
        { text: 'Married', value: 'married' },
      ],
      saylors: [],
 /*       {
          saylorId: 1,
          reference: null,
          court: "P",
          nameFirst: "Thomas",
          nameLast: "Hempe",
          testator: "Thomas Hempe",
          shipName: "Abigail",
          dateOfWill: null,
          dateOfProbate: "1625-01-01",
          role: null,
          married: null,
          notes: "probate date: missing month; probate date: missing day",
          creationDate: "2021-04-12T12:15:55",
          lastModified: "2021-04-12T12:15:55",
          createdBy: "Rick Wightman",
        },
        {
          saylorId: 2,
          reference: null,
          court: "P",
          nameFirst: "Tobias",
          nameLast: "Paris",
          testator: "Tobias Paris",
          shipName: "Abigail",
          dateOfWill: null,
          dateOfProbate: "1625-01-01",
          role: null,
          married: null,
          notes: "probate date: missing month; probate date: missing day",
          creationDate: "2021-04-12T12:17:12",
          lastModified: "2021-04-12T12:17:12",
          createdBy: "Rick Wightman",
        },
      ], */
    }
  },
  mounted: function() {
    this.getSaylors();
  },
  methods: {
    async getSaylors() {
      this.loading = true;
        axios
        .get(process.env.VUE_APP_BASE_URL+"/saylors")
        .then(response => {
          if (response.status == 200) {
            this.saylors = response.data;
          }
          else {
            alert("Oh, oh... Status Code is "+ response.status);
          }
          this.loading = false;
        })
        .catch(e => {
          alert("Unable to load saylors: "+e);
          alert(process.env.VUE_APP_BASE_URL);
        });
      this.loading = false;
    },
  }
};
</script>

<style lang="scss" scoped>

</style>