<template>
    <div class="header">
        <hog-graphic :width="50" :height="50" class="hog-graphic"/>
        <h2>Hog Hunt</h2>
    </div>    
</template>

<script>
import HogGraphic from './HogGraphic';

export default {
   name: "Header" ,
   components: {
       HogGraphic
   }
}
</script>

<style>
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
</style>