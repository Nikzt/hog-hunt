<template>
  <Button :text="action.name" 
          @click="action.onClick"
          type="action-button" />
  <p>{{ action.description }}</p>
</template>

<script>
import Button from "./Button";

export default {
  name: "PlayerActionItem",
  props: {
    action: Object,
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
</style>