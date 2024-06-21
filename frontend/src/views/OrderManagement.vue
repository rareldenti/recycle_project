<template>
  <div>
    <h2>回收管理</h2>
    <el-button @click="openCreateDialog">添加回收信息</el-button>
    <el-dialog v-model="showCreateDialog" title="Create Order">
      <el-form :model="newOrder" @submit.prevent="createOrder">
        <el-form-item label="Name">
          <el-input v-model="newOrder.name" />
        </el-form-item>
        <el-form-item label="Image">
          <input type="file" @change="handleImageUpload" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createOrder">创建</el-button>
          <el-button @click="closeCreateDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="orders">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="image_url" label="Image">
        <template v-slot="scope">
          <img :src="getImageUrl(scope.row.image_url)" alt="image" width="50" />
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteOrder(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showEditDialog" title="Edit Order">
      <el-form :model="currentOrder" @submit.prevent="updateOrder">
        <el-form-item label="Name">
          <el-input v-model="currentOrder.name" />
        </el-form-item>
        <el-form-item label="Image">
          <input type="file" @change="handleEditImageUpload" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateOrder">上传</el-button>
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
      showCreateDialog: false,
      showEditDialog: false,
      newOrder: {
        name: '',
        image: null
      },
      currentOrder: {
        id: null,
        name: '',
        image: null
      }
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    openCreateDialog() {
      this.newOrder = { name: '', image: null };
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
        const response = await axios.get('/orders');
        this.orders = response.data.orders;
      } catch (error) {
        console.error('Failed to fetch orders:', error.response ? error.response.data : error.message);
      }
    },
    async createOrder() {
      try {
        const formData = new FormData();
        formData.append('name', this.newOrder.name);
        formData.append('image', this.newOrder.image);
        formData.append('user_id', this.user.id);

        const response = await axios.post('/orders', formData, {
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
        if (this.currentOrder.image) {
          formData.append('image', this.currentOrder.image);
        }
        const response = await axios.put(`/orders/${this.currentOrder.id}`, formData, {
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
        await axios.delete(`/orders/${id}`);
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
  }
}
</script>

<style>
/* 样式可以根据需要进行调整 */
</style>
