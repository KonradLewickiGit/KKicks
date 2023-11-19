package com.kkicks.backend.controler;

import com.kkicks.backend.entity.ProductImage;
import com.kkicks.backend.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productImage")
public class ProductImageController {
    @Autowired
    ProductImageService productImageService;

    @PostMapping("/add/{productId}")
    public ProductImage addImage(@PathVariable Long productId, @RequestBody String path){
        return productImageService.addImage(productId,path);
    }

    @PostMapping("/addMany/{productId}")
    public List<ProductImage> addImages(@PathVariable Long productId, @RequestBody List<String> paths){
        return productImageService.addImages(productId,paths);
    }

    @GetMapping("/findAllByProduct/{productId}")
    public List<ProductImage> findAllByProduct(@PathVariable Long productId){
        return productImageService.getAllProductImages(productId);
    }

    @GetMapping("/find/{productImageId}")
    public ProductImage findById(@PathVariable Long productImageId){
        return productImageService.getProductImageById(productImageId);
    }
}
