package slsanc.kibsur.models;

import javax.persistence.*;

@Entity
@Table (name="Categories")
public class Category {
    @Column(name = "category_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private int categoryId;
    @Column(name = "category_name") private String categoryName;
    @Column(name = "parent_category") private int parentCategory;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(int parentCategory) {
        this.parentCategory = parentCategory;
    }

    public Category(String categoryName, int parentCategory) {
        this.categoryName = categoryName;
        this.parentCategory = parentCategory;
    }
}
