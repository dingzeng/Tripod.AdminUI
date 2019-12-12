<template>
  <div>
    <ListPage
      uri='/archive/branchGroup'
      dialogTitle="店组管理"
      :columns="columns"
      :modelRules="modelRules"
      :isPaging="false"
      :model.sync="model">
      <template>
        <el-form-item prop="name" label="店组名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
      </template>
    </ListPage>
  </div>
</template>

<script>
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'ArchiveBranchGroup',
  components: { ListPage },
  data() {
    return {
      columns: [],
      model: {},
      modelRules: {
        name: [
          { required: true, message: '请输入店组名称', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.columns = [
      {
        type: 'selection',
        width: 55
      },
      {
        prop: 'id',
        label: '编码',
        width: 100
      },{
        prop: 'name',
        label: '店组名称'
      },{
        type: 'opt',
        label: '操作',
        width: 150,
        actions: ['edit', 'delete']
      }
    ]
  }
}
</script>