
import Box3D from "@/components/Box3D";
import Logo from "@/components/Logo";

export default function Home() {

  return (
    <div>
      <Logo />
      <div>
        <Box3D />
      </div>

      <div className='w-full h-screen bg-sPink mt-10 flex items-center justify-center'>
        <h1 className='text-white text-6xl leading-none font-normal'>Your next section goes here.</h1>
      </div>
    </div>
  );
}
