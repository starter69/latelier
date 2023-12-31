<template>
  <div class="select-date">
    <generic-dialog
      v-model="showDialog"
      max-width="520"
      :title="$t('Select date')"
    >
      <template v-slot:content>
        <v-tabs v-if="showDialog" fixed-tabs>
          <v-tabs-slider color="accent" />
          <v-tab>
            Date
          </v-tab>
          <v-tab v-if="!disableTime">
            Heure
          </v-tab>
          <v-tab-item class="pt-2 text-center">
            <v-date-picker
              v-model="date"
              :landscape="!$vuetify.breakpoint.xsOnly"
              :locale="getLocale()"
              @dblclick.native="checkDblClick"
            />
          </v-tab-item>
          <v-tab-item v-if="!disableTime" class="pt-2 text-center">
            <v-time-picker
              v-model="hour"
              :landscape="!$vuetify.breakpoint.xsOnly"
              format="24hr"
            />
          </v-tab-item>
        </v-tabs>
        <v-select
          v-if="reminder"
          v-model="selectedReminder"
          class="reminder"
          dense
          :items="reminders"
          :label="$t('Reminder')"
        />
      </template>
      <template v-slot:actions>
        <v-btn text :disabled="!date" @click="selectDate">
          {{ $t("Select") }}
        </v-btn>
      </template>
    </generic-dialog>
  </div>
</template>

<script>
import DatesMixin from "/imports/ui/mixins/DatesMixin.js";

export default {
  mixins: [DatesMixin],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disableTime: Boolean,
    reminder: Boolean
  },
  data() {
    return {
      date: null,
      hour: null,
      selectedReminder: null,
      reminders: [
        { text: this.$t("reminders.never"), value: "never" },
        { text: this.$t("reminders.onDueDate"), value: "0" },
        { text: this.$t("reminders.15minutes"), value: "15" },
        { text: this.$t("reminders.1hour"), value: "60" },
        { text: this.$t("reminders.2hours"), value: "120" },
        { text: this.$t("reminders.1day"), value: "1140" },
        { text: this.$t("reminders.2days"), value: "2280" },
        { text: this.$t("reminders.1week"), value: "7980" }
      ]
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    getLocale() {
      const locale = this.$i18n.locale;
      return locale;
    },
    selectDate() {
      let dateTime = this.date;
      if (this.hour) {
        dateTime = `${dateTime} ${this.hour}`;
      }
      dateTime = this.formatDateTz(dateTime);
      this.showDialog = false;
      this.$emit("select", dateTime, this.selectedReminder);
    },

    checkDblClick(event) {
      const { target } = event;
      if (target.classList.contains("v-btn__content")) {
        this.selectDate();
      }
    }
  }
};
</script>

<style>
.invisible {
  display: none;
}

.reminder {
  margin-top: 24px;
}

.textpickr-confirm {
  cursor: pointer;
  padding: 24px;
  border-top: 1px solid #aaa;
}

</style>
