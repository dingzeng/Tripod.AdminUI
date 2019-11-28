<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-form-inline" size="small">
      <el-form-item label="角色名称">
        <el-input v-model="params.name" placeholder="角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="Id" label="编码" width="100" />
      <el-table-column prop="Name" label="名字" width="100" />
      <el-table-column prop="Memo" label="备注" />
    </el-table>
  </div>
</template>

<script>
import { getRoles } from '@/api/role'
export default {
  name: 'SystemRole',
  data() {
    return {
      params: {
        name: ''
      },
      data: []
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      getRoles().then(response => {
        this.data = response.data.Roles
      })
    }
  }
}
</script>>
