import React, {Component} from 'react';
import InventoryOptions from "./InventoryOptions";
import ProductsList from "./ProductsList";

class InventoryPage extends Component{

    state={
        currentElement: <InventoryOptions onChooseStore={(storeId)=>this.chooseStore(storeId)}/>
    };

    render() {
        return(this.state.currentElement);
    }

    chooseStore(storeId) {
        this.setState({currentElement:<ProductsList storeId={storeId} onExit={()=>this.returnToInventoryOptions()}/>});
    }

    returnToInventoryOptions() {
        this.setState({currentElement:<InventoryOptions onChooseStore={(storeId)=>this.chooseStore(storeId)}/>});
    }
}

export default InventoryPage