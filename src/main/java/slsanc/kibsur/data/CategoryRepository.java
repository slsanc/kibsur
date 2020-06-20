package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import slsanc.kibsur.models.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value="SELECT * FROM Categories WHERE parent_category = :parentCategory", nativeQuery = true)
    List<Category> findCategoriesByParentCategory(@Param("parentCategory") int parentCategory);

    @Query(value = "SELECT C2.* FROM Categories C1 INNER JOIN Categories C2 " +
            "ON C1.parent_category = C2.category_id AND C1.category_id = :categoryId", nativeQuery = true)
    Category findParentCategoryByCategoryId(@Param("categoryId") int categoryId);

    @Transactional
    @Modifying
    @Query(value="UPDATE Categories SET parent_category = :destination WHERE category_id = :itemToBeMoved", nativeQuery = true)
    void moveCategory(@Param("itemToBeMoved") int itemToBeMoved, @Param("destination") int destination);

}
