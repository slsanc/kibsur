import React, {Component} from 'react';

class NewShipmentFormItem extends Component {

    state = {shipmentItem:{}};

    render() {
        return (
            <tr style={{backgroundColor:'#abcdef' , verticalAlign:'top', textAlign:'left'}}>
                <td style={{width:'10%'}}>
                    <label>Item ID</label>
                    <br/>
                    <input type={'number'}/>
                </td>
                <td style={{width:'10%'}}>
                    <label>Item Name</label>
                    <br/>
                    <input type={'text'}/>
                </td>
                <td style={{}}>
                    <label>Quantity</label>
                    <br/>
                    <input type={'number'} style={{width:'20%'}}/>
                    <br/>
                    <button>+</button>   <button>-</button>
                </td>
            </tr>
        );
    }


    constructor(props) {
        super(props);
    }
}

export default NewShipmentFormItem;
