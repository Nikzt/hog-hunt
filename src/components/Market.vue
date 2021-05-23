<template>
  <div class="market">
    <h3>Market Prices</h3>
    <market-item v-for="marketItem in marketItems" 
                 :key="marketItem.value.name"
                 :name="marketItem.value.name"
                 :price="marketItem.value.price" />
  </div>
</template>

<script>
import MarketItem from "./MarketItem";

export default {
  name: "Market",
  components: {
    MarketItem,
  },
  props: {
    marketItems: Array,
  },
};
</script>

<style scoped>
</style>