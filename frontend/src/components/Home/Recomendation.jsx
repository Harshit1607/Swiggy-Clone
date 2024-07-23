import React, {useState} from 'react'
import category from '../../assets/category.json'


const Recomendation = () => {
  const [slide, setSlide] = useState([0, 1, 2, 3])

  function nextSlide(){
    setSlide(slide.map(item=>item+1));
    console.log(slide)
  }
  function prevSlide(){
    setSlide(slide.map(item=>item-1));
  }
  console.log(slide)

  return (
    <div className="recomendation">
      <div className="recom-heading">
        <span>Whats on Your mind</span>
        <div>
          <button onClick={prevSlide} style={slide[0]===0 ? {display: 'none'}: null}>&lt;</button>
          <button onClick={nextSlide} style={slide[3]===category.length-1 ? {display: 'none'}: null}>&gt;</button>
        </div>
      </div>
      <div className="recom-container">
        {category.map((item, index)=>{
          return(
            <div className = {slide.includes(index)? "recom-img" : "recom-img recon-img-hidden"}>
              <img src={item.image}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recomendation