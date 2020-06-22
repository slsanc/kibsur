import React, {Component} from 'react';
import StoreSelector from "../inventory/StoreSelector";
import CategorySelector from "../inventory/CategorySelector";
import folderPlus from "../../feather/folder-plus.svg"
import InventoryBrowser from "../inventory/InventoryBrowser";

class NewProductTypeForm extends Component {

    state = {
        productName:'',
        productDescription:'',
        categoryId: 1,
        mainFormIsOpen: true
    };

    render() {
        return (
            <div style={{backgroundColor:'silver', padding:'0.5rem', borderRadius:'4px'}}>
                <button style={{align:'left', marginRight: '1%'}} onClick={()=>this.props.onCloseSubForm()}>x</button>
                {this.showMainForm()}
            </div>
        );
    }

    createNewProduct(){
        fetch('http://localhost:8080/api/createnew/product',
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(
                    {productName: this.state.productName,
                        productDescription: this.state.productDescription,
                        categoryId: this.state.categoryId}
                    )
                }
            )
            .then(response => response.json())
            .then(data => this.props.onAddShipment(data));

    }

    handleChange(event){
        event.persist();
        this.setState({[event.target.name]: event.target.value})
    }

    openOrCloseCreateCategoryDialog() {
        this.setState(state=>{
            let newFormIsOpenValue = !this.state.mainFormIsOpen;
            return ({mainFormIsOpen: newFormIsOpenValue});
        });
    }

    showMainForm(){
        if(this.state.mainFormIsOpen){
            return(
                <div style={{marginLeft:'2%'}}>
                    <h3 style={{display:'inline'}}>Enter Information For New Product Type:</h3>
                    <label>Product Name:</label>
                    <input type={'text'} style={{width:'40%'}} name={'productName'} value={this.state.productName} onChange={this.handleChange.bind(this)}/>
                    <label>Product Category:</label>
                    <CategorySelector message={''} buttonImage={folderPlus} onClickButton={()=>this.openOrCloseCreateCategoryDialog()} passesCategoryToParent={true} handleChangeSelection={this.handleChange.bind(this)}/>
                    <label>Product Description:</label>
                    <textarea maxLength={255} style={{resize:'none', width:'40%'}} name={'productDescription'} value={this.state.productDescription} onChange={this.handleChange.bind(this)}/>
                    <button onClick={()=>this.createNewProduct()}>Add Product Type</button>
                </div>
            );
        }
        else{
            return(
                <div style={{marginLeft:'2%', backgroundColor:'#f2f2f2'}}>
                    <InventoryBrowser hideCheckbox={true} onCreateCategory={()=>this.openOrCloseCreateCategoryDialog()} showOnlyCategories={true} hideStoreSelector={true} message={'Create a new Category for this product:'}/>
                </div>
            );
        }
    }
}

export default NewProductTypeForm;
