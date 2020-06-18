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
        isLoading: true,
        categoryIdsChecked:[],
        productIdsChecked:[]
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
            <tr onClick={() => this.onClickInventoryEntry()}>
                {this.displayCheckbox(product.productId, 'product')}
                <td><img src={box}/></td>
                <td>ID#{product.productId}</td>
                <td>{product.productName}</td>
                <td>{inventoryEntry.amountInStock} in stock</td>
                <td>{product.productDescription}</td>
                <td>(quantity here later)</td>
            </tr>
        );
    }

    displayCategory(category) {
        if (category.categoryId != 1) {
            return (
                <tr>
                    {this.displayCheckbox(category.categoryId, 'category')}
                    <td onClick={() => this.changeCategory(category.categoryId)}><img src={folder}/></td>
                    <td onClick={() => this.changeCategory(category.categoryId)}>{category.categoryId}</td>
                    <td onClick={() => this.changeCategory(category.categoryId)}>{category.categoryName}</td>
                    <td onClick={() => this.changeCategory(category.categoryId)} colSpan={3}></td>
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
            return({isLoading: false ,
                currentCategory: categoryId,
                categoryIdsChecked:[],
                productIdsChecked:[]}
                );
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

    displayCheckbox(objectId, objectType) {
        return(
            <td>
                <input type={'checkbox'}
                       objectid={objectId} objecttype={objectType}
                       onChange={this.handleClickCheckbox.bind(this)}/>
            </td>
        );
    }

    handleClickCheckbox(event) {
        event.persist()
        console.log(event);
        //if the checkbox is checked, add the id of the object it represents to the current list of checked items.
        //if the checkbox is unchecked, remove the id of the object it represents to the current list of checked items.
        let listName = event.target.attributes.objecttype.value + 'IdsChecked';
        let updatedList = this.state[listName];

        console.log(listName);
        console.log(updatedList);

        if (event.target.checked){
            updatedList.push(event.target.attributes.objectid.value);
        }
        else{
            updatedList.splice(this.state[listName].indexOf(event.target.attributes.objectid.value), 1);
        }

        this.setState({[listName]: updatedList});
    }
}

export default InventoryBrowser;