const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'PKR',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayINRCurrency