<template>
  <button :class="type">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: String,
    text: String,
  },
};
</script>

<style scoped>
button {
    font-size: 1em;
    border: 1px solid black;
    padding: 10px;
}

button.resource {
    background-color: white;
}

</style>