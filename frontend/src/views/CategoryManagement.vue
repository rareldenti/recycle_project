<template>
    <div>
      <h2>类别管理</h2>
      <el-button @click="showCreateDialog = true">Add Category</el-button>
      <el-dialog :visible.sync="showCreateDialog">
        <el-form @submit.prevent="createCategory">
          <el-form-item label="Category Name">
            <el-input v-model="newCategory.category_name" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="newCategory.description" />
          </el-form-item>
          <el-form-item label="Image">
            <input type="file" @change="handleImageUpload" />
          </el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form>
      </el-dialog>
      <el-table :data="categories">
        <el-table-column prop="category_name" label="Category Name" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="image_url" label="Image">
          <template v-slot="scope">
            <img :src="scope.row.image_url" alt="image" width="50" />
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template v-slot="scope">
            <el-button size="mini" @click="deleteCategory(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CategoryManagement',
    data() {
      return {
        categories: [],
        showCreateDialog: false,
        newCategory: {
          category_name: '',
          description: '',
          image: null
        }
      };
    },
    methods: {
      async fetchCategories() {
        const response = await axios.get('/categories');
        this.categories = response.data.categories;
      },
      async createCategory() {
        const formData = new FormData();
        formData.append('category_name', this.newCategory.category_name);
        formData.append('description', this.newCategory.description);
        formData.append('image', this.newCategory.image);
        await axios.post('/categories', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.showCreateDialog = false;
        this.fetchCategories();
      },
      handleImageUpload(event) {
        this.newCategory.image = event.target.files[0];
      },
      async deleteCategory(id) {
        await axios.delete(`/categories/${id}`);
        this.fetchCategories();
      }
    },
    created() {
      this.fetchCategories();
    }
  }
  </script>
  