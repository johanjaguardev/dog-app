import './../styles/grid.scss'
import React from "react"
const Grid = ({list}) => {
  return (
    <React.Fragment>
      <ul className="dogs__grid">
        {list.map(item =>
        <li key={item[0]} className="dogs__item">
          <figure className='dogs__figure'>
            <img src={item[1].image} className="dogs__img"/>
            <figcaption className='dogs__figcaption'>{item[1].name}</figcaption>
          </figure>
        </li>)}
      </ul> 
    </React.Fragment>
  )
}
export { Grid }

