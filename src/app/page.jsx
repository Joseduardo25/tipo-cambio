'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./connectdb/firebaseConfig";
import clsx from 'clsx';
import styles from './styles/ExchangeRate.module.scss';
import Image from 'next/image';
import circleArrow from '../../public/assets/images/circle-arrow.png';
import {
  setExchangeRate,
  setAmount,
  setResult,
  setIsDollarToSol,
  setIsDollarSelected,
} from '../redux/slice/slice.js';

const ExchangeRate = () => {
  const dispatch = useDispatch();
  const { exchangeRate, amount, result, isDollarToSol, isDollarSelected } = useSelector(state => state.exchangeRate);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const docRef = doc(db, "rates", "TDmXIypgLKKfNggHHSnw");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch(setExchangeRate({ purchase_price: data.buy, sale_price: data.sell }));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, [dispatch]);

  const handleAmountChange = (e) => {
    dispatch(setAmount(e.target.value));
  };

  const handleSwitch = () => {
    dispatch(setIsDollarToSol(!isDollarToSol));
    dispatch(setAmount(0));
    dispatch(setResult(0));
    dispatch(setIsDollarSelected(!isDollarSelected));
  };

  const calculateExchange = () => {
    if (isDollarToSol) {
      dispatch(setResult((amount * exchangeRate.purchase_price).toFixed(2)));
    } else {
      dispatch(setResult((amount / exchangeRate.sale_price).toFixed(2)));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1>El mejor <br /> tipo de cambio</h1>
        <p>para cambiar dólares y soles online en Perú</p>
      </div>
      <div className={styles.exchangeCard}>
        <div className={styles.rates}>
          <span className={clsx(styles.buyRate, { [styles.DollarSelected]: isDollarSelected })}>
            Dólar compra <br />
            <span className={styles.ratesNum}>
              {exchangeRate.sale_price.toFixed(4)}
            </span>
          </span>
          <span className={clsx(styles.buyRate, { [styles.DollarSelected]: !isDollarSelected })}>
            Dólar venta <br />
            <span className={styles.ratesNum}>
              {exchangeRate.purchase_price.toFixed(4)}
            </span>
          </span>
        </div>
        <div className={styles.exchangeForm}>
          <div className={styles.amountBox}>
            <span>{isDollarToSol ? 'Dólares' : 'Soles'}</span>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder={`Ingresa ${isDollarToSol ? 'dólares' : 'soles'}`}
            />
          </div>
          <Image
            onClick={handleSwitch}
            src={circleArrow}
            alt='circle-arrow'
            width={42}
            height={42}
            className={styles.exchangeIcon}
          />
          <div className={styles.amountBox}>
            <span>{isDollarToSol ? 'Soles' : 'Dólares'}</span>
            <span>{result ? (isDollarToSol ? `S/ ${result}` : `$ ${result}`) : '0'}</span>
          </div>
        </div>
        <button onClick={calculateExchange} className={styles.startButton}>Iniciar operación</button>
      </div>
    </div>
  );
};

export default ExchangeRate;
