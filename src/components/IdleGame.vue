<template>
  <div class="idle-game">
    <player-action-list :actions="actions" />
    <game-resource-list :resources="resources" />
  </div>
  <hr />
  <market :market-items="marketItems"/>
</template>

<script>
import { ref } from "vue";
import PlayerActionList from "./PlayerActionList";
import GameResourceList from "./GameResourceList";
import Market from "./Market";

export default {
  name: "IdleGame",
  components: {
    PlayerActionList,
    GameResourceList,
    Market
  },
  setup() {
    // Resources
    const hogs = ref({ name: "Hogs", value: 0 });
    const gold = ref({ name: "Gold", value: 0 });
    const resources = [hogs, gold];

    // Market items
    const hogMarketItem = ref({name: "Hog", price: 10})
    const marketItems = [hogMarketItem]
    console.count()
    setInterval(() => {
      hogMarketItem.value.price = Math.round(10 * Math.random())
    }, 10000)

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
        if (hogs.value.value > 0) {
          hogs.value.value--;
          gold.value.value += hogMarketItem.value.price;
        }
      },
      name: "Sell Hog",
      description: "Sell a hog for the current market price",
    };


    const actions = [hogHunt, sellHog];
    return { resources, actions, marketItems };
  },
};
</script>

<style scoped>
.idle-game {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

hr {
  width: 80%;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>