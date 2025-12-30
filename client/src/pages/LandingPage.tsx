import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ChevronRight, Users, Award, Globe, TrendingUp, Star, CheckCircle2, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import classroomImg from "@assets/generated_images/modern_physics_classroom_with_students_and_equipment.png";
import educatorsImg from "@assets/generated_images/indian_educators_collaborating_in_a_modern_office.png";
import abstractBg from "@assets/generated_images/abstract_physics_and_mathematics_equations_background.png";
import resourcesImg from "@assets/generated_images/science_laboratory_equipment_close-up.png";
import networkImg from "@assets/generated_images/community_of_educators_collaborating.png";
import growthImg from "@assets/generated_images/professional_development_certificate_and_graduation_cap.png";

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white overflow-hidden">
      <ThreeDBackground />
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-lg shadow-md shadow-emerald-200">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">AIPTA</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection('features')} className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold text-sm">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold text-sm">How It Works</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold text-sm">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-600 hover:text-emerald-600 transition-colors font-semibold text-sm">Contact</button>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 z-10">
          <div className="absolute inset-0 z-0">
            <img 
              src={abstractBg} 
              alt="Physics background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-emerald-700 font-bold text-sm uppercase tracking-wide">Educator Network</p>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight mt-4 text-slate-900">
                    Transform Physics Education Across India
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-slate-800 text-lg leading-relaxed font-medium"
                >
                  Join a thriving network of 2000+ physics educators. Access premium resources, collaborate with peers worldwide, and transform your teaching methodology through proven strategies.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-4 pt-2"
                >
                  <Link href="/auth">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                      Get Started
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <button onClick={() => scrollToSection('features')}>
                    <Button size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100">
                      Learn More
                    </Button>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-6 pt-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-emerald-700">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">Trusted by thousands</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="glass rounded-xl p-8 border-emerald-200/50 card-hover bg-white/80 backdrop-blur-sm relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Users className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">2000+</p>
                        <p className="text-slate-600 text-sm">Active Educators</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Globe className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">50+</p>
                        <p className="text-slate-600 text-sm">Countries Connected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">500+</p>
                        <p className="text-slate-600 text-sm">Curated Resources</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-500">✓ Free access to premium materials</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-emerald-100/50 rounded-xl -z-0" />
                <img 
                  src={classroomImg} 
                  alt="Physics Classroom" 
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl z-20 hidden lg:block"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Comprehensive Platform for Physics Education
              </h2>
              <p className="text-slate-600 text-lg">Everything you need to excel in the classroom</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white cursor-pointer group overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={resourcesImg} alt="Resources" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="pt-6 pb-8">
                  <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Premium Resources</h3>
                  <p className="text-slate-600 text-sm mb-4">500+ expertly curated teaching materials including question papers, worksheets, and assessment tools designed by experienced educators</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Study materials & PDFs
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Board exam papers
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Model answers
                    </li>
                  </ul>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white cursor-pointer group overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={networkImg} alt="Network" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="pt-6 pb-8">
                    <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Educator Network</h3>
                    <p className="text-slate-600 text-sm mb-4">Connect with experienced physics teachers globally, share best practices, collaborate on innovative teaching strategies, and build professional relationships</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Discussion forums
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Peer collaboration
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Mentorship programs
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white cursor-pointer group overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={growthImg} alt="Growth" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <CardContent className="pt-6 pb-8">
                    <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Professional Growth</h3>
                    <p className="text-slate-600 text-sm mb-4">Workshops, certifications, and training programs designed specifically for continuous skill development and teaching excellence</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Expert webinars
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Certifications
                      </li>
                      <li className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Teaching workshops
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Getting Started Is Simple</h2>
              <p className="text-slate-600">Four easy steps to join the community</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: "1", title: "Sign Up", desc: "Create your educator account in minutes with email verification" },
                { num: "2", title: "Explore", desc: "Browse our comprehensive resource library by class and topic" },
                { num: "3", title: "Connect", desc: "Join discussion forums and find like-minded educators" },
                { num: "4", title: "Grow", desc: "Access workshops and advance your teaching practice" }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">What Educators Are Saying</h2>
              <p className="text-slate-600">Real experiences from our community</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Rajesh Kumar",
                  role: "Senior Physics Teacher, Delhi",
                  content: "AIPTA has transformed how I teach. The resources are comprehensive and the community support is invaluable. My students' performance has improved significantly.",
                  rating: 5
                },
                {
                  name: "Ms. Priya Sharma",
                  role: "Physics Educator, Mumbai",
                  content: "The peer collaboration and mentorship programs helped me develop innovative teaching methods. Highly recommended for any physics educator.",
                  rating: 5
                },
                {
                  name: "Prof. Arjun Patel",
                  role: "Department Head, Bangalore",
                  content: "Outstanding platform for professional development. The workshops are expertly conducted and the resource library is extensive.",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="border border-slate-200 bg-white h-full hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                    <CardContent className="pt-8 pb-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-4 italic">"{testimonial.content}"</p>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-5xl font-bold text-emerald-600">2000+</p>
                <p className="text-slate-600">Physics Educators Worldwide</p>
              </motion.div>
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-5xl font-bold text-emerald-600">500+</p>
                <p className="text-slate-600">Premium Teaching Resources</p>
              </motion.div>
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-5xl font-bold text-emerald-600">50+</p>
                <p className="text-slate-600">Countries Represented</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Everything you need to know about AIPTA</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is membership free?",
                  a: "Yes! AIPTA offers free membership with access to all basic resources, discussion forums, and community features. Premium features are also available."
                },
                {
                  q: "How do I access the resource library?",
                  a: "After signing up and creating your account, you can browse and download all available resources directly from your dashboard."
                },
                {
                  q: "Can I share resources with other educators?",
                  a: "Absolutely! You can upload your own resources, share them with the community, and earn recognition for your contributions."
                },
                {
                  q: "How often are new resources added?",
                  a: "Our team and community members continuously add new resources. You can expect fresh content every week."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                >
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
            <img src={educatorsImg} alt="Educators" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="max-w-xl">
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 drop-shadow-sm">Our Impact</h2>
                <p className="text-slate-800 text-lg font-medium drop-shadow-sm">Making a real difference in physics education</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { stat: "50K+", label: "Students Impacted", icon: "👥" },
                { stat: "2000+", label: "Active Educators", icon: "🎓" },
                { stat: "500+", label: "Resources Created", icon: "📚" },
                { stat: "95%", label: "Satisfaction Rate", icon: "⭐" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="text-4xl font-bold text-emerald-600 mb-2">{item.stat}</p>
                  <p className="text-slate-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Stay Updated</h2>
              <p className="text-slate-600 mb-8">Subscribe to our newsletter for teaching tips, new resources, and community updates</p>
              
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-slate-500">We respect your privacy. Unsubscribe at any time.</p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-slate-600 text-lg">Have questions? We'd love to hear from you. Reach out to the AIPTA team.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 bg-slate-50 rounded-lg"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100 mb-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600 text-sm">contact@aipta.org</p>
                <p className="text-slate-600 text-sm">support@aipta.org</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-8 bg-slate-50 rounded-lg"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100 mb-4">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600 text-sm">+91 (800) 123-4567</p>
                <p className="text-slate-600 text-sm">Mon-Fri, 9AM-6PM IST</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-8 bg-slate-50 rounded-lg"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-100 mb-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
                <p className="text-slate-600 text-sm">New Delhi, India</p>
                <p className="text-slate-600 text-sm">Serving educators nationwide</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-12 max-w-2xl mx-auto"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                    <input type="text" placeholder="Your name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                    <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Subject</label>
                  <input type="text" placeholder="What is this about?" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                  <textarea placeholder="Tell us more..." rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"></textarea>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-bold text-white">Ready to Transform Your Teaching?</h2>
              <p className="text-white text-lg max-w-2xl mx-auto opacity-95">
                Join a community of dedicated physics educators improving education across India. Start your journey today.
              </p>
              <div className="flex gap-4 justify-center pt-4 flex-wrap">
                <Link href="/auth">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    Get Started Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 text-white p-2 rounded-md">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-semibold text-slate-900">AIPTA</span>
              </div>
              <p className="text-slate-600 text-sm">Advancing physics education across India through community collaboration and continuous professional development</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Teaching Materials</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Question Papers</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Forums</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Events</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} All India Physics Teachers Association</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900 transition">Twitter</a>
              <a href="#" className="hover:text-slate-900 transition">LinkedIn</a>
              <a href="#" className="hover:text-slate-900 transition">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
