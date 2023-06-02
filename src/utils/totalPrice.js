export const totalPrice = (x) => {
    
        let total = 0
        for (let i = 0; i < x.length; i++) {
            if (x[i].isChecker === true) {
                total += x[i].quantity * x[i].price
            }
        }
        return total
    
}