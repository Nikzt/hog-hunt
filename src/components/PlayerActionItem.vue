<template>
  <Button
    :text="action.name"
    @click="action.onClick"
    type="action-button"
    :disabled="isOnCooldown"
  />
  <span v-if="isOnCooldown && remainingCooldown != null">{{
    remainingCooldown
  }}</span>
  <p>{{ action.description }}</p>
</template>

<script>
import Button from "./Button";
import {GameState} from "../stores/GameState"
import {computed} from 'vue';

export default {
  name: "PlayerActionItem",
  props: {
    action: Object,
  },
  components: {
    Button,
  },
  setup(props) {
    const remainingCooldown = computed(() => {
      if (props.action.cooldownName)
        return GameState.getters.getRemainingCooldown(props.action.cooldownName)
      return null
    })
    const isOnCooldown = computed(() => {
      if (props.action.cooldownName)
        return GameState.getters.getIsOnCooldown(props.action.cooldownName)
      return null
    })

    return {
      remainingCooldown,
      isOnCooldown
    }
  },
};
</script>

<style scoped>
p {
  margin-left: 40px;
}
span {
  margin-left: 10px;
}
</style>