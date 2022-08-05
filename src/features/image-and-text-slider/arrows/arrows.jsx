import {useContext} from "react"
import {ImageAndTextSliderContext} from "../image-and-text-slider"
import './arrows.css'


export const Arrows = ({}) => {

  const {changeSlide} = useContext(ImageAndTextSliderContext)

  return (
    <div className={'arrows'}>
      <div
        className="arrow left"
        onClick={() => changeSlide(-1)}
      />
      <div
        className="arrow right"
        onClick={() => changeSlide(1)}
      />
    </div>
  )
}