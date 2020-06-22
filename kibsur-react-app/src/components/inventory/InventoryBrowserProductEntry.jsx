import React, {Component} from 'react';
import box from "../../feather/box.svg";

class InventoryBrowserProductEntry extends Component {

    state = {checked: false};

    render() {
        return (
            <tr style={this.rowStyle()}>
                {this.displayCheckbox()}
                <td onClick={() => this.onClickProduct(this.props.product)}><img src={box}/></td>
                <td onClick={() => this.onClickProduct(this.props.product)}>ID#{this.props.product.productId}</td>
                <td onClick={() => this.onClickProduct(this.props.product)}>{this.props.product.productName}</td>
                <td onClick={() => this.onClickProduct(this.props.product)}>{this.props.inventoryEntry.amountInStock} in
                    stock
                </td>
                <td onClick={() => this.onClickProduct(this.props.product)}>{this.props.product.productDescription}</td>
                <td onClick={() => this.onClickProduct(this.props.product)}></td>
            </tr>
        );
    }

    displayCheckbox() {
        if(!this.props.hideCheckbox) {
            return (
                <td>
                    <input type={'checkbox'}
                           objectid={this.props.product.productId} objecttype='product'
                           onChange={(event) => {
                               this.props.onClickCheckbox(event);
                               this.changeCheckedValue();
                           }}/>
                </td>
            );
        }
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

    onClickProduct(product){
        if(typeof this.props.onClickProduct(product) == 'function'){
            this.props.onClickProduct(product);
        }
    }
}

export default InventoryBrowserProductEntry;
