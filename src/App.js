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
  const dogsArray = []

  useEffect(async() => {
    (async () => {
      const all = await fetch(`https://dog.ceo/api/breeds/list/all`)
      const allJson = await all.json()
      const allMessage = await allJson.message
      const allWithChildrens = await Promise.all(
        Object.entries(allMessage).map(async (e)=>{
          return concatDogs(e)
        })
      )
      console.log(all, allJson, allMessage, allWithChildrens)
    })();
  }, [])
  return (
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
      {dogsArray.map(item => <li key={item}>{item}</li>)}
     </ul>
   </div>
  )
}

export default App
