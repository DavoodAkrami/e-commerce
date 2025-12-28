import React, { useContext, useState } from "react";
import "./SlideShow.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";




const SlideShow = ({imgSrcs = []}) => {
    const [slide, setSlide] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const handleNext = () => {
        setSlide(prev => (prev < imgSrcs.length - 1 ? prev + 1 : prev));
    }

    const handlePrev = () => {
        setSlide(prev => (prev > 0 ? prev - 1 : prev));
    }

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsOpen(true);
    }

    const closeLightbox = () => {
        setIsOpen(false);
    }

    const lbNext = () => {
        setLightboxIndex(i => (i < imgSrcs.length - 1 ? i + 1 : i));
    };

    const lbPrev = () => {
        setLightboxIndex(i => (i > 0 ? i - 1 : i));
    };

    return (
        <div className="carousel">
            <FaArrowLeft onClick={handlePrev} className="arrow arrow-left" />
            <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {imgSrcs.map((img, index) => 
                    <img key={index} src={img} alt={`product-${index}`} className="slide" onClick={() => openLightbox(index)} />
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

            {isOpen && (
                <div className="lightboxOverlay" role="dialog" aria-modal="true">
                    <div className="lightboxContent">
                        <button className="lbClose" onClick={closeLightbox} aria-label="Close">×</button>
                        <FaArrowLeft onClick={lbPrev} className="arrow lb-arrow lb-left" />
                        <img src={imgSrcs[lightboxIndex]} alt={`lightbox-${lightboxIndex}`} className="lightboxImage"/>
                        <FaArrowRight onClick={lbNext} className="arrow lb-arrow lb-right" />
                        <div className="lbThumbs">
                            {imgSrcs.map((img, idx) => (
                                <img 
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className={idx === lightboxIndex ? "thumb active" : "thumb"}
                                    onClick={() => setLightboxIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default SlideShow;