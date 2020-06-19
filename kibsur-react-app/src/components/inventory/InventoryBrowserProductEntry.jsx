import React, {Component} from 'react';
import box from "../../feather/box.svg";

class InventoryBrowserProductEntry extends Component {

    state = {checked: false};

    render() {
        return (
            <tr style={this.rowStyle()}>
                <td>
                    <input type={'checkbox'}
                           objectid={this.props.product.productId} objecttype='product'
                           onChange={(event)=>{this.props.onClickCheckbox(event); this.changeCheckedValue();}}/>
                </td>
                <td><img src={box}/></td>
                <td>ID#{this.props.product.productId}</td>
                <td>{this.props.product.productName}</td>
                <td>{this.props.inventoryEntry.amountInStock} in stock</td>
                <td>{this.props.product.productDescription}</td>
                <td> </td>
            </tr>
        );
    }

    rowStyle(){
        if (this.state.checked){
            return ({backgroundColor:'silver'})
        }
    }


    changeCheckedValue() {
        this.setState(state => {
            let newCheckedValue = !this.state.checked;
            return ({checked: newCheckedValue});
        })
    }
}

export default InventoryBrowserProductEntry;
