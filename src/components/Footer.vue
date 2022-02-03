<template>
  <CFooter>
    <div>
      <a
        href="https://www.parstat.md"
        class="text-decoration-none text-primary"
        target="_blank"
        >{{ $t("common.parstat_project") }}</a
      >
    </div>
    <div class="ms-auto">
      <span class="ms-1">Powered by </span>
      <a
        href="https://coreui.io/vue"
        class="text-decoration-none text-primary"
        target="_blank"
        >CoreUI for Vue</a
      >
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
