<template>
  <div>
    <list-page
      uri="/archive/supplierRegion"
      dialog-title="供应商区域"
      :columns="columns"
      :is-paging="false"
      :model.sync="model"
    >
      <template>
        <el-form-item prop="name" label="区域名称" required>
          <el-input v-model="model.name"></el-input>
        </el-form-item>
      </template>
    </list-page>
  </div>
</template>

<script>
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'SupplierRegion',
  components: { ListPage },
  data: () => {
    return {
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
