<template>
    <div>
      <h2>Recycling Info Management</h2>
      <el-button @click="showCreateDialog = true">Add Recycling Info</el-button>
      <el-dialog :visible.sync="showCreateDialog">
        <el-form @submit.prevent="createRecyclingInfo">
          <el-form-item label="Clothing Type">
            <el-input v-model="newRecyclingInfo.clothing_type" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="newRecyclingInfo.description" />
          </el-form-item>
          <el-form-item label="Image">
            <input type="file" @change="handleImageUpload" />
          </el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form>
      </el-dialog>
      <el-table :data="recyclingInfos">
        <el-table-column prop="clothing_type" label="Clothing Type" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="image_url" label="Image">
          <template v-slot="scope">
            <img :src="scope.row.image_url" alt="image" width="50" />
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template v-slot="scope">
            <el-button size="mini" @click="deleteRecyclingInfo(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RecyclingInfoManagement',
    data() {
      return {
        recyclingInfos: [],
        showCreateDialog: false,
        newRecyclingInfo: {
          clothing_type: '',
          description: '',
          image: null
        }
      };
    },
    methods: {
      async fetchRecyclingInfos() {
        const response = await axios.get('/recycling-info');
        this.recyclingInfos = response.data.recyclingInfos;
      },
      async createRecyclingInfo() {
        const formData = new FormData();
        formData.append('clothing_type', this.newRecyclingInfo.clothing_type);
        formData.append('description', this.newRecyclingInfo.description);
        formData.append('image', this.newRecyclingInfo.image);
        await axios.post('/recycling-info', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.showCreateDialog = false;
        this.fetchRecyclingInfos();
      },
      handleImageUpload(event) {
        this.newRecyclingInfo.image = event.target.files[0];
      },
      async deleteRecyclingInfo(id) {
        await axios.delete(`/recycling-info/${id}`);
        this.fetchRecyclingInfos();
      }
    },
    created() {
      this.fetchRecyclingInfos();
    }
  }
  </script>
  