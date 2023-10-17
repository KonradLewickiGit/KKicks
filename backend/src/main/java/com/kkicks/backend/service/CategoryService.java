package com.kkicks.backend.service;

import com.kkicks.backend.dao.CategoryDao;
import com.kkicks.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryDao categoryDao;

    public List<Category> getAllCategorys(){
        return categoryDao.findAll();
    };
    public Category getCategoryById(Integer id){
        return categoryDao.findById(id).orElse(null);
    }
    public Category saveCategory(Category category){
        return categoryDao.save(category);
    }
    public void deleteCategoryById(Integer id){
        categoryDao.deleteById(id);
    }
}
