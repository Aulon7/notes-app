import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Logo = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.set(logoRef.current.children, { y: 32, opacity: 0 });
      gsap.to(logoRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <h1
      ref={logoRef}
      className="flex justify-center font-semibold text-5xl text-cyan-600 tracking-widest"
    >
      <span className="inline-block">N</span>
      <span className="inline-block">o</span>
      <span className="inline-block">t</span>
      <span className="inline-block">e</span>
      <span className="inline-block">s</span>
    </h1>
  );
};

export default Logo;
