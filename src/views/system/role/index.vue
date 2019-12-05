<template>
  <div>
    <list-page
      uri="/system/role"
      dialog-title="角色"
      dialog-width="500px"
      :columns="columns"
      :model-rules="modelRules"
      :is-paging="false"
      :model.sync="model"
    >
      <template>
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item prop="memo" label="备注">
          <el-input v-model="model.memo" />
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
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      model: {}
    }
  },
  created() {
    this.columns = [
      {
        type: 'selection',
        width: 55
      }, {
        prop: 'id',
        label: '编码',
        width: 100
      }, {
        prop: 'name',
        label: '名称',
        width: 100
      }, {
        prop: 'memo',
        label: '备注'
      }, {
        type: 'opt',
        label: '操作',
        width: 150,
        actions: ['edit', 'delete']
      }
    ]
  },
  methods: {
  }
}
</script>>
