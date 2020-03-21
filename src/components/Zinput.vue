<template>
    <div>
        <input :value='value' @input="onIput" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inheritAttrs:false,
        props:{
            value:{
                type: String,
                default:''
            }
        },
        methods: {
            onIput(e) {
                this.$emit('input', e.target.value)
            }
        },
        mounted () {
            console.log(this.$attrs)
        },
    }
</script>

<style lang="scss" scoped>

</style>