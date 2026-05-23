// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Publications and manuscripts.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-presentations",
          title: "Presentations",
          description: "Research talks, posters, and project presentations.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/presentations/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Teaching, course support, and outreach instruction.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum vitae.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "talks-asu-instructor-assistant-gpt",
          title: 'ASU Instructor Assistant GPT',
          description: "",
          section: "Talks",handler: () => {
              window.location.href = "/presentations/2024/07/20/asu-instructor-assistant-gpt";
            },},{id: "talks-openmrt-image-based-human-thermal-exposure-model-for-ground-level-simulation",
          title: 'OpenMRT: Image-Based Human Thermal Exposure Model for Ground-Level Simulation',
          description: "",
          section: "Talks",handler: () => {
              window.location.href = "/presentations/2025/04/10/openmrt-thermal-exposure";
            },},{id: "talks-using-facial-emotion-recognition-to-improve-understanding-of-learning-processes",
          title: 'Using Facial Emotion Recognition to Improve Understanding of Learning Processes',
          description: "",
          section: "Talks",handler: () => {
              window.location.href = "/presentations/2025/07/15/asu-sri-emotion-recognition";
            },},{id: "teachings-cse-205-object-oriented-programming-and-data-structures",
          title: 'CSE 205: Object-Oriented Programming and Data Structures',
          description: "Course development, grading coordination, and instructional support across multi-section programming courses.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/2024-spring-cse205";
            },},{id: "teachings-cse-310-data-structures-and-algorithms",
          title: 'CSE 310: Data Structures and Algorithms',
          description: "Recitation, office hour, and algorithm walkthrough support for a large data structures cohort.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/2024-spring-cse310";
            },},{id: "teachings-intro-to-audio-engineering",
          title: 'Intro to Audio Engineering',
          description: "Project-based audio capture, signal processing, and live sound instruction for high school learners.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/2024-fall-waybright-audio";
            },},{id: "teachings-scai-robotics-camp-for-middle-and-high-school",
          title: 'SCAI Robotics Camp for Middle and High School',
          description: "Robotics programming modules for embedded systems, sensing, and iterative prototyping.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/2025-summer-robotics-camp";
            },},{id: "teachings-cse-445-distributed-software-development",
          title: 'CSE 445: Distributed Software Development',
          description: "Distributed agile team support, sprint reviews, and engineering management mentorship.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/2025-fall-cse445";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/files/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%74%77%6F%6F@%61%73%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/rtwoo", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/rtwoo", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=lK7zmLYAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
