import React, {Component} from 'react';

class PreviousShipments extends Component {

    state = {
        shipmentsList:[],
        isLoading:true
    };

    render() {
        return (
            <div>
                <button onClick={this.props.onExit}>x</button>
                <h1>Previous Shipments:</h1>
                <table>
                    <thead>
                    <th>Shipment Id</th>
                    <th>Date</th>
                    <th>Store Id</th>
                    <th>Number of Units</th>
                    <th>Cost Per Unit</th>
                    <th>Product Id</th>
                    </thead>
                    {this.displayRows()}
                </table>
            </div>
        );
    }

    displayRows() {
        if(!this.state.isLoading){
            return(
                this.state.shipmentsList.map(shipment =>
                    <tr>
                        <td>{shipment.shipmentId}</td>
                        <td>{shipment.date}</td>
                        <td>{shipment.storeId}</td>
                        <td>{shipment.numberOfUnits}</td>
                        <td>{shipment.costPerUnit}</td>
                        <td>{shipment.productId}</td>
                    </tr>
                    )
            );
        }
    }

    refreshRecords(){
        fetch('http://localhost:8080/api/shipments/all')
            .then(response=>response.json())
            .then(data=>this.setState({shipmentsList:data, isLoading: false}));
    }

    componentDidMount() {
        this.refreshRecords();
    }
}

export default PreviousShipments;
