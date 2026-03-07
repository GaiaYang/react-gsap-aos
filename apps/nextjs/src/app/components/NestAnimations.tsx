import { refreshScrollTrigger, toAOSProps } from "react-gsap-aos";

import useDynamicOptions from "./useDynamicOptions";
import { useLayoutEffect } from "react";

const DURATION = 400;

const list = Array.from({ length: 10 });

export default function NestAnimations() {
  const options = useDynamicOptions();

  useLayoutEffect(() => {
    refreshScrollTrigger();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-120 flex-col gap-[inherit] pb-20">
      {list.map((_, index) => (
        <div data-aos-container key={index}>
          <div
            {...toAOSProps({
              ...options,
              animation: "fade-up",
              duration: DURATION,
            })}
            className="card bg-base-100 shadow"
          >
            <figure data-aos-container>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...toAOSProps({
                  ...options,
                  animation: "zoom-in-up",
                  delay: DURATION,
                })}
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <div data-aos-container className="card-title">
                <p
                  {...toAOSProps({
                    ...options,
                    animation: "slide-right",
                    delay: DURATION,
                  })}
                >
                  Card Title
                </p>
              </div>
              <div data-aos-container>
                <p
                  {...toAOSProps({
                    ...options,
                    animation: "zoom-in-down",
                    delay: DURATION,
                  })}
                >
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
              <div data-aos-container className="card-actions justify-end">
                <button
                  {...toAOSProps({
                    ...options,
                    animation: "slide-left",
                    delay: DURATION,
                  })}
                  className="btn btn-primary"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
