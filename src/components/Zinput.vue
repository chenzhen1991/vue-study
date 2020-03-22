<template>
    <div>
        <input :value='value' @input="onIput" v-bind="$attrs">
    </div>
</template>

<script>
    export default {
        inject:['formItem'],
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
                // this.$parent.$emit('validate');
                this.formItem.$emit('validate')
            }
        },
        mounted () {
            console.log(this.$attrs)
        },
    }
</script>

<style lang="scss" scoped>

</style>