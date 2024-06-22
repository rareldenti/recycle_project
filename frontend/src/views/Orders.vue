<template>
  <div>
    <el-button @click="openCreateDialog">创建回收</el-button>
    <el-dialog v-model="showCreateDialog" title="创建回收">
      <el-form :model="newOrder" @submit.prevent="createOrder">
        <el-form-item label="回收物品">
          <el-input v-model="newOrder.name" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="newOrder.category_id" placeholder="选择类别">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="照片">
          <input type="file" @change="handleImageUpload" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createOrder">创建</el-button>
          <el-button @click="closeCreateDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="orders">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="类别">
        <template v-slot="scope">
          {{ scope.row.Category ? scope.row.Category.name : '无类别' }}
        </template>
      </el-table-column>
      <el-table-column prop="image_url" label="照片">
        <template v-slot="scope">
          <img :src="getImageUrl(scope.row.image_url)" alt="image" width="50" />
        </template>
      </el-table-column>
      <el-table-column label="执行">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteOrder(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showEditDialog" title="编辑回收">
      <el-form :model="currentOrder" @submit.prevent="updateOrder">
        <el-form-item label="名称">
          <el-input v-model="currentOrder.name" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="currentOrder.category_id" placeholder="选择类型">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="照片">
          <input type="file" @change="handleEditImageUpload" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateOrder">更新</el-button>
          <el-button @click="closeEditDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'OrderManagement',
  data() {
    return {
      orders: [],
      categories: [],
      showCreateDialog: false,
      showEditDialog: false,
      newOrder: {
        name: '',
        category_id: null,
        image: null
      },
      currentOrder: {
        id: null,
        name: '',
        category_id: null,
        image: null
      }
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    openCreateDialog() {
      this.newOrder = { name: '', category_id: null, image: null };
      this.showCreateDialog = true;
    },
    closeCreateDialog() {
      this.showCreateDialog = false;
    },
    openEditDialog(order) {
      this.currentOrder = { ...order, image: null };
      this.showEditDialog = true;
    },
    closeEditDialog() {
      this.showEditDialog = false;
    },
    async fetchOrders() {
      try {
        const response = await axios.get('http://rareldenti.top:5000/api/orders'); // Ensure the URL is correct
        this.orders = response.data.orders;
      } catch (error) {
        console.error('Failed to fetch orders:', error.response ? error.response.data : error.message);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://rareldenti.top:5000/api/categories'); // Ensure the URL is correct
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Failed to fetch categories:', error.response ? error.response.data : error.message);
      }
    },
    async createOrder() {
      try {
        const formData = new FormData();
        formData.append('name', this.newOrder.name);
        formData.append('category_id', this.newOrder.category_id);
        formData.append('image', this.newOrder.image);
        formData.append('user_id', this.user.id);

        const response = await axios.post('http://rareldenti.top:5000/api/orders', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.showCreateDialog = false;
        this.fetchOrders();
      } catch (error) {
        console.error('Failed to create order:', error.response ? error.response.data : error.message);
      }
    },
    handleImageUpload(event) {
      this.newOrder.image = event.target.files[0];
    },
    handleEditImageUpload(event) {
      this.currentOrder.image = event.target.files[0];
    },
    async updateOrder() {
      try {
        const formData = new FormData();
        formData.append('name', this.currentOrder.name);
        formData.append('category_id', this.currentOrder.category_id);
        if (this.currentOrder.image) {
          formData.append('image', this.currentOrder.image);
        }
        const response = await axios.put(`http://rareldenti.top:5000/api/orders/${this.currentOrder.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.showEditDialog = false;
        this.fetchOrders();
      } catch (error) {
        console.error('Failed to update order:', error.response ? error.response.data : error.message);
      }
    },
    async deleteOrder(id) {
      try {
        await axios.delete(`http://rareldenti.top:5000/api/orders/${id}`);
        this.fetchOrders();
      } catch (error) {
        console.error('Failed to delete order:', error.response ? error.response.data : error.message);
      }
    },
    getImageUrl(path) {
      if (!path) return '';
      return `http://rareldenti.top:5000${path}`;
    }
  },
  created() {
    this.fetchOrders();
    this.fetchCategories();
  }
}
</script>

<style>
/* 样式可以根据需要进行调整 */
</style>
