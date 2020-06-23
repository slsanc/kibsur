package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import slsanc.kibsur.models.Sale;

public interface SaleRepository extends JpaRepository <Sale,Integer>{
}
