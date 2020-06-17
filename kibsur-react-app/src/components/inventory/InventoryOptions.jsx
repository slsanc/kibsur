import React, {Component} from 'react';

class InventoryOptions extends Component {

    state={
        storesList : [{storeId: 1, adress: '123 fake rd'},
        {storeId: 2 , adress: '456 paper ln'},
        {storeId: 3 , adress: '789 sesame st'}, ]
    };

    render() {
        return(
            <table>
                <tr>
                    <h1>Select A Store To View Its Inventory:</h1>

                </tr>
                <tr>
                    {this.state.storesList.map(location =>
                        <tr>
                            <td style={{align:'center'}}>
                                <button onClick={()=>this.props.onChooseStore(location.storeId)}>
                                    {location.adress}
                                </button>
                            </td>
                        </tr>
                    )}
                </tr>
                <tr>
                    <td>
                        <button onClick={()=>this.props.onChooseStore('')}>
                            See All Items Across All Stores
                        </button>
                    </td>
                </tr>
            </table>
        );
    }
}

export default InventoryOptions;
