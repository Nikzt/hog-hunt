<template>
  <div class="market">
    <h3>Market Prices</h3>
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
import {GameState} from "../../stores/GameState"
import { computed } from 'vue';

export default {
  name: "Market",
  components: {
    //MarketItem,
    MarketPriceChart
  },
  setup () {
    return {
      marketItems: computed(() => GameState.getters.getMarketItems)
    }
  }
};
</script>

<style scoped>
</style>