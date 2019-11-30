<template>
  <div>
    <data-list 
      uri="/system/role"
      dialogTitle="角色"
      dialogWidth="500px"
      :columns="columns" 
      :queryParams="params"
      :modelRules="modelRules"
      :isPaging="false"
      :model.sync="model">
      <template>
        <el-form-item prop="Name" label="角色名称">
          <el-input v-model="model.Name"></el-input>
        </el-form-item>
        <el-form-item prop="Memo" label="备注">
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
      modelRules: {
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      model: {}
    }
  },
  methods: {
  }
}
</script>>
