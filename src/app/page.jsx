'use client'
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./connectdb/firebaseConfig";
import clsx from 'clsx';
import styles from './styles/ExchangeRate.module.scss';
import Image from 'next/image';
import circleArrow from '../../public/assets/images/circle-arrow.png'


const ExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState({ purchase_price: 3.760, sale_price: 3.774 });
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [isDollarToSol, setIsDollarToSol] = useState(true);
  const [isDollarSelected, setIsDollarSelected] = useState(true);


  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const docRef = doc(db, "rates", "TDmXIypgLKKfNggHHSnw");
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          const data = docSnap.data();
          setExchangeRate({ purchase_price: data.buy, sale_price: data.sell });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSwitch = () => {
    setIsDollarToSol(!isDollarToSol);
    setAmount(0);
    setResult(0);
    setIsDollarSelected(!isDollarSelected)
  };

  const calculateExchange = () => {
    if (isDollarToSol) {
      setResult((amount * exchangeRate.purchase_price).toFixed(2));
    } else {
      setResult((amount / exchangeRate.sale_price).toFixed(2));
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
              {exchangeRate.purchase_price.toFixed(4)}
            </span>
          </span>
          <span className={clsx(styles.buyRate, { [styles.DollarSelected]: !isDollarSelected })}>
            Dólar venta <br />
            <span className={styles.ratesNum}>
              {exchangeRate.sale_price.toFixed(4)}
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
