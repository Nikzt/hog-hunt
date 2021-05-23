<template>
  <ul>
    <game-resource-item v-for='resource in resources' :key='resource.value.name' :resource='resource.value'/>
  </ul>
</template>

<script>
import GameResourceItem from "./GameResourceItem";

export default {
  name: 'GameResourceList',
  components: { GameResourceItem },
  props: {
    resources: Array
  }
};
</script>

<style scoped>
    ul {
        list-style: none;
        width: 150px;
        border: 1px solid black;
        padding: 10px;
        margin: 0 0 0 20px;
    }
</style>