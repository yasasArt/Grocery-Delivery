import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContex';

// Dummy orders data
const dummyOrders = [
  {
    id: 1,
    items: [
      {
        product: {
          name: " carrot",
          image: "/public/carrot.jpeg"
        },
        quantity: 2,
        price: 12.99
      },
      {
        product: {
          name: " potato",
          image: "/public/potato.jpeg"
        },
        quantity: 1,
        price: 4.99
      }
    ],
    address: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipcode: "10001",
      country: "USA",
      phone: "(555) 123-4567"
    },
    amount: 27.97,
    paymentType: "Credit Card",
    createAt: "2023-05-15T10:30:00Z",
    isPaid: true,
    status: "Delivered"
  },
  {
    id: 2,
    items: [
      {
        product: {
          name: " Milk",
          image: "/public/milk.jpeg"
        },
        quantity: 3,
        price: 3.49
      }
    ],
    address: {
      firstName: "Jane",
      lastName: "Smith",
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipcode: "90001",
      country: "USA",
      phone: "(555) 987-6543"
    },
    amount: 10.47,
    paymentType: "PayPal",
    createAt: "2023-05-16T14:45:00Z",
    isPaid: true,
    status: "Shipped"
  }
];

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(dummyOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div 
              key={order.id} 
              className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              <div className="flex gap-5 max-w-80">
                <div className="flex flex-col gap-2">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <img 
                        className="w-12 h-12 object-cover rounded" 
                        src={item.product.image} 
                        alt={item.product.name} 
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">
                          {item.product.name}
                          <span className="text-green-500 ml-2">x {item.quantity}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {currency}{item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className='text-black/80 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                <p>{order.address.country}</p>
                <p className="mt-1">{order.address.phone}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-medium text-lg">
                  {currency}{order.amount.toFixed(2)}
                </p>
                <p className={`text-sm mt-1 ${
                  order.status === "Delivered" ? "text-green-500" : 
                  order.status === "Shipped" ? "text-green-500" : "text-yellow-500"
                }`}>
                  {order.status}
                </p>
              </div>

              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createAt).toLocaleDateString()}</p>
                <p className={order.isPaid ? "text-green-500" : "text-yellow-500"}>
                  Payment: {order.isPaid ? "Paid" : "Pending"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;