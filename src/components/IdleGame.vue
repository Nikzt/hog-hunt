<template>
  <div class="idle-game">
    <player-action-list :actions="actions" />
    <game-resource-list />
  </div>
  <modal><market /></modal>
</template>

<script>
import PlayerActionList from "./PlayerActionList";
import GameResourceList from "./GameResourceList";
import Market from "./Market/Market";
import Modal from "./Modal";
import {GameState} from '../store/GameState'

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

     const openMarket = {
      onClick: () => {
        GameState.commit("toggleModal")
      },
      name: "Market",
      description: "Go to the hog market to trade hogs",
    };

    const actions = [hogHunt, openMarket];
    return { actions};
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
.player-action-list {
  width: 400px;
}
</style>