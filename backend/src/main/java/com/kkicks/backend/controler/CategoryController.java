package com.kkicks.backend.controler;

import com.kkicks.backend.entity.Category;
import com.kkicks.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping({"/save"})
    public Category saveCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }
    @DeleteMapping({"/delete/{id}"})
    public String deleteProductById(@PathVariable(value = "id") Integer id){
        categoryService.deleteCategoryById(id);
        return "Successfully removed category(" + id + ")!";
    }
    @GetMapping({"/find/All"})
    public List<Category> getAllProducts(){
        return categoryService.getAllCategorys();
    }
    @GetMapping({"/find/{id}"})
    public Category getProductById(@PathVariable(value = "id") Integer id){
        return categoryService.getCategoryById(id);
    }
}
