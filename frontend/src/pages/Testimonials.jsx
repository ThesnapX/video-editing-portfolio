import React, { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("/api/testimonials")
      .then((res) => {
        setTestimonials(res.data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));

    gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <main className="pt-20">
      <div className="bg-gradient-to-r from-primary/10 to-transparent py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Client <span className="text-primary">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What my clients say about working with me
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="testimonial-card glass p-8 rounded-2xl hover:neon-border transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold">
                  {testimonial.firstName[0]}
                  {testimonial.lastName[0]}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">
                    {testimonial.firstName} {testimonial.lastName}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.profession}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                "{testimonial.message}"
              </p>
              <div className="mt-4 text-primary">{"★".repeat(5)}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Testimonials;
