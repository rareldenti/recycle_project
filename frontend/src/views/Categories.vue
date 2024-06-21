<template>
    <div>
      <h1>Categories</h1>
      <el-button type="primary" @click="showCreateDialog = true">Add Category</el-button>
      <el-table :data="categories">
        <el-table-column prop="category_name" label="Category Name"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="image_url" label="Image URL"></el-table-column>
        <el-table-column label="Actions">
          <template v-slot:default="scope">
            <el-button @click="editCategory(scope.row)">Edit</el-button>
            <el-button @click="deleteCategory(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog title="Create Category" v-model:visible="showCreateDialog">
        <el-form :model="categoryForm">
          <el-form-item label="Category Name">
            <el-input v-model="categoryForm.category_name"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="categoryForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Image URL">
            <el-input v-model="categoryForm.image_url"></el-input>
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-button @click="showCreateDialog = false">Cancel</el-button>
          <el-button type="primary" @click="createCategory">Create</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Categories',
    data() {
      return {
        categories: [],
        categoryForm: {
          category_name: '',
          description: '',
          image_url: '',
        },
        showCreateDialog: false,
      };
    },
    methods: {
      async fetchCategories() {
        const response = await axios.get('http://localhost:5000/api/categories');
        this.categories = response.data.categories;
      },
      async createCategory() {
        await axios.post('http://localhost:5000/api/categories', this.categoryForm);
        this.showCreateDialog = false;
        this.fetchCategories();
      },
      async deleteCategory(id) {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        this.fetchCategories();
      },
      editCategory(category) {
        this.categoryForm = { ...category };
        this.showCreateDialog = true;
      },
    },
    mounted() {
      this.fetchCategories();
    },
  };
  </script>
  