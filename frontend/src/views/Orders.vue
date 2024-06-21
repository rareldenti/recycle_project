<template>
    <div>
      <h1>Orders</h1>
      <el-table :data="orders">
        <el-table-column prop="user_id" label="User ID"></el-table-column>
        <el-table-column prop="recycling_id" label="Recycling ID"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button @click="editOrder(scope.row)">Edit</el-button>
            <el-button @click="deleteOrder(scope.row.id)">Delete</el-button>
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
        const response = await axios.get('http://localhost:5000/api/orders');
        this.orders = response.data.orders;
      },
      async deleteOrder(id) {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
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
  