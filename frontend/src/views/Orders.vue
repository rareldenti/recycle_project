<template>
    <div>
      <h1>订单</h1>
      <el-table :data="orders">
        <el-table-column prop="user_id" label="User ID"></el-table-column>
        <el-table-column prop="recycling_id" label="Recycling ID"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column label="Actions">
          <template v-slot:default="scope">
            <el-button @click="editOrder(scope.row)">编辑</el-button>
            <el-button @click="deleteOrder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Orders',
    data() {
      return {
        orders: [],
      };
    },
    methods: {
      async fetchOrders() {
        const response = await axios.get('http://rareldenti.top:5000/api/orders');
        this.orders = response.data.orders;
      },
      async deleteOrder(id) {
        await axios.delete(`http://rareldenti.top:5000/api/orders/${id}`);
        this.fetchOrders();
      },
      editOrder(order) {
        // Implement edit functionality
      },
    },
    mounted() {
      this.fetchOrders();
    },
  };
  </script>
  