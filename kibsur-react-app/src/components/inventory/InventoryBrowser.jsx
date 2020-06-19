import React, {Component} from 'react';
import folder from '../../feather/folder.svg';
import box from '../../feather/box.svg';
import arrowUp from '../../feather/arrow-up.svg'
import MoveCategoriesButton from "./MoveCategoriesButton";
import InventoryBrowserProductEntry from "./InventoryBrowserProductEntry";
import InventoryBrowserCategoryEntry from "./InventoryBrowserCategoryEntry";
import CreateNewCategoryButton from "./CreateNewCategoryButton";

class InventoryBrowser extends Component{
    state={
        currentStoreId: 'all',
        currentCategory: 1,
        //each entry in inventoryEntriesAndProducts is of the form [InventoryEntry, Product].
        inventoryEntriesAndProducts:[],
        categoriesList:[{categoryId:0, categoryName:''}],
        isLoading: true,
        categoryIdsChecked:[],
        productIdsChecked:[],
        destination:'',
    };

    render(){
        return(
            <div>
                <h1>Inventory for Store {this.props.storeId}:</h1>
                <br/>
                <button onClick={()=>this.ascendCategory()} style={{marginRight:'5%', marginLeft:'5%'}}><img src={arrowUp}/></button>
                <CreateNewCategoryButton/>
                {this.displayMoveCategoriesButton()}
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
                    <table>
                        {this.state.categoriesList.map(category => <InventoryBrowserCategoryEntry category={category} onClickCategory={(categoryId)=>this.changeCategory(categoryId)} onClickCheckbox={this.handleClickCheckbox.bind(this)}/>)}
                        {this.state.inventoryEntriesAndProducts.map(entry => <InventoryBrowserProductEntry inventoryEntry={entry[0]} product={entry[1]} onClickCheckbox={this.handleClickCheckbox.bind(this)}/>)}
                    </table>
                );
            } else {
                return (<h2>No Items or Categories to Display</h2>);
            }
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

    handleClickCheckbox(event) {
        event.persist();

        //if the checkbox is checked, add the id of the object it represents to the current list of checked items.
        //if the checkbox is unchecked, remove the id of the object it represents to the current list of checked items.
        let listName = event.target.attributes.objecttype.value + 'IdsChecked';
        let updatedList = this.state[listName];

        if (event.target.checked){
            updatedList.push(Number(event.target.attributes.objectid.value));
        }
        else{
            updatedList.splice(this.state[listName].indexOf(Number(event.target.attributes.objectid.value)), 1);
        }

        this.setState({[listName]: updatedList});
    }

    displayMoveCategoriesButton() {
        if ((this.state.categoryIdsChecked.length > 0) || (this.state.productIdsChecked.length > 0)){
            return(<MoveCategoriesButton onClickMoveButton={(destination)=>this.moveItems(destination)}/>);
        }
    }

    moveItems(destination) {

        let data = JSON.stringify(this.state.categoryIdsChecked);

        fetch(('http://localhost:8080/api/categories/moveto/' + destination),
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: data
                }
            )

        this.changeCategory(this.state.currentCategory);
    }
}

export default InventoryBrowser;