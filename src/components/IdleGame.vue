<template>
  <div class="idle-game">
    <player-action-list :actions="actions"
                        :cooldowns="cooldowns" />
    <game-resource-list :resources="resources" />
  </div>
  <hr />
  <market :market-items="marketItems" />
</template>

<script>
import { ref } from "vue";
import PlayerActionList from "./PlayerActionList";
import GameResourceList from "./GameResourceList";
import Market from "./Market";
import {GameState} from '../stores/GameState'

export default {
  name: "IdleGame",
  components: {
    PlayerActionList,
    GameResourceList,
    Market,
  },
  setup() {
    // Resources
    const hogs = ref({ name: "Hogs", value: 0 });
    const gold = ref({ name: "Gold", value: 0 });
    const resources = [hogs, gold];

    // Market items
    const hogMarketItem = ref({ name: "Hog", price: 10 });
    const marketItems = [hogMarketItem];
    setInterval(() => {
      hogMarketItem.value.price = Math.round(10 * Math.random());
    }, 10000);

    // Cooldowns
    const hogHuntCooldown = ref({
      remainingCooldown: 10,
      baseCooldown: 10,
      isOnCooldown: false,
    });
    const cooldowns = {
      "Hog Hunt": hogHuntCooldown
    }

    // Actions
    const hogHunt = {
      onClick: () => {
        if (hogHuntCooldown.value.isOnCooldown)
          return;

        GameState.commit('addHog', 10);


        hogHuntCooldown.value.isOnCooldown = true;
        hogHuntCooldown.value.remainingCooldown =
          hogHuntCooldown.value.baseCooldown;

        const cooldownTimer = setInterval(() => {
          hogHuntCooldown.value.remainingCooldown--;

          if (hogHuntCooldown.value.remainingCooldown <= 0) {
            hogHuntCooldown.value.isOnCooldown = false
            hogs.value.value += Math.round(5 * Math.random());
            clearInterval(cooldownTimer);
          }
        }, 1000);
      },
      name: "Hog Hunt",
      cooldownName: "hogCooldown",
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
    const buyHog = {
      onClick: () => {
        if (gold.value.value >= hogMarketItem.value.price) {
          hogs.value.value++;
          gold.value.value -= hogMarketItem.value.price;
        }
      },
      name: "Buy Hog",
      description: "Purchase a hog for the current market price",
    };

    const actions = [hogHunt, sellHog, buyHog];
    return { resources, actions, marketItems, cooldowns };
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

  /* disable double tap zoom on mobile devices */
  touch-action: manipulation;
}

hr {
  width: 80%;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>