import { DEFAULT_EMBLA_OPTS, EmblaSlide } from "@/blocks/TestimonialsBlock/Component"
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from "embla-carousel-react"

import { usePrevNextButtons } from "@/hooks/useArrowsButton";
import { DotButton, useDotButton } from "@/hooks/useDotsButtons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export function EmblaCarousel({
    slides,
    options = DEFAULT_EMBLA_OPTS,
    showDots,
    showArrows,
}: {
    slides: EmblaSlide[]
    options?: EmblaOptionsType
    showDots: boolean
    showArrows: boolean
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla !w-full !max-w-full relative">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number flex flex-col !h-[600px]">
                                {slide.name && (
                                    <span className="font-bold text-lg text-blue-900 !text-2xl">
                                        {slide.name}
                                    </span>
                                )}
                                {slide.country && (
                                    <span className="text-gray-600 text-lg">{slide.country}</span>
                                )}

                                {slide.src ? (
                                    <iframe
                                        className="w-auto h-[600px] mx-auto block rounded-lg mt-2"
                                        src={slide.src}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                        title={`testimonial-${index}`}
                                    />
                                ) : slide.quote ? (
                                    <p className="text-gray-700 leading-relaxed text-lg mt-4 text-center max-w-3xl mx-auto">
                                        {`“${slide.quote}”`}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 text-sm italic mt-4 text-center">
                                        Sin contenido
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showDots && (
                <div className="embla__controls">
                    <div className="embla__buttons" />
                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={
                                    "embla__dot".concat(
                                        index === selectedIndex ? " embla__dot--selected" : ""
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {showArrows && (
                <>
                    <div
                        className="absolute top-[50%] -translate-y-[50%] bg-black w-10 rounded-full p-6 flex items-center justify-center left-10 opacity-80 cursor-pointer"
                        onClick={onPrevButtonClick}
                        aria-disabled={prevBtnDisabled}
                    >
                        <span className="text-white text-6xl">
                            <IoIosArrowBack />
                        </span>
                    </div>

                    <div
                        className="absolute top-[50%] -translate-y-[50%] bg-black w-10 rounded-full p-6 flex items-center justify-center right-10 opacity-80 cursor-pointer"
                        onClick={onNextButtonClick}
                        aria-disabled={nextBtnDisabled}
                    >
                        <span className="text-white text-6xl">
                            <IoIosArrowForward />
                        </span>
                    </div>
                </>
            )}
        </section>
    )
}
