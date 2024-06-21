<template>
    <div>
      <h1>Recycling Info</h1>
      <el-button type="primary" @click="showCreateDialog = true">Add Recycling Info</el-button>
      <el-table :data="recyclingInfos">
        <el-table-column prop="clothing_type" label="Clothing Type"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="image_url" label="Image URL"></el-table-column>
        <el-table-column label="Actions">
          <template v-slot:default="scope">
            <el-button @click="editRecyclingInfo(scope.row)">Edit</el-button>
            <el-button @click="deleteRecyclingInfo(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog title="Create Recycling Info" v-model:visible="showCreateDialog">
        <el-form :model="recyclingInfoForm">
          <el-form-item label="Clothing Type">
            <el-input v-model="recyclingInfoForm.clothing_type"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="recyclingInfoForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Image URL">
            <el-input v-model="recyclingInfoForm.image_url"></el-input>
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-button @click="showCreateDialog = false">Cancel</el-button>
          <el-button type="primary" @click="createRecyclingInfo">Create</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RecyclingInfo',
    data() {
      return {
        recyclingInfos: [],
        recyclingInfoForm: {
          clothing_type: '',
          description: '',
          image_url: '',
        },
        showCreateDialog: false,
      };
    },
    methods: {
      async fetchRecyclingInfos() {
        const response = await axios.get('http://localhost:5000/api/recycling-info');
        this.recyclingInfos = response.data.recyclingInfos;
      },
      async createRecyclingInfo() {
        await axios.post('http://localhost:5000/api/recycling-info', this.recyclingInfoForm);
        this.showCreateDialog = false;
        this.fetchRecyclingInfos();
      },
      async deleteRecyclingInfo(id) {
        await axios.delete(`http://localhost:5000/api/recycling-info/${id}`);
        this.fetchRecyclingInfos();
      },
      editRecyclingInfo(info) {
        this.recyclingInfoForm = { ...info };
        this.showCreateDialog = true;
      },
    },
    mounted() {
      this.fetchRecyclingInfos();
    },
  };
  </script>
  