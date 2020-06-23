package slsanc.kibsur.data;

import org.springframework.data.jpa.repository.JpaRepository;
import slsanc.kibsur.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
