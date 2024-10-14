import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartAddress.module.css";
import { deleteDelivery, getAddress, setDelivery } from "../../../Redux/userAction";
const CartAddress = () => {
  const { user, deliveryAddress } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <div className={styles.addressContainer}>
      {deliveryAddress ? (
        <>
          <div className={styles.deliveryinfo}>
            <span>Delivery Address</span>
            <span onClick={()=>dispatch(deleteDelivery())}>CHANGE</span>
          </div>
          <div className={styles.deliveryAddress}>
            <span>{deliveryAddress.data.addressName}</span>
            <span>{deliveryAddress.data.address}</span>
            <span>{deliveryAddress.time} Minutes</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.info}>
            <span>Select Delivery address</span>
            <span>You have a saved address in this location</span>
          </div>
          <div className={styles.addresses}>
            {user && user.address && user.address.length > 0
              ? user.address.map((data, index) => {
                const time = Math.floor(Math.random() * 10 + 25);
                  return (
                    <div className={styles.addressBox}>
                      <div>
                        <span>{data.addressName}</span>
                        <span>{data.address}</span>
                      </div>
                      <div>
                        <span>
                          {time} Minutes
                        </span>
                        <button onClick={() => dispatch(setDelivery(data, time))}>
                          Deliver here
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
            <div className={styles.addressBox}>
              <div>
                <span>Add new address</span>
              </div>
              <div>
                <button onClick={()=>dispatch(getAddress())}>Add New</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartAddress;
