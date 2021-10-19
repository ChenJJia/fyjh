<template></template>
<script>
export default {
    name: 'TableColumn',
    props: {
        index: {
            type: String,
            default: ''
        },
        defaultWidth: {
            type: Number,
            default: 100
        },
        label: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="less">

</style>
