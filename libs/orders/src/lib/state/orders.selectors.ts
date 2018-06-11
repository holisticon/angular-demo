import { OrdersAppState } from './orders.reducer';

export function getOrders() {
    return (state: OrdersAppState) => state.orders.orders;
}
