<template>
  <div class="market-price-chart">
    <svg :width="dimensions.width"
         :height="dimensions.height">
        <g class="bounds"></g>
    </svg>
  </div>
</template>

<script>
import { GameState } from "../../stores/GameState";
import { computed } from "vue";
import * as d3 from "d3";

export default {
  name: "MarketPriceChart",
  components: {
    MarketItem,
  },
  setup() {
    const marketPrices = computed(
      () => GameState.getters.getMarketItemPriceHistory
    );
    const xAccessor = (d) => d.idx;
    const yAccessor = (d) => d.priceidx;
    let dimensions = {
      // Size of wrapper
      width: window.innerWidth * 0.9,
      height: 400,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
      },
    };

    // Size of bounds is size of wrapper with the margins subtracted
    dimensions.boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    d3.select(".bounds")

    return {
      marketItems: computed(() => GameState.getters.getMarketItems),
      dimensions
    };
  },
};
</script>

<style scoped>
    .market-price-chart {
    }
</style>