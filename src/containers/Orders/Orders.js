import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler//withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (const key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        const order = response.data[key];
                        fetchedOrders.push({
                            ...order,
                            id: key
                        });
                    }
                }
                console.log(response.data);
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                })}

            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);