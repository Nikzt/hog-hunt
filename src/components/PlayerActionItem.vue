<template>
  <Button :text="action.name" 
          @click="action.onClick"
          type="action-button"
          :disabled="isOnCooldown" />
  <span v-if="isOnCooldown && remainingCooldown != null">{{ remainingCooldown }}</span>
  <p>{{ action.description }}</p>
</template>

<script>
import Button from "./Button";

export default {
  name: "PlayerActionItem",
  props: {
    action: Object,
    isOnCooldown: Boolean,
    remainingCooldown: Number
  },
  components: {
    Button,
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