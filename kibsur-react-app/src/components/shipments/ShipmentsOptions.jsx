import React, {Component} from 'react';

class ShipmentsOptions extends Component {
    render() {
        return (
            <table>
                <tr>
                    <td>
                        <button onClick={()=>this.props.onClickNewShipment()}>
                            Record New Shipment
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button>
                            See Previous Shipments
                        </button>
                    </td>
                </tr>
            </table>
        );
    }
}

export default ShipmentsOptions;
