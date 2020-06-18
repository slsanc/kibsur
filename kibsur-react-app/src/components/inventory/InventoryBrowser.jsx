import React, {Component} from 'react';

class InventoryBrowser extends Component{
    state={
        currentStoreId: 'all',
        currentCategory:0,
        inventoryEntriesList:[],
        categoriesList:[{categoryId:0, categoryName:''}],
        isLoading: true
    };

    render(){
        return(
            <div>
                <h1>Inventory for Store {this.props.storeId}:</h1>
                <br/>
                {this.displayInventory()}
            </div>
        );
    }

    displayInventory() {

        if(this.state.isLoading){
            return(<h2>Loading...</h2>)
        }
        else {
            if ((this.state.inventoryEntriesList.length > 0) || (this.state.categoriesList.length > 0)) {
                return (
                    <table className={"striped-table"}>
                        {this.state.categoriesList.map(category =>
                            <tr onClick={()=>this.changeCategory(category.categoryId)}>
                                <td>{category.categoryId}</td>
                                <td>{category.categoryName}</td>
                                <td colSpan={2}> </td>
                            </tr>
                        )}
                        {this.state.inventoryEntriesList.map(inventoryEntry =>
                            <tr>
                                <td>{inventoryEntry.productId}</td>
                                <td>(product name)</td>
                                <td>{inventoryEntry.amountInStock}</td>
                                <td>(product description)</td>
                                <td>(quantity here later)</td>
                            </tr>
                        )}
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
        this.updateInventoryEntriesList(categoryId);
        this.setState({isLoading: false});
    };

    updateInventoryEntriesList(categoryId){
        fetch('http://localhost:8080/api/inventoryentries/' + this.state.currentStoreId + '/' + categoryId)
            .then(response => response.json())
            .then(data => this.setState({inventoryEntriesList: data}));
    }

    updateCategoriesList(categoryId) {
        fetch('http://localhost:8080/api/categories/' + categoryId)
            .then(response => response.json())
            .then(data => this.setState({categoriesList: data}));
    }
}

export default InventoryBrowser;