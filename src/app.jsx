import './style.css'
import {ImageAndTextSlider} from "./features/image-and-text-slider/image-and-text-slider"



export const App = () => {
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25vh'
        }}>
            <ImageAndTextSlider />
        </div>
    )
}