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
      :operations="operations"
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
    <el-drawer :visible.sync="drawerVisible">
      <template slot="title">
        <h4>设置【{{ currentRoleName }}】角色操作权限</h4>
      </template>
      <el-row>
        <el-col :span="8">
          <el-tree :data="menuGroupsData" @node-click="nodeClick"></el-tree>
        </el-col>
        <el-col :span="16">
          <dl>
            <template v-for="menu in menus">
              <dt :key="'dt' + menu.code">
                <strong>{{ menu.name }}</strong>
              </dt>
              <dd :key="'dd' + menu.code">
                <el-checkbox
                  v-for="p in getMenuPermissions(menu.code)"
                  :key="p.permissionCode"
                  :value="getCheckState(p.permissionCode)"
                  @input="setCheckState(p.permissionCode, arguments)"
                >{{ p.permissionName }}</el-checkbox>
              </dd>
            </template>
          </dl>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import request from '@/utils/request'
import ListPage from '@/views/components/list-page/index'
export default {
  name: 'SystemRole',
  components: { ListPage },
  data() {
    return {
      columns: [],
      operations: [],
      modelRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      model: {},
      drawerVisible: false,
      menuGroupsData: [],
      menus: [],
      permissionsFlag: [],
      currentRoleId: '',
      currentRoleName: ''
    }
  },
  methods: {
    nodeClick(data) {
      request({
        url: '/system/menu/?parentCode=' + data.id,
        method: 'get'
      }).then(response => {
        this.menus = response.data
      })
    },
    getMenuPermissions(menuCode) {
      return this.permissionsFlag.filter(pf => pf.menuCode === menuCode)
    },
    getCheckState(permissionCode) {
      const pf = this.permissionsFlag.find(pf => pf.permissionCode === permissionCode)
      return pf.flag
    },
    setCheckState(permissionCode, args) {
      const has = args[0]
      request({
        url: '/system/role/permission',
        method: 'put',
        data: {
          roleId: this.currentRoleId,
          permissionCode: permissionCode,
          has: has
        }
      }).then(response => {
        const pf = this.permissionsFlag.find(pf => pf.permissionCode === permissionCode)
        pf.flag = has
      })
    }
  },
  created() {
    this.operations = [
      {
        icon: 'el-icon-setting',
        onclick: (index, row) => {
          this.currentRoleId = row.id
          this.currentRoleName = row.name
          request({
            url: '/system/role/permission_flag?roleId=' + row.id,
            method: 'get'
          }).then(response => {
            this.drawerVisible = true
            this.permissionsFlag = response.data
          })
        }
      }
    ]
    this.columns = [
      {
        prop: 'id',
        label: '编码',
        width: 100
      },
      {
        prop: 'name',
        label: '名称',
        width: 100
      },
      {
        prop: 'memo',
        label: '备注'
      }
    ]
  },
  mounted() {
    request({
      url: '/system/menu/tree',
      method: 'get'
    }).then(response => {
      this.menuGroupsData = response.data
    })
  }
}
</script>>
