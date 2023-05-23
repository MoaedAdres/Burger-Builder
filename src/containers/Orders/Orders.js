import React, { Component } from "react"
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken,this.props.userId)
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading){
            orders=this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken:state.auth.idToken,
        userId:state.auth.userId

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (idToken,userId) => dispatch(actions.fetchOrder(idToken,userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders) 