<template>
  <div>
    <list-page
      uri="/archive/supplier"
      dialog-title="供应商"
      :columns="columns"
      :model.sync="model"
      dialog-fullscreen
    >
      <template slot="queryForm">
        <el-form-item prop="keyword">
          <el-input v-model="queryParams.keyword" placeholder="编码/名称" />
        </el-form-item>
      </template>
      <template slot="mainLeft">
        <el-tree
          default-expand-all
          :expand-on-click-node="false"
          :data="supplierRegionTreeData"
          @node-click="handleNodeClick"
        />
      </template>
      <template>
        <el-card header="基础信息">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="id" label="编码" required>
                <el-input v-model="model.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="name" label="名称" required>
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="regionId" label="区域" required>
                <!-- TODO region -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="sellWay" label="经营方式" required>
                <el-select>
                  <el-option v-for="way in sellWays" :key="way" :value="way">{{ way }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                {{ model.status }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="settleWay" label="结算方式" required>
                <el-select>
                  <el-option v-for="way in settleWays" :key="way" :value="way">{{ way }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="settleDays" label="结算周期天数">
                <el-input v-model="model.settleDays"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="settleDate" label="结算日期">
                <el-input v-model="model.settleDate"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-card header="通讯信息" style="margin: 10px 0px;">
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
          </el-row>
        </el-card>

        <el-card header="其它信息">
          <el-row>
            <el-col :span="8">
              <el-form-item prop="accountBank" label="开户行">
                <el-input v-model="model.contactsName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="accountNo" label="账号">
                <el-input v-model="model.contactsMobile" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="taxRegistrationNo" label="税务登记号">
                <el-input v-model="model.taxRegistrationNo" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="businessLicenseNo" label="营业执照号">
                <el-input v-model="model.businessLicenseNo" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="memo" label="备注">
                <el-input v-model="model.memo" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

      </template>
    </list-page>
  </div>
</template>

<script>
import { sellWays } from '@/api/branch'
import ListPage from '@/views/components/list-page/index'
import { loadSupplierRegionTreeData } from '@/api/supplier'
export default {
  name: 'Supplier',
  components: { ListPage },
  data: () => {
    return {
      queryParams: {
        regionId: ''
      },
      columns: [],
      model: {},
      supplierRegionTreeData: []
    }
  },
  methods: {
    handleNodeClick(data) {
      this.queryParams.regionId = data.id
    }
  },
  mounted() {
    loadSupplierRegionTreeData().then(response => {
      this.supplierRegionTreeData = response.data
    })
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
        label: '名称',
        width: 150
      },
      {
        prop: 'sellWay',
        label: '经营方式',
        type: 'enum',
        width: 100,
        enums: sellWays
      },
      {
        prop: 'status',
        label: '状态',
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
        prop: 'memo',
        label: '备注'
      }
    ]
  }
}
</script>
