<template>
<div v-if="showModal" class="modal"></div>
    
</template>

<script>
export default {
    name: "Modal",
    props: {
        showModal: Boolean,
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