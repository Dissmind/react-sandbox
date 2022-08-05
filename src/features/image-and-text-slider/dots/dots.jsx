import {useContext} from "react";
import {ImageAndTextSliderContext} from "../image-and-text-slider";
import {Dot} from "./dot/dot";
import './dots.css'


export const Dots = ({}) => {

  const { slidesCount } = useContext(ImageAndTextSliderContext)


  const renderDots = () => {

    const dots = []

    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} index={i} />)
    }

    return
  }


  return (
    <div className={'dots'}>
      {
        renderDots()
      }
    </div>
  )
}