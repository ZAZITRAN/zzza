export const quickSortPurchasess = (arr) => {
    console.log(arr);
    let result=[]
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].purchases)    
    }
   
    if(result.length < 2) return result;
    
    // *** lấy phần tử cuối của 'result' làm 'pivot'
    const pivotIndex = result.length - 1;
    const pivot = result[pivotIndex];

    const left = [];
    const right = [];
    
    let currentItem;
    // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
    for(let i = 0; i < pivotIndex; i++) {
        currentItem = result[i];
        
        if(currentItem < pivot) {
            left.push(currentItem);
        } else {
            right.push(currentItem);
        }
    }

    const newResult= [...quickSortPurchasess(left), pivot, ...quickSortPurchasess(right)];

    const newArr=[]
    for (let i = 0; i < newResult.length; i++) {
      let findIndex=arr.findIndex(e=>e.purchases===newResult[i])
      newArr.push({...arr[findIndex]})
    }
    return newArr
}