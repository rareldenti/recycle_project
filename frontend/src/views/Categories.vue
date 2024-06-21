<template>
  <div>
    <h2>Category Management</h2>
    <el-button @click="openCreateDialog">Add Category</el-button>
    <el-dialog v-model="showCreateDialog" title="Create Category">
      <el-form :model="newCategory" @submit.prevent="createCategory">
        <el-form-item label="Name">
          <el-input v-model="newCategory.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCategory">Create</el-button>
          <el-button @click="closeCreateDialog">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="categories">
      <el-table-column prop="name" label="Name" />
      <el-table-column label="Actions">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)">Edit</el-button>
          <el-button size="mini" @click="deleteCategory(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showEditDialog" title="Edit Category">
      <el-form :model="currentCategory" @submit.prevent="updateCategory">
        <el-form-item label="Name">
          <el-input v-model="currentCategory.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCategory">Update</el-button>
          <el-button @click="closeEditDialog">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      showEditDialog: false,
      newCategory: {
        name: ''
      },
      currentCategory: {
        id: null,
        name: ''
      }
    };
  },
  methods: {
    openCreateDialog() {
      this.newCategory = { name: '' };
      this.showCreateDialog = true;
    },
    closeCreateDialog() {
      this.showCreateDialog = false;
    },
    openEditDialog(category) {
      this.currentCategory = { ...category };
      this.showEditDialog = true;
    },
    closeEditDialog() {
      this.showEditDialog = false;
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Failed to fetch categories:', error.response ? error.response.data : error.message);
      }
    },
    async createCategory() {
      try {
        const response = await axios.post('/categories', this.newCategory);
        this.showCreateDialog = false;
        this.fetchCategories();
      } catch (error) {
        console.error('Failed to create category:', error.response ? error.response.data : error.message);
      }
    },
    async updateCategory() {
      try {
        const response = await axios.put(`/categories/${this.currentCategory.id}`, this.currentCategory);
        this.showEditDialog = false;
        this.fetchCategories();
      } catch (error) {
        console.error('Failed to update category:', error.response ? error.response.data : error.message);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`/categories/${id}`);
        this.fetchCategories();
      } catch (error) {
        console.error('Failed to delete category:', error.response ? error.response.data : error.message);
      }
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style>
/* 样式可以根据需要进行调整 */
</style>
