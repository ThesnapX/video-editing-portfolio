import React, { useEffect, useState } from "react";
import api from "../config/api";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
    gsap.fromTo(
      ".testimonials-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
    );
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching testimonials from API...");
      const response = await api.get("/testimonials");

      console.log("Testimonials response:", response.data);

      let testimonialsData = [];
      if (response.data && Array.isArray(response.data)) {
        testimonialsData = response.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        testimonialsData = response.data.data;
      } else if (response.data && typeof response.data === "object") {
        testimonialsData =
          Object.values(response.data).find((val) => Array.isArray(val)) || [];
      }

      setTestimonials(testimonialsData);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(err.message || "Failed to load testimonials");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading testimonials
          </div>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 gradient-bg text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="testimonials-header relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What my amazing clients have to say about working with me
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-6 py-20">
        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No testimonials yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id || index}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 h-full">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      className="w-14 h-14 text-primary/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Message */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonial.message}"
                  </p>

                  {/* Divider */}
                  <div className="w-20 h-0.5 gradient-bg mb-6"></div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.firstName?.[0]}
                      {testimonial.lastName?.[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">
                        {testimonial.firstName} {testimonial.lastName}
                      </h3>
                      <p className="text-gray-400">{testimonial.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Testimonials;
