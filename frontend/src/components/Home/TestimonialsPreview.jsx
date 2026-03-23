import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";

const TestimonialsPreview = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("/api/testimonials")
      .then((res) => {
        setTestimonials(res.data.slice(0, 2));
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <section className="py-24 bg-darker/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-primary">Love</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What clients say about my work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="glass p-8 rounded-2xl hover:neon-border transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                  {testimonial.firstName[0]}
                  {testimonial.lastName[0]}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">
                    {testimonial.firstName} {testimonial.lastName}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.profession}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.message}"</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/testimonials"
            className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Read All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
