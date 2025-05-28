<template>
    <div class="card-box">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'CardBox',
    }
</script>

<style scoped>
    .card-box {
        background-image: linear-gradient(to bottom right, var(--primary), var(--white));
        border-radius: 25px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 70vw;
        height: 70vh;
        margin-top: 10vh;
    }
</style>
