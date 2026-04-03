import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsPreview = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      setTestimonials(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
    }
  }, [testimonials]);

  if (loading) {
    return (
      <section className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="text-primary text-xl">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from people I've had the pleasure of working with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="testimonial-card group">
              <div className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-primary/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.firstName?.[0]}
                    {testimonial.lastName?.[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      {testimonial.firstName} {testimonial.lastName}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 text-lg"
          >
            Read All Testimonials
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
