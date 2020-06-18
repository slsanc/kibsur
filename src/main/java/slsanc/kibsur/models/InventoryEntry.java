package slsanc.kibsur.models;

import javax.persistence.*;

@Entity
@Table(name = "Inventory")
@IdClass(InventoryEntryId.class)
public class InventoryEntry {
    @Column(name = "store_id") @Id private int storeId;
    @Column(name = "product_id") @Id private int productId;
    @Column(name = "amount_in_stock") private int amountInStock;
    @Column(name = "retail_price") private int retailPrice;

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

    public int getAmountInStock() {
        return amountInStock;
    }

    public void setAmountInStock(int amountInStock) {
        this.amountInStock = amountInStock;
    }

    public int getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(int retailPrice) {
        this.retailPrice = retailPrice;
    }

    public InventoryEntry(int productId, int amountInStock, int retailPrice) {
        this.productId = productId;
        this.amountInStock = amountInStock;
        this.retailPrice = retailPrice;
    }

    public InventoryEntry(int productId, int amountInStock) {
        this.productId = productId;
        this.amountInStock = amountInStock;
    }

    public InventoryEntry() {
    }
}
