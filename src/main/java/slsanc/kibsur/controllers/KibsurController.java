package slsanc.kibsur.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import slsanc.kibsur.data.CategoryRepository;
import slsanc.kibsur.data.InventoryEntryRepository;
import slsanc.kibsur.data.ProductRepository;
import slsanc.kibsur.models.Category;
import slsanc.kibsur.models.InventoryEntry;
import slsanc.kibsur.models.Product;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping ("/api")
public class KibsurController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private InventoryEntryRepository inventoryEntryRepository;

    @GetMapping("/allproducts")
    public List<Product> displayAllProducts(){
        return productRepository.allProducts();
    }

    @PostMapping("/createnew/product")
    public Product createNewProduct(@RequestBody Product newProduct){
        productRepository.save(newProduct);
        return newProduct;
    }


    @GetMapping("/all/{categoryId}/categories")
    public List<Category> displayCategoriesByCategory(@PathVariable int categoryId){
        return(categoryRepository.findCategoriesByParentCategory(categoryId));
    }

    @GetMapping("/all/{categoryId}/inventoryentries")
    public List<InventoryEntry> displayInventoryEntriesByCategory(@PathVariable int categoryId){
        return(inventoryEntryRepository.findInventoryEntriesByParentCategory(categoryId));
    }

    @GetMapping("/{storeId}/{categoryId}/categories")
    public List<Category> displayCategoriesByStoreAndCategory(@PathVariable int storeId, @PathVariable int categoryId){
        return(categoryRepository.findCategoriesByParentCategoryAndStoreId(categoryId,storeId));
    }

    @GetMapping("/{storeId}/{categoryId}/inventoryentries")
    public List<InventoryEntry> displayInventoryEntriesByStoreAndCategory(@PathVariable int storeId, @PathVariable int categoryId){
        return(inventoryEntryRepository.findInventoryEntriesByParentCategoryAndStore(categoryId, storeId));
    }


}
