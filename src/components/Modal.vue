<template>
<div v-if="showModal" class="modal"></div>
    
</template>

<script>
import { computed } from 'vue'
import {GameState} from "../stores/GameState"
export default {
    name: "Modal",
   
    setup(){
        return{
            showModal: computed(() => GameState.getters.getShowModal)
        }
    }
}



</script>

<style scoped>
.modal{
    position: absolute;
    width: 80%;
    height: 40%;
    background-color: red;
    top: 0;
    left: 0;

}
</style>