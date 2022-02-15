import './App.css'
import React, { useEffect, useState } from 'react'

const getImages = async(breed) => {
  const images = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  const imagesJson = await images.json()
  const imagesMessage = await imagesJson.message
  const imagesObject = await {
    name: breed.replace('/', ' '),
    image: imagesMessage,
    video: 'https://www.youtube.com/watch?v=VqUeo5SRMx4',
    link: 'https://zipdev.com/'
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

  useEffect(() => {
    (async () => {
      const flatDogsArray = []
      const all = await fetch(`https://dog.ceo/api/breeds/list/all`)
      const allJson = await all.json()
      const allMessage = await allJson.message
      const allWithChildrens = await Promise.all(
        Object.entries(allMessage).map(async (dog)=>concatDogs(dog))
      )
      await Promise.all(
        allWithChildrens.map(async (dog)=>{
          if( dog.hasOwnProperty('name') ) {
            flatDogsArray.push(dog)
          } else {
            Object.entries(dog).map(child=>{
              flatDogsArray.push(child[1])
              return false
            })
          }
          return false
        })
      )
      setList(flatDogsArray)
    })();
  }, [])
  return (
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <div className="dog__container container">
        <ul className="dog__grid">
          {Object.entries(list).map(item =>
          <li key={item[0]} className="dog__item">
            <h2>{item[1].name}</h2>
            <img src={item[1].image}/>
          {item[1].video}
          </li>)}
        </ul> 
      </div>  

   </div>
  )
}

export default App
