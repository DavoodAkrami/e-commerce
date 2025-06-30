import { Slide } from 'react-slideshow-image';
import React from 'react';
import "./SlideShow.css";




const SlideShow = ({selectedProduct}) => {
    const productImages = selectedProduct.images || [selectedProduct.thumbnail];

    return (
        <div className="slideShow">
        <Slide>
            {productImages.map((img, idx) => (
                <div key={idx} className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                    >
                        <span>
                            {`Slide ${idx + 1}`}
                        </span>
                    </div>
                </div>
            ))}
        </Slide>
    </div>
    )
}

export default SlideShow;