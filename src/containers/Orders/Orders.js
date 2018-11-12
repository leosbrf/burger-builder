import React, { Component } from 'react'
import { connect } from "react-redux"
import Order from '../../components/Order/Order'
import Spinner from "../../components/UI/Spinner/Spinner"
import { fetchOrdersRequested } from "../../state/ducks/order/actions"

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.userId);
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
    loading: state.order.loading,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userId) => dispatch(fetchOrdersRequested(userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);