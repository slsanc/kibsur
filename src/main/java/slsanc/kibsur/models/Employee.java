package slsanc.kibsur.models;

import javax.persistence.*;

@Entity
@Table(name = "Employees")
public class Employee {
    @Column(name="employee_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private int employeeId;
    @Column(name="home_store") private int homeStore;
    @Column(name="first_name") private String firstName;
    @Column(name="last_name") private String lastName;
    @Column(name="employee_phone") private String employeePhone;

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public int getHomeStore() {
        return homeStore;
    }

    public void setHomeStore(int homeStore) {
        this.homeStore = homeStore;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmployeePhone() {
        return employeePhone;
    }

    public void setEmployeePhone(String employeePhone) {
        this.employeePhone = employeePhone;
    }

    public Employee(int homeStore, String firstName, String lastName, String employeePhone) {
        this.homeStore = homeStore;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeePhone = employeePhone;
    }

    public Employee() {
    }
}
