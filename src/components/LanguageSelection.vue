<template>
  <div>
    <select v-model="$i18n.locale" class="form-select">
      <option v-for="lang in langs" :key="lang.value" :value="lang.value">
        {{ lang.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return {
      langs: [
        { value: "en", label: "English" },
        { value: "ro", label: "Romana" },
        { value: "ru", label: "Русский" },
      ],
    };
  },
  watch: {
    "$i18n.locale": function setLocale() {
      this.setLocale();
    },
  },

  methods: {
    setLocale() {
      this.$store.dispatch("localization/setLocale", this.$i18n.locale);
      window.location.reload(); //reload page to get also translated data
    },
  },
};
</script>
