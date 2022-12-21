<template>
    <div class="about">
      <v-data-table
      :headers="headers"
      :items="general"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search Mails"
          class="mx-4"
        ></v-text-field>
      </template>
      
    </v-data-table>
    </div>
</template>
<script>
import Localbase from 'localbase'
let db = new Localbase('mailsender')


  export default {
    data () {
      return {
        search: '',  
        general:[]  ,    
        general1: [
        {
        "id": 1671111420494,
        "To": "ramraina0003@gmail.com",
        "Cc": "ramraina0003@gmail.com",
        "Bcc": "ramraina0003@gmail.com",
        "Subject": "ramraina0003@gmail.com",
        "IncidentStatus": "good",
        "ReportedIssues": "asdfasdf",
        "IncidentNumber": "asfdsdf",
        "SeverityLevel": {},
        "ApplicationAffected": "asfd",
        "InitialAction": "sdgdgf"
    },
    {
        "id": 1671111579910,
        "To": "ramraina0003@gmail.com",
        "Cc": "omsramkumar@gmail.com",
        "Bcc": "omsramkumar@gmail.com",
        "Subject": "omsramkumar@gmail.com",
        "IncidentStatus": "qwerty",
        "ReportedIssues": "poiuy",
        "IncidentNumber": "678",
        "SeverityLevel": null,
        "ApplicationAffected": "test1",
        "InitialAction": "tes1"
    },
    {
        "id": 1671184770514,
        "To": "ramraina0003@gmail.com",
        "Cc": "omsramkumar@gmail.com",
        "Bcc": "ram12.uniq@gmail.com",
        "Subject": "Test Update Mail",
        "IncidentStatus": "Good",
        "ReportedIssues": "None",
        "IncidentNumber": "9976",
        "SeverityLevel": {},
        "ApplicationAffected": "DB",
        "InitialAction": "Find"
    },
    {
        "id": 1671185153938,
        "To": "ramraina0003@gmail.com",
        "Cc": "omsramkumar@gmail.com",
        "Bcc": "ram12.uniq@gmail.com",
        "Subject": "Test Update Mail",
        "IncidentStatus": "Good",
        "ReportedIssues": "DB",
        "IncidentNumber": "99763409",
        "SeverityLevel": {},
        "ApplicationAffected": "YES",
        "InitialAction": "TEST"
    }
        ],
      }
    },
    computed: {
      headers () {
        return [
          { text: 'To', value: 'To' },
          { text: 'Cc', value: 'Cc' },
          { text: 'Bcc', value: 'Bcc' },
          { text: 'Subject', value: 'Subject' },
          { text: 'IncidentStatus', value: 'IncidentStatus' },
          { text: 'ReportedIssues', value: 'ReportedIssues' },
          { text: 'IncidentNumber', value: 'IncidentNumber' },
          { text: 'SeverityLevel', value: 'SeverityLevel' },
          { text: 'ApplicationAffected', value: 'ApplicationAffected' },
          { text: 'InitialAction ', value: 'InitialAction' },
        ]
      },
    },

    methods: {
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLowerCase().indexOf(search) !== -1
      },
    },

    mounted(){
      db.collection('users').get().then(users => {
      console.log("From mounted",users)      
      this.general=users;
      
    })
    },


  }
</script>
<style lang="sass">

</style>