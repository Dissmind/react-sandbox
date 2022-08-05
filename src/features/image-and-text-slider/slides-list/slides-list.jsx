import {useContext} from "react"
import {ImageAndTextSliderContext} from "../image-and-text-slider"
import {Slide} from "./slide/slide"



export const SlidesList = ({}) => {

  const { slideNumber, items } = useContext(ImageAndTextSliderContext)


  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  )
}