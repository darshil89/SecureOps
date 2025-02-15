import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Mohammad Ashab',
      role: 'Backend Developer',
      image: 'https://res.cloudinary.com/dwwbx27ts/image/upload/v1739603518/WhatsApp_Image_2025-02-15_at_12.40.35_3153bcad_dyscla.jpg',
      bio: 'Passionate about creating seamless web experiences and solving complex problems.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Darshil Mahraur',
      role: 'DevOps Engineer',
      image: 'https://res.cloudinary.com/dwwbx27ts/image/upload/v1739603399/Screenshot_2025-02-15_123923_ni33ch.png',
      bio: 'Specialized in building robust and scalable backend systems.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Devansh Aryan',
      role: 'Frontend Developer',
      image: 'https://res.cloudinary.com/dwwbx27ts/image/upload/v1739603583/WhatsApp_Image_2024-10-20_at_23.36.14_61819bac_zxvxv6.jpg',
      bio: 'Creative designer focused on crafting beautiful and intuitive user interfaces.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Hamad Hussain',
      role: 'Ai/ML Developer',
      image: 'https://res.cloudinary.com/dwwbx27ts/image/upload/v1739603746/Screenshot_2025-02-15_124523_zxjmts.png',
      bio: 'Expert in streamlining development operations and maintaining infrastructure.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Meet Our Team
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          We're a diverse team of talented individuals passionate about creating amazing digital experiences.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[300px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm leading-relaxed text-center">{member.bio}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <a href={member.social.github} className="text-white hover:text-gray-200 transition-colors">
                        <Github size={20} />
                      </a>
                      <a href={member.social.linkedin} className="text-white hover:text-gray-200 transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href={member.social.twitter} className="text-white hover:text-gray-200 transition-colors">
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <div className="flex justify-center space-x-6">
            <a href="mailto:contact@example.com" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <Mail className="mr-2" size={20} />
              <span>Email Us</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="mr-2" size={20} />
              <span>Follow Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;