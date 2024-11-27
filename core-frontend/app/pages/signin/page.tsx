import SigninComponent from "@/app/components/Signin";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import SignupWorldMap from "@/app/components/SignupSidebar";

const Signin = () => {
  return (
    <div className="flex h-screen bg-black">
      {/* Left 1/4 section */}
      <div className="w-3/5  flex items-center justify-center">
        <SignupWorldMap />
      </div>
      <div className="absolute top-0 bottom-0 left-[63%] w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent z-0" />
      {/* Right 3/4 section for the SignupComponent */}
      <div className="w-2/5 flex items-center justify-center bg-black">
        <BackgroundBeamsWithCollision>
          <SigninComponent />
        </BackgroundBeamsWithCollision>
      </div>
    </div>
  );
};

export default Signin;
