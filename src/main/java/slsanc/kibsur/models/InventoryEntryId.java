package slsanc.kibsur.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class InventoryEntryId implements Serializable {
    private int storeId;
    private int productId;

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

    public InventoryEntryId() {
    }
}
