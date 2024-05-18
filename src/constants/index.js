import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitIcon5,
  benefitImage2,
  chromecast,
  disc02,
  facebook,
  file02,
  homeSmile,
  instagram,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  telegram,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/#",
  },
  {
    id: "1",
    title: "Studio",
    url: "/home",
  },
  {
    id: "2",
    title: "Discover",
    url: "/discover",
  },
  {
    id: "3",
    title: "New account",
    url: "/signup",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const musicLabServices = [
  "Virtual Rooms",
  "Virtual Instruments",
  "Integrated Chat Feature",
  "Seamless Recording and Export",
];

export const musciLabServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Real-time Collaboration",
    text: "Real-time features to enable musicians to collaborate synchronously on music creation from different locations.",
    date: "May 2024",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Virtual Instruments Integration",
    text: "A variety of virtual instruments to allow musicians to play and record music remotely.",
    date: "May 2024",
    status: "done",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Recording and Download",
    text: "Users can record and share audio files, facilitating collaborative music creation using personalized sounds.",
    date: "May 2024",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Chat Feature",
    text: "Chat feature integrated within the platform to facilitate communication and feedback sharing among collaborating musicians.",
    date: "May 2024",
    status: "done",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

// export const collabApps = [

//   {
//     id: "1",
//     title: "Notion",
//     icon: notion,
//     width: 34,
//     height: 36,
//   },
//   {
//     id: "3",
//     title: " ",
//     icon:  ,
//     width: 34,
//     height: 35,
//   },
//   {
//     id: "4",
//     title: "Photoshop",
//     icon: photoshop,
//     width: 34,
//     height: 34,
//   },
//   {
//     id: "5",
//     title: "Protopie",
//     icon: protopie,
//     width: 34,
//     height: 34,
//   },
//   {
//     id: "7",
//     title: "Raindrop",
//     icon: raindrop,
//     width: 38,
//     height: 32,
//   },
// ];

// export const pricing = [
//   {
//     id: "0",
//     title: "Basic",
//     description: "AI chatbot, personalized recommendations",
//     price: "0",
//     features: [
//       "An AI chatbot that can understand your queries",
//       "Personalized recommendations based on your preferences",
//       "Ability to explore the app and its features without any cost",
//     ],
//   },
//   {
//     id: "1",
//     title: "Premium",
//     description: "Advanced AI chatbot, priority support, analytics dashboard",
//     price: "9.99",
//     features: [
//       "An advanced AI chatbot that can understand complex queries",
//       "An analytics dashboard to track your conversations",
//       "Priority support to solve issues quickly",
//     ],
//   },
//   {
//     id: "2",
//     title: "Enterprise",
//     description: "Custom AI chatbot, advanced analytics, dedicated account",
//     price: null,
//     features: [
//       "An AI chatbot that can understand your queries",
//       "Personalized recommendations based on your preferences",
//       "Ability to explore the app and its features without any cost",
//     ],
//   },
// ];

export const benefits = [
  {
    id: "0",
    title: "Real-time Collaboration",
    text: "Create music together remotely in real-time with virtual rooms and instruments.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Effortless Creation",
    text: "Compose and collaborate seamlessly using virtual instruments.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Integrated Communication",
    text: "Stay connected with real-time chat features for instant feedback and communication.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Efficient Recording and Export",
    text: "Record and export your compositions effortlessly for sharing and distribution.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Enhanced Collaboration",
    text: "Utilize real-time collaboration tools and virtual rooms to enhance musical creativity.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Seamless Sharing",
    text: "Share your recorded audio with the public and get noticed",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon5,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "1",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "2",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "3",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
