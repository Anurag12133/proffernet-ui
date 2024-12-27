import PauseableVideo from "./CircleVideo";
import ParallaxVocabulary from "./CircleParallex";

const Animation = () => (
  <div className="  z-0 mx-auto mt-[10rem] aspect-square max-w-[1160px] xl:mt-[-147px] xl:max-w-[860px] lg:mt-[-120px] lg:max-w-[680px] sm:-mx-4 sm:-mt-12 sm:w-[calc(100%+32px)]">
    <PauseableVideo width={1160} height={1160}>
      <source src="../../../../videos/ai-loop.mp4" type="video/mp4" />
      <source src="../../../../videos/ai-loop.webm" type="video/webm" />
    </PauseableVideo>
    <ParallaxVocabulary className="absolute left-1/2 top-[15.5%] w-[1280px] -translate-x-1/2 xl:top-8 xl:w-[930px] lg:-top-14 lg:w-[740px] md:top-[48%] md:w-[110%] md:-translate-x-1/2 md:-translate-y-1/2" />
  </div>
);

export default Animation;
