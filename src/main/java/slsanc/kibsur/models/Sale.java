package slsanc.kibsur.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name="Sales")
public class Sale {
    @Column(name="sales_event_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private int saleEventId;
    @Column(name="date") private Date date;
    @Column(name="employee_id") private int employeeId;
    @Column(name="store_id") private int storeId;
    @Column(name="product_id") private int productId;
    @Column(name="amount_sold") private int amountSold;
    @Column(name="price_paid_per_unit") private BigDecimal pricePaidPerUnit;

    public int getSaleEventId() {
        return saleEventId;
    }

    public void setSaleEventId(int saleEventId) {
        this.saleEventId = saleEventId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getAmountSold() {
        return amountSold;
    }

    public void setAmountSold(int amountSold) {
        this.amountSold = amountSold;
    }

    public BigDecimal getPricePaidPerUnit() {
        return pricePaidPerUnit;
    }

    public void setPricePaidPerUnit(BigDecimal pricePaidPerUnit) {
        this.pricePaidPerUnit = pricePaidPerUnit;
    }

    public Sale() {
    }
}
