import {useContext} from "react"
import {ImageAndTextSliderContext} from "../../image-and-text-slider";
import './dot.css'


export const Dot = ({index}) => {

  const { slideIndex, goToSlide } = useContext(ImageAndTextSliderContext)

  return (
    <div
      className={`dot ${slideIndex === index && 'selected'}`}
      onClick={() => goToSlide(index)}
    />
  )
}