<template>
  <div class="market">
    <player-action-list :actions="actions" />
    <game-resource-list />
    <!-- <market-item v-for="marketItem in marketItems" 
                 :key="marketItem.name"
                 :name="marketItem.name"
                 :price="marketItem.price" /> -->
    <market-price-chart />
  </div>
</template>

<script>
//import MarketItem from "./MarketItem";
import MarketPriceChart from "./MarketPriceChart";
import {GameState} from "../../store/GameState"
import { computed } from 'vue';
import PlayerActionList from '../PlayerActionList';
import GameResourceList from '../GameResourceList';

export default {
  name: "Market",
  components: {
    //MarketItem,
    MarketPriceChart,
    PlayerActionList,
    GameResourceList
  },
  setup () {
    const sellHog = {
      onClick: () => {
        GameState.dispatch("sellHog")
      },
      name: "Sell Hog",
      description: "",
    };
    const buyHog = {
      onClick: () => {
        GameState.dispatch("buyHog")
      },
      name: "Buy Hog",
      description: "",
    };
    return {
      marketItems: computed(() => GameState.getters.getMarketItems),
      actions: [sellHog, buyHog]
    }
  }
};
</script>

<style scoped>
.market {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}
.player-action-list {
  width: 200px;
}
</style>