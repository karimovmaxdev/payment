export function formValidate(obj) {
  const message = { status: true }
  const monthInt = Number(obj.expDate.slice(0, 2))
  const monthChecker = monthInt <= 12 && monthInt > 0

  const errors = {
    cardNumberError: obj.cardNumber.length === 16,
    dateError: obj.expDate.length === 7 && monthChecker,
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