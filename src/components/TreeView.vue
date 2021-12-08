<template id="tree-menu">
  <div class="tree-menu">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <i v-if="nodes" class="fa" :class="iconClasses"></i>
        {{ label }}
      </div>
    </div>
    <tree-menu
      v-for="node in nodes" :key="node.id"
      :nodes="node.nodes"
      :label="node.label"
      :depth="depth + 1"
    >
    </tree-menu>
  </div>
</template>