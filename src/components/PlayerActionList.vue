<template>
<div class="player-action-list">
    <PlayerActionItem v-for="action in actions" :key="action.name" :action="action" 
        :is-on-cooldown="cooldowns[action.name] != null && cooldowns[action.name].value.isOnCooldown"
        :remaining-cooldown="cooldowns[action.name] != null ? cooldowns[action.name].value.remainingCooldown : null" />
</div>
</template>

<script>
import PlayerActionItem from './PlayerActionItem'

export default {
    name: "PlayerActionList",
    components: {PlayerActionItem},
    props: {
        actions: Array,
        cooldowns: Object
    }
}
</script>

<style scoped>
    .player-action-list {
        width: 400px;
    }
</style>