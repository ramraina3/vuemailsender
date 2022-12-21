<template>
  <div class="about">
    <form ref="form" @submit.prevent="submit">
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
          :rules="[() => !!To || 'This field is required']"
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
          :rules="[() => !!To || 'This field is required']"
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
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="IncidentNumber"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>Initial Severity Level</td>
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
        <td>Current Severity Level</td>
        <td>
          <v-file-input
              v-model="CurrentSeverityLevel"
              name="CurrentSeverityLevel"
              small-chips
              truncate-length="15"
          ></v-file-input>
        </td>
      </tr>
      
      <tr>
        <td>Reason for Severity Change</td>
        <td>
          <v-text-field
          ref="ReasonforSeverityChange"
          name="ReasonforSeverityChange"
          v-model="ReasonforSeverityChange"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="ReasonforSeverityChange"
          required            
        ></v-text-field>
        </td>
      </tr>


      <tr>
        <td>Start Date</td>
        <td>
          <v-menu
        v-model="stmenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            name="Date"
            v-model="stdate"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="stdate"
          @input="stmenu = false"
        ></v-date-picker>
      </v-menu>
        </td>
      </tr>



      <tr><td>End Date</td>
      <td>
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            name="EndDate"
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      </td></tr>
      <!-- <tr>
        <td>End Date</td>
        <td>
          <v-dialog
          
      ref="dialog"
      v-model="endmodal"
      :return-value.sync="enddate"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          ref="enddate"
          name="enddate"
          v-model="enddate"
          label="Picker in dialog"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="enddate"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="endmodal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(enddate)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
        </td>
      </tr> -->

      <tr>
        <td>Start Time</td>
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
        <td>End Time</td>
        <td>
          <v-dialog
        ref="dialog"
        v-model="modal2"
        :return-value.sync="endtime"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endtime"
            name="endtime"
            label="Picker in dialog"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="endtime"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(endtime)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
        </td>
      </tr>

      <tr>
        <td>Application Affected</td>
        <td>
          <v-text-field
          ref="ApplicationAffected"
          name="ApplicationAffected"            
          v-model="ApplicationAffected"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="ApplicationAffected"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td> Affected Region</td>
        <td>
          <v-file-input
              v-model="AffectedRegion"
              name="AffectedRegion"
              small-chips
              truncate-length="15"
          ></v-file-input>
        </td>
      </tr>

      <tr>
        <td>Number of Affected Customer</td>
        <td>
          <v-text-field
          ref="AffectedCustomer"
          name="AffectedCustomer"
          v-model="AffectedCustomer"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="AffectedCustomer"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>What is the Customer Experiencing</td>
        <td>
          <v-text-field
          ref="CustomerExperiencing"
          name="CustomerExperiencing"
          v-model="CustomerExperiencing"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="CustomerExperiencing"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>Incident Coordinator</td>
        <td>
          <v-text-field
          ref="IncidentCoordinator"
          name="IncidentCoordinator"
          v-model="IncidentCoordinator"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="IncidentCoordinator"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>Microsoft Conference Bridge</td>
        <td>
          <v-text-field
          ref="ConferenceBridge"
          name="ConferenceBridge"
          v-model="ConferenceBridge"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="ConferenceBridge"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>Next Update will be sent</td>
        <td>
          <v-text-field
          ref="NextUpdate"
          name="NextUpdate"
          v-model="NextUpdate"
          :rules="[() => !!To || 'This field is required']"
          :error-messages="errorMessages"            
          placeholder="NextUpdate"
          required            
        ></v-text-field>
        </td>
      </tr>

      <tr>
        <td>Resolution: </td>
        <td>
          <v-textarea
              v-model="Resolution"
              name="Resolution"
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
        <v-btn 
        text
        v-bind="attrs"
        @click="resetForm"
        v-on="on"
        >
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
  
  <!-- <Snackbar/> -->
  </div>
</template>

<script>
// import Snackbar from '@/components/Shared/Snackbar.vue';
import Snackbar from '@/components/Shared/Snackbar.vue';
import emailjs from '@emailjs/browser';
import Localbase from 'localbase'
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
    CurrentSeverityLevel: null,
    ReasonforSeverityChange: null,          
    ApplicationAffected: null,
    AffectedRegion: null,
    AffectedCustomer: null,
    CustomerExperiencing: null,
    IncidentCoordinator: null,
    ConferenceBridge: null,
    NextUpdate: null,
    Resolution: null,    
    stdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),      
    stmenu: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),    
    menu: false,
    time: null,
      menu2: false,
    endtime: null,
      modal2: false,
      
    

  }),

  components:{
    Snackbar
},
  computed: {
    form () {
      return {
        id: Date.now(),
        To: this.To,
        Cc: this.Cc,
        Bcc: this.Bcc,
        Subject: this.Subject,
        IncidentStatus: this.IncidentStatus,
        ReportedIssues: this.ReportedIssues,
        IncidentNumber: this.IncidentNumber,
        SeverityLevel: this.SeverityLevel,   
        CurrentSeverityLevel: this.CurrentSeverityLevel,
        ReasonforSeverityChange: this.ReasonforSeverityChange,
        Date: this.stdate,
        EndDate: this.enddate,
        time: this.time,
        endtime: this.endtime,
        ApplicationAffected: this.ApplicationAffected,
        AffectedRegion: this.AffectedRegion,
        AffectedCustomer: this.AffectedCustomer,
        CustomerExperiencing: this.CustomerExperiencing,
        IncidentCoordinator: this.IncidentCoordinator,
        ConferenceBridge: this.ConferenceBridge,
        NextUpdate: this.NextUpdate,
        Resolution: this.Resolution,
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
    submit() {
      let update = {
        id: Date.now(),
        To: this.To,
        Cc: this.Cc,
        Bcc: this.Bcc,
        Subject: this.Subject,
        IncidentStatus: this.IncidentStatus,
        ReportedIssues: this.ReportedIssues,
        IncidentNumber: this.IncidentNumber,
        SeverityLevel: this.SeverityLevel,   
        CurrentSeverityLevel: this.CurrentSeverityLevel,
        ReasonforSeverityChange: this.ReasonforSeverityChange,
        Date: this.stdate,
        EndDate: this.date,
        time: this.time,
        endtime: this.endtime,
        ApplicationAffected: this.ApplicationAffected,
        AffectedRegion: this.AffectedRegion,
        AffectedCustomer: this.AffectedCustomer,
        CustomerExperiencing: this.CustomerExperiencing,
        IncidentCoordinator: this.IncidentCoordinator,
        ConferenceBridge: this.ConferenceBridge,
        NextUpdate: this.NextUpdate,
        Resolution: this.Resolution }

        db.collection('update').add(update).then(()=> {
          
          this.$store.commit('showSnackbar')
          this.formHasErrors = false
          Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
          })
        })
        

        emailjs.sendForm('service_be07usv', 'template_qk3pyjq', this.$refs.form, 'SqhZvK_GYRfpaA67m')
        .then((result) => {
          console.log('SUCCESS!', result.text);
          alert("Mail send");
        }, (error) => {
            console.log('FAILED...', error.text);
        });
          
      
    },
    // clear(){
    //     To = '',
    //     Cc = '',
    //     Bcc ='',
    //     Subject='',
    //     IncidentStatus='',
    //     ReportedIssues='',
    //     IncidentNumber='',
    //     SeverityLevel='',
    //     CurrentSeverityLevel='',
    //     ReasonforSeverityChange='',
    //     Date='',
    //     EndDate='',
    //     time='',
    //     endtime='',
    //     ApplicationAffected='',
    //     AffectedRegion='',
    //     AffectedCustomer='',
    //     CustomerExperiencing='',
    //     IncidentCoordinator='',
    //     ConferenceBridge='',
    //     NextUpdate='',
    //     Resolution=''
    // },
  },  
}
</script>

<style lang="sass">

</style>