import './App.css'
import React, { useEffect, useState, useCallback } from 'react'

const concatDogs = async (e) => {
  const breed = e[0]
  const childs = e[1]
  if( childs.length > 0 ) {
    childs.map(child=>{
      concatDogs([ `${breed}/${child}`, [] ]).then(r=>r)
    })
  }
  const ElementWithImages = fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response=>response.json())
    .then(json => {
      const newObject = {
        name: breed.replace('/', ' '),
        image: json.message
      }
      return newObject
    })
  return ElementWithImages
}

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/list/all`)
      .then(response=>response.json())
      .then(json=>{
        (Object.entries(json.message)).map(e=>{
          concatDogs(e).then(res=>{
            console.log(res)
            setList(list => [...list, res])
            console.log(list)
          })
        })
      })
  }, [])
  return (
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
      {Object.entries(list).map(item => <li key={item}>{item}</li>)}
     </ul>
   </div>
  )
}

export default App
