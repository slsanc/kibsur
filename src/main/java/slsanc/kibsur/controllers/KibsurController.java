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
import java.lang.reflect.Array;
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
        return productRepository.findAll();
    }

    //<editor-fold desc="Mappings for creating objects">
    @PostMapping("/createnew/product")
    public Product createNewProduct(@RequestBody Product newProduct){
        productRepository.save(newProduct);
        return newProduct;
    }

    @PostMapping("/createnew/category")
    public Category createNewCategory(@RequestBody Category newCategory){
        return(categoryRepository.save(newCategory));
    }
    //</editor-fold>

    @GetMapping("/categories/getparentcategory/{categoryId}")
    public Category findParentCategoryByCategoryId(@PathVariable int categoryId){
        return categoryRepository.findParentCategoryByCategoryId(categoryId);
    }

    //<editor-fold desc="Mappings that return lists of categories or inventory entries">

    @GetMapping({"/categories", "/categories/{categoryId}"})
    public List<Category> displayCategoriesByCategory(@PathVariable(required = false) Integer categoryId){
        if (categoryId != null){
            return categoryRepository.findCategoriesByParentCategory(categoryId);
        }
        else{
            return categoryRepository.findAll();
        }
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

    @PostMapping("/categories/moveto/{destination}")
    public int moveCategories(@RequestBody List<Integer> itemsToBeMoved, @PathVariable int destination){

        /*the following code generates a list of all of the directories in which the destination file sits. It then
         * removes these categories from the list of categories to be moved. This prevents the user from putting a file
         * inside of itself or its children.*/
        int currentLevel = destination;
        ArrayList<Integer> listOfParentCategories = new ArrayList<>();

        while(currentLevel != 1){
            listOfParentCategories.add(currentLevel);
            currentLevel = categoryRepository.findParentCategoryByCategoryId(currentLevel).getCategoryId();
        }

        for(Integer item : itemsToBeMoved){
            if(!listOfParentCategories.contains(item)){
                categoryRepository.moveCategory(item,destination);
            }
        }

        return (destination);
    }

    @PostMapping("/products/moveto/{destination}")
    public int moveProducts(@RequestBody List<Integer> itemsToBeMoved, @PathVariable int destination){

        for(Integer item : itemsToBeMoved){
            productRepository.moveProduct(item,destination);
        }

        return (destination);
    }
}
