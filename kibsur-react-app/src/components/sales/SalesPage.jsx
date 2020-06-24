import React, {Component} from 'react';
import SalesOptions from "./SalesOptions";
import NewSaleForm from "./NewSalesForm";
import PreviousSales from "./PreviousSales";
import ShipmentsOptions from "../shipments/ShipmentsOptions";

class SalesPage extends Component {

    state={
        currentElement:<SalesOptions onClickNewSale={()=>this.openNewSaleForm()}  onClickPreviousSales={()=>this.openPreviousSales()}/>
    };

    render(){
        return(this.state.currentElement);
    }

    openNewSaleForm() {
        this.setState({currentElement: <NewSaleForm onExit = {() => this.returnToSalesOptions()}/>})
    }

    returnToSalesOptions() {
        this.setState({currentElement: <SalesOptions onClickNewSale={()=>this.openNewSaleForm()}  onClickPreviousSales={()=>this.openPreviousSales()}/>} )
    }


    openPreviousSales() {
        this.setState({currentElement: <PreviousSales onExit = {() => this.returnToSalesOptions()}/>})
    }
}


export default SalesPage;
