export const Slide = ({data: {url, title}}) => {

  return (
    <div className="slide">
      <SlideImage src={url} alt={title} />

      <SlideTitle title={title} />
    </div>
  )
}



const SlideTitle = ({title}) => <div className="slide-title">{title}</div>

const SlideImage = ({src, alt}) => <img src={src} alt={alt} className="slide-image" />