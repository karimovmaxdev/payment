export const validate = {
  cardNumber(data) {
    const isValid = data.length === 16
    return isValid
  },

  expDate(data) {
    const monthInt = Number(data.slice(0, 2))
    const monthChecker = monthInt <= 12 && monthInt > 0
    const isValid = data.length === 7 && monthChecker
    return isValid
  },

  cvv(data) {
    const isValid = data.length === 3
    return isValid
  },

  amount(data) {
    const amountInt = Number(data)
    const isValid = amountInt > 0
    return isValid
  }

}