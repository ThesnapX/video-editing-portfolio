import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skills = [
    { name: "Adobe Premiere Pro", level: 95 },
    { name: "Adobe After Effects", level: 90 },
    { name: "DaVinci Resolve", level: 85 },
    { name: "Final Cut Pro", level: 80 },
    { name: "Motion Graphics", level: 88 },
    { name: "Color Grading", level: 92 },
  ];

  useEffect(() => {
    skills.forEach((skill, i) => {
      gsap.fromTo(
        `.skill-bar-${i}`,
        { width: 0 },
        {
          width: `${skill.level}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.skill-item-${i}`,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proficient in industry-standard tools and techniques
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className={`skill-item-${index}`}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-primary">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`skill-bar-${index} h-full bg-gradient-to-r from-primary to-primary/60 rounded-full glow`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
