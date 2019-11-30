<template>
  <div>
    <data-list 
      uri="/system/role"
      dialogTitle="角色"
      :columns="columns" 
      :queryParams="params"
      :paramsRules="paramsRules"
      :isPaging="false"
      :model.sync="model">
      <template slot="query-form">
        <el-form-item label="角色名称">
          <el-input v-model="params.name" placeholder="角色名称" />
        </el-form-item>
      </template>
      <template>
        <el-form-item label="角色名称">
          <el-input v-model="model.Name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="model.Memo"></el-input>
        </el-form-item>
      </template>
    </data-list>
  </div>
</template>

<script>
import DataList from '@/views/components/data-list/index'
export default {
  name: 'SystemRole',
  components: { DataList },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 55
        },{
          prop: 'Id',
          label: '编码',
          width: 100
        },{
          prop: 'Name',
          label: '名称',
          width: 100
        },{
          prop: 'Memo',
          label: '备注'
        },{
          type: '_opt',
          label: '操作',
          width: 150,
          actions: ['edit','delete']
        }
      ],
      params: { },
      paramsRules: [],
      model: {}
    }
  },
  methods: {
  }
}
</script>>
