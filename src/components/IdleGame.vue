<template>
  <div class="idle-game">
    <player-action-list :actions="actions" />
    <game-resource-list :resources="resources" />
  </div>
</template>

<script>
import { ref } from "vue";
import PlayerActionList from "./PlayerActionList";
import GameResourceList from "./GameResourceList";

export default {
  name: "IdleGame",
  components: { PlayerActionList, GameResourceList },
  setup() {
    // Resources
    const hogs = ref({ name: "Hogs", value: 0 });
    const gold = ref({ name: "Gold", value: 0 });
    const resources = [hogs, gold];

    // Actions
    const hogHunt = {
      onClick: () => {
        hogs.value.value++;
      },
      name: "Hog Hunt",
      description: "Go out into the wilderness and hunt for wild hogs",
    };
    const sellHog = {
      onClick: () => {
        if (hogs.value <= 0) {
          hogs.value.value--;
          gold.value.value += 10;
        }
      },
      name: "Sell Hog",
      description: "Sell a hog for the current market price",
    };

    const actions = [hogHunt, sellHog];
    return { resources, actions };
  },
};
</script>

<style scoped>
.idle-game {
  display: flex;
  flex-wrap: wrap;
}
</style>