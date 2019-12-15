<template>
  <div>
    <list-dialog
      :visible.sync="innerVisible"
      :uri="uri" 
      :columns="columns" 
      :queryParams="innerQueryParams" 
      dialogTitle="选择机构"
      @on-complete="complete">
      <template slot="queryForm">
        <el-form-item>
          <el-input v-model="innerQueryParams.keyword" placeholder="机构编码、名称"></el-input>
        </el-form-item>
      </template>
      <template slot="mainLeft">
        <el-tree
          ref="branchTree"
          class="filter-tree"
          default-expand-all
          :expand-on-click-node="false"
          :data="branchTreeData"
          @node-click="handleNodeClick"
        />
      </template>
    </list-dialog>
  </div>
</template>

<script>
import mixin from './mixin'
import ListDialog from './listDialog'
import { loadBranchTreeData } from '@/api/branch'
import { branchType } from '@/utils/enum'
export default {
  name: 'BranchListDialog',
  data() {
    return {
      uri: '/archive/branch',
      columns: [],
      innerQueryParams: {
        keyword: '',
        parentId: ''
      },
      branchTreeData: [],
      branchType
    }
  },
  mixins: [mixin],
  methods: {
    handleNodeClick(data) {
      this.innerQueryParams.parentId = data.id
    }
  },
  mounted() {
    loadBranchTreeData().then(response => {
      this.branchTreeData = response.data
    })
  },
  created() {
    this.columns = [
      {
        type: 'selection',
        width: 55
      },
      {
        prop: 'id',
        label: '机构编码',
        width: 100
      },
      {
        prop: 'name',
        label: '机构名称',
        width: 200
      },
      {
        prop: 'type',
        type: 'enum',
        label: '机构类型',
        width: 100,
        enums: branchType
      },
      {
        prop: 'contactsName',
        label: '联系人'
      }
    ]
  }
}
</script>

