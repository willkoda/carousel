import React, {useRef, useEffect, useState} from 'react';
import './CarouselStyle.scss';
import PropTypes from 'prop-types';

import { 
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

function Carousel(props) {
    const carouselRef = useRef(null);
    const imageRef = useRef(null);
    const itemContainerRef = useRef(null);
    const listItemRef = useRef(null);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
        const rect = imageRef.current.getBoundingClientRect();
        setItemWidth(rect.width);
    }, []);

    const setDimensions = () => {
        const imageRect = imageRef.current.getBoundingClientRect();
        itemContainerRef.current.style.height = imageRect.height + 'px';
    }

    const imageLoad = () => {
        setDimensions();
    }

    const navigateCarousel = (e) => {
        const direction = e.target.closest('button').dataset.direction 
        switch(direction) {
            case 'previous':
                    setActiveIndex(activeIndex - 1);
                break;
            case 'next':
                    setActiveIndex(activeIndex + 1);
                break;
            default:
                throw new Error(`${direction} is invalid`);
        }
    }
    
    useEffect(() => {
        const left = listItemRef.current.style.left;
        itemContainerRef.current.style.transform = `translateX(-${left})`;
        itemContainerRef.current.style.height = imageRef.current.getBoundingClientRect().height + 'px';
        setDimensions();
    }, [activeIndex])

    return (
        <div className="Carousel" ref={carouselRef}>
            <button
                data-direction="previous"
                className="navigation--button previous--button"
                onClick={navigateCarousel}
                disabled={activeIndex === 0}>
                <ChevronLeftIcon/>
            </button>
            <button 
                data-direction="next"
                className="navigation--button next--button ripple" 
                onClick={navigateCarousel}
                disabled={activeIndex === props.images.length - 1}>
                <ChevronRightIcon/>
            </button>
            <ul className="item--container" ref={itemContainerRef}>
                {props.images.map((el, index) => (
                    <li 
                        ref={index === activeIndex ? listItemRef : null}
                        key={index}
                        style={{
                            left: `${index * itemWidth}px`,
                        }}>
                        <img src={el} alt="item" 
                            ref={index === activeIndex ? imageRef : null} onLoad={imageLoad}
                        />
                    </li>
                ))}
            </ul>
            <div className="slideControls">
                {props.images.map((el, index) => (
                    <button 
                        className={`${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}>
                        <span></span>
                    </button>
                ))}
            </div>
        </div>
    )
}

Carousel.propTypes = {
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
}

export default Carousel;