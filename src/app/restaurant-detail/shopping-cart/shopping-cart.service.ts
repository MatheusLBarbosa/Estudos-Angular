import { CartItem } from "./cart-item.module"
import { MenuItem } from "../menu-item/menu-item.model"

export class ShoppingCartService {
    items: CartItem[] = []

    clear() {
        this.items.pop()
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((menuItem) => menuItem.menuItem.id === item.id)
        if (foundItem) {
            this.increaseQtd(foundItem);
        } else {
            this.items.push(new CartItem(item));
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items.map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }

    increaseQtd(item: CartItem) {
        item.quantity += 1;
    }

    decreaseQtd(item: CartItem) {
        item.quantity -= 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    }


}