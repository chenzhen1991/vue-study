<template>
    <div>
        <h3>wwww</h3>
        <TreeNode v-for="n in data" :key="n.title" :model="n" />
<!--        <TreeNode v-for="item in data" :key="item.title" :model="item"></TreeNode>-->
    </div>
</template>

<script>
    import TreeNode from './TreeNode.vue';
    export default {
        name: "Tree",
        props: {
            data: {
                type: Array,
                require: true
            },
        },
        components: {
            TreeNode
        }
    }
</script>

<style scoped>

</style>