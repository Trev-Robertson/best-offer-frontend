const initialState = {
    count: 0
  }


  const reducer = (oldState = initialState, action) => {
    switch(action.type){
      case "there":
        return {}
      case "here":
        return {}
      default:
        return oldState
    }
  }
  
  export default reducer