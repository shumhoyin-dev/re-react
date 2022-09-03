import { useState, useEffect, useContext , createContext, memo} from 'react'


function Child({test}) {


    const [val1 , setVal1] = useState(0)
    console.log("child rendered")



  return (
    <>

    <div>Child {val1}</div>
    <button onClick={() => setVal1((d) => d + 1)}>add</button>
    
    </>
  )
}

export default memo(Child)