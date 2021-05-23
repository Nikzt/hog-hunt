<template>
  <li>
    <span class="resource-name"> {{ resource.name }}:</span>
    <span class="resource-value">{{ resource.value }}</span>
  </li>
</template>

<script>
export default {
  name: "GameResourceItem",
  props: {
    resource: Object,
  },
};
</script>

<style scoped>
  li + * {
    margin-top: 6px;
  }

  .resource-name {
    font-weight: bold;
  }

  .resource-value {
    float: right;
  }
</style>