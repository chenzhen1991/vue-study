<template>
    <div>
        index的组件
        <p @click="$store.commit('add')">{{$store.state.count}}</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>