package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import slsanc.kibsur.models.Shipment;

public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
}
