import React, { useEffect, useState, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        changeToCurRates(1);
      });
  }, []);

  const changeFromCurRates = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToValue(result.toFixed(3));
    setFromValue(value);
  };

  const changeToCurRates = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromValue(result.toFixed(3));
    setToValue(value);
  };

  useEffect(() => {
    changeFromCurRates(fromValue);
  }, [fromCurrency]);

  useEffect(() => {
    changeToCurRates(toValue);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromValue}
        onChangeValue={changeFromCurRates}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toValue}
        onChangeValue={changeToCurRates}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
