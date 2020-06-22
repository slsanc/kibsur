import React, {Component} from 'react';

class NewShipmentFormItem extends Component {

    numberOfUnits = 1;
    costPerUnit = 0.1;

    render() {
        return (
            <tr style={{backgroundColor:'#abcdef' , verticalAlign:'top', textAlign:'left'}}>
                <td style={{width:'14%'}}>
                    <label>Item ID:</label>
                    {this.props.productId}
                </td>
                <td style={{width:'14%'}}>
                    <label>Item Description:</label>
                    {this.props.productDescription}
                </td>
                <td style={{width:'14%'}}>
                    <label>Item Name:</label>
                    {this.props.productName}
                </td>
                <td style={{width:'14%'}}>
                    <label>Number of Units:</label>
                    <input type={'number'} min={1} defaultValue={1} name={'numberOfUnits'} id={this.props.productId} onChange={(event)=>this.props.handleChangeInListItem(event)}/>
                </td>
                <td  style={{width:'14%'}}>
                    <label>Cost Per Unit:</label>
                    <input type={'number'} min={0} step={0.01} defaultValue={0.01} name={'costPerUnit'} id={this.props.productId} onChange={(event)=>this.props.handleChangeInListItem(event)}/>
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

export default NewShipmentFormItem;
