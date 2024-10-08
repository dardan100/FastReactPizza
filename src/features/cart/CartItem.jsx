import DeleteItem from '../cart/DeleteItem'
import { formatCurrency } from '../../utils/helpers'
import UpdateItemQuantity from './UpdateItemQuantity'
import { getCurrentQuantityById } from './cartSlice'
import { useSelector } from 'react-redux'

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

    return (
        <li className="items-center justify-between py-3 sm:flex">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQuantity
                    pizzaId={pizzaId}
                    currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={pizzaId} />
            </div>
        </li>
    )
}

export default CartItem
