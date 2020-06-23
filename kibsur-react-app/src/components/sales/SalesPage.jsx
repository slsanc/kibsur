import React, {Component} from 'react';
import SalesOptions from "./SalesOptions";
import NewSaleForm from "./NewSalesForm";

class SalesPage extends Component {

    state={
        currentElement:<SalesOptions onClickNewSale={()=>this.openNewSaleForm()}/>
    };

    render(){
        return(this.state.currentElement);
    }

    openNewSaleForm() {
        this.setState({currentElement: <NewSaleForm onExit = {() => this.returnToSalesOptions()}/>})
    }

    returnToSalesOptions() {
        this.setState({currentElement: <SalesOptions onClickNewSale={()=>this.openNewSaleForm()}/>})
    }
}


export default SalesPage;
