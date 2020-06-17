import React, {Component} from 'react';

class ProductsList extends Component{
    state={
        productsList:[],
        categoriesList:[],
        isLoading: true
    };

    render(){
        return(
            <div>
                <button onClick={()=>this.props.onExit()}>x</button>
                <h1>Inventory for Store {this.props.storeId}:</h1>
                <br/>
                {this.displayProducts()}
            </div>
        );
    }

    displayProducts() {

        if(this.state.isLoading){
            return(<h2>Loading...</h2>)
        }
        else {
            if ((this.state.productsList.length > 0) || (this.state.categoriesList.length > 0)) {
                return (
                    <table className={"striped-table"}>
                        {this.state.categoriesList.map(category => <tr>
                            <td></td>
                            <td>category.categoryName</td>
                            <td colSpan={2}></td>
                        </tr>)}
                        {this.state.productsList.map(product => <tr>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>(quantity here later)</td>
                        </tr>)}
                    </table>
                );
            } else {
                return (<h2>No Items or Categories to Display</h2>);
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/allproducts')
            .then(response => response.json())
            .then(data => this.setState({productsList: data}));

        this.setState({isLoading: false});
    }

}

export default ProductsList;