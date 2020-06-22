import React, {Component} from 'react';

class StoreSelector extends Component {

    state = {
        isLoading: true,
        storesList: {}
    };

    render() {
        if(this.state.isLoading){
            return(
                <div>
                <h1 style={{display:'inline'}}>{this.props.message}</h1>
                <select><option>Loading</option></select>
                </div>
            );
        }
        else{
            return(
                <div>
                <h1 style={{display:'inline'}}>{this.props.message}</h1>
                <select name={'currentStoreId'} style={{display:'inline', width:'min-content'}} onChange={(event)=>this.props.onChangeStore(event)}>
                    {this.showOptionForAll()}
                    {this.state.storesList.map(store=><option value={store.storeId}>{store.address} {store.city} {store.stateOrProvence}</option>)}
                </select>
                </div>
            )
        }
    }


    async componentDidMount() {
        await fetch('http://localhost:8080/api/stores/all')
            .then(response => response.json())
            .then(data => this.setState({storesList:data}));

        this.setState({isLoading: false});
    }

    showOptionForAll() {
        if(this.props.showOptionForAll){
            return(<option value={'all'}>all stores</option>);
        }
    }
}

export default StoreSelector;
