import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';

import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, X } from 'lucide-react';
function Cart() {

    const {cartItems,removeFromCart,clearCart}=useContext(CartContext);
    const{user}=useContext(AuthContext);
    const [showModal,setShowModal]=useState(false);


    const totalAmount= cartItems.reduce((acc,course)=>acc+course.price,0)

    const handelBuy=async()=>
    {
        if(cartItems.length===0)
        {
            alert("Your cart is empty. Add some courses first")
            setShowModal(false);
            return;
        }
        try {
            for(const course of cartItems)
            {
                await axios.post("https://edunexusbackend-v2-production.up.railway.app/api/enrollments/enroll",{
                    userId:user.id,
                    courseId:course.id
                },{withCredentials:true});


            }
            alert("Purchase Sucessful!");
            clearCart();
            setShowModal(false);
        
        } catch (error) {
            alert("Purchase Failed")
            console.error(error)
        }
    }


  return (

    <>
      <div className="container mt-2 mb-8">
      <div className="row  d-flex align-items-center justify-content-center vh-100">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">
                <ShoppingCart className="me-2" size={24} />
                Your Cart
              </h3>
              <span className="badge bg-light text-primary">{cartItems.length} items</span>
            </div>
            <div className="card-body">
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <ShoppingCart size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">Your cart is empty</h5>
                </div>
              ) : (
                <div className="list-group">
                  {cartItems.map((course) => (
                    <div key={course.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="mb-0">{course.courseName}</h6>
                         
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h5 mb-0 me-3">{course.price}</span>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(course.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-muted">Total:</span>
                  <span className="h4 mb-0 ms-2">{totalAmount.toFixed(2)}</span>
                </div>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
      Buy Now
    </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>

    
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Purchase</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to enroll in all selected courses?</p>
                <div className="alert alert-info">
                  <strong>Total Amount:</strong> {totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handelBuy}>
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
    </>
    
  )
}

export default Cart
