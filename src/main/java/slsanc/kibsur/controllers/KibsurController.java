package slsanc.kibsur.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

}
