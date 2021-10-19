<template>
  <thead class="table-header">
    <tr>
      <th v-for="(col, index) in tableColumn" :key="index">
        {{ col.label }}
        <button class="table-header__btn btn-asc" @click="onSort(col, 'asc')">顺序</button>
        <button class="table-header__btn btn-des" @click="onSort(col, 'des')">倒叙</button>
        <button class="table-header__btn btn-def" @click="onSort(col)">恢复</button>
      </th>
    </tr>
  </thead>
</template>

<script>

export default {
    name: 'TableHeader',
    props: {
        tableColumn: {
            type: Array,
            default: () => [],
        },
        sortable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {},
    methods: {
        onSort: function (item, order) {
            this.$emit('sort', item.index, order)
        },
    },
}
</script>
<style scoped lang="less">
.table-header {
  th, tr {
    border: 1px solid #333;
  }
  &__btn {
    cursor: pointer;
    font-size: 12px;
    border: 1px solid black;
    border-radius: 4px;
    padding: 0 2px;
    margin-right: 4px;
  }
}

</style>
