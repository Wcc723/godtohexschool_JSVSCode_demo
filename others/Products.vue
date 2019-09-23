<template>
  <div class="container p-0">
    <loading :active.sync="isLoading"></loading>
    <div class="row mb-2 no-gutters">
      <div class="col-md-3">
        <Sidebar
          @recentCategory="getFilterProducts"
          @recentDesigner="getDesigner"
          :categorybar="categoryList"
          :designerbar="designerlist"
          @recentfilter="getfilter"
          @recentFavorite="showFavorite"
        ></Sidebar>
      </div>
      <div class="col-md-9">
        <div class="bg-second text-first p-2 mx-2">商品列表</div>
        <div class="p-3 d-flex">
          <!-- 過濾標籤 -->
          <span class="border rounded p-2 mx-1" v-if="recentCategory">
            <i class="fas fa-times mr-1" @click.prevent="removeCategory"></i>
            {{recentCategory}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="filterdata.maxprice">
            <i class="fas fa-times mr-1" @click.prevent="removeFilter"></i>
            金額：{{filterdata.minprice}} ~ {{filterdata.maxprice}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="searchText != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeSearchText"></i>
            {{searchText}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="recentDesigner != ''">
            <i class="fas fa-times mr-1" @click.prevent="removeDesigner"></i>
            設計師：{{recentDesigner}}
          </span>
          <span class="border rounded p-2 mx-1" v-if="sortValue === 'price'">
            <i class="fas fa-times mr-1" @click.prevent="removeSort"></i>
            依金額排序
          </span>
          <div class="nav-item dropdown ml-auto">
            <a
              class="nav-link dropdown-toggle text-first border rounded"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >選擇排序方式</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="price" class="dropdown-item" href="#" @click.prevent="sortType">依金額排序</a>
            </div>
          </div>
        </div>
        <div class="row no-gutters px-2">
          <div class="col" v-if="products.length === 0">目前尚無符合搜尋結果的商品。</div>
          <!-- 商品 -->
          <div
            class="col-lg-3 col-md-4 col-sm-6 card p-2 border border-shadow"
            v-for="item in products"
            :key="item.id"
          >
            <a href="#" @click.prevent="openProduct(item.id)">
              <img :src="item.imageUrl" width="220px" alt class="card-img-top img-fluid" />
            </a>

            <div class="card-title my-2">
              <a href="#" class="text-general" @click.prevent="openProduct(item.id)">{{item.title}}</a>
            </div>
            <span class="text-left">{{item.description}}</span>
            <span class="text-right">
              <i
                class="far fa-heart text-first"
                v-if="item.isFavor != true"
                @click.prevent="addFavor(item)"
              ></i>
              <i
                class="fas fa-heart text-first"
                v-if="item.isFavor === true"
                @click.prevent="addFavor(item)"
              ></i>
            </span>
            <div class="text-left d-flex align-items-end">
              <div v-if="item.price == item.origin_price">{{item.origin_price|currency}}</div>
              <del v-if="item.price !== item.origin_price">{{item.origin_price|currency}}</del>
              <strong class="ml-2" v-if="item.price !== item.origin_price">{{item.price|currency}}</strong>
              <a href="#" class="text-general ml-auto" @click.prevent="addCart(item.id)">
                <i class="fas fa-cart-plus fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Pagination :propspage="pagination" @emitpage="getProducts"></Pagination>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
    }
  },
  components: {
    Sidebar,
    Pagination
  },
  methods: {
    // 取得產品列表(含page)
    getProducts (page = 1) {
      this.$store.dispatch('getProducts', page)
    },
    // 開啟單一產品頁面
    openProduct (id) {
      // let params = { title: 'test' }
      this.$router.push({
        path: '/productpage',
        query: { id: id }
      })
    },
    //  取得過濾後產品列表方法
    getFilterProducts (value = this.recentCategory) {
      this.$store.dispatch('getFilterProducts', value)
    },
    getfilter (data) {
      this.$store.dispatch('getfilter', data)
      this.getFilterProducts(this.recentCategory)
    },
    getDesigner (item) {
      this.$store.dispatch('getDesigner', item)
      this.getFilterProducts(this.recentCategory)
    },
    // 加入我的最愛
    addFavor (e) {
      this.$store.dispatch('addFavor', e)
      this.$store.dispatch('getFavorite')
    },
    // 將參數值傳到資料上
    sortType (event) {
      let value = event.currentTarget.id
      this.$store.dispatch('sortType', value)
      this.getFilterProducts(this.recentCategory)
    },
    getSearchText (text) {
      this.$store.dispatch('getSearchText', text)
      this.getFilterProducts(this.recentCategory)
    },
    ...mapActions(['removeDesigner', 'removeSearchText', 'removeCategory', 'removeFilter', 'removeSort', 'addCart', 'showFavorite'])
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'products', 'categoryList', 'designerlist', 'recentCategory',
      'recentDesigner', 'filterdata', 'pagination', 'favoProduct', 'isFavorite', 'sortValue', 'searchText'])
  },
  created () {
    this.$bus.$on('getFilterProducts', this.getFilterProducts)
    this.$bus.$on('getSearchText', this.getSearchText)
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.card-img-top {
  max-height: 140px;
  object-fit: cover;
}
.card-img-top:hover {
  opacity: 0.5;
}
strong {
  font-size: 24px;
}
.fa-cart-plus,
.fa-heart {
  font-size: 26px;
}
div,
a {
  font-family: inherit;
}
.cardshadow {
  border: none;
  box-shadow: 1px 1px 2px $shadow;
}
</style>
