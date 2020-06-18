package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import slsanc.kibsur.models.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value="SELECT * FROM Categories WHERE parent_category = :parentCategory", nativeQuery = true)
    List<Category> findCategoriesByParentCategory(@Param("parentCategory") int parentCategory);

    @Query(value="SELECT C.* FROM Inventory I " +
            "INNER JOIN Products P ON I.store_id=:storeId AND I.product_id=P.productId " +
            "INNER JOIN Categories C ON P.category_id = C.category_id " +
            "WHERE C.parent_category = :parentCategory", nativeQuery = true)
    List<Category> findCategoriesByParentCategoryAndStoreId(@Param("parentCategory") int parentCategory, @Param("storeId") int storeId);
}
