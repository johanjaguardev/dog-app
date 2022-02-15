import './App.css'
import React, { useEffect, useState, useCallback } from 'react'

const getImages = async(breed) => {
  const images = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  const imagesJson = await images.json()
  const imagesMessage = await imagesJson.message
  const imagesObject = await {
    name: breed.replace('/', ' '),
    image: imagesMessage
  }
  return imagesObject
}
const concatDogs = async (dog) => {
  const breed = dog[0]
  const childs = dog[1]
  
  if( childs.length > 0 ) {
    const childimages = await Promise.all(childs.map(child=>{
      const images = getImages(`${breed}/${child}`)
      return images
    })) 
    return childimages
  } else {
    const images = getImages(breed)
    return images
  }
}

function App() {
  const [list, setList] = useState([])

  useEffect(async() => {
    (async () => {
      const flatDogsArray = []
      const all = await fetch(`https://dog.ceo/api/breeds/list/all`)
      const allJson = await all.json()
      const allMessage = await allJson.message
      const allWithChildrens = await Promise.all(
        Object.entries(allMessage).map(async (dog)=>concatDogs(dog))
      )
      const flatDogs = await Promise.all(
        allWithChildrens.map(async (dog)=>{
          if( dog.hasOwnProperty('name') ) {
            flatDogsArray.push(dog)
          } else {
            Object.entries(dog).map(child=>{
              flatDogsArray.push(child[1])
            })
          }
          return flatDogsArray
        })
      )
      setList(flatDogsArray)
      //console.log(all, allJson, allMessage, allWithChildrens, list)
    })();
  }, [])
  return (
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
      {Object.entries(list).map(item => <li key={item[0]}>{item[1].name}</li>)}
     </ul>
   </div>
  )
}

export default App
