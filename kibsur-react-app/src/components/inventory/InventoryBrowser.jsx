import React, {Component} from 'react';
import folder from '../../feather/folder.svg';
import box from '../../feather/box.svg';
import arrowUp from '../../feather/arrow-up.svg'

class InventoryBrowser extends Component{
    state={
        currentStoreId: 'all',
        currentCategory: 1,
        //each entry in inventoryEntriesAndProducts is of the form [InventoryEntry, Product].
        inventoryEntriesAndProducts:[],
        categoriesList:[{categoryId:0, categoryName:''}],
        isLoading: true
    };

    render(){
        return(
            <div>
                <h1>Inventory for Store {this.props.storeId}:</h1>
                <br/>
                <button onClick={()=>this.ascendCategory()}><img src={arrowUp}/></button>
                {this.displayInventory()}
            </div>
        );
    }

    displayInventory() {

        if(this.state.isLoading){
            return(<h2>Loading...</h2>)
        }
        else {
            if ((this.state.inventoryEntriesAndProducts.length > 0) || (this.state.categoriesList.length > 0)) {
                return (
                    <table className={"striped-table"}>
                        {this.state.categoriesList.map(category => this.displayCategory(category))}
                        {this.state.inventoryEntriesAndProducts.map((entry) => this.displayInventoryEntry(entry[0], entry[1]))}
                    </table>
                );
            } else {
                return (<h2>No Items or Categories to Display</h2>);
            }
        }
    }

    displayInventoryEntry(inventoryEntry, product) {
        return (
            <tr onclick={() => this.onClickInventoryEntry()}>
                <td><img src={box}/></td>
                <td>{inventoryEntry.productId}</td>
                <td>{product.productName}</td>
                <td>{inventoryEntry.amountInStock}</td>
                <td>{product.productDescription}</td>
                <td>(quantity here later)</td>
            </tr>
        );
    }

    displayCategory(category) {
        if (category.categoryId != 1) {
            return (
                <tr onClick={() => this.changeCategory(category.categoryId)}>
                    <td><img src={folder}/></td>
                    <td>{category.categoryId}</td>
                    <td>{category.categoryName}</td>
                    <td colSpan={3}></td>
                </tr>
            );
        }
    }

    componentDidMount() {
        this.changeCategory(1);
    }

    changeCategory(categoryId){
        this.setState({isLoading: true});
        this.updateCategoriesList(categoryId);
        this.updateInventoryEntriesAndProducts(categoryId);
        this.setState(state => {
            return({isLoading: false , currentCategory: categoryId});
        });
    };

    ascendCategory(){
        fetch('http://localhost:8080/api/categories/getparentcategoryid/' + this.state.currentCategory)
            .then(response => response.json())
            .then(parentCategoryId => this.changeCategory(parentCategoryId))
    }

    updateInventoryEntriesAndProducts(categoryId){
        fetch('http://localhost:8080/api/inventoryentries/' + this.state.currentStoreId + '/' + categoryId)
            .then(response => response.json())
            .then(data => this.setState({inventoryEntriesAndProducts: data}));
    }

    updateCategoriesList(categoryId) {
        fetch('http://localhost:8080/api/categories/' + categoryId)
            .then(response => response.json())
            .then(data => this.setState({categoriesList: data}));
    }

    onClickInventoryEntry() {
        if(this.props.inventoryEntryClickable){
            // open the product page
            alert('clicked on inventory entry');
        }
    }
}

export default InventoryBrowser;