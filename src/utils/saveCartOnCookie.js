
export const saveCartOnCookie = (data,cookie) => {
   const {cartCookie}=cookie
   console.log(cartCookie);
    if (cartCookie ) {
        let findIndex = cartCookie.findIndex(i => i.productId === data.productId)
       if (findIndex === -1) {
           cartCookie.push({ ...data, id: Date.now() })
           console.log(cartCookie);
           
        } else {
            cartCookie[findIndex].quantity += 1
            
        }
        return cartCookie
    } else {
        return [{...data,id:Date.now()}]
        
    }
    
}
export const increaseCartOnCookie = (id,cookie) => {
    let findIndex = cookie.findIndex(i => i.id === id)
    cookie[findIndex].quantity += 1
    console.log(cookie[findIndex].quantity);
    return cookie
}
export const decreaseCartOnCookie = (id,cookie) => {
    let findIndex = cookie.findIndex(i => i.id === id)
    cookie[findIndex].quantity -= 1
    return cookie
}
export const removeCartOnCookie = (id,cookie) => {
   
    let findIndex = cookie.findIndex(i => i.id === id)
    console.log(findIndex);
    cookie.splice(findIndex, 1)
   
    return cookie
}

export const checkOrRemoveCheckAllCartOnCookie = (bolean,cookie) => {
    console.log(bolean);
    for (let i = 0; i < cookie.length; i++) {
        cookie[i].isChecker=bolean
        
    }
    /* cookie.forEach(e => e.isChecker = bolean)*/
    console.log(cookie); 
    return cookie
    
}

export const checkOrRemoveCheckItemCartOnCookie = (id, bolean,cookie) => {
    console.log(bolean);
    let findIndex = cookie.findIndex(i => i.id === id)
   if(bolean===true){
    cookie[findIndex].isChecker=false
   }else{
    cookie[findIndex].isChecker=true
   }
   return cookie
}
