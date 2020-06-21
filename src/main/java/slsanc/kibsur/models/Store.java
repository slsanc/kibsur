package slsanc.kibsur.models;

import javax.persistence.*;

@Entity
@Table(name = "Stores")
public class Store {
    @Id @Column(name = "store_id") @GeneratedValue(strategy = GenerationType.IDENTITY) private int storeId;
    @Column(name = "address") @GeneratedValue(strategy = GenerationType.IDENTITY) private String address;
    @Column(name = "city") @GeneratedValue(strategy = GenerationType.IDENTITY) private String city;
    @Column(name = "state_or_provence") @GeneratedValue(strategy = GenerationType.IDENTITY) private String stateOrProvence;
    @Column(name = "postal_code") @GeneratedValue(strategy = GenerationType.IDENTITY) private String postalCode;

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateOrProvence() {
        return stateOrProvence;
    }

    public void setStateOrProvence(String stateOrProvence) {
        this.stateOrProvence = stateOrProvence;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Store() {
    }
}
