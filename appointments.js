// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Initialize Flatpickr
const datePicker = flatpickr("#appointment-date", {
  minDate: "today",
  maxDate: new Date().fp_incr(30), // Allow booking up to 30 days in advance
  disable: [
    function(date) {
      // Disable weekends
      return date.getDay() === 0; // Disable Sundays
    }
  ],
  onChange: function(selectedDates, dateStr) {
    updateAvailableTimeSlots(selectedDates[0]);
  }
});

// Provider data with expanded categories and specialties
const providers = {
  medical: {
    general: [
      { 
        id: 1, 
        name: 'Dr. Sarah Johnson', 
        specialty: 'General Medicine',
        schedule: 'Mon-Fri',
        expertise: ['Primary Care', 'Preventive Medicine', 'Chronic Disease Management'],
        languages: ['English', 'Spanish'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        }
      },
      { 
        id: 2, 
        name: 'Dr. James Wilson', 
        specialty: 'Family Medicine',
        schedule: 'Mon-Thu',
        expertise: ['Family Health', 'Pediatrics', 'Geriatric Care'],
        languages: ['English'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false
        }
      },
      { 
        id: 3, 
        name: 'Dr. Maria Garcia', 
        specialty: 'Internal Medicine',
        schedule: 'Tue-Sat',
        expertise: ['Adult Medicine', 'Diabetes Care', 'Heart Health'],
        languages: ['English', 'Spanish', 'Portuguese'],
        availability: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      }
    ],
    specialist: [
      { 
        id: 4, 
        name: 'Dr. Emma Rodriguez', 
        specialty: 'Sports Medicine',
        schedule: 'Mon-Fri',
        expertise: ['Sports Injuries', 'Performance Enhancement', 'Rehabilitation'],
        languages: ['English', 'Spanish'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        }
      },
      { 
        id: 5, 
        name: 'Dr. Michael Chen', 
        specialty: 'Physical Therapy',
        schedule: 'Wed-Sat',
        expertise: ['Joint Rehabilitation', 'Post-Surgery Recovery', 'Pain Management'],
        languages: ['English', 'Mandarin'],
        availability: {
          monday: false,
          tuesday: false,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      },
      { 
        id: 6, 
        name: 'Dr. David Kim', 
        specialty: 'Orthopedics',
        schedule: 'Mon-Thu',
        expertise: ['Joint Surgery', 'Sports Injuries', 'Spine Care'],
        languages: ['English', 'Korean'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false
        }
      }
    ],
    mental_health: [
      { 
        id: 7, 
        name: 'Dr. Rachel Brown', 
        specialty: 'Psychology',
        schedule: 'Mon-Fri',
        expertise: ['Anxiety', 'Depression', 'Stress Management'],
        languages: ['English'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        }
      },
      { 
        id: 8, 
        name: 'Dr. John Martinez', 
        specialty: 'Psychiatry',
        schedule: 'Wed-Sat',
        expertise: ['Mood Disorders', 'Anxiety Disorders', 'ADHD'],
        languages: ['English', 'Spanish'],
        availability: {
          monday: false,
          tuesday: false,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      }
    ]
  },
  fitness: {
    personal: [
      { 
        id: 9, 
        name: 'Mike Thompson', 
        specialty: 'Personal Training',
        schedule: 'Flexible',
        expertise: ['Weight Training', 'HIIT', 'Nutrition Planning'],
        certifications: ['NASM-CPT', 'CrossFit L2'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      },
      { 
        id: 10, 
        name: 'Lisa Chen', 
        specialty: 'Yoga & Fitness',
        schedule: 'Mon-Sat',
        expertise: ['Vinyasa Yoga', 'Power Yoga', 'Meditation'],
        certifications: ['RYT-500', 'ACE-CPT'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      }
    ],
    group: [
      { 
        id: 11, 
        name: 'Marcus Brown', 
        specialty: 'Group Fitness',
        schedule: 'Mon-Fri',
        expertise: ['Boot Camp', 'Circuit Training', 'Core Strength'],
        certifications: ['ACE-GFI', 'TRX Certified'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        }
      },
      { 
        id: 12, 
        name: 'Sarah Miller', 
        specialty: 'HIIT Training',
        schedule: 'Wed-Sun',
        expertise: ['HIIT', 'Tabata', 'Strength Conditioning'],
        certifications: ['NASM-CPT', 'HIIT Specialist'],
        availability: {
          monday: false,
          tuesday: false,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true
        }
      }
    ],
    specialized: [
      { 
        id: 13, 
        name: 'Emma Davis', 
        specialty: 'Prenatal Fitness',
        schedule: 'Tue-Sat',
        expertise: ['Prenatal Yoga', 'Postnatal Exercise', 'Safe Pregnancy Workouts'],
        certifications: ['Pre/Postnatal Fitness', 'ACE-CPT'],
        availability: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false
        }
      },
      { 
        id: 14, 
        name: 'Tom Parker', 
        specialty: 'Senior Fitness',
        schedule: 'Mon-Fri',
        expertise: ['Balance Training', 'Low Impact Exercise', 'Strength for Seniors'],
        certifications: ['Senior Fitness Specialist', 'ACE-CPT'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        }
      }
    ]
  }
};

// Time slots with availability
const timeSlots = {
  morning: [
    { time: '9:00 AM', duration: 60 },
    { time: '10:00 AM', duration: 60 },
    { time: '11:00 AM', duration: 60 }
  ],
  afternoon: [
    { time: '2:00 PM', duration: 60 },
    { time: '3:00 PM', duration: 60 },
    { time: '4:00 PM', duration: 60 },
    { time: '5:00 PM', duration: 60 }
  ],
  evening: [
    { time: '6:00 PM', duration: 60 },
    { time: '7:00 PM', duration: 60 }
  ]
};

let selectedType = null;
const appointmentTypes = document.querySelectorAll('.appointment-type');
const categorySelect = document.getElementById('appointment-category');
const providerSelect = document.getElementById('provider-select');
const timeSelect = document.getElementById('appointment-time');

// Function to update available time slots based on selected date and provider
function updateAvailableTimeSlots(date) {
  const dayOfWeek = date.getDay();
  const selectedProviderId = providerSelect.value;
  const selectedProvider = findProviderById(selectedProviderId);
  
  timeSelect.innerHTML = '<option value="">Select time</option>';
  
  if (!selectedProvider) return;

  // Get day name
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dayOfWeek];

  // Check if provider is available on this day
  if (selectedProvider.availability[dayName]) {
    // Combine all time slots
    const allTimeSlots = [
      ...timeSlots.morning,
      ...timeSlots.afternoon,
      ...timeSlots.evening
    ];

    allTimeSlots.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot.time;
      option.textContent = `${slot.time} (${slot.duration} minutes)`;
      timeSelect.appendChild(option);
    });
  }
}

