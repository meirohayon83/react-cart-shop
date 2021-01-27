import React , { useEffect, useState }from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {listOrders , deliverOrder , adminListOrders} from '../actions/orderActions';
import './OrdersMine.css';

function OrdersMine(props) {

    const  orderMineList = useSelector((state) => state.orderMineList)
    const {loading ,error ,orders} = orderMineList;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {loading:loadingDeliver, error:errorDeliver, access} = orderDeliver;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();
   
    useEffect(() => {
        // show user order
        if(!userInfo.isAdmin){
            dispatch(listOrders())
        }else {
        //  show admin orders
           dispatch(adminListOrders())
        }
          
    }, [dispatch ])


    return (
      <div>
        <h1>Order History</h1>
        {/* show box with information of all orders if paid and if delivered */}
          {orders && userInfo.isAdmin &&
          <div className = "ordersInfo">
        
            <h3>you have already {orders.filter(x => x.paidAt !== undefined).length} pay from {orders.filter(x => x.paidAt === undefined + x.paidAt !== undefined ).length}  orders 
              and still have {orders.filter(x => (x.paidAt === undefined + x.paidAt !== undefined) - (x.paidAt !== undefined) ).length} order
              without paid
            </h3>
            <h3>you sent {orders.filter(x => x.deliveredAt !== undefined).length} orders 
                to {orders.filter(x => x.paidAt !== undefined).length} paying  </h3>
          </div>
        }
        <div>
           {loading  && <div>Loading...</div>} {error  && <div>{error}</div>}
        </div> 
         
         <h2>orders with pay</h2>
         {/* table with order paid information  */}
             {orders  && 
             <table className="table">
              <thead>
                <tr>
                 <th>ID</th>
                 <th>DATE</th>
                 <th>TOTAL</th>
                 <th>PAID</th>
                 <th>DELIVERED</th>
                 <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                    {orders.map(order => order.paidAt !== undefined &&
                      <tr key={order._id}>
                         <td>{order._id}</td> 
                         <td>{order.createdAt.substring(0 , 10)}</td>
                         <td>${order.totalPrice}</td>
                         <td>{order.isPaid ? order.paidAt.substring(0 , 10) : 'NO'}</td>
                           {order.isPaid  ? (
                         <td>
                           {!order.isDelivered  ?
                          //  button to deliver if not delivered
                           (userInfo.isAdmin ? (
                            <button type="button" className="small" onClick={() => (
                            dispatch(deliverOrder(order._id)) ,alert('on the way'), setTimeout(() => {
                              dispatch(adminListOrders())
                            }, 2000) )}>Deliver</button>):<> NO </>
                          ):
                          // if delivered show time
                           order.deliveredAt.substring(0 , 10) }
                         </td>
                         ): <td>NO </td>}
                         
                         <td>
                         {/* to go to page of order id with information and possibility to pay if not paid */}
                           <button
                              type="button" 
                              className="small" 
                              onClick={() => props.history.push(`/order/${order._id}`)}
                            >
                             Details
                           </button>
                         </td>
                      </tr>
                    )}       
               </tbody>
             </table>
            }
             {/* table information with no paid order */}
           <div className = "noPaid">
              <h2>orders without pay</h2>
             {orders && 

                <table className="table">
              <thead>
                <tr>
                 <th>ID</th>
                 <th>DATE</th>
                 <th>TOTAL</th>
                 <th>PAID</th>
                 <th>DELIVERED</th>
                 <th>ACTIONS</th>
                </tr>
              </thead>
               <tbody>
                    {orders.map(order => order.paidAt === undefined &&
                      <tr key={order._id}>

                         <td>{order._id}</td> 
                         <td>{order.createdAt.substring(0 , 10)}</td>
                         <td>${order.totalPrice}</td>
                         <td> NO</td>
                         <td> NO</td>
                         
                         <td>
                           <button
                              type="button" 
                              className="small" 
                              onClick={() => props.history.push(`/order/${order._id}`)}
                             >
                              Details
                           </button>
                         </td>
                      </tr>
                    )}       
               </tbody>
             </table>
           }
      </div>
     </div>
    );
   }

  export default OrdersMine;