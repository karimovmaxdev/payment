export function formValidate(obj) {
  const message = { status: true }
  const errors = {
    cardNumberError: obj.cardNumber.length === 16,
    dateError: obj.expDate.length === 7,
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