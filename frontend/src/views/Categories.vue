<template>
  <div>
    <el-button @click="openCreateDialog">添加种类</el-button>
    <el-dialog v-model="showCreateDialog" title="创建种类">
      <el-form :model="newCategory" @submit.prevent="createCategory">
        <el-form-item label="名称">
          <el-input v-model="newCategory.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createCategory">创建</el-button>
          <el-button @click="closeCreateDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="categories">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteCategory(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showEditDialog" title="编辑种类">
      <el-form :model="currentCategory" @submit.prevent="updateCategory">
        <el-form-item label="名称">
          <el-input v-model="currentCategory.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCategory">更新</el-button>
          <el-button @click="closeEditDialog">取消</el-button>
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
