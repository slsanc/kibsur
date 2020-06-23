import React, {Component} from "react";

class SalesPlusButton extends Component{

    render(){
        return(
            <div>
                <button onClick={() => this.props.onClickOpenForm()}>+ Record Additional Sale For This Day</button>
            </div>
        );
    }

}

export default SalesPlusButton;