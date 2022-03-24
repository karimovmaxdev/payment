import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";

function formValidate(obj) {
  const message = { status: true }
  const errors = {
    cardNumberError: obj.cardNumber.length === 16,
    dateError: obj.date.length === 7,
    cvvError: obj.cvv.length === 3,
    amountError: obj.amount > 0
  }
  
  for (const [key, value] of Object.entries(errors)) {
    if (!value) {
      message.status = false
      message[key] = 'error'
    }
  }

  return message
}

function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [date, setDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState('')

  const [errorNumber, setErrorNumber] = useState({error: false, helper: ''})
  const [errorDate, setErrorDate] = useState({error: false, helper: ''})
  const [errorCvv, setErrorCvv] = useState({error: false, helper: ''})
  const [errorAmount, setErrorAmount] = useState({error: false, helper: ''})


  function fieldChange(e) {
    const name = e.target.name
    const value = e.target.value
    const native = e.nativeEvent.data
 
    if (native === ' ') {
      return
    }

    switch (name) {
      // card number
      case 'card':
        if (isNaN(native)) return
        setCardNumber(value)
        break
      
      // card date
      case 'date':
        if (native === null) {
          setDate('')
          return
        }

        if (isNaN(native)) return

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
        if (isNaN(native)) return
        setCvv(value)
        break
      
      // amount
      case 'amount':
        if (isNaN(native)) return
        setAmount(value)
        break
    }
  }

  function formSubmit() {
    setErrorNumber({ error: false, helper: '' })
    setErrorDate({ error: false, helper: '' })
    setErrorCvv({ error: false, helper: '' })
    setErrorAmount({ error: false, helper: '' })
    
    const submitObject = {
      cardNumber,
      date,
      cvv,
      amount
    }

    const message = formValidate(submitObject)
    // показываем ошибки, если валидация не прошла
    if (!message.status) {
      const errorsKeys = Object.keys(message)
      errorsKeys.forEach(item => {
        if (item === 'cardNumberError') {
          setErrorNumber({ error: true, helper: 'Введите корректное значение' })
        }

        if (item === 'dateError') {
          setErrorDate({error: true, helper: 'Введите корректное значение'})
        }

        if (item === 'cvvError') {
          setErrorCvv({error: true, helper: 'Введите корректное значение'})
        }

        if (item === 'amountError') {
          setErrorAmount({error: true, helper: 'Введите корректное значение'})
        }
      })
      return
    }

    // делаем запрос на бэк
    // zapros

    // чистим форму
    setCardNumber('')
    setDate('')
    setCvv('')
    setAmount('')

  }

  const buttonDisable = cardNumber && date && cvv & amount
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
        disabled={!buttonDisable}
      >
        Оплатить
      </Button>
    </Box>
  );
} 

export default App;
