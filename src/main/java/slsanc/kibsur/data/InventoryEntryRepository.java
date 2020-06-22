package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import slsanc.kibsur.models.InventoryEntry;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface InventoryEntryRepository extends JpaRepository<InventoryEntry, Integer> {

    @Query(value="SELECT T.* FROM " +
            "(SELECT I.product_id AS product_id, SUM(I.amount_in_stock) AS amount_in_stock " +
            "FROM Inventory I INNER JOIN Products P ON I.product_id = P.product_id " +
            "WHERE P.category_id = :categoryId " +
            "GROUP BY I.product_id) AS T", nativeQuery = true)
    List<Integer[]> findInventoryEntriesByParentCategory(@Param("categoryId") int categoryId);

    @Query(value="SELECT I.* FROM Inventory I INNER JOIN Products P ON " +
            "I.product_id = P.product_id AND P.category_id = :categoryId AND I.store_id = :storeId", nativeQuery = true)
    List<InventoryEntry> findInventoryEntriesByParentCategoryAndStore(@Param("categoryId") int categoryId, @Param("storeId") int storeId);

    @Query(value = "SELECT COUNT(*) FROM Inventory WHERE sore_id=:storeId AND product_id=:productId", nativeQuery = true)
    int checkIfInventoryEntryExistsById(@Param("storeId") int storeId, @Param("productId") int productId);


    @Modifying
    @Transactional
    @Query(value = "UPDATE Inventory SET amount_in_stock = amount_in_stock + :quantityToAdd " +
            "WHERE store_id = :storeId AND product_id = :productId", nativeQuery = true)
    int addToCurrentStoreInventory(@Param("storeId") int storeId, @Param("productId") int productId, @Param("quantityToAdd") int quantityToAdd);

}
