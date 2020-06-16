package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import slsanc.kibsur.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT * FROM Products", nativeQuery = true)
    List<Product> allProducts();

}