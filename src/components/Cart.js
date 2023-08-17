import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";
import Checkout from "./Checkout";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  if(!cartData) return;

  const newCart =cartData.map((item)=> ({
    ...item,
    ...productsData.find((product) => item.productId === product._id)
  }));

  return newCart;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  return items.reduce((acc , curr)=>{
    let value = curr.cost * curr.qty;
    return acc + value;
  },0);
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  isReadOnly = false
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
//   CHECKOUT PAGE DETAIL VIEW OF ITEMS IN CART 
const getTotalItems =(details) => {
  return details.length;
}

const OderDetailView = ({details = []}) =>{
  //console.log(details);
  return (
    <Box className="cart">
      <Box display="flex" flexDirection="column" padding="1rem">
        <h2>Order Details</h2>
        {/* <Typography>{Details.name}</Typography> */}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <p>Products</p>
            <p>Sub-Total</p>
            <p>Shipping Charges</p>
            <h4>Total</h4>
          </Box>
          <Box>
            <p>{getTotalItems(details)}</p>
            <p>${getTotalCartValue(details)}</p>
            <p>$0</p>
            <h4>${getTotalCartValue(details)}</h4>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

const Cart = ({
  products,
  items = [],
  handleQuantity,
  isReadOnly = false
}) => {
  const history = useHistory();
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {items.map((item)=>(
          <Box key={item.productId} display="flex" alignItems="flex-start" padding="1rem">
            <Box className="image-container">
              <img src={item.image} alt={item.image} width="100%" height="100%" />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="6rem" padding="1rem">
              <Stack>
                {item.name}
              </Stack>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {isReadOnly ?(
                  <Box style={{ fontSize: "1rem" }}> Qty:{item.qty}</Box>
                ) :(
                <ItemQuantity
                  value={item.qty}
                  handleAdd={()=>handleQuantity(item.productId , item.qty + 1)}
                  handleDelete={()=> handleQuantity(item.productId , item.qty - 1)}
                />)}
                <Box> ${item.cost}</Box>
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>
        {isReadOnly ? null :(
        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={()=> history.push("/checkout")}
          >
            Checkout
          </Button>
        </Box>)}
      </Box>
      {isReadOnly ? <OderDetailView details={items} /> : null}
    </>
  );
};

export default Cart;
