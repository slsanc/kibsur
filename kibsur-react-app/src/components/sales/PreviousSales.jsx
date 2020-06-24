import React, {Component} from 'react';

class PreviousSales extends Component {

    state = {
        salesList:[],
        isLoading:true
    };

    render() {
        return (
            <div>
                <button onClick={this.props.onExit}>x</button>
                <h1>Previous Sales:</h1>
                <table>
                    <thead>
                    <th>Sale Event Id</th>
                    <th>Date</th>
                    <th>Employee Id</th>
                    <th>Store Id</th>
                    <th>Units Sold</th>
                    <th>Price Paid Per Unit</th>
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
                this.state.salesList.map(sale =>
                    <tr>
                        <td>{sale.saleEventId}</td>
                        <td>{sale.date}</td>
                        <td>{sale.employeeId}</td>
                        <td>{sale.storeId}</td>
                        <td>{sale.amountSold}</td>
                        <td>{sale.pricePaidPerUnit}</td>
                        <td>{sale.productId}</td>
                    </tr>
                    )
            );
        }
    }

    refreshRecords(){
        fetch('http://localhost:8080/api/sales/all')
            .then(response=>response.json())
            .then(data=>this.setState({salesList:data, isLoading: false}));
    }

    componentDidMount() {
        this.refreshRecords();
    }
}

export default PreviousSales;
