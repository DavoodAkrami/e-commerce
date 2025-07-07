import React, { useContext, useState } from "react";
import "./SlideShow.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";




const SlideShow = ({imgSrcs = []}) => {
    const [slide, setSlide] = useState(0);

    const handleNext = () => {
        setSlide(slide < imgSrcs.length - 1 ? slide + 1 : slide);
    }

    const handlePrev = () => {
        setSlide(slide > 0 ? slide - 1 : slide);
    }

    return (
        <div className="carousel">
            <FaArrowLeft onClick={handlePrev} className="arrow arrow-left" />
            <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {imgSrcs.map((img, index) => 
                    <img key={index} src={img} alt="تصویر محصولات" className="slide" />
                )}
            </div>
            <FaArrowRight onClick={handleNext} className="arrow arrow-right" />
            <span className="indicators">
                {imgSrcs.map((_, index) => (
                    <button 
                        key={index}
                        className={slide === index ? "indicator" : "indicator indicator-inactive"}
                        onClick={() => setSlide(index)}
                    ></button>
                ))}
            </span>
        </div>
    )
}


export default SlideShow;