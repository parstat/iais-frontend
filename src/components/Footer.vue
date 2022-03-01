<template>
  <CFooter>
    <div>
      <a
        href="https://www.parstat.md"
        class="text-decoration-none text-primary"
        target="_blank"
        ><span>{{ $t("common.parstat_project") }}</span>
      </a>
    </div>
    <div class="ms-auto">
      <span class="ms-1">{{ $t("common.powered_by") }}&nbsp;</span>
      <a
        href="https://coreui.io/vue"
        class="text-decoration-none text-primary"
        target="_blank"
        ><span>{{ $t("common.coreui_for_vue") }}</span>
      </a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
