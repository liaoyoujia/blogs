<template>
  <el-container>
    <el-container class="layout-container-left">
      <el-main>
        <router-view ref="homeMain"></router-view>
      </el-main>
    </el-container>
    <el-aside class="layout-aside">
      <div class="search-wrapper">
        <el-input v-model="q"
          placeholder="请输入内容"
          class="layout-search"></el-input>
        <el-button type="primary"
          plain
          size="mini"
          @click="searchBlog">搜索</el-button>
      </div>
      <div class="category-pane"
        v-if="titleList&&titleList.length">
        <h6>最近更新</h6>
        <ul class="category-pane-list">
          <li class="category-pane-item"
            v-for="(item,index) in titleList"
            :key="index">
            <el-link @click="locationDetail(item._id)">
              {{item.title}}
            </el-link>
          </li>
        </ul>
      </div>
      <!-- dateList&&dateList.length -->
      <div class="category-pane"
        v-if="false">
        <h6>时间排序</h6>
        <ul class="category-pane-list">
          <li class="category-pane-item"
            v-for="(item,index) in dateList"
            :key="index">
            <el-link>
              {{item}}
            </el-link>
          </li>
        </ul>
      </div>
      <div class="category-pane"
        v-if="typeList&&typeList.length">
        <h6>文章类型</h6>
        <div>
          <el-tag v-for="(item,index) in typeList"
            :key="index"
            @click="searchTagBlog(item)"
            class="category-tag">{{item}}</el-tag>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import { reqTagAndTimeList } from '@/plugins/axios/index'
export default {
  name: 'home',
  data () {
    return {
      dateList: [],
      typeList: [],
      titleList: [],
      isHomeMain: true,
      itemId: 0,
      q: ''
    }
  },
  mounted () {
    this.loadBlogType()
  },
  methods: {
    searchTagBlog (tag) {
      this.q = tag
      this.searchBlog()
    },
    searchBlog () {
      let q = this.q
      this.$refs.homeMain.loadListData && this.$refs.homeMain.loadListData(1, q)
    },
    locationDetail (id) {
      this.$router.push({ name: 'HomeDetail', query: { id } })
    },
    async loadBlogType () {
      const res = await reqTagAndTimeList()
      if (res.errno === 0) {
        this.dateList = res.data.date
        this.typeList = res.data.tags
        this.titleList = res.data.title
      }
    }
  }
}
</script>
<style scoped lang="scss">
.category-pane + .category-pane {
  margin-top: 20px;
  .category-tag {
    margin: 0 10px 12px 0;
    cursor: pointer;
  }
}
.layout-container-left {
  width: 70%;
  box-sizing: border-box;
  background-color: #fff;
}
.layout-aside {
  width: 24%;
  // height: 300px;
  box-sizing: border-box;
  padding: 20px 10px;
  margin-left: 6%;
  box-sizing: border-box;
  background-color: #fff;
  .search-wrapper {
    margin-bottom: 30px;
    .layout-search {
      margin-right: 10px;
      width: 70%;
    }
  }
  .category-pane {
    width: 100%;
    h6 {
      margin: 6px 0 10px;
    }
    .category-pane-list {
      padding-left: 20px;
      .category-pane-item {
        line-height: 1.6;
      }
    }
  }
}
</style>
