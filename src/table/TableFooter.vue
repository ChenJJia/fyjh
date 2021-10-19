<template>
  <div v-if="curShowColNum">
    <ul class="pagine-list">
      <li
        v-for="idx in curShowColNum"
        :key="idx"
        class="pagine-item page-index"
        :class="{active: idx === curActive}"
        @click="onClickPage(idx)"
      >
        {{ idx }}
      </li>
      <template v-if="hasEllipse">
        <li class="pagine-item" @click="expandPagine">
          ...
        </li>
        <li
          class="pagine-item page-index"
          :class="{active: totalPagineNum === curActive}"
          @click="onClickPage(totalPagineNum)"
        >
          {{ totalPagineNum }}
        </li>
      </template>
    </ul>
    <span style="margin-left: 16px">共{{ tableTotal }}项</span>
  </div>
</template>

<script>
export default {
    name: 'TableFooter',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        total: {
            type: Number,
            default: 0,
        },
        local: {
            type: Boolean,
            default: false,
        },
        page: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 10,
        },
        showPageColNum: {
            type: Number,
            default: 3,
        },
    },
    data() {
        return {
            curActive: 1,
            curShowColNum: this.showPageColNum,
            showEllipse: true,
        }
    },
    computed: {
        tableTotal() {
            return this.local ? this.data.length : this.total
        },
        hasEllipse() {
            return this.showEllipse && this.tableTotal > (this.showPageColNum + 1) * this.limit
        },
        totalPagineNum() {
            return Math.ceil(this.tableTotal / this.limit)
        },
    },
    mounted() {
        this._initData()
    },
    methods: {
        _initData() {
            const total =  this.totalPagineNum,
                showTotal = this.showPageColNum
            this.curShowColNum = (total <= showTotal + 1) ? total : showTotal
        },
        expandPagine() {
            this.showEllipse = false
            this.curShowColNum = this.totalPagineNum
        },
        onClickPage(val) {
            this.$emit('changepage', val, this.curActive, this.limit)
            this.curActive = val
        },
        setActive (val) {
            this.curActive = val
        },
    },
}
</script>

<style scoped lang="less">
.pagine-list {
    display: inline-block;
    margin-top: 32px;
    .pagine-item {
        display: inline-block;
        cursor: pointer;
        &.page-index {
            border: 1px solid #ddd;
            height: 24px;
            width: 24px;
            text-align: center;
            &.active {
                color: #fff;
                background-color: #0080ff;
            }
        }
    }
}
</style>
