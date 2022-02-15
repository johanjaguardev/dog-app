import './App.css'
import React, { useEffect, useState } from 'react'

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
      <header className="header">
        <h1>Dog's R Us</h1>
        <nav>
          <ul className='header__menu'>
            <li><a href="#" target="_blank">Home</a></li>
            <li><a href="#" target="_blank">About</a></li>
            <li><a href="#" target="_blank">Contact Us</a></li>
            
          </ul>
        </nav>

      </header>
      <div className='hero'>
        <h2>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        <div className="hero__video-boc">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VqUeo5SRMx4" allowfullscreen></iframe>
        </div>
      </div>
      <div className="dog__container container">
        <h3>Dog Breeds</h3>
        <ul className="dog__grid">
          {Object.entries(list).map(item =>
          <li key={item[0]} className="dog__item">
            <img src={item[1].image}/>
            <h4>{item[1].name}</h4>
          {item[1].video}
          </li>)}
        </ul> 
      </div>  

   </div>
  )
}

export default App
