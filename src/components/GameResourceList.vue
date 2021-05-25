<template>
  <ul>
    <game-resource-item v-for='resource in resources' 
                        :key='resource.name' 
                        :resource='resource'/>
  </ul>
</template>

<script>
import GameResourceItem from "./GameResourceItem";
import {GameState} from "../stores/GameState";
import {computed} from "vue";

export default {
  name: 'GameResourceList',
  components: { GameResourceItem },
  setup () {
    return {resources: computed(() => GameState.getters.resources)}
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