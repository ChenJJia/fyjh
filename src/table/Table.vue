<template>
  <div>
    <table :width="width">
      <slot />
      <colgroup>
        <col v-for="col in tableColumn" :key="col.index" :name="col.index">
      </colgroup>
      <table-header :table-column="tableColumn" @sort="onSort" />
      <table-body :data="actualData" :table-column="tableColumn" />
    </table>
    <table-footer
      ref="tableFooter"
      :data="data"
      :show-page-col-num="showPageColNum"
      :limit="limit"
      :local="local"
      @changepage="changePage"
    />
  </div>
</template>
<script>

/**
 * 表格组件
 * 1、支持表头功能、表格主要内容、分页功能（对分页栏没有任何要求，可以点击并联动即可；
 * 2、支持静态数据的加载（支持本地的静态分页）；
 * 3、支持排序（顺序、倒叙、以及恢复原来的状态）；
 * 4、对css样式没有强的要求，可看即可；
 * demo：https://blog.csdn.net/weixin_44897255/article/details/105808987；
 * https://baijiahao.baidu.com/s?id=1711219715683083621&wfr=spider&for=pc
 *
 * 思路：
 * 把util放util里面（参考element，可以把util搞过来）；
 * 表格使用方式有两种：
 * 1、table+table-column：table的默认slot中放table-column，这样table内部就可以拿到所有的table-column，并将这个去转换成对应的配置项options；
 * 2、table+tableOptions：表格通过配置项去渲染表头、表格内容、分页；
 * 组件具体设计：
 * 1、使用table搭架子，然后内部分别有三个组件table-header、table-body、table-footer；
 * 2、table-header：通过获取的options的配置项生成表格头；
 * 3、table-body：表格的列通过options循环，行通过数据循环（如果数据传递太复杂，可以使用vuex）；
 * 4、table-footer：放一个分页组件pagination；
 * 5、pagination：可设置最多显示多少个，多余的显示...，还有跳转第1页和最后一页的按钮；
 * 6、动态加载数据：在options里面配置load回掉，表格会自动加载load，获取里面的数据再调用静态加载数据的方法渲染界面；
 * 7、本地的静态分页：要点就是不发送请求，界面的更新和数据获取都是自己去处理data，截取到对应的数据就行了，然后调用静态加载数据渲染；
 * 8、顺序、倒叙、恢复：options或table-column里面可配置是否可以排序sortable，如果可以排序可以给当前列配置一个sortFn去处理data，
 *   如果没配置sortFn就用默认的，根据文字排序；因为需要恢复，所以需要对数据进行备份；
 * 9、样式随便写吧；
 */
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
export default {
    name: 'Table',
    components: {
        TableFooter,
        TableBody,
        TableHeader,
    },
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 500,
        },
    },
    data () {
        return {
            slotColumn: [],
            actualData: this.options.data,
            currentData: this.options.data,
            oldData: this.options.data,
        }
    },
    computed: {
        tableColumn() {
            return this.options.tableColumn || this.slotColumn || []
        },
        data() {
            return this.options.data || []
        },
        showPageColNum() {
            return this.options.showPageColNum
        },
        limit() {
            return this.options.limit
        },
        local() {
            return this.options.local
        },

    },
    mounted() {
        this._initData()
    },
    methods: {
        _initData() {
            this.oldData = this.data
            this.currentData = this.data

            this.getSlotColumn()
            this._setPageNumData(1, this.limit)
        },
        getSlotColumn () {
            const { default: column = [] } = this.$slots
            this.slotColumn = column.map(col => col.componentOptions.propsData)
        },

        onSort (index, order) {
            const item = this.tableColumn.filter(item => item.index === index)?.[0]
            if (!order) {
                this.currentData = [...this.oldData]
            } else {
                this.currentData = [...this.oldData].sort((item1, item2) => {
                    if (item.sortFn) {
                        return item.sortFn(item1, item2)
                    }
                    return item1[index] > item2[index] ? -1 : 1
                })
                order === 'asc' && this.currentData.reverse()
            }
            this.$refs.tableFooter.setActive(1)
            this._setPageNumData(1, this.limit)
        },
        changePage(val, pre, limit) {
            this.$emit('changepage', val, pre, limit)
            this._setPageNumData(val, limit)
        },
        _setPageNumData(page, limit) {
            this.actualData = this.currentData.slice((page-1)*limit, page*limit)
        },
    },
}
</script>
<style>
table {
    border: 1px solid #333;
    border-collapse: collapse;
}
</style>
