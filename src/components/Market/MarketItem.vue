<template>
  <div class="market-item">{{ name }}: {{ price }}g</div>
</template>

<script>
export default {
  name: "MarketItem",
  props: {
    name: String,
    price: Number,
  },
};
</script>

<style scoped>
.market-item {
  margin-left: 20px;
}
</style>