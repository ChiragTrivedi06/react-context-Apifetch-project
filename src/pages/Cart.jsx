import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { cartContext } from "../CartContext/MainContext";

export default function Cart() {
  let { carts, setCarts } = useContext(cartContext);
  console.log(carts)


  const [finalAmount, setFinalAmount] = useState();

  // Update the final amount whenever the cart items change
  useEffect(() => {
    // Calculate the sum of total amounts of all cart items
    // const totalAmount = carts.reduce((acc, cartItem) => {
    //   return acc + cartItem.price * cartItem.qty;
    // }, 0);
    let finalAmount = 0;
    carts.forEach(cartItem => {
      finalAmount += cartItem.price * cartItem.qty;
    });

    setFinalAmount(finalAmount);
  }, [carts]);

  return (
    <div>
      <Header />
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Cart Items</h2>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product Image / Name
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      QTY.
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cartItem, index) => {
                    {/* console.log(cartItem) */}
                    return <CartList index={index} cartItem={cartItem} />;
                  })}
                </tbody>
              </table>
            </div>

            <div className=" flex justify-end mt-3">
              <table>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    final Amount
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${finalAmount}
                  </th>
                </tr>

                <tr className="m-5">
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tax Amount
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${.18*finalAmount}
                  </th>
                </tr>

                <tr className="mt-2">
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${1.18*finalAmount}
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartList({ cartItem, index }) {
  let { carts, setCarts } = useContext(cartContext);
  let removeData = () => {
    let filterData = carts.filter((v, i) => index !== i);
    setCarts(filterData);
  };

  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div class="flex">
          <div class="flex-shrink-0 w-10 h-10">
            <img
              class="w-full h-full rounded-13"
              src={cartItem.image}
              alt=""
            />
          </div>
          <div class="ml-3">
            <p class="text-gray-900 whitespace-no-wrap">{cartItem.title}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap">${cartItem.price}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* <input
          value={cartItem.qty}
          type="number"
          className="border border-red-700"
        /> */}
        <input
          value={cartItem.qty}
          type="number"
          className="border border-red-700"
          onChange={(e) => {
            const newQty = parseInt(e.target.value);
            if (!isNaN(newQty)) {
              // Check if the input is a valid number
              if (newQty < 1) {
                // If the new quantity is 1, do nothing
                return;
              }
              // Otherwise, update the quantity
              setCarts((prevCarts) => {
                const updatedCarts = [...prevCarts];
                updatedCarts[index].qty = newQty;
                return updatedCarts;
              });
            }
          }}
        />
      </td>

      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span>{cartItem.price * cartItem.qty}</span>
      </td>

      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={removeData}
          className="btn px-4 py-2 bg-blue-400 text-white rounded"
        >
          Remove Item
        </button>
      </td>
    </tr>
  );
}
