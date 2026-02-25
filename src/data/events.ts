import event1 from "@/assets/events/event-1.jpg";
import event2 from "@/assets/events/mock_placements.jpeg";
import event4 from "@/assets/events/mock_final.jpeg";
import event3 from "@/assets/events/event-3.jpg";
import resume1 from "@/assets/events/resume_build.jpeg";
import resume2 from "@/assets/events/resume_build1.jpeg";
import resume3 from "@/assets/events/resume_build3.jpeg";
import web1 from "@/assets/events/web_sesh1.jpeg";
import web2 from "@/assets/events/web_sesh2.jpeg";
import web3 from "@/assets/events/web_sesh3.jpeg";
import Aiimg from "@/assets/events/AIML.jpeg"
import solution_challenge from "@/assets/events/solution_challenge.jpeg";
import kickstart from "@/assets/events/kickstart.webp";
import gcp from "@/assets/events/gcp.png";
import web from "@/assets/events/web.jpg";
import cyrrup from "@/assets/events/cyrrup.png";

export const nextEvent = {
  title: "Mock Placement Drive",
  date: "Feb 20-21, 2026",
  description: "Simulating real-world placement scenarios to prepare you for success.",
}

export const allEvents = [
  {
    title: "Mock Placement Drive",
    date: "Feb 20-21, 2026",
    description:
      "Simulating real-world placement scenarios to prepare you for success.",
    descriptionLong: "Our Mock Placement Drive is designed to give students a realistic experience of the recruitment process. This two-day event includes aptitude tests, technical interviews, and HR rounds, all conducted by industry experts and senior students. It's a perfect opportunity to identify your strengths and work on your weaknesses before the actual placement season begins.",
    image: event4,
    gallery: [event4, event2],
    upcoming: true,
    color: "google-blue",
  },
  {
    title: "Resume Building Session",
    date: "February 13, 2026",
    description:
      "Learn how to craft a perfect resume to crack top tech companies.",
    descriptionLong: "In this comprehensive session, we break down the elements of a winning resume. From selecting the right template to highlighting your projects and skills effectively, our team provides personalized feedback to help you stand out to recruiters. We also touch upon LinkedIn profile optimization and cover letter writing.",
    image: resume1,
    gallery: [resume2, resume3],
    upcoming: false,
    color: "google-blue",
  },
  {
    title: "Web Dev Sessions",
    date: "Every Tue & Thu",
    description:
      "Master full-stack web development from basics to advanced frameworks.",
    descriptionLong: "Our Web Development sessions cover the entire stack, from HTML/CSS and JavaScript to modern frameworks like React and Node.js. These are hands-on workshops where you'll build real-world projects, learn best practices in frontend and backend development, and understand how to deploy your applications.",
    image: web1,
    gallery: [web1, web3],
    upcoming: true,
    color: "google-yellow",
  },
  {
    title: "AIML-DS Sessions",
    date: "Every Wed & Thu",
    description:
      "Dive deep into Artificial Intelligence, Machine Learning and Data Science.",
    descriptionLong: "Explore the fascinating world of AI, Machine Learning, and Data Science. Our sessions range from basic statistical concepts to advanced neural networks and deep learning. You'll gain practical experience using libraries like TensorFlow, PyTorch, and Scikit-learn, working on projects involving computer vision, NLP, and more.",
    image: Aiimg,
    gallery: [Aiimg],
    upcoming: true,
    color: "google-red",
  },
  {
    title: "Android Sessions",
    date: "Every Wednesday",
    description:
      "Build modern Android applications using Kotlin and Jetpack Compose.",
    descriptionLong: "Join our Android Development sessions to learn how to create beautiful and functional mobile apps. We focus on modern development using Kotlin and Jetpack Compose. You'll learn about app architecture, UI design, data persistence, and how to leverage Google Play services in your apps.",
    image: event2,
    gallery: [],
    upcoming: true,
    color: "google-green",
  },
  {
    title: "CP Sessions",
    date: "Every Mon & Fri",
    description:
      "Sharpen your algorithmic skills with Competitive Programming sessions.",
    descriptionLong: "Competitive Programming is the key to cracking technical interviews at top-tier companies. Our sessions focus on data structures, algorithms, and problem-solving techniques. We practice on platforms like Codeforces and LeetCode, and hold regular internal contests to track progress.",
    image: web2,
    gallery: [],
    upcoming: true,
    color: "google-yellow",
  },
  {
    title: "IoT Sessions",
    date: "Every Friday",
    description:
      "Explore the world of Internet of Things and Hardware projects.",
    descriptionLong: "Dive into the intersection of hardware and software. Our IoT sessions cover everything from basic electronics and Arduino/Raspberry Pi programming to connecting devices to the cloud. You'll work on projects like smart home automation, environmental monitoring systems, and more.",
    image: event3,
    gallery: [event3, kickstart, event1],
    upcoming: true,
    color: "google-blue",
  },
  {
    title: "Solution Challenge Hackathon",
    date: "9th & 10th Feb 2025",
    description:
      "A two-day internal and final evaluation hackathon where teams present projects and abstracts to solve real-world problems.",
    descriptionLong: "The Solution Challenge Hackathon is one of our flagship events. Teams work tirelessly for 48 hours to build solutions that address one or more of the United Nations' 17 Sustainable Development Goals. It's a high-energy environment with mentors on hand to guide participants through technical and design challenges.",
    image: solution_challenge,
    gallery: [solution_challenge, kickstart, event2],
    upcoming: false,
    color: "google-red",
  },
  {
    title: "GDSC CVR Kickstart Event",
    date: "15 Sept 2021",
    description:
      "In this event we introduced the GDSC club and its members to the student community and had an interactive informative session, receiving over 200 new admissions.",
    descriptionLong: "Our Kickstart event marks the beginning of each academic year's GDSC journey. We introduce our core team, discuss our goals and the events planned for the year, and showcase the benefits of joining the GDSC community. It's a great way for new students to connect with tech enthusiasts and start their professional growth.",
    image: kickstart,
    gallery: [kickstart, event1, event3],
    upcoming: false,
    color: "google-green",
  },
  {
    title: "Introduction to 30 days of google cloud",
    date: "02 Nov 2021",
    description:
      "An online webinar helping students understand the 30 Days of Google Cloud program and resolving technical issues for participants.",
    descriptionLong: "The 30 Days of Google Cloud program is a fantastic way for students to get hands-on experience with cloud technology. During this webinar, we explain the program's structure, show how to navigate the Google Cloud Skills Boost platform, and provide tips on how to successfully earn badges and complete labs.",
    image: gcp,
    gallery: [gcp, event2, event1],
    upcoming: false,
    color: "google-blue",
  },
  {
    title: "GDSC CVR World of Women kickstart",
    date: "16 Oct 2021",
    description:
      "A session conducted by the WOW team to encourage and motivate girl students by highlighting the benefits of GDSC and available team support.",
    descriptionLong: "World of Women (WOW) is an initiative to promote gender diversity in tech. This kickstart event specifically focuses on the opportunities and support systems available for women within our club and the broader tech industry. We hear from successful women in tech and discuss how to overcome common hurdles.",
    image: event3,
    gallery: [event3, kickstart, event2],
    upcoming: false,
    color: "google-red",
  },
  {
    title: "Webinar on Introduction to Web Technologies",
    date: "18 Oct 2021",
    description:
      "A 3-day intensive webinar covering Git, HTML, CSS, and Javascript, including the implementation of two hands-on projects.",
    descriptionLong: "For those just starting their web journey, this 3-day webinar provides a solid foundation. We move from the basics of HTML and CSS to dynamic programming with JavaScript and version control with Git. By the end of the webinar, participants have built and deployed their first interactive web pages.",
    image: web,
    gallery: [web, gcp, cyrrup],
    upcoming: false,
    color: "google-yellow",
  },
  {
    title: "Training by Cyrrup Solutions",
    date: "08 Nov 2021",
    description:
      "A collaborative training session on Web Development offering students the opportunity to work on real-life technical projects.",
    descriptionLong: "Through our partnership with Cyrrup Solutions, students got a unique chance to work on real industry projects. This training session focused on applying web development skills to actual business problems, providing valuable insights into professional development workflows and project management.",
    image: cyrrup,
    gallery: [cyrrup, gcp, web],
    upcoming: false,
    color: "google-green",
  },
];
