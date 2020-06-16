package slsanc.kibsur.models;

import javax.persistence.*;

@Entity
@Table(name="Products")

public class Product {

    @Column(name="product_id") @Id @GeneratedValue (strategy = GenerationType.IDENTITY) private int productId;
    @Column(name="product_name") private String productName;
    @Column(name="product_description") private String productDescription;

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Product(String productName, String productDescription) {
        this.productName = productName;
        this.productDescription = productDescription;
    }

    public Product() {
    }

}
