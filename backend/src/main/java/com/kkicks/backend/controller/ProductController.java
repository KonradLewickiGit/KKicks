package com.kkicks.backend.controller;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.entity.User.User;
import com.kkicks.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping({"/product"})
public class ProductController {
    @Autowired
    ProductService productService;
    @GetMapping({"/find/AllByCategory/{id}"})
    public List<Product> findAllByCategory(@PathVariable Integer id){
        return productService.findAllByCategory(id);
    }
    @GetMapping({"/find/{id}"})
    public Product findById(@PathVariable Long id){
        return productService.find(id);
    }
    @GetMapping({"/find/AllByManufacturer/{id}"})
    public List<Product> findAllByManufacturer(@PathVariable Integer id){
        return productService.findAllByManufacturer(id);
    }
    @GetMapping({"/find/AllByUser/{id}"})
    public List<Product> findAllByUser(@PathVariable Long id){
        return productService.findAllByUser(id);
    }
    @GetMapping({"/find/UserByPostedProductId/{productId}"})
    public User findUserByPostedProductId(@PathVariable Long productId){
        return productService.findUserByPostedProductId(productId);
    }
    @GetMapping({"/find/AllByCategoryAndManufacturer/{idCategory}/{idManufacturer}"})
    public List<Product> findAllByCategoryAndManufacturer(@PathVariable Integer idCategory,@PathVariable Integer idManufacturer){
        return productService.findAllByCategoryAndManufacturer(idCategory,idManufacturer);
    }
    @GetMapping({"/find/All"})
    public List<Product> findAll(){
        return productService.findAll();
    }
    @PostMapping({"/save/{userId}/{categoryId}/{manufacturerId}"})
    public Product saveProduct(@PathVariable Long userId, @PathVariable Integer categoryId, @PathVariable Integer manufacturerId, @RequestParam String model, @RequestParam BigDecimal price, @RequestParam String description, @RequestParam BigDecimal size, @RequestParam String color, @RequestParam List<MultipartFile> files) throws IOException {
        return productService.saveProduct(userId,categoryId,manufacturerId,model,price,description,color,size,files);
    }
    @PostMapping({"/update/{productId}/{categoryId}/{manufacturerId}"})
    public Product updateProduct(@PathVariable Long productId,@PathVariable Integer categoryId, @PathVariable Integer manufacturerId, @RequestParam String model, @RequestParam BigDecimal price, @RequestParam String description, @RequestParam BigDecimal size, @RequestParam String color, @RequestParam List<MultipartFile> files) throws IOException{
        return productService.updateProduct(productId,categoryId,manufacturerId,model,price,description,color,size,files);
    }
    @DeleteMapping({"/delete/{id}"})
    public String deleteProductById(@PathVariable Long id){
        productService.deleteProductById(id);
        return "Successfully removed product(" + id + ")!";
    }
    @PostMapping({"/setVerification/{id}"})
    public Product updateProduct(@PathVariable Long id){
        return productService.setVerification(id);
    }
}
