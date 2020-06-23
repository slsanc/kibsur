import React, {Component} from 'react';
import NewSalesFormItem from "./NewSalesFormItem";
import SalesPlusButton from "./SalesPlusButton";
import StoreSelector from "../inventory/StoreSelector";
import InventoryBrowser from "../inventory/InventoryBrowser";
import keyIndex from 'react-key-index';

class NewSaleForm extends Component {

    state={
        newSalesFormItemsList:[],
        currentSubForm: <SalesPlusButton onClickOpenForm={(input)=>this.openForm(input)}/>,
        subFormOpen: false,
        currentStoreId: '1',
        dateOfSale: undefined
    };

    render(){
        return(
            <div>
                <div style={this.mainFormStyle()} id={'mainForm'}>
                <button onClick={()=>this.props.onExit()}>x</button>
                <br/>
                <h3 style={{display:'inline'}}>Sales conducted by store location at </h3>
                <StoreSelector onChangeStore={this.handleChange.bind(this)} showOptionForAll={false} message={''}/>
                <h3  style={{display:'inline'}}> on </h3>
                <input type={'date'} name={'dateOfSale'} value={this.state.dateOfSale} onChange={this.handleChange.bind(this)} style={{width: '20%', display:'inline'}}/>
                <table>
                    {this.state.newSalesFormItemsList.map(function(newSalesFormItem,index) {return(<NewSalesFormItem productId={newSalesFormItem.props.productId} handleChangeInListItem={newSalesFormItem.props.handleChangeInListItem} productName={newSalesFormItem.props.productName} id={index} />);})}
                </table>
                </div>
                <table>
                    <tr style={{height:'25vh', verticalAlign:'bottom'}}>
                        <td colSpan={2}>
                            {this.state.currentSubForm}
                        </td>
                        <td colspan={3}>
                            {this.displaySubmitButton()}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    closeSubForm(){
        this.setState({currentSubForm: <SalesPlusButton onClickOpenForm={(input)=>this.openForm(input)}/>, subFormOpen: false});
    }

    addSale(product) {
        let updatedList = this.state.newSalesFormItemsList;
        updatedList.push(new NewSalesFormItem({productId:product.productId, productName: product.productName, productDescription: product.productDescription, handleChangeInListItem: this.handleChangeInListItem.bind(this)}));
        this.setState({newSalesFormItemsList: updatedList});
        this.closeSubForm();
    }

    openForm() {
        let newForm = React.createElement(InventoryBrowser, {onCloseSubForm: ()=>this.closeSubForm(), onClickProduct: (input)=>this.addSale(input), hideStoreSelector:true , message: 'Select The Product:', hideCheckbox:true});
        this.setState({currentSubForm: newForm, subFormOpen: true});
    }

    mainFormStyle() {
        if (!this.state.subFormOpen){
            return({visibility:'visible'});
        }
        else{
            return({visibility:'hidden', height:0});
        }
    }

    displaySubmitButton() {
        if((this.state.newSalesFormItemsList.length > 0) && !this.state.subFormOpen){
            return(<button onClick={this.submitSales.bind(this)}>Submit Sales</button>);
        }
    }

    submitSales() {
        if (this.state.dateOfSale === undefined) {
            alert('Please enter a date!');
        }
        else {
            let newSalesList = [];

            for (let item of this.state.newSalesFormItemsList) {
                newSalesList.push({
                    employeeId: Number(item.employeeId),
                    productId: item.props.productId,
                    costPerUnit: Number(item.costPerUnit),
                    numberOfUnits: Number(item.numberOfUnits),
                    storeId: Number(this.state.currentStoreId),
                    date: this.state.dateOfSale
                });
            }

            fetch(('http://localhost:8080/api/createnew/sale'),
                {
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newSalesList)
                }
            )
                .then(response=>response.json())
                .then(data=>console.log('Success: ',data));

            this.props.onExit();
        }

    }

    handleChange(event){
        event.persist();
        this.setState({[event.target.name]:event.target.value});
    }

    handleChangeInListItem(event){
        event.persist();
        let updatedItemsList = this.state.newSalesFormItemsList;
        updatedItemsList[Number(event.target.id)][event.target.name] = event.target.value;
        this.setState( {newSalesFormItemsList : updatedItemsList});
    }
}

export default NewSaleForm;
