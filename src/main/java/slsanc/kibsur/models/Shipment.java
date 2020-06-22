package slsanc.kibsur.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name="Shipments")
public class Shipment {
    @Column(name="shipment_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private int shipmentId;
    @Column(name="product_id") private int productId;
    @Column(name = "cost_per_unit") private BigDecimal costPerUnit;
    @Column(name = "number_of_units") private int numberOfUnits;
    @Column(name = "store_id") private int storeId;
    @Column(name = "date") private Date date;

    public int getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(int shipmentId) {
        this.shipmentId = shipmentId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public BigDecimal getCostPerUnit() {
        return costPerUnit;
    }

    public void setCostPerUnit(BigDecimal costPerUnit) {
        this.costPerUnit = costPerUnit;
    }

    public int getNumberOfUnits() {
        return numberOfUnits;
    }

    public void setNumberOfUnits(int numberOfUnits) {
        this.numberOfUnits = numberOfUnits;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Shipment(int productId, BigDecimal costPerUnit, int numberOfUnits, int storeId, Date date) {
        this.productId = productId;
        this.costPerUnit = costPerUnit;
        this.numberOfUnits = numberOfUnits;
        this.storeId = storeId;
        this.date = date;
    }

    public Shipment() {
    }
}
