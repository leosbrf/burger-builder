import React, { Component } from 'react';
import { connect } from "react-redux";
import Order from '../../components/Order/Order';
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const { orders, loading } = this.props;

        let ordersRendered = <Spinner />

        if (!loading) {
            ordersRendered = (
                <div>
                    {orders.map(order => {
                        return <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price} />
                    })}

                </div>
            )
        }

        return ordersRendered;
    }
}

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loading: state.order.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);