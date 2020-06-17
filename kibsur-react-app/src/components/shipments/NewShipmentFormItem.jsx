import React, {Component} from 'react';

class NewShipmentFormItem extends Component {

    state = {shipmentItem:{}};

    render() {
        return (
            <tr style={{backgroundColor:'#abcdef' , verticalAlign:'top', textAlign:'left'}}>
                <td style={{width:'20%'}}>
                    <label>Item ID</label>
                    <br/>
                    <input type={'number'}/>
                </td>
                <td style={{width:'20%'}}>
                    <label>Item Name</label>
                    <br/>
                    <input type={'text'}/>
                </td>
                <td style={{width:'20%'}}>
                    <label>Quantity</label>
                    <br/>
                    <input type={'number'}/>
                    <br/>
                    <button>+</button>   <button>-</button>
                </td>
                <td  style={{width:'20%'}}>
                    <label>Cost Per Unit</label>
                </td>
                <td  style={{width:'20%'}}>
                    <label>Image</label>
                </td>

            </tr>
        );
    }


    constructor(props) {
        super(props);
    }
}

export default NewShipmentFormItem;
