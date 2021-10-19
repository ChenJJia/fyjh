<template>
  <div style="width: 1200px">
    <test-table style="float: left;margin-left: 20px" :options="tableOptions" />
    <!--    <test-table style="float: right" :options="tableOptions2" @changepage="changePage">-->
    <!--      <table-column index="name" label="名字2" />-->
    <!--      <table-column index="age" label="年龄2" />-->
    <!--    </test-table>-->
  </div>
</template>

<script lang="ts">
import { TestTable } from '../src/table'

export default {
    name: 'App',
    components: {
        TestTable,
    },
    data() {
        return {
            tableOptions: {
                data: [
                    { name: 'cjj', age: 18 },
                    { name: 'we', age: 32 },
                    { name: 'r', age: 43 },
                    { name: 'ew', age: 34 },
                    { name: 'fds', age: 5 },
                    { name: 'd', age: 43 },
                    { name: 'f', age: 5 },
                    { name: 'fzf', age: 23 },
                ],
                tableColumn: [
                    { label: '名字', index: 'name', sortFn: (item1, item2) => {
                        return item1.name > item2.name ? -1 : 1
                    }  },
                    { label: '年龄', index: 'age' },
                ],
                local: true,
                limit: 2,
                showPageColNum: 2,
            },
            tableOptions2: {
                data: [
                    { name: 'cjj', age: 16 },
                    { name: 'fzf', age: 26 },
                ],
                pagination: false,
            },
        }
    },
    methods: {
        changePage(val, pre) {
            console.log(`从第${pre}页切换到第${val}页`)
        },
    },
}
</script>
