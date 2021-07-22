<template>
  <div v-if="showModal" class="modal-container">
    <div class="modal-backdrop" @click="closeModal"></div>
    <div class="modal-body">
      <slot></slot>
      <div class="modal-footer">
        <Button text="Close" @click="closeModal" type="close-button" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { GameState } from "../store/GameState";
import Button from "./Button";

export default {
  name: "Modal",
  components: {
    Button,
  },
  props: {
    renderedComponent: Object,
  },
  setup() {
    const closeModal = () => {
      GameState.commit("toggleModal");
    };
    return {
      showModal: computed(() => GameState.getters.getShowModal),
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
}

.modal-backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000066;
}

.modal-body {
  padding: 15px;
  background-color: white;
  width: 500px;
  height: 700px;
  margin: 0 auto;
  position: relative;
  top: 20vh;
}

@media only screen and (max-width: 600px) {
  .modal-body {
    width: 100%;
    height: calc(100% - 30px);
    top: 0;
  }
}


.modal-footer {
    background-color: #aaaaaa;
    position: absolute;
    bottom: 10px;
}
</style>