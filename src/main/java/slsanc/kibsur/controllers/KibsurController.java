package slsanc.kibsur.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import slsanc.kibsur.data.ProductRepository;
import slsanc.kibsur.models.Product;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping ("/api")
public class KibsurController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/allproducts")
    public List<Product> displayAllProducts(){
        return productRepository.allProducts();
    }

    @PostMapping("/createnew/product")
    public int createNewProduct(@RequestBody Product newProduct){
        productRepository.save(newProduct);
        /*returns the newly-created id number so it can be displayed in the "record new shipments" screen:*/
        return newProduct.getProductId();
    }

}
