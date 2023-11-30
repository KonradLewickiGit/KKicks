package com.kkicks.backend.service;

import com.kkicks.backend.dao.CategoryDao;
import com.kkicks.backend.entity.Category;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest {

    @Mock
    private CategoryDao categoryDao;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllCategories() {
        Category category1 = new Category();
        category1.setId(1);
        category1.setName("Category1");

        Category category2 = new Category();
        category2.setId(2);
        category2.setName("Category2");

        when(categoryDao.findAll()).thenReturn(Arrays.asList(category1, category2));

        List<Category> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        assertTrue(result.contains(category1));
        assertTrue(result.contains(category2));
    }

    @Test
    public void testGetCategoryById() {
        Integer categoryId = 1;

        Category category = new Category();
        category.setId(categoryId);
        category.setName("TestCategory");

        when(categoryDao.findById(categoryId)).thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryById(categoryId);

        assertEquals(category, result);
    }

    @Test
    public void testGetCategoryByIdNotFound() {
        Integer categoryId = 1;

        when(categoryDao.findById(categoryId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> categoryService.getCategoryById(categoryId));

    }

    @Test
    public void testSaveCategory() {
        Category newCategory = new Category();
        newCategory.setName("NewCategory");

        when(categoryDao.save(newCategory)).thenReturn(newCategory);

        Category result = categoryService.saveCategory(newCategory);

        assertEquals(newCategory, result);
    }

    @Test
    public void testDeleteCategoryById() {
        Integer categoryId = 1;

        assertDoesNotThrow(() -> categoryService.deleteCategoryById(categoryId));
        verify(categoryDao, times(1)).deleteById(categoryId);
    }
}