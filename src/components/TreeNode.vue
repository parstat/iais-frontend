<template>
  <div :style="nodeMargin">
    <b-alert show class="d-flex justify-content-between mb-1">
      <span>
        <strong>{{ node.code }}: </strong>
        {{ node.value }}
        <i>(level: {{ node.levelNumber }}) </i>
      </span>
      <span
        class="icon-span"
        v-if="hasChildren"
        @click="toggleChildren"
        @keypress="toggleChildren"
      >
        <minus-icon v-if="showChildren" />
        <add-icon v-else />
    </span>
    </b-alert>
    <div v-if="hasChildren" v-show="showChildren">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :spacing="spacing + 10"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  computed: {
    nodeMargin() {
      return {
        'margin-left': `${this.spacing}px`
      }
    },
    hasChildren() {
      const { children } = this.node;
      return children && children.length > 0;
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    }
  }
};
</script>
