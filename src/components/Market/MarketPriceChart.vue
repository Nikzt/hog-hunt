<template>
  <div class="market-price-chart">
    <svg :width="dimensions.width" :height="dimensions.height">
      <g
        class="bounds"
        :transform="`translate(${dimensions.margin.left}, ${dimensions.margin.right})`"
      >
        <path class="hog-line" :d="line" stroke-width="4" />
        <g :transform="`translate(${hogCoordinates.x}, ${hogCoordinates.y})`">
          <circle r="22" cx="14" cy="15" fill="white" />
          <hog-graphic :width="30" :height="30" />
          <text class="hog-price" x="40" y="18">
            {{ currentHogPrice.price }}g
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { GameState } from "../../stores/GameState";
import HogGraphic from "../HogGraphic";
import { computed } from "vue";
import * as d3 from "d3";

export default {
  name: "MarketPriceChart",
  components: {
    HogGraphic,
  },
  setup() {
    const marketPrices = computed(
      () => GameState.getters.getMarketItemPriceHistory
    );
    const xAccessor = (d) => d.idx;
    const yAccessor = (d) => d.price;
    let dimensions = computed(() => {
      const dim = {
        // Size of wrapper
        width: Math.min(window.innerWidth * 0.9, 500),
        height: 200,
        margin: {
          top: 10,
          right: 60,
          bottom: 40,
          left: 30,
        },
      };
      // Size of bounds is size of wrapper with the margins subtracted
      dim.boundedWidth = dim.width - dim.margin.left - dim.margin.right;
      dim.boundedHeight = dim.height - dim.margin.top - dim.margin.bottom;

      return dim;
    });

    const yScale = computed(() => {
      const domain = d3.extent(marketPrices.value, yAccessor);
      domain[1] += 5;
      domain[0] = Math.max(0, domain[1] - 30);
      return d3
        .scaleLinear()
        .domain(domain)
        .range([dimensions.value.boundedHeight, 0]);
    });

    const xScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([0, dimensions.value.boundedWidth]);

    const line = computed(() => {
      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale.value(yAccessor(d)));
      return lineGenerator(marketPrices.value);
    });

    const currentHogPrice = computed(
      () => marketPrices.value[marketPrices.value.length - 1]
    );

    const hogCoordinates = computed(() => {
      return {
        x: xScale(xAccessor(currentHogPrice.value)) - 15,
        y: yScale.value(yAccessor(currentHogPrice.value)) - 15,
      };
    });

    return {
      dimensions,
      line,
      hogCoordinates,
      currentHogPrice,
    };
  },
};
</script>

<style scoped>
.market-price-chart {
  display: inline-block;
  background-color: #2c3e50;
}

.hog-line {
  stroke: pink;
  fill: none;
}

.hog-price {
  fill: #ebe495;
}
</style>