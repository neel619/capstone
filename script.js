// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Experts data
const experts = [
  {
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    name: 'Om Sinnarkar',
    role: 'Sports Medicine Specialist',
    specialty: 'Rehabilitation & Recovery',
    rating: 4.9,
    reviews: 128,
    certifications: ['MD', 'Sports Medicine', 'Physical Therapy'],
    availability: 'Mon-Fri'
  },
  {
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    name: 'Mike Thompson',
    role: 'Elite Personal Trainer',
    specialty: 'Strength & HIIT',
    rating: 4.8,
    reviews: 95,
    certifications: ['NASM-CPT', 'CrossFit L3', 'Nutrition'],
    availability: 'Flexible Hours'
  },
  {
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    name: 'Dr. Emma Rodriguez',
    role: 'Nutritionist & Wellness Coach',
    specialty: 'Sports Nutrition',
    rating: 4.9,
    reviews: 156,
    certifications: ['PhD', 'Sports Nutrition', ' Mental Health'],
    availability: 'Tue-Sat'
  },
  {
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    name: 'Dr. James Wilson',
    role: 'Physical Therapist',
    specialty: 'Injury Prevention',
    rating: 4.7,
    reviews: 89,
    certifications: ['DPT', 'Orthopedics', 'Sports Medicine'],
    availability: 'Mon-Thu'
  }
];

// Testimonials data
const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'Jennifer Parker',
    age: '34',
    achievement: 'Lost 30lbs in 6 months',
    text: 'The combination of virtual health consultations and personalized fitness training has been life-changing. The trainers and medical staff work together seamlessly to ensure my health and fitness goals align perfectly.',
    rating: 5,
    program: 'Weight Loss & Wellness'
  },
  {
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'David Chen',
    age: '45',
    achievement: 'Recovered from chronic back pain',
    text: 'The integrated approach to physical therapy and strength training helped me overcome years of chronic back pain. The ability to consult with both my PT and trainer in the same platform is incredibly convenient.',
    rating: 5,
    program: 'Rehabilitation & Strength'
  },
  {
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'Maria Santos',
    age: '28',
    achievement: 'Completed first marathon',
    text: 'From couch to marathon - the personalized training program and regular health monitoring made it possible. Having medical support throughout my training journey gave me the confidence to push my limits safely.',
    rating: 5,
    program: 'Endurance Training'
  }
];

// Populate experts
function populateExperts() {
  const container = document.getElementById('experts-grid');
  if (container) {
    experts.forEach(expert => {
      const element = document.createElement('div');
      element.className = 'bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-2';
      element.innerHTML = `
        <div class="relative mb-4">
          <img src="${expert.image}" alt="${expert.name}" class="w-full h-64 object-cover rounded-lg">
          <div class="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            ${expert.availability}
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-1">${expert.name}</h3>
        <p class="text-blue-600 font-medium mb-1">${expert.role}</p>
        <p class="text-gray-600 mb-3">${expert.specialty}</p>
        <div class="flex items-center mb-3">
          <i data-lucide="star" class="h-5 w-5 text-yellow-400"></i>
          <span class="ml-1 text-gray-700">${expert.rating} (${expert.reviews} reviews)</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          ${expert.certifications.map(cert => `
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">${cert}</span>
          `).join('')}
        </div>
        <button class="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
          Book Session
        </button>
      `;
      container.appendChild(element);
    });
  }
}

// Populate testimonials
function populateTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (container) {
    testimonials.forEach(testimonial => {
      const element = document.createElement('div');
      element.className = 'bg-white p-8 rounded-xl shadow-sm testimonial-card';
      element.innerHTML = `
        <div class="flex items-center mb-6">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full object-cover">
          <div class="ml-4">
            <h4 class="font-semibold text-lg">${testimonial.name}</h4>
            <p class="text-gray-600">${testimonial.age} years old</p>
            <div class="flex text-yellow-400 mt-1">
              ${Array(testimonial.rating).fill('★').join('')}
            </div>
          </div>
        </div>
        <div class="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg mb-4 inline-block">
          ${testimonial.achievement}
        </div>
        <p class="text-gray-600 mb-4">"${testimonial.text}"</p>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span class="text-sm text-gray-500">Program:</span>
          <span class="text-sm font-medium text-blue-600">${testimonial.program}</span>
        </div>
      `;
      container.appendChild(element);
    });
  }
}

// Initialize sections
document.addEventListener('DOMContentLoaded', () => {
  populateExperts();
  populateTestimonials();
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize Lucide icons after dynamic content
  lucide.createIcons();
});
