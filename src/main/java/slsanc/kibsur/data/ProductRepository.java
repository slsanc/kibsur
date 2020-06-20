package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import slsanc.kibsur.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Transactional
    @Modifying
    @Query(value="UPDATE Products SET category_id = :destination WHERE product_id = :itemToBeMoved", nativeQuery = true)
    void moveProduct(@Param("itemToBeMoved") int itemToBeMoved, @Param("destination") int destination);


}