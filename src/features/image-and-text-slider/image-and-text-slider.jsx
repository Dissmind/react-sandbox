import './image-and-text-slider.css'
import {createContext, useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Arrows} from "./arrows/arrows";
import {SlidesList} from "./slides-list/slides-list";
import {Dots} from "./dots/dots";


export const getImages = (length = 10) => {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.json())
    .then(response => {
      const images = [];
      response.forEach((c) => {
        const title = c?.description;
        const url = c?.image?.url;

        images.push({ title, url });
      })

      return images.slice(0, length); // remove the extra cats
    })
}

export const ImageAndTextSliderContext = createContext()


export const ImageAndTextSlider = ({autoPlay, autoPlayTime, width, height}) => {

  const [items, setItems] = useState([])
  const [slideIndex, setSlideIndex] = useState(0)
  const [touchPosition, setTouchPosition] = useState(null)



  const goToSlide = (index) => {
    setSlideIndex(index)
  }

  const changeSlide = (direction = 1) => {
    const slideIndexSum = slideIndex + direction

    if (slideIndexSum < 0) {
      setSlideIndex(items.length - 1)
      return
    }

    setSlideIndex(slideIndexSum % items.length)
  }


  const onHandleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX

    setTouchPosition(touchDown)
  }

  const onHandleTouchMove = (e) => {
    if (touchPosition === null) {
      return
    }

    const currentTouchPosition = e.touches[0].clientX
    const directionPosition = touchPosition - currentTouchPosition

    if (directionPosition < 10) {
      changeSlide(1)
    }

    if (directionPosition < -10) {
      changeSlide(-1)
    }

    setTouchPosition(null)
  }


  useEffect(() => {
    const loadImage = async () => {
      const images = await getImages()

      setItems(images)
    }

    loadImage()
  }, [])


  useEffect(() => {
    if (!autoPlay) {
      return
    }

    const interval = setInterval(() => {
      changeSlide()
    }, autoPlayTime)


    return () => {
      clearInterval(interval)
    }
  }, [items.length, slideIndex])


  return (
    <div
      style={{ width, height }}
      className="slider"
      onTouchStart={onHandleTouchStart}
      onTouchMove={onHandleTouchMove}
    >
      <ImageAndTextSliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slideIndex,
          items,
        }}
      >
        <Arrows />
        <SlidesList />
        <Dots />
      </ImageAndTextSliderContext.Provider>
    </div>
  )
}


ImageAndTextSlider.propTypes = {
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string
}


ImageAndTextSlider.defaultProps = {
  autoPlay: false,
  autoPlayTime: 5000,
  width: "100%",
  height: "100%"
}

