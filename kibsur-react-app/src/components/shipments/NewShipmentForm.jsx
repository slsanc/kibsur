import React, {Component} from 'react';
import NewShipmentFormItem from "./NewShipmentFormItem";
import PlusButton from "./PlusButton";
import NewProductTypeForm from "./NewProductTypeForm";
import StoreSelector from "../inventory/StoreSelector";
import InventoryBrowser from "../inventory/InventoryBrowser";

class NewShipmentForm extends Component {

    state={
        newShipmentFormItemsList:[],
        currentSubForm: <PlusButton onClickOpenForm={(input)=>this.openForm(input)}/>,
        subFormOpen: false,
        currentStoreId: '1',
        dateOfShipment: undefined
    };

    render(){
        return(
            <div>
                <div style={this.mainFormStyle()} id={'mainForm'}>
                <button onClick={()=>this.props.onExit()}>x</button>
                <br/>
                <h3 style={{display:'inline'}}>Shipments received by store location at </h3>
                <StoreSelector onChangeStore={this.handleChange.bind(this)} showOptionForAll={false} message={''}/>
                <h3  style={{display:'inline'}}> on </h3>
                <input type={'date'} name={'dateOfShipment'} value={this.state.dateOfShipment} onChange={this.handleChange.bind(this)} style={{width: '20%', display:'inline'}}/>
                <table>
                    {this.state.newShipmentFormItemsList.map(function(newShipmentFormItem,index) {return(<NewShipmentFormItem productId={newShipmentFormItem.props.productId} productName={newShipmentFormItem.props.productName} productDescription={newShipmentFormItem.props.productDescription} handleChangeInListItem={newShipmentFormItem.props.handleChangeInListItem} id={index} onClickRemoveButton={newShipmentFormItem.props.onClickRemoveButton}/>);})}
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
        this.setState({currentSubForm: <PlusButton onClickOpenForm={(input)=>this.openForm(input)}/>, subFormOpen: false});
    }

    addShipment(product) {
        let updatedList = this.state.newShipmentFormItemsList;
        updatedList.push(new NewShipmentFormItem({productId:product.productId, productName: product.productName, productDescription: product.productDescription, handleChangeInListItem: this.handleChangeInListItem.bind(this) ,  onClickRemoveButton: this.handleRemoveListItem.bind(this)}));
        this.setState({newShipmentFormItemsList: updatedList});
        this.closeSubForm();
    }

    openForm(input) {
        let map = {"NewProductTypeForm" : NewProductTypeForm, "InventoryBrowser" : InventoryBrowser};
        let newForm = React.createElement(map[input], {onAddShipment: (input)=>this.addShipment(input), onCloseSubForm: ()=>this.closeSubForm(), onClickProduct: (input)=>this.addShipment(input), hideStoreSelector:true , message: 'Select The Product:', hideCheckbox:true});
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
        if((this.state.newShipmentFormItemsList.length > 0) && !this.state.subFormOpen){
            return(<button onClick={this.submitShipments.bind(this)}>Submit Shipments</button>);
        }
    }

    submitShipments() {
        if (this.state.dateOfShipment === undefined) {
            alert('Please enter a date!');
        }
        else {
            let newShipmentsList = [];

            for (let item of this.state.newShipmentFormItemsList) {
                newShipmentsList.push({
                    productId: item.props.productId,
                    costPerUnit: Number(item.costPerUnit),
                    numberOfUnits: Number(item.numberOfUnits),
                    storeId: Number(this.state.currentStoreId),
                    date: this.state.dateOfShipment
                });
            }

            console.log(newShipmentsList);

            fetch(('http://localhost:8080/api/createnew/shipment'),
                {
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newShipmentsList)
                }
            )
                .then(response=>response.json())
                .then(data=>console.log('Success: ',data));

            this.props.onExit()
        }

    }

    handleChange(event){
        event.persist();
        this.setState({[event.target.name]:event.target.value});
    }

    handleChangeInListItem(event){
        event.persist();
        let updatedItemsList = this.state.newShipmentFormItemsList;
        updatedItemsList[Number(event.target.id)][event.target.name] = event.target.value;
        this.setState( {newShipmentFormItemsList : updatedItemsList});
    }

    handleRemoveListItem(event){
        event.persist();
        let updatedItemsList = this.state.newShipmentFormItemsList;
        updatedItemsList.splice(Number(event.target.id),1);
        this.setState( {newShipmentFormItemsList : updatedItemsList});
    }
}

export default NewShipmentForm;
