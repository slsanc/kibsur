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

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.HashMap;
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

    @GetMapping("/categories/getparentcategoryid/{categoryId}")
    public int findParentCategoryIdByCategoryId(@PathVariable int categoryId){
        return categoryRepository.findParentCategoryIdByCategoryId(categoryId);
    }

    //<editor-fold desc="Mappings that return lists of categories or inventory entries">
    @GetMapping("/categories/{categoryId}")
    public List<Category> displayCategoriesByCategory(@PathVariable int categoryId){
        return categoryRepository.findCategoriesByParentCategory(categoryId);
    }

    @GetMapping("/inventoryentries/all/{categoryId}")
    public ArrayList<Object[]> findInventoryEntriesByCategory(@PathVariable int categoryId){

        /* We want a ArrayList<Object[]>, with each Object[] containing an InventoryEntry object and its matching
        Product (this was easier to implement than a hashmap). The following loop creates this for us.
        Note that the query 'findInventoryEntriesByParentCategory' returns a List<Integer[]> where each Integer[]
        contains two entries: the product id and the sum of the amount in stock. I couldn't find any easy way to get the
        JpaRepository to return these as InventoryEntry objects directly, so they are converted below:*/

        ArrayList<Object[]> result = new ArrayList<>();

        for (Integer[] integerArray : inventoryEntryRepository.findInventoryEntriesByParentCategory(categoryId)){
            Object[] newEntry = {new InventoryEntry(integerArray[0], integerArray[1]),
                    productRepository.findById(integerArray[0])};
            result.add(newEntry);
        }

        return result;
    }

    @GetMapping("/inventoryentries/{storeId}/{categoryId}")
    public ArrayList<Object[]> findInventoryEntriesByStoreAndCategory(@PathVariable int storeId, @PathVariable int categoryId){

        ArrayList<Object[]> result = new ArrayList<>();

        for (InventoryEntry inventoryEntry : inventoryEntryRepository.findInventoryEntriesByParentCategoryAndStore(categoryId, storeId)){
            Object[] newEntry = {inventoryEntry, productRepository.findById(inventoryEntry.getProductId()).get()};
            result.add(newEntry);
        }
        return result;
    }
    //</editor-fold>


}
