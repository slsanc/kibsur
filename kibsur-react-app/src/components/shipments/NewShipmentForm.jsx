import React, {Component} from 'react';
import NewShipmentFormItem from "./NewShipmentFormItem";
import PlusButton from "./PlusButton";
import NewProductTypeForm from "./NewProductTypeForm";
import ProductSearchForm from "./ProductSearchForm";

class NewShipmentForm extends Component {

    state={
        newShipmentFormItemsList: [],
        currentSubForm: <PlusButton onClickOpenForm={(input)=>this.openForm(input)}/>,
        subFormOpen: false,
        storesList : [{storeId: 1, adress: '123 fake rd'},
            {storeId: 2 , adress: '456 paper ln'},
            {storeId: 3 , adress: '789 sesame st'}, ]
    };

    render(){
        return(
            <div>
                <div style={this.mainFormStyle()} id={'mainForm'}>
                <button onClick={()=>this.props.onExit()}>x</button>
                <br/>
                <h3 style={{display:'inline'}}>Shipments received by store location at </h3>
                <select style={{width: '20%', display:'inline'}}>
                    {this.state.storesList.map(store => <option>{store.adress}</option>)}
                </select>
                <h3  style={{display:'inline'}}> on </h3>
                <input type={'date'} style={{width: '20%', display:'inline'}}/>
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

    addShipment() {
        let updatedList = this.state.newShipmentFormItemsList;
        updatedList.push(<NewShipmentFormItem/>);
        this.setState({newShipmentFormItemsList: updatedList});
        this.closeSubForm();
    }

    openForm(input) {
        let map = {"NewProductTypeForm" : NewProductTypeForm, "ProductSearchForm" : ProductSearchForm};
        let newForm = React.createElement(map[input], {onAddShipment: ()=>this.addShipment(), onCloseSubForm: ()=>this.closeSubForm()});
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
        if(this.state.newShipmentFormItemsList.length > 0){
            return(<button>Submit Shipments</button>);
        }
    }
}

export default NewShipmentForm;
