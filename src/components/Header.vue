<template>
  <div class="header">
    <hog-graphic :width="50" :height="50" class="hog-graphic" />
    <h2>Hog Hunt</h2>
    <Button text="Restart" type="" @click="reset" />
  </div>
</template>

<script>
import HogGraphic from "./HogGraphic";
import Button from "./Button.vue";
import { GameState } from "../store/GameState";

export default {
  name: "Header",
  components: {
    HogGraphic,
    Button,
  },
  setup() {
    const reset = () => {
      GameState.dispatch("reset");
    };
    return { reset };
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  text-align: center;
}
h2 {
  margin: 10px;
}

.hog-graphic {
  position: absolute;
  left: 20px;
  top: 1px;
}

Button {
  position: absolute;
  right: 20px;
  top: 5px;
}
</style>