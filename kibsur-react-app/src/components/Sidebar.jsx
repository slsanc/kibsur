import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ProductsList from "./ProductsList";

class Sidebar extends Component{

    state={
        expanded: false
    }

    render(){
        return(
            <td style={{backgroundColor:'#0366ee', textAlign:'center', padding:10,
                width: '5%', whiteSpace: "nowrap", color: 'white', fontSize: 20}}>
                <button style={{fontSize:30}} onClick={()=>this.expandMenu()}>☰</button>
                {this.state.expanded &&
                    <div>
                        <div></div>
                        <br/>
                        <button>🏬 Check a Store's Inventory</button>
                        <br/>
                        <button onClick={() => this.props.onClickSidebar(<ProductsList/>)}>📦 See All Products</button>
                        <br/>
                        <button>🚚 Record New Shipment</button>
                    </div>
                }
            </td>
        );
    }

    expandMenu() {
        this.setState(state => {
            let newExpandedValue = !this.state.expanded;
            return({
                expanded: newExpandedValue
            });
        })
    }

    changePage(input){
        ReactDOM.render(
            input , document.getElementById("contentDisplay")
        )
    }
}



export default Sidebar;