import React, {Component} from 'react';

class MoveCategoriesButton extends Component {

    state = {
        listOfAllCategories:[],
        loading: true,
        destination: 1
    };

    render() {
        return (
            <div>
                <h4 style={{display: 'inline'}}>Move Selected To Category:</h4>
                <select style={{display: 'inline', width: '20%', marginLeft:'1%', marginRight:'1%',}} onChange={this.handleChangeDestination.bind(this)}>
                    {this.displayOptions()}
                </select>
                <button onClick={()=>this.props.onClickMoveButton(this.state.destination)}>Move</button>
            </div>
        );
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/categories')
            .then(response => response.json())
            .then(data => this.setState({listOfAllCategories: data, loading:false}));
    }

    displayOptions() {
        if(this.state.loading){
            return(<option>Loading Options</option>);
        }
        else{
            return(
            this.state.listOfAllCategories.map(category => <option value={category.categoryId}>{category.categoryName}</option>))
        }
    }

    handleChangeDestination(event){
        event.persist();
        this.setState({destination: Number(event.target.value)});
    }
}

export default MoveCategoriesButton;
