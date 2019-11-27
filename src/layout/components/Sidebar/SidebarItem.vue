<template>
  <div class="menu-wrapper">
    <template v-if="item.IsLeaf">
      <app-link :to="item.Path">
        <el-menu-item :index="item.Code" :class="{'submenu-title-noDropdown':!item.IsLeaf}">
          <item :icon="item.Icon" :title="item.Name" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="item.Code" popper-append-to-body>
      <template slot="title">
        <item :icon="item.Icon" :title="item.Name" />
      </template>
      <sidebar-item
        v-for="child in item.Children"
        :key="child.Path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
// import path from 'path'
// import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    findRouter() {
      return {}
    }
  }
}
</script>