// Helper function to find provider by ID
function findProviderById(id) {
  id = parseInt(id);
  for (const type in providers) {
    for (const category in providers[type]) {
      const provider = providers[type][category].find(p => p.id === id);
      if (provider) return provider;
    }
  }
  return null;
}

// Event listeners for appointment type selection
appointmentTypes.forEach(type => {
  type.addEventListener('click', () => {
    // Remove selected class from all types
    appointmentTypes.forEach(t => t.classList.remove('selected'));
    
    // Add selected class to clicked type
    type.classList.add('selected');
    selectedType = type.dataset.type;
    
    // Smooth scroll to form
    document.getElementById('appointment-form').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    updateCategoryOptions(selectedType);
  });
});

// Function to update category options based on selected type
function updateCategoryOptions(type) {
  categorySelect.innerHTML = '<option value="">Select category</option>';
  
  if (type === 'medical') {
    const categories = {
      general: 'General Consultation',
      specialist: 'Specialist Consultation',
      mental_health: 'Mental Health Services'
    };
    
    Object.entries(categories).forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      categorySelect.appendChild(option);
    });
  } else if (type === 'fitness') {
    const categories = {
      personal: 'Personal Training',
      group: 'Group Fitness Classes',
      specialized: 'Specialized Programs'
    };
    
    Object.entries(categories).forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      categorySelect.appendChild(option);
    });
  }
  
  // Reset dependent dropdowns
  providerSelect.innerHTML = '<option value="">Select provider</option>';
  timeSelect.innerHTML = '<option value="">Select time</option>';
}

// Event listener for category selection
categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;
  providerSelect.innerHTML = '<option value="">Select provider</option>';
  
  if (!category || !selectedType) return;
  
  const availableProviders = providers[selectedType][category] || [];
  
  availableProviders.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider.id;
    option.textContent = `${provider.name} - ${provider.specialty}`;
    if (provider.languages) {
      option.textContent += ` (Languages: ${provider.languages.join(', ')})`;
    }
    if (provider.certifications) {
      option.textContent += ` (${provider.certifications.join(', ')})`;
    }
    providerSelect.appendChild(option);
  });
});

// Event listener for provider selection
providerSelect.addEventListener('change', () => {
  const selectedProviderId = providerSelect.value;
  if (!selectedProviderId) return;

  const provider = findProviderById(selectedProviderId);
  if (!provider) return;

  // If a date is already selected, update the time slots
  const selectedDate = datePicker.selectedDates[0];
  if (selectedDate) {
    updateAvailableTimeSlots(selectedDate);
  }
});

// Form submission handler
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    type: selectedType,
    category: categorySelect.value,
    provider: providerSelect.options[providerSelect.selectedIndex].text,
    date: datePicker.selectedDates[0],
    time: timeSelect.value,
    notes: appointmentForm.querySelector('textarea').value
  };
  
  // Show success message
  alert(`Appointment scheduled successfully!
    Type: ${formData.type}
    Category: ${formData.category}
    Provider: ${formData.provider}
    Date: ${formData.date.toLocaleDateString()}
    Time: ${formData.time}
    
    We will send you a confirmation email shortly.`);
  
  // Reset form
  appointmentForm.reset();
  appointmentTypes.forEach(t => t.classList.remove('selected'));
  datePicker.clear();
});