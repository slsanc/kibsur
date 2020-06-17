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
                    <button onClick={() => this.props.onClickOpenForm("ProductSearchForm")}>
                        The Store Has Sold This Product Before
                    </button>
                    <br/>
                    <button onClick={() => this.props.onClickOpenForm("NewProductTypeForm")}>
                        This is a New Product
                    </button>
                </div>
                }
                <button onClick={() => this.expandButton()}>+ Record Additional Product in Shipment</button>
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