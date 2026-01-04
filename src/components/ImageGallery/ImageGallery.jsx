import { useState, useCallback } from 'react';
import './ImageGallery.css';

function ImageGallery({ images, title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handlePrevious = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handleThumbnailClick = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const openLightbox = useCallback(() => {
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback(() => {
        setIsLightboxOpen(false);
        document.body.style.overflow = '';
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') closeLightbox();
    }, [handlePrevious, handleNext, closeLightbox]);

    if (!images || images.length === 0) {
        return (
            <div className="imageGalleryEmpty">
                <p>No images available</p>
            </div>
        );
    }

    return (
        <div className="imageGallery" onKeyDown={handleKeyDown}>
            <div className="galleryMain">
                <button
                    className="galleryNavBtn galleryNavPrev"
                    onClick={handlePrevious}
                    aria-label="Previous image">
                    <img src="/icons/chevron-left.svg" alt="" aria-hidden="true" />
                </button>

                <div className="galleryMainWrapper" onClick={openLightbox}>
                    <img
                        src={images[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
                        className="galleryMainImage"
                    />
                    <div className="galleryZoomHint">
                        <img src="/icons/zoom.svg" alt="" aria-hidden="true" />
                        Click to enlarge
                    </div>
                    <span className="galleryCounter">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>

                <button
                    className="galleryNavBtn galleryNavNext"
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <img src="/icons/chevron-right.svg" alt="" aria-hidden="true" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="galleryThumbnails">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`galleryThumbnail ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            {isLightboxOpen && (
                <div
                    className="galleryLightbox"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <button
                        className="lightboxClose"
                        onClick={closeLightbox}
                        aria-label="Close lightbox"
                    >
                        <img src="/icons/close.svg" alt="" aria-hidden="true" />
                    </button>

                    <button
                        className="lightboxNav lightboxPrev"
                        onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                        aria-label="Previous image"
                    >
                        <img src="/icons/chevron-left.svg" alt="" aria-hidden="true" />
                    </button>

                    <img
                        src={images[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
                        className="lightboxImage"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="lightboxNav lightboxNext"
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        aria-label="Next image"
                    >
                        <img src="/icons/chevron-right.svg" alt="" aria-hidden="true" />
                    </button>

                    <span className="lightboxCounter">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
            )}
        </div>
    );
}

export default ImageGallery;
