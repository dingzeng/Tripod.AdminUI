<template>
  <div>
    <list-dialog
      ref="list"
      :uri="uri"
      :columns="columns"
      :query-params="innerQueryParams"
      :is-paging="false"
      dialog-title="选择商品部门"
    >
    </list-dialog>
  </div>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'ItemDepartmentListDialog',
  data() {
    return {
      uri: '/archive/itemDepartment',
      columns: [],
      innerQueryParams: {}
    }
  },
  mixins: [mixin],
  created() {
    this.columns = [
      {
        prop: 'id',
        label: '编码'
      },
      {
        prop: 'name',
        label: '名称'
      }
    ]
  }
}
</script>

