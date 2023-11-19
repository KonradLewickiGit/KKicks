package com.kkicks.backend.controler;

import com.kkicks.backend.entity.Product.Product;
import com.kkicks.backend.service.ProductService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping({"/product"})
public class ProductController {
    @Autowired
    ProductService productService;
    @GetMapping({"/findAllByCategory/{id}"})
    public List<Product> findAllByCategory(@PathVariable Integer id){
        return productService.findAllByCategory(id);
    }
    @GetMapping({"/findAllByManufacturer/{id}"})
    public List<Product> findAllByManufacturer(@PathVariable Integer id){
        return productService.findAllByManufacturer(id);
    }
    @GetMapping({"/findAllByUser/{id}"})
    public List<Product> findAllByUser(@PathVariable Long id){
        return productService.findAllByUser(id);
    }
    @GetMapping({"/findAllByCategoryAndManufacturer/{idCategory}/{idManufacturer}"})
    public List<Product> findAllByCategoryAndManufacturer(@PathVariable Integer idCategory,@PathVariable Integer idManufacturer){
        return productService.findAllByCategoryAndManufacturer(idCategory,idManufacturer);
    }
    @GetMapping({"/findAll"})
    public List<Product> findAll(){
        return productService.findAll();
    }
    @PostMapping({"/save"})
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }
    @PostMapping({"/saveMany"})
    public ArrayList<Product> addProducts(@RequestBody ArrayList<Product> products){
        return productService.addProducts(products);
    }
    @PostMapping({"/update/{id}"})
    public Product updateProduct(@PathVariable Long id,@RequestBody Product updatedProductData){
        return productService.updateProduct(id,updatedProductData);
    }
    @DeleteMapping({"/delete/{id}"})
    public String deleteProductById(@PathVariable Long id){
        productService.deleteProductById(id);
        return "Successfully removed product(" + id + ")!";
    }
    @PostConstruct
    public void initData(){
        productService.initTestData();
    }
}
