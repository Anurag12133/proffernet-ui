import Container from "./HomeCircleAnimation/Container";

import Animation from "./HomeCircleAnimation/CircleAnimation/Animation";

const AiIndex = () => (
  <section className="ai-index safe-paddings relative mt-64 xl:mt-32 lg:mt-24 md:mt-20">
    <Container
      className=" z-10 flex flex-col  xl:max-w-[704px] xl:pr-0 lg:!max-w-[640px] md:max-w-none"
      size={960}
    >
      <h2 className="max-w-3xl font-title text-[68px] font-medium leading-[0.9] tracking-extra-tight text-white xl:text-[56px] lg:text-[44px] sm:text-[32px]">
        Unleashing Cutting Where
        <br />
        Contribution Matters
      </h2>
      <div className="mt-7 max-w-sm self-end xl:mt-6 xl:max-w-xs lg:mt-4 lg:max-w-[256px] md:mt-3.5 md:max-w-md md:self-start">
        <p className="text-lg font-light leading-tight tracking-extra-tight text-white xl:text-base lg:text-sm md:text-base">
          <span className="font-medium text-white">
            An interactive space for developers
          </span>{" "}
          to find projects that match their skills, collaborate with peers, and
          grow their portfolios.
        </p>
      </div>
    </Container>
    <Animation />
  </section>
);

export default AiIndex;
