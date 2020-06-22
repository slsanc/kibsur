import React, {Component} from 'react';
import NewShipmentFormItem from "./NewShipmentFormItem";
import PlusButton from "./PlusButton";
import NewProductTypeForm from "./NewProductTypeForm";
import ProductSearchForm from "./ProductSearchForm";
import StoreSelector from "../inventory/StoreSelector";

class NewShipmentForm extends Component {

    state={
        newShipmentFormItemsList: [],
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
                    {this.state.newShipmentFormItemsList.map(newShipmentFormItem => newShipmentFormItem)}
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

    addShipment(productData) {
        console.log(productData);
        let updatedList = this.state.newShipmentFormItemsList;
        updatedList.push(<NewShipmentFormItem product={productData}/>);
        this.setState({newShipmentFormItemsList: updatedList});
        this.closeSubForm();
    }

    openForm(input) {
        let map = {"NewProductTypeForm" : NewProductTypeForm, "ProductSearchForm" : ProductSearchForm};
        let newForm = React.createElement(map[input], {onAddShipment: (input)=>this.addShipment(input), onCloseSubForm: ()=>this.closeSubForm()});
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

        let newShipmentsList = [];

        for(let item of this.state.newShipmentFormItemsList){
            newShipmentsList.push({productId: item.props.productId, costPerUnit: item.state.costPerUnit, numberOfUnits: item.state.numberOfUnits, storeId: this.state.currentStoreId});
        }

        alert(JSON.stringify(newShipmentsList));
    }

    handleChange(event){
        event.persist();
        this.setState({[event.target.name]:event.target.value});
    }
}

export default NewShipmentForm;
