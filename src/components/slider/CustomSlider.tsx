'use client';
import React, { useState } from 'react';
import './slider.css';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { cn } from '@/lib/utils';

function CustomSlider({
  ArowClassName,
  children,
}: {
  ArowClassName?: string;
  children?: React.ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className='navigation-wrapper px-4'>
        <div ref={sliderRef} className='keen-slider'>
          {children ? (
            React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
                  className: `${(child.props as any)?.className || ''} keen-slider__slide number-slide number-slide${index}`,
                });
              }
              return child;
            })
          ) : (
            <>
              <div className='keen-slider__slide number-slide'>No Chidren are Available</div>
            </>
          )}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
              ArowClassName={ArowClassName}
            />

            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              ArowClassName={ArowClassName}
            />
          </>
        )}
      </div>
      {/* {loaded && instanceRef.current && (
        <div className='dots'>
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            );
          })}
        </div>
      )} */}
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
  ArowClassName?: string;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={cn(
        `arrow w-[30px] h-[15px] ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled} ${props.ArowClassName}`,
      )}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && (
        <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
      )}
      {!props.left && <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />}
    </svg>
  );
}

export default CustomSlider;
