import React, {Component} from 'react';

class CategorySelector extends Component {

    state = {
        listOfAllCategories:[],
        loading: true,
        selectedCategory: 1
    };

    render() {
        return (
            <div>
                <h4 style={{display: 'inline'}}>{this.props.message}</h4>
                <select name={'categoryId'} style={{display: 'inline', width: '20%', marginLeft:'1%', marginRight:'1%', backgroundColor:'white'}} onChange={this.props.passesCategoryToParent ? event=>this.props.handleChangeSelection(event) : this.handleChangeSelection.bind(this)}>
                    {this.displayOptions()}
                </select>
                <button onClick={()=>this.props.onClickButton(this.state.selectedCategory)}><img src={this.props.buttonImage}/></button>
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

    handleChangeSelection(event){
        event.persist();
        this.setState({selectedCategory: Number(event.target.value)});
    }
}

export default CategorySelector;
