<template>
<div class="player-action-list">
    <PlayerActionItem v-for="action in actions" :key="action.name" :action="action" />
</div>
</template>

<script>
import PlayerActionItem from './PlayerActionItem'

export default {
    name: "PlayerActionList",
    components: {PlayerActionItem},
    props: {
        actions: Array,
    }
}
</script>

<style scoped>
</style>