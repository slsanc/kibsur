import React, {Component} from 'react';
import ShipmentsOptions from "./ShipmentsOptions";
import NewShipmentForm from "./NewShipmentForm";

class ShipmentsPage extends Component {

    state={
        currentElement:<ShipmentsOptions onClickNewShipment={()=>this.openNewShipmentForm()}/>
    };

    render(){
        return(this.state.currentElement);
    }

    openNewShipmentForm() {
        this.setState({currentElement: <NewShipmentForm onExit = {() => this.returnToShipmentsOptions()}/>})
    }

    returnToShipmentsOptions() {
        this.setState({currentElement: <ShipmentsOptions onClickNewShipment={()=>this.openNewShipmentForm()}/>})
    }
}


export default ShipmentsPage;
