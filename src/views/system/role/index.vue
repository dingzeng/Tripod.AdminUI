<template>
  <div>
    <list-page
      uri="/system/role"
      dialogTitle="角色"
      dialogWidth="500px"
      :columns="columns" 
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
    </list-page>
  </div>
</template>

<script>
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'SystemRole',
  components: { ListPage },
  data() {
    return {
      columns: [],
      modelRules: {
        Name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      model: {}
    }
  },
  methods: {
  },
  created() {
    this.columns = [
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
    ]
  }
}
</script>>
