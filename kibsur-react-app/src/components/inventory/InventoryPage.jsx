import React, {Component} from 'react';
import InventoryOptions from "./InventoryOptions";
import InventoryBrowser from "./InventoryBrowser";

class InventoryPage extends Component{

    state={
        currentElement: <InventoryOptions onChooseStore={(storeId)=>this.chooseStore(storeId)}/>
    };

    render() {
        return(this.state.currentElement);
    }

    chooseStore(storeId) {
        this.setState({currentElement:<InventoryBrowser storeId={storeId} onExit={()=>this.returnToInventoryOptions()}/>});
    }

    returnToInventoryOptions() {
        this.setState({currentElement:<InventoryOptions onChooseStore={(storeId)=>this.chooseStore(storeId)}/>});
    }
}

export default InventoryPage