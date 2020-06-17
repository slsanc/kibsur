import React, {Component} from 'react';

class NewProductTypeForm extends Component {

    state = {};

    render() {
        return (
            <table style={{backgroundColor:'#5c6e80'}}>
                <tr>
                    <td style={{border:'none'}}></td>
                </tr>
                <tr>
                    <td style={{border:'none'}}>
                        <button onClick={()=>this.props.onAddShipment()}>Add Product Type</button>
                    </td>
                </tr>
            </table>
        );
    }

}

export default NewProductTypeForm;
