import React, {Component} from 'react';
import folder from '../../feather/folder.svg';
import box from '../../feather/box.svg';
import chevronsRight from '../../feather/chevrons-right.svg'
import arrowUp from '../../feather/arrow-up.svg'
import CategorySelector from "./CategorySelector";
import InventoryBrowserProductEntry from "./InventoryBrowserProductEntry";
import InventoryBrowserCategoryEntry from "./InventoryBrowserCategoryEntry";
import CreateNewCategoryButton from "./CreateNewCategoryButton";
import StoreSelector from "./StoreSelector";

class InventoryBrowser extends Component{
    state={
        currentStoreId: 'all',
        currentCategory: {},
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
                {this.displayMessage()}
                {this.displayStoreSelector()}
                <h2>Current Category: {this.state.currentCategory.categoryName}</h2>
                <button onClick={()=>this.ascendCategory()} style={{marginRight:'5%', marginLeft:'5%'}}>
                    <img src={arrowUp}/>
                </button>
                <CreateNewCategoryButton onClickCreateCategory={(newCategoryName)=>this.createCategory(newCategoryName)}/>
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
                        {this.displayCategories()}
                        {this.displayInventoryEntries()}
                    </table>
                );
            } else {
                return (<h2>No Items or Categories to Display</h2>);
            }
        }
    }

    componentDidMount() {
        this.changeCategory({categoryId: 1, categoryName: 'Items', parentCategory: 1});
    }

    async changeCategory(category){
        this.setState({isLoading: true});
        await this.updateCategoriesList(category.categoryId);
        await this.updateInventoryEntriesAndProducts(category.categoryId);
        this.setState(state => {
            return({isLoading: false ,
                currentCategory: category,
                categoryIdsChecked:[],
                productIdsChecked:[]}
                );
        });
    };

    ascendCategory(){
        fetch('http://localhost:8080/api/categories/getparentcategory/' + this.state.currentCategory.parentCategory)
            .then(response => response.json())
            .then(parentCategory => this.changeCategory(parentCategory))
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
        if (((this.state.categoryIdsChecked.length > 0) || (this.state.productIdsChecked.length > 0)) && (!this.props.showOnlyCategories)){
            return(<CategorySelector message={'Move Selected To Category:'} buttonImage={chevronsRight} onClickButton={(destination)=>this.moveItems(destination)}/>);
        }
    }

    async moveItems(destination) {

        console.log(JSON.stringify(this.state.categoryIdsChecked));

        await fetch(('http://localhost:8080/api/categories/moveto/' + destination),
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.categoryIdsChecked)
                }
            )
            .then(response=>response.json())
            .then(data=>console.log('Success: ',data));

        await fetch(('http://localhost:8080/api/products/moveto/' + destination),
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.productIdsChecked)
                }
            )
            .then(response=>response.json())
            .then(data=>console.log('Success: ',data));

        this.changeCategory(this.state.currentCategory);
    }

    async createCategory(newCategoryName) {

        await fetch(('http://localhost:8080/api/createnew/category'),
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({categoryName:newCategoryName , parentCategory: this.state.currentCategory.categoryId})
            })
            .then(response=>response.json())
            .then(data=>console.log(data));

        if(typeof this.props.onCreateCategory == 'function'){
            this.props.onCreateCategory();
        }
        else{
            this.changeCategory(this.state.currentCategory);
        }

    }


    handleSelectStore(event) {
        event.persist();
        this.setState({currentStoreId: event.target.value});
        this.changeCategory(this.state.currentCategory);
    }

    displayStoreSelector() {
        if(!this.props.showOnlyCategories){
            return(
                <div>
                <StoreSelector showOptionForAll={true} onChangeStore={this.handleSelectStore.bind(this)} message={'See inventory for store: '}/>
                <br/>
                </div>
            );
        }
    }

    displayInventoryEntries() {
        if(!this.props.showOnlyCategories){
            return(
                this.state.inventoryEntriesAndProducts.map(entry => <InventoryBrowserProductEntry inventoryEntry={entry[0]} product={entry[1]} onClickCheckbox={this.handleClickCheckbox.bind(this)}/>)
            );
        }
    }

    displayCategories() {
        return(
            this.state.categoriesList.map(category => <InventoryBrowserCategoryEntry category={category} onClickCategory={(category)=>this.changeCategory(category)} onClickCheckbox={this.handleClickCheckbox.bind(this)}/>)
        );
    }

    displayMessage() {
        if(this.props.message){
            return(<h2>{this.props.message}</h2>);
        }
    }
}

export default InventoryBrowser;