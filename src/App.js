import React, { useEffect, useState, useRef } from 'react';
import { Block } from './Block';
import './index.scss';
import arrows from './assets/arrows.svg';

function App() {
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  //   const [changeBlock, setChangeBlock] = useState(false);

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        changeFromCurRates(1);
      });
  }, []);

  const handleChangeBlock = () => {
    const fromCur = fromCurrency;
    const fromVal = fromValue;
    setFromCurrency(toCurrency);
    setToCurrency(fromCur);
    setFromValue(toValue);
    setToValue(fromVal);
  };

  const changeFromCurRates = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToValue(result.toFixed(3));
    setFromValue(value);
  };

  const changeToCurRates = (value) => {
    const result = (ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) * value;
    setToValue(result.toFixed(3));
  };

  useEffect(() => {
    changeFromCurRates(fromValue);
  }, [fromCurrency]);

  useEffect(() => {
    changeToCurRates(fromValue);
  }, [toCurrency]);

  return (
    <div className="App">
      <div className="content">
        <Block
          value={fromValue}
          onChangeValue={changeFromCurRates}
          currency={fromCurrency}
          onChangeCurrency={setFromCurrency}
        />
        <button className="btn" onClick={() => handleChangeBlock()}>
          <img src={arrows} alt=""></img>
        </button>
        <Block
          value={toValue}
          onChangeValue={changeToCurRates}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
