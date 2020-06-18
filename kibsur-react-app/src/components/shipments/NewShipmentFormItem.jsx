import React, {Component} from 'react';

class NewShipmentFormItem extends Component {

    state = {
        quantity:1,
        costPerUnit:0
    };

    render() {
        return (
            <tr style={{backgroundColor:'#abcdef' , verticalAlign:'top', textAlign:'left'}}>
                <td style={{width:'14%'}}>
                    <label>Item ID:</label>
                    {this.props.product.productId}
                </td>
                <td style={{width:'14%'}}>
                    <label>Item Description:</label>
                    {this.props.product.productDescription}
                </td>
                <td style={{width:'14%'}}>
                    <label>Item Name:</label>
                    {this.props.product.productName}
                </td>
                <td style={{width:'14%'}}>
                    <label>Number of Units:</label>
                    <input type={'number'} min={1} name={'quantity'} value={this.state.quantity} onChange={this.handleChange.bind(this)}/>
                </td>
                <td  style={{width:'14%'}}>
                    <label>Cost Per Unit:</label>
                    <input type={'number'} min={0} step={0.01} name={'costPerUnit'} value={this.state.costPerUnit} onChange={this.handleChange.bind(this)}/>
                </td>
                <td  style={{width:'14%'}}>
                    <label>Image</label>
                </td>
                <td style={{verticalAlign:'bottom'}}>
                    <button>Remove</button>
                </td>

            </tr>
        );
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }


    constructor(props) {
        super(props);
    }
}

export default NewShipmentFormItem;
