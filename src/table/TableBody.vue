<template>
  <tbody>
    <tr v-for="(line, idx) in data" :key="idx">
      <td v-for="(col, index) in tableColumn" :key="index">
        {{ renderText(line, col) }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
    name: 'TableBody',
    props: {
        tableColumn: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        renderText(line, col) {
            if (col.render) {
                return col.render(col)
            }
            return line[col.index]
        },
    },
}
</script>

<style scoped lang="less">
th, td {
    border: 1px solid #333;
}
</style>
