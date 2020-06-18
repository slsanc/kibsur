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


    @GetMapping("/categories/{categoryId}")
    public List<Category> displayCategoriesByCategory(@PathVariable int categoryId){
        return categoryRepository.findCategoriesByParentCategory(categoryId);
    }

    @GetMapping("/inventoryentries/all/{categoryId}")
    public List<InventoryEntry> displayInventoryEntriesByCategory(@PathVariable int categoryId){

        /* What we want here is a list of all inventory entries for products a particular category. For each entry we
        get back, we want the 'amountInStock' to be the total amount in stock across all stores.
        When we sum the amountInStock by group like this, the JpaRepository that performs the query won't return an
        object of type List<InventoryEntry>. Instead, it returns an object of type List<Integer[]>, even if columns are
        selected for each property of the InventoryEntry class.
        given this limitation, I wrote the query to return a List<Integer[]> where each Integer[] contains two entries:
        the product id and the sum of the amount in stock. The below loop converts this into the List<InventoryEntry>
        that we want.*/

        ArrayList<InventoryEntry> result = new ArrayList<>();

        for (Integer[] integerArray : inventoryEntryRepository.findInventoryEntriesByParentCategory(categoryId)){
            result.add(new InventoryEntry(integerArray[0], integerArray[1]));
        }

        return result;
    }

    @GetMapping("/inventoryentries/{storeId}/{categoryId}")
    public List<InventoryEntry> displayInventoryEntriesByStoreAndCategory(@PathVariable int storeId, @PathVariable int categoryId){
        return inventoryEntryRepository.findInventoryEntriesByParentCategoryAndStore(categoryId, storeId);
    }


}
