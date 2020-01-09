<template>
  <div>
    <list-page
      uri="/archive/itemDepartment"
      dialog-title="商品部门"
      :columns="columns"
      :model.sync="model"
    >
      <template slot="queryForm">
        <el-form-item prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="编码/名称" />
        </el-form-item>
      </template>
      <template>
        <el-row>
          <el-col>
            <el-form-item label="名称" required>
              <el-input v-model="model.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </list-page>
  </div>
</template>

<script>
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'ItemDepartment',
  components: { ListPage },
  data() {
    return {
      queryParams: {},
      columns: [],
      model: {}
    }
  },
  created() {
    this.columns = [
      {
        prop: 'id',
        label: '编码',
        width: 100
      },
      {
        prop: 'name',
        label: '名称'
      }
    ]
  }
}
</script>
