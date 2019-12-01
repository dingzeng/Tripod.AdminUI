<template>
  <div>
    <list-dialog
      :visible.sync="innerVisible"
      :uri="uri" 
      :columns="columns" 
      :queryParams="queryParams" 
      dialogTitle="选择机构"
      @on-complete="complete">
      <template slot="queryForm">
        <el-form-item>
          <el-input v-model="queryParams.keyword" placeholder="机构编码、名称"></el-input>
        </el-form-item>
      </template>
      <template slot="mainLeft">
        <span>TODO</span>
      </template>
    </list-dialog>
  </div>
</template>

<script>
import mixin from './mixin'
import ListDialog from './listDialog'
export default {
  name: 'BranchListDialog',
  data() {
    return {
      uri: '/archive/branchs',
      columns: [],
      queryParams: {},
    }
  },
  mixins: [mixin],
  created() {
    this.columns = [
      {
        type: 'selection',
        width: 55
      },{
        prop: 'Id',
        label: '机构编码',
        width: 100
      },{
        prop: 'Name',
        label: '机构名称',
        width: 200
      },{
        prop: 'Type',
        label: '机构类型',
        width: 150
      },{
        prop: 'ContactsName',
        label: '联系人',
        width: 100
      }
    ]
  }
}
</script>

