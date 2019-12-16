<template>
  <div>
    <list-page
      uri="archive/branch"
      dialog-title="机构"
      :query-params="queryParams"
      :columns="columns"
      :model.sync="model"
    >
      <template slot="queryForm">
        <el-form-item prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="机构编码/名称" />
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
      <template>
        <el-divider content-position="left">基础信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="parentId" label="上级机构" :required="model.id != '00'">
              <ref-input v-model="model.parentId" type="branch" :label.sync="model.parentName" :query-params="parentBranchQueryParams" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" required label="机构编码">
              <el-input v-model="model.id" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" required label="机构类型">
              <el-select v-model="model.type">
                <el-option
                  v-for="(label,key) in branchType"
                  :key="key"
                  :value="Number(key)"
                  :label="label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="name" required label="机构名称">
              <el-input v-model="model.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="shortName" required label="机构简称">
              <el-input v-model="model.shortName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">通讯信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="contactsName" label="联系人">
              <el-input v-model="model.contactsName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contactsMobile" label="手机号">
              <el-input v-model="model.contactsMobile" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="contactsTel" label="电话号码">
              <el-input v-model="model.contactsTel" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="contactsEmail" label="邮箱">
              <el-input v-model="model.contactsEmail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address" label="地址">
              <el-input v-model="model.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">维护信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="createOperName" label="创建人">
              <el-input v-model="model.createOperName" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="createTime" label="创建时间">
              <el-input v-model="model.createTime" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="lastUpdateOperName" label="最后修改人">
              <el-input v-model="model.lastUpdateOperName" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="lastUpdateTime" label="最后修改时间">
              <el-input v-model="model.lastUpdateTime" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="memo" label="备注">
              <el-input v-model="model.memo" />
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
      queryParams: {
        parentId: ''
      },
      columns: [],
      model: { },
      modelRules: [],
      branchType,
      branchTreeData: []
    }
  },
  computed: {
    parentBranchQueryParams() {
      return {
        typeList: '0,1'
      }
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
        type: 'enum',
        label: '机构类型',
        width: 100,
        enums: branchType
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
      }
    ]
  },
  methods: {
    handleNodeClick(data) {
      this.queryParams.parentId = data.id
    }
  }
}
</script>
