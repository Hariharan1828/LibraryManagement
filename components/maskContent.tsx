"use client";
import { MaskContainer } from "./ui/svg-mask-effect";

export function SVGMaskEffectDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
      <MaskContainer
        revealText={
          <p className="max-w-7xl mx-auto text-slate-800 text-center  text-4xl font-bold">
            Est dolore anim cupidatat ea reprehenderit ad duis.
            Dolore elit ad qui irure culpa duis quis aliqua velit tempor.
          </p>
        }
        className="h-[40rem] border rounded-md"
      >
       Fugiat voluptate velit et do id nisi.<span className="text-red-500">Loreum Ipsum</span> Dolor ullamco exercitation cupidatat ad ex sunt id est ad esse aute sit. <span className="text-red-500">Explore</span>.
      </MaskContainer>
    </div>
  );
}
