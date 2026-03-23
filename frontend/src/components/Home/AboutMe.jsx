import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".about-text",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      ".about-stats",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section ref={aboutRef} className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              I'm a passionate video editor with over 5 years of experience in
              creating compelling visual stories. From commercial ads to music
              videos, I bring creativity and technical expertise to every
              project.
            </p>
            <p className="text-gray-300 text-lg mb-8">
              My approach combines artistic vision with modern editing
              techniques, ensuring each video not only meets but exceeds client
              expectations. I believe in the power of storytelling and strive to
              create content that resonates with audiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xl">🎬</span>
              </div>
              <div>
                <h4 className="font-semibold">500+ Projects Completed</h4>
                <p className="text-gray-400">Happy clients worldwide</p>
              </div>
            </div>
          </div>

          <div className="about-stats grid grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-300">Music Videos</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-300">Commercial Ads</div>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-300">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
