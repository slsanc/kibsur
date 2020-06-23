import React, {Component} from 'react';
import NewStoreForm from "./NewStoreForm";

class LocationsPage extends Component {

    state = {
        storesList:[],
        isLoading: true,
        subFormOpen: false
    };

    render() {
        if(this.state.subFormOpen){
            return(
                <NewStoreForm onClickExit={()=>this.openCloseSubForm()} onRefreshList={()=>this.refreshList()}/>
            )
        }
        else{
            return (
                <div>
                    <button onClick={()=>this.openCloseSubForm()}>Create New Location</button>
                    <table>
                        {this.displayStores()}
                    </table>
                </div>
            );
        }

    }


    componentDidMount() {
        this.refreshList();
    }

    displayStores() {
        if(!this.state.isLoading){
            return(
                this.state.storesList.map(store =>
                    <tr>
                        <td>Store ID # {store.storeId}</td>
                        <td>{store.address}</td>
                        <td>{store.city}</td>
                        <td>{store.stateOrProvence}</td>
                        <td>{store.postalCode}</td>
                    </tr>
                )
            );
        }
    }

    openCloseSubForm() {
        this.setState(state=>{
            let newSubFormOpenValue = !this.state.subFormOpen;
            return({subFormOpen: newSubFormOpenValue});
        });
    }

    refreshList() {
        fetch('http://localhost:8080/api/stores/all')
            .then(response=>response.json())
            .then(data=>this.setState({storesList:data, isLoading:false}));
    }
}

export default LocationsPage;
