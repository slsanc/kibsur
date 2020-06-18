package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import slsanc.kibsur.models.InventoryEntry;

import java.util.List;

public interface InventoryEntryRepository extends JpaRepository<InventoryEntry, Integer> {

    @Query(value="SELECT NULL AS store_id, I.product_id AS product_id, SUM(I.amount_in_stock) AS amount_in_stock, NULL AS retail_price " +
            "FROM Inventory I INNER JOIN Products P ON I.product_id = P.product_id " +
            "WHERE P.category_id = :categoryId " +
            "GROUP BY I.product_id", nativeQuery = true)
    List<InventoryEntry> findInventoryEntriesByParentCategory(@Param("categoryId") int categoryId);

    @Query(value="SELECT I.* FROM Inventory I INNER JOIN Products P ON " +
            "I.product_id = P.product_id AND P.category_id = :categoryId AND I.store_id = :storeId", nativeQuery = true)
    List<InventoryEntry> findInventoryEntriesByParentCategoryAndStore(@Param("categoryId") int categoryId, @Param("storeId") int storeId);


}
