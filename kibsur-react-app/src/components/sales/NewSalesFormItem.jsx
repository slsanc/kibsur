import React, {Component} from 'react';
import EmployeeSelector from "./EmployeeSelector";

class NewSalesFormItem extends Component {

    amountSold = 1;
    pricePaidPerUnit = 0.1;
    employeeId = 1;

    render() {
        return (
            <tr style={{backgroundColor:'#98FB98' , verticalAlign:'top', textAlign:'left'}}>
                <td>
                    <label>Employee:</label>
                    <EmployeeSelector handleChangeSelection={(event)=>this.props.handleChangeInListItem(event)}/>
                </td>
                <td style={{width:'14%'}}>
                    <label>Item ID:</label>
                    {this.props.productId}
                </td>
                <td style={{width:'14%'}}>
                    <label>Item Name:</label>
                    {this.props.productName}
                </td>
                <td style={{width:'14%'}}>
                    <label>Number of Units:</label>
                    <input type={'number'} min={1} defaultValue={1} name={'amountSold'} id={this.id} onChange={(event)=>this.props.handleChangeInListItem(event)}/>
                </td>
                <td  style={{width:'14%'}}>
                    <label>Price Paid per Unit:</label>
                    <input type={'number'} min={0} step={0.01} defaultValue={0.01} name={'pricePaidPerUnit'} id={this.id} onChange={(event)=>this.props.handleChangeInListItem(event)}/>
                </td>
                <td  style={{width:'14%'}}>
                    <label></label>
                </td>
                <td style={{verticalAlign:'bottom'}}>
                    <button>Remove</button>
                </td>

            </tr>
        );
    }

    constructor(props) {
        super(props);
    }
}

export default NewSalesFormItem;
