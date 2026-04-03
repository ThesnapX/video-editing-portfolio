import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiCheck } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const skills = [
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "Adobe Photoshop",
    "Figma",
    "Motion Graphics (Learning)",
    "Video Editing",
    "Poster Designing",
    "Thumbnail Design",
    "YouTube SEO",
  ];

  useEffect(() => {
    gsap.fromTo(
      ".about-image",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      ".about-content",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section className="about-section py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Stats Card */}
          <div className="about-image">
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <h3 className="text-3xl font-bold mb-8">Quick Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold gradient-text">
                    1+ Year
                  </div>
                  <div className="text-gray-400 mt-1">
                    Professional Experience
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text">
                    35+ Clients
                  </div>
                  <div className="text-gray-400 mt-1">Satisfied Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text">
                    100+ Projects
                  </div>
                  <div className="text-gray-400 mt-1">
                    Successfully Completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="about-content">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              I'm a passionate video editor dedicated to creating compelling
              visual stories. With over a year of hands-on experience, I've
              helped 35+ clients bring their visions to life through
              professional video editing and motion design.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              My approach combines technical expertise with creative
              storytelling, ensuring every project stands out and resonates with
              the target audience.
            </p>

            <h3 className="text-2xl font-bold mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm"
                >
                  <FiCheck className="text-primary text-sm" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
