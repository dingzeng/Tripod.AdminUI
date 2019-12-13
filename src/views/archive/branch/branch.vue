<template>
  <div>
    <list-page 
      uri="archive/branch"
      :queryParams="queryParams"
      :columns="columns"
      :model.sync="model">
      <template slot="queryForm">
        <el-form-item prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="机构编码/名称"></el-input>
        </el-form-item>
      </template>
      <template slot="mainLeft">
        <el-tree
          ref="branchTree"
          class="filter-tree"
          default-expand-all
          :data="branchTreeData"
          @node-click="handleNodeClick">
        </el-tree>
      </template>
      <template>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item prop="parentId" required label="上级机构">
              <ref-input v-model="model.parentId" type="branch" :label.sync="model.parentName"></ref-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" required label="机构编码">
              <el-input v-model="model.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" required label="机构类型">
              <el-select v-model="model.type">
                <el-option 
                  v-for="(label,key) in branchType"
                  :key="key"
                  :value="key"
                  :label="label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item prop="name" required label="机构名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="shortName" required label="机构简称">
              <el-input v-model="model.shortName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item prop="contactsName" label="联系人">
              <el-input v-model="model.contactsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contactsMobile" label="联系人手机号">
              <el-input v-model="model.contactsMobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contactsTel" label="联系电话">
              <el-input v-model="model.contactsTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item prop="contactsEmail" label="邮箱">
              <el-input v-model="model.contactsEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address" label="地址">
              <el-input v-model="model.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="memo" label="备注">
              <el-input v-model="model.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </list-page>
  </div>
</template>

<script>
import ListPage from '@/views/components/list-page/index'
import RefInput from '@/views/components/ref-input/index'
import { branchType } from '@/utils/enum'
import { loadBranchTreeData } from '@/api/branch'
export default {
  name: 'ArchiveBranch',
  components: { ListPage, RefInput },
  data() {
    return {
      queryParams: {},
      columns: [],
      model: {},
      modelRules: [],
      branchType,
      branchTreeData: []
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
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
        width: 55,
        align: 'center'
      },
      {
        prop: 'id',
        label: '编码',
        width: 100
      },
      {
        prop: 'name',
        label: '机构名称',
        width: 150
      },
      {
        prop: 'type',
        label: '机构类型',
        width: 100
      },
      {
        prop: 'contactsName',
        label: '联系人',
        width: 100
      },
      {
        prop: 'contactsMobile',
        label: '联系电话',
        width: 100
      },
      {
        prop: 'createOperName',
        label: '创建人',
        width: 100
      },
      {
        prop: 'address',
        label: '地址'
      },
      {
        type: 'opt',
        label: '操作',
        width: 150,
        actions: ['edit', 'delete']
      }
    ]
  }
}
</script>