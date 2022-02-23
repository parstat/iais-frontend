<template>
  <CFooter>
    <div>
      <a
        href="https://www.parstat.md"
        class="text-decoration-none text-primary"
        target="_blank"
        >{{ $t("common.parstat_project") }}
      </a>
    </div>
    <div class="ms-auto">
      <span class="ms-1">{{ $t("common.powered_by") }}&nbsp;</span>
      <a
        href="https://coreui.io/vue"
        class="text-decoration-none text-primary"
        target="_blank"
        >{{ $t("common.coreui_for_vue") }}
      </a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
