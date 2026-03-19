import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero"));
const About = dynamic(() => import("@/components/home/About"), {
  ssr: true,
});

const Index = () => {
  return (
    <>
      <Hero />
      <About />
    </>
  );
};

export default Index;
