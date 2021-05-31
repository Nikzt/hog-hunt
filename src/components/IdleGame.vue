<template>
  <div class="idle-game">
    <player-action-list :actions="actions" />
    <game-resource-list />
  </div>
  <hr />
  <market />
  <modal />
</template>

<script>
import PlayerActionList from "./PlayerActionList";
import GameResourceList from "./GameResourceList";
import Market from "./Market/Market";
import Modal from "./Modal";
import {GameState} from '../stores/GameState'

export default {
  name: "IdleGame",
  components: {
    PlayerActionList,
    GameResourceList,
    Market,
    Modal
  },
  setup() {
    GameState.dispatch("initMarket")

    // Actions
    const hogHunt = {
      onClick: () => {
        GameState.dispatch("hogHunt")
      },
      name: "Hog Hunt",
      cooldownName: "hogHuntCooldown",
      description: "Go out into the wilderness and hunt for wild hogs",
    };
    const sellHog = {
      onClick: () => {
        GameState.dispatch("sellHog")
      },
      name: "Sell Hog",
      description: "Sell a hog for the current market price",
    };
    const buyHog = {
      onClick: () => {
        GameState.dispatch("buyHog")
      },
      name: "Buy Hog",
      description: "Purchase a hog for the current market price",
    };

    const actions = [hogHunt, sellHog, buyHog];
    return { actions };
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