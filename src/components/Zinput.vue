<template>
    <div>
        <input :value='value' @input="inputHandle" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inheritAttrs:false,
        inject:['formItem'],
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        methods: {
            inputHandle(e) {
                this.$emit('input', e.target.value)
                this.formItem.$emit('validate')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>