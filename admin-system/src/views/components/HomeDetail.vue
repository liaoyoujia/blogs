<template>
  <mavon-editor :value="value"
    :editable="false"
    defaultOpen="preview"
    :toolbarsFlag="false"
    :subfield="false"
    class="detail" />
</template>

<script>
import { reqBlogItem } from '@/plugins/axios/index'
export default {
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    this.initBlogItem()
  },
  watch: {
    '$route' (to, from) {
      this.initBlogItem()
    }
  },
  methods: {
    async initBlogItem () {
      const { id } = this.$route.query
      const res = await reqBlogItem({ id })
      if (res.errno === 0) {
        this.value = res.data.content
      }
    }
  }

}
</script>

<style scoped lang="scss">
.detail {
  width: 100%;
  min-height: 80vh;
}
</style>
