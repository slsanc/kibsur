import React, {Component} from 'react';
import NewShipmentFormItem from "./NewShipmentFormItem";
import PlusButton from "./PlusButton";
import NewProductTypeForm from "./NewProductTypeForm";
import ProductSearchForm from "./ProductSearchForm";

class NewShipmentForm extends Component {

    state={
        newShipmentFormItemsList: [],
        currentForm: <PlusButton onClickOpenForm={(input)=>this.openForm(input)}/>
    };

    render(){
        return(
            <div style={{padding:0, margin:0, backgroundColor:''}}>
                <button onClick={()=>this.props.onExit()}>x</button>
                <br/>
                <table>
                    {this.state.newShipmentFormItemsList.map(newShipmentFormItem => newShipmentFormItem)}
                    <tr style={{height:'25vh', verticalAlign:'bottom'}}>
                        <td colSpan={3}>
                            {this.state.currentForm}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }


    addShipment() {
        let updatedList = this.state.newShipmentFormItemsList;
        updatedList.push(<NewShipmentFormItem/>);
        this.setState({newShipmentFormItemsList: updatedList, currentForm: <PlusButton onClickOpenForm={(input)=>this.openForm(input)}/>});
    }

    openForm(input) {
        let map = {"NewProductTypeForm" : NewProductTypeForm, "ProductSearchForm" : ProductSearchForm};
        let newForm = React.createElement(map[input], {onAddShipment: ()=>this.addShipment()});
        this.setState({currentForm: newForm});
    }
}

export default NewShipmentForm;
