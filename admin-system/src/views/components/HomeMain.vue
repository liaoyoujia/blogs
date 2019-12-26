<template>
  <div>
    <el-card shadow="hover"
      class="layout-article-list"
      v-for="(item,index) in list"
      @click.native="locationDetail(item._id)"
      :key="index">
      <div slot="header">
        <span>{{item.title}}</span>
      </div>
      <div class="layout-article-item">
        {{item.content}}
      </div>
      <div class="layout-article-bottom">
        <span>发布于&nbsp;<el-link href="https://element.eleme.io"
            target="_blank">2019-09-04</el-link></span>
        <span style="margin-left:10px">属于&nbsp;<el-link href="https://element.eleme.io"
            target="_blank"
            style=" vertical-align: top;">{{item.tag||'未知'}}</el-link></span>
      </div>
    </el-card>
    <el-pagination layout="prev, pager, next"
      :total="total"
      @current-change="loadListData"
      class="home-pagination">
    </el-pagination>
  </div>
</template>

<script>
import { reqBlogList } from '@/plugins/axios/index'
export default {
  data () {
    return {
      list: [],
      page: 1,
      total: 0,
      q: ''
    }
  },
  mounted () {
    this.initListData()
  },
  methods: {
    async initListData () {
      let o = { page: this.page }
      if (this.q !== '') o['q'] = this.q
      const res = await reqBlogList(o)
      if (res.errno === 0) {
        this.list = res.data.data
        this.total = res.data.total
      }
    },
    loadListData (page, q) {
      this.page = page
      this.q = q || ''
      this.initListData()
    },
    locationDetail (id) {
      this.$router.push({ name: 'HomeDetail', query: { id } })
    }
  }

}
</script>

<style scoped lang="scss">
.layout-article-list + .layout-article-list {
  margin-top: 20px;
}
.layout-article-list {
  width: 100%;

  .layout-article-item {
    line-height: 1.4;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .layout-article-bottom {
    width: 100%;
    margin-top: 12px;
    font-size: 14px;
    color: #606266;
    text-align: right;
  }
}
.home-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
}
</style>
