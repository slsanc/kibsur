import React, {Component} from "react";

class PlusButton extends Component{
    state={
        expanded: false
    }

    render(){
        return(
            <div>
                {this.state.expanded &&
                <div>
                    <button onClick={() => this.props.onClickOpenForm("NewProductTypeForm")}>
                    This is a New Product
                    </button>
                    <br/>
                    <button onClick={() => this.props.onClickOpenForm("InventoryBrowser")}>
                        This product exists in the database already.
                    </button>
                </div>
                }
                <button onClick={() => this.expandButton()}>+ Record Additional Shipment For This Day</button>
            </div>
        );
    }

    expandButton(){
        this.setState((state) => {
            let updatedExpandedValue = !this.state.expanded;
            return {expanded: updatedExpandedValue};
        });
    }



}

export default PlusButton;