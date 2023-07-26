import React, { useRef, useState } from 'react';
import './Checkout.css';

const isEmpty = (value) => value.trim() === '';
const isPostal = (value) => value.trim().length !== 5;

function Checkout(props) {
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const adressInputRef = useRef();
  const postalInputRef = useRef();

  const [formInputValidation, setFormInputValidation] = useState({
    name: true,
    city: true,
    adress: true,
    postalCode: true,
  });

  const confirmHandler = (e) => {
    e.preventDefault();

    const userName = nameInputRef.current.value;
    const userCity = cityInputRef.current.value;
    const userAdress = adressInputRef.current.value;
    const userPostal = postalInputRef.current.value;

    const userNameIsValid = !isEmpty(userName);
    const userCityIsValid = !isEmpty(userCity);
    const userAdressIsValid = !isEmpty(userAdress);
    const userPostalIsValid = !isPostal(userPostal);

    setFormInputValidation({
      name: userNameIsValid,
      city: userCityIsValid,
      adress: userAdressIsValid,
      postalCode: userPostalIsValid,
    });

    const formIsValid =
      userNameIsValid &&
      userCityIsValid &&
      userAdressIsValid &&
      userPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: userName,
      city: userCity,
      adress: userAdress,
      postalCode: userPostal,
    });
  };

  return (
    <form onSubmit={confirmHandler} className="form-order">
      <div
        className={`control-order ${formInputValidation.name ? '' : 'invalid'}`}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidation.name && (
          <p className="error">Please enter a valid name</p>
        )}
      </div>
      <div
        className={`control-order ${formInputValidation.city ? '' : 'invalid'}`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidation.city && (
          <p className="error">Please enter a valid city</p>
        )}
      </div>
      <div
        className={`control-order ${
          formInputValidation.adress ? '' : 'invalid'
        }`}
      >
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={adressInputRef} />
        {!formInputValidation.adress && (
          <p className="error">Please enter a valid adress</p>
        )}
      </div>
      <div
        className={`control-order ${
          formInputValidation.postalCode ? '' : 'invalid'
        }`}
      >
        <label htmlFor="post-code">Postal Code</label>
        <input type="text" id="post-code" ref={postalInputRef} />
        {!formInputValidation.postalCode && (
          <p className="error">
            Please enter a valid postal code (5 char long)
          </p>
        )}
      </div>
      <div className="actions-order">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
}
export default Checkout;
