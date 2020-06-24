import React, {Component} from 'react';
import ShipmentsOptions from "./ShipmentsOptions";
import NewShipmentForm from "./NewShipmentForm";
import PreviousSales from "../sales/PreviousSales";
import SalesOptions from "../sales/SalesOptions";
import PreviousShipments from "./PreviousShipments";

class ShipmentsPage extends Component {

    state={
        currentElement:<ShipmentsOptions onClickNewShipment={()=>this.openNewShipmentForm()}  onClickPreviousShipments={()=>this.openPreviousShipments()}/>
    };

    render(){
        return(this.state.currentElement);
    }

    openNewShipmentForm() {
        this.setState({currentElement: <NewShipmentForm onExit = {() => this.returnToShipmentsOptions()}/>})
    }

    returnToShipmentsOptions() {
        this.setState({currentElement: <ShipmentsOptions onClickNewShipment={()=>this.openNewShipmentForm()}  onClickPreviousShipments={()=>this.openPreviousShipments()}/>})
    }


    openPreviousShipments() {
        this.setState({currentElement: <PreviousShipments onExit = {() => this.returnToShipmentsOptions()}/>})
    }

}


export default ShipmentsPage;
