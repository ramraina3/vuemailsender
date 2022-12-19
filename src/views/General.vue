<template>
    <div class="about">
      <form ref="form" @submit.prevent="sendEmail">
        <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="To"
            name="To"
            v-model="To"
            :rules="[() => !!To || 'This field is required']"
            :error-messages="errorMessages"
            label="To"
            placeholder="To"
            required
            clearable
          ></v-text-field>
          <v-text-field
            ref="Cc"
            name="Cc"
            v-model="Cc"
            :rules="[() => !!Cc || 'This field is required']"
            :error-messages="errorMessages"
            label="Cc"
            placeholder="Cc"
            required
            clearable
          ></v-text-field>
          <v-text-field
            ref="Bcc"
            name="Bcc"
            v-model="Bcc"
            :rules="[() => !!Bcc || 'This field is required']"
            :error-messages="errorMessages"
            label="Bcc"
            placeholder="Bcc"
            required
            clearable
          ></v-text-field>
          <v-text-field
            ref="Subject"
            name="Subject"
            v-model="Subject"
            :rules="[
              () => !!Subject || 'This field is required',
              () => !!Subject && Subject.length <= 25 || 'Subject must be less than 25 characters',
              SubjectCheck
            ]"
            label="Subject"
            placeholder="Subject"
            counter="25"
            required
          ></v-text-field>



          <v-simple-table>
    <template v-slot:default>
      
      <tbody>
        <tr>
          <td>Incident Status</td>
          <td>
            <v-text-field
            ref="IncidentStatus"
            name="IncidentStatus"
            v-model="IncidentStatus"
            :rules="[() => !!IncidentStatus || 'This field is required']"
            :error-messages="errorMessages"            
            placeholder="IncidentStatus"
            required
            
          ></v-text-field>
          </td>
        </tr>
        <tr>
          <td>Reported Issues</td>
          <td>
            <v-text-field
            ref="ReportedIssues"
            name="ReportedIssues"
            v-model="ReportedIssues"
            :rules="[() => !!ReportedIssues || 'This field is required']"
            :error-messages="errorMessages"            
            placeholder="ReportedIssues"
            required            
          ></v-text-field>
          </td>
        </tr>
        <tr>
          <td>Incident Number</td>
          <td>
            <v-text-field
            ref="IncidentNumber"
            name="IncidentNumber"
            v-model="IncidentNumber"
            :rules="[() => !!IncidentNumber || 'This field is required']"
            :error-messages="errorMessages"            
            placeholder="IncidentNumber"
            required            
          ></v-text-field>
          </td>
        </tr>

        <tr>
          <td>Severity Level</td>
          <td>
            <v-file-input
                v-model="SeverityLevel"
                name="SeverityLevel"
                small-chips
                truncate-length="15"
            ></v-file-input>
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td>
            <v-dialog            
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            ref="date"
            name="date"
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
          </td>
        </tr>

        <tr>
          <td>Time</td>
          <td>
            <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            ref="time"
            name="time"
            label="Picker in menu"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
          </td>
        </tr>

        <tr>
          <td>Application Affected</td>
          <td>
            <v-text-field
            ref="ApplicationAffected"
            name="ApplicationAffected"            
            v-model="ApplicationAffected"
            :rules="[() => !!ApplicationAffected || 'This field is required']"
            :error-messages="errorMessages"            
            placeholder="ApplicationAffected"
            required            
          ></v-text-field>
          </td>
        </tr>

        <tr>
          <td>Initial Action</td>
          <td>
            <v-textarea
                v-model="InitialAction"
                name="InitialAction"
                clearable
                clear-icon="mdi-close-circle"
                label="Action"
                value="This is clearable text."
            >
        </v-textarea>
          </td>
        </tr>

      </tbody>
    </template>
  </v-simple-table>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
    </div>
</template>

<script>
import emailjs from '@emailjs/browser';

import Localbase from 'localbase';
let db = new Localbase('mailsender')

 export default {
    name: 'General', 
    data: () => ({    
      errorMessages: '',
      To: null,
      Cc: null,
      Bcc: null,
      Subject: null,
      formHasErrors: false,
      IncidentStatus: null,
      ReportedIssues: null,
      IncidentNumber: null,
      SeverityLevel: null,      
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),      
      modal: false,
      time: null,
      menu2: false,
      ApplicationAffected: null,
      InitialAction: null,
      
    }),

    computed: {
      form () {
        return {
          To: this.To,
          Cc: this.Cc,
          Bcc: this.Bcc,
          Subject: this.Subject,
          IncidentStatus: this.IncidentStatus,
          ReportedIssues: this.ReportedIssues,
          IncidentNumber: this.IncidentNumber,
          SeverityLevel: this.SeverityLevel, 
          Date: this.date,
          Time: this.time,
          ApplicationAffected: this.ApplicationAffected,
          InitialAction: this.InitialAction,          
        }
      },
    },

    watch: {
      To () {
        this.errorMessages = ''
      },
      Cc () {
        this.errorMessages = ''
      },
      Bcc () {
        this.errorMessages = ''
      },

      IncidentStatus(){ this.errorMessages = ''},
      ReportedIssues(){ this.errorMessages = ''},
      IncidentNumber(){ this.errorMessages = ''},
      SeverityLevel(){ this.errorMessages = ''},         
      ApplicationAffected(){ this.errorMessages = ''},
      InitialAction(){ this.errorMessages = ''},
    },

    methods: {      
        SubjectCheck () {
        this.errorMessages = this.Subject && !this.To
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {        
        let general = {
          id: Date.now(),
          To: this.To,
          Cc: this.Cc,
          Bcc: this.Bcc,
          Subject: this.Subject,
          IncidentStatus: this.IncidentStatus,
          ReportedIssues: this.ReportedIssues,
          IncidentNumber: this.IncidentNumber,
          SeverityLevel: this.SeverityLevel, 
          Date: this.date,
          Time: this.time,    
          ApplicationAffected: this.ApplicationAffected,
          InitialAction: this.InitialAction
      }

      db.collection('general').add(general).then(()=> {              
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true
            this.$refs[f].validate(true)
            })
      })

      emailjs.sendForm('service_be07usv', 'template_oizf0ys', this.$refs.form, 'SqhZvK_GYRfpaA67m')
      .then((result) => {
          console.log('SUCCESS!', result.text);
      }, (error) => {
          console.log('FAILED...', error.text);
      });
            
        
      },
    },  
  }
</script>

<style lang="sass">

</style>