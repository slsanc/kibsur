import React, {Component} from 'react';

class SalesOptions extends Component {
    render() {
        return (
            <table>
                <tr>
                    <td>
                        <button onClick={()=>this.props.onClickNewSale()}>
                            Record New Sales
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button  onClick={()=>this.props.onClickPreviousSales()}>
                            See Previous Sales
                        </button>
                    </td>
                </tr>
            </table>
        );
    }
}

export default SalesOptions;
