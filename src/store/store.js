import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "../feature/reducer/petsReducer"
import usersReducer from "../feature/reducer/usersReducer";
import whishlistReducer  from "../feature/reducer/whishlistReducer";
import cartReducer from "../feature/reducer/cartReducer";
import productsReducer from "../feature/reducer/productReducer";


const rootReducer={
    pets:petsReducer.reducer,
    users:usersReducer,
    whishlist: whishlistReducer.reducer,
    cart:cartReducer.reducer,
    products:productsReducer.reducer,

}

export const store= configureStore(
    {reducer:rootReducer}
)