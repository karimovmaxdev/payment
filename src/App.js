import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";

import { postData } from "./serverAPI";
import { validate } from "./validate"


function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [date, setDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState('')

  const [errorNumber, setErrorNumber] = useState({error: false, helper: ''})
  const [errorDate, setErrorDate] = useState({error: false, helper: ''})
  const [errorCvv, setErrorCvv] = useState({error: false, helper: ''})
  const [errorAmount, setErrorAmount] = useState({ error: false, helper: '' })
  
  const haveErrors = !errorNumber.error && !errorDate.error && !errorCvv.error && !errorAmount.error
  const haveInputs = cardNumber.length > 0 && date.length > 0 && cvv.length > 0 && amount.length > 0
  const showButton = haveErrors && haveInputs


  function fieldChange(e) {
    const name = e.target.name
    const value = e.target.value
    const native = e.nativeEvent.data
 
    if (native === ' ' || isNaN(native)) {
      return
    }

    switch (name) {
      // card number
      case 'card':
        const isValidCardNumber = validate.cardNumber(value)

        if (isValidCardNumber) {
          setCardNumber(value)
          setErrorNumber({error: false, helper: ''})
          break
        }
        else {
          setCardNumber(value)
          setErrorNumber({ error: true, helper: 'Введите 16 символов' })
          break
        }
      
      // card date
      case 'date':
        const isValidDate = validate.expDate(value)
        if (isValidDate) {
          setErrorDate({error: false, helper: ''})
        }
        else {
          setErrorDate({error: true, helper: 'Не верно указан месяц или год'})
        }

        if (native === null) {
          setDate('')
          setErrorDate({error: false, helper: ''})
          return
        }

        if (date.length === 6) {
          setDate(prev => `${prev+native}`)
          return
        }

        if (date.length >= 2) {
          setDate(`${date.slice(0, 2)}/20${native}`)
          return
        }
        setDate(value)
        break
      
      // card CVV
      case 'cvv':
        const isValidCvv = validate.cvv(value)
        if (isValidCvv) {
          setCvv(value)
          setErrorCvv({error: false, helper: ''})
          break
        }
        else {
          setCvv(value)
          setErrorCvv({ error: true, helper: 'Введите 3 символа' })
          break
        }
      
      // amount
      case 'amount':
        const isValidAmount = validate.amount(value)
        if (isValidAmount) {
          setAmount(value)
          setErrorAmount({error: false, helper: ''})
          break
        }
        else {
          setAmount(value)
          setErrorAmount({ error: true, helper: 'Введите корректное значение' })
          break
        }
      
      default:
        break
    }
  }

  async function formSubmit() {
    setErrorNumber({ error: false, helper: '' })
    setErrorDate({ error: false, helper: '' })
    setErrorCvv({ error: false, helper: '' })
    setErrorAmount({ error: false, helper: '' })
    
    const submitObject = {
      cardNumber,
      expDate: date,
      cvv,
      amount
    }

    // делаем запрос на бэк
    const data = await postData(submitObject)
    console.log(data)

    // чистим форму
    setCardNumber('')
    setDate('')
    setCvv('')
    setAmount('')

  }

  return (
    <Box
      component="form"
      validate
      sx={{
        width: '230px',
        margin: 'auto',
        '& .MuiTextField-root': {
          m: 1,
          width: '25ch',
          display: 'block'
        },
        '& .MuiButton-root': {
          display: 'block',
          margin: 'auto'
        }
      }}
    >
      <TextField
        name="card"
        onChange={fieldChange}
        error={errorNumber.error}
        helperText={errorNumber.helper}
        required
        label="Card Number"
        value={cardNumber}
        inputProps={{maxLength: 16}}
      />

      <TextField
        name="date"
        value={date}
        onChange={fieldChange}
        required
        label="Expiration Date"
        inputProps={{ maxLength: 7 }}
        error={errorDate.error}
        helperText={errorDate.helper}
      />

      <TextField
        name="cvv"
        onChange={fieldChange}
        value={cvv}
        required
        label="CVV"
        inputProps={{ maxLength: 3 }}
        error={errorCvv.error}
        helperText={errorCvv.helper}
      />

      <TextField
        name="amount"
        onChange={fieldChange}
        value={amount}
        required
        label="Amount"
        error={errorAmount.error}
        helperText={errorAmount.helper}
      />

      <Button
        variant='contained'
        onClick={formSubmit}
        disabled={!showButton}
      >
        Оплатить
      </Button>
    </Box>
  );
} 

export default App;
