import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main_store", () => {
  // set default language to english
  const language = ref("en");

  /* This array represents the all projects that I have developed */
  const projects = [
    {
      id: 1,
      name: "Recipe Paradise",
      description: {
        en: "This Web App is a recipe sharing platform. It allows users to share their recipes with other users. Users can also search for recipes according to several criteria (name, category, thematic, ingredients...). Users can also add recipes to their favorites.",
        fr: "Cette application Web est une plateforme de partage de recettes. Elle permet aux utilisateurs de partager leurs recettes favorites avec d'autres utilisateurs. Les utilisateurs peuvent rechercher des recettes suivant plusieurs critères (nom, catégorie, thématique, ingredients...). Les utilisateurs peuvent également ajouter des recettes à leurs favoris.",
        kr: "i web-aeb-eun lesipi gong-yu peullaespom-ibnida. ileul tonghae sayongjaneun jasin-ui lesipileul daleun sayongjawa gong-yuhal su issseubnida. sayongjaneun yeoleo gijun(ileum, kategoli, juje, jaelyo...)e ttala lesipileul geomsaeghal sudo issseubnida. sayongjaneun jeulgyeochajgie lesipileul chugahal sudo issseubnida.",
      },
      technologies: [
        "Laravel",
        "Vue Js",
        "JavaScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Webpack",
      ],
      githubUrl: "https://github.com/dhira75x/recipe-paradise",
      website: "https://my-recipe-nine-blond.vercel.app",
    },
    {
      id: 2,
      name: "Ovo Market Limited",
      description: {
        en: "This Vue App is a e-commerce platform for a company called Ovo Market Limited, it allows users to browse products, add them to their cart and proceed to checkout, also receive payment , allows admin to manage products, orders and users.",
        fr: "Cette application Vue.js est une plateforme de commerce électronique pour la société Ovo Market Limited. Elle permet aux utilisateurs de parcourir les produits, de les ajouter au panier, de passer à la caisse et d'effectuer le paiement. Elle offre également aux administrateurs la possibilité de gérer les produits, les commandes et les utilisateurs.",
        kr: "Vue.js aeb-eun Ovo Market Limited-rang han yeonseok gumeoro peullaespom-ibnida.Sayongja-neun sangpum-eul dulreo-bogo jangbagu-ni-e dam-eun hu gyeolje-lo jinhaeng-hal su iss-eumyeo, gyeolje sudan-eul jegong-hamnida.Ttohan gwanrija-neun sangpum, jumun, sayongja jeongbo-reul gwanri-hal su iss-seumnida.",
      },
      technologies: [
        "Vue.js",
        "Vite",
        "Pinia",
        "Tailwind CSS",
        "Supabase",
        "Chart.js",
      ],
      githubUrl: "",
      website: "https://ovomarket.ng",
    },
    {
      id: 3,
      name: "My Portfolio Website",
      description: {
        en: "This Vue App is my portfolio website to showcase my projects and skills as a developer.",
        fr: "Cette application Vue.js est mon site portfolio personnel qui met en valeur mes projets et mes compétences en tant que développeur.",
        kr: "이 Vue aeb-eun nae poteupollio websaiteu-ibnida.",
      },
      technologies: [
        "Vue.js",
        "Vite",
        "Pinia",
        "Tailwind CSS",
        "Supabase",
        "Chart.js",
      ],
      githubUrl: "",
      website: "https://my-portfolio-eight-peach-58.vercel.app/",
    },
    {
      id: 4,
      name: "Suburban Academy Project",
      description: {
        en: "This project is a learning management system (LMS) for Suburban Fiber Company, a Digital Transformation Company. The LMS allows students to access course materials, submit assignments, and track their progress. Instructors can create and manage courses, grade assignments, and communicate with students.",
        fr: "Ce projet est un système de gestion de l’apprentissage (LMS) destiné à Suburban Academy, un établissement éducatif fictif. Cette plateforme permet aux étudiants d’accéder aux supports de cours, de soumettre leurs devoirs et de suivre leur progression. Les formateurs peuvent créer et gérer des cours, noter les devoirs et communiquer avec les étudiants.",
        kr: "I peurojekteu-neun gasang-ui gyoyuk gigwan-in Suburban Academy-reul wihan hakseup gwanri siseutem(LMS)-ibnida.Haksaeng-deul-eun gangui jaryo-reul yeollam-hago, gwaje-reul jechul-hamyeo, jasin-ui hakseup jindo-reul hwagin-hal su iss-seumnida.Gangsa-neun gangui-reul saengseong-gwa gwanri-hago, gwaje-reul chaejeom-hamyeo, haksaeng-deul-gwa sotoong-hal su iss-seumnida.",
      },
      technologies: [
        "Vue.js",
        "Vite",
        "Pinia",
        "Tailwind CSS",
        "Supabase",
        "Chart.js",
      ],
      githubUrl: "",
      website: "https://suburbanacademy.ng",
    },
    {
      id: 5,
      name: "Suburban JobBoard Project",
      description: {
        en: "This project is a job board platform for Suburban Fiber Company, a fictional Digital Transformation Company. The job board allows employers to post job openings and search for qualified candidates. Job seekers can browse job listings, apply for jobs, and track their applications.",
        fr: "Ce projet est une plateforme de tableau d’emplois pour Suburban Fiber Company, une entreprise fictive spécialisée dans la transformation numérique.Cette plateforme permet aux employeurs de publier des offres d’emploi et de rechercher des candidats qualifiés. Les chercheurs d’emploi peuvent parcourir les annonces, postuler aux offres et suivre l’état de leurs candidatures.",
        kr: "I peurojekteu-neun gijeog-ui dijiteol jeonhwan saeob-eseo mandeun Suburban Fiber Company-reul wihan jigeop bodeu peullaespom-ibnida.Goyongju-neun chaneop gwanggo-reul deungnok-hago jagyeok issneun jiwonja-reul chaja-bol su issgo,gujikja-neun chaneop gonggo-reul bollam-hago jiwon-hago jiwon sangtae-reul chuge-hal su iss-seumnida.",
      },
      technologies: [
        "Vue.js",
        "Vite",
        "Pinia",
        "Tailwind CSS",
        "Supabase",
        "Chart.js",
      ],
      githubUrl: "",
      website: "https://suburbanjobs.ng",
    },
    {
      id: 6,
      name: "Vendor Portal",
      description: {
        en: "This Vue App is a vendor portal for a company called Ovo Market Limited, it allows vendors  to upload their products, keep track of orders, manage their profile and inventory management dashboard, also payment book-keeping for their orders.",
        fr: "Cette application Vue.js est un portail vendeur pour la société Ovo Market Limited. Elle permet aux vendeurs de mettre en ligne leurs produits, de suivre les commandes, de gérer leur profil et leur tableau de bord de gestion des stocks, ainsi que la comptabilité des paiements pour leurs commandes.",
        kr: "I Vue aeb-eun Ovo Market Limited-raneun hoesa-ui bendeo poteol-ibnida. Bendeo-neun sangpum-eul eomnodeu-hago, jumun-eul chujeok-hago, peuropil-gwa jaego gwanri daesibodeu-reul gwanri-hamyeo, jumun-e daehan gyeolje jangbu gwanri-do hal su iss-seumnida.",
      },
      technologies: [
        "Vue.js",
        "Vite",
        "Pinia",
        "Tailwind CSS",
        "Supabase",
        "Chart.js",
      ],
      githubUrl: "",
      website: "https://vendor.ovomarket.ng",
    },
    // {
    //   id: 6,
    //   name: "Ghibli Studio React",
    //   description: {
    //     en: "This React application allows you to see the various animated films produced by Ghibli Studio. Just click on any poster to get the details of the film.",
    //     fr: "Cette application React vous permet de voir les divers films d'animation produits par le studio Ghibli. Il vous suffit de cliquer sur l'une des affiches pour obtenir les détails du film.",
    //   },
    //   technologies: ["React.js", "Vite", "JavaScript", "CSS"],
    //   githubUrl: "https://github.com/RyukShi/Ghibli-Studio-React",
    //   website: "https://ryukshi.github.io/Ghibli-Studio-React/",
    // },
    // {
    //   id: 7,
    //   name: "Sorting Algorithms in C",
    //   description: {
    //     en: "This project graphically compares the performance of various sorting algorithms in C language.",
    //     fr: "Ce projet compare graphiquement les performances de divers algorithmes de tri en langage C.",
    //   },
    //   technologies: ["C language", "CMake", "Valgrind"],
    //   githubUrl: "https://github.com/RyukShi/Sorting-Algorithms-in-C",
    // },
  ];

  /* This object represents my skills */
  const skills = {
    hardSkills: {
      technologies: [
        { name: "TypeScript", fileName: "typescript.svg" },
        { name: "JavaScript", fileName: "javascript.svg" },
        { name: "PHP", fileName: "php.svg" },
        { name: "C-sharp", fileName: "c-sharp.svg" },
        { name: "C language", fileName: "c-language.svg" },
        { name: "Java", fileName: "java.svg" },
      ],
      webFrameworks: [
        { name: "React.js", fileName: "react-js.svg" },
        { name: "Vue.js", fileName: "vue-js.svg" },
        { name: "Symfony", fileName: "symfony.svg" },
      ],
      ui: [
        { name: "figma", fileName: "figma.svg" },
        { name: "canva", fileName: "canva.svg" },
        { name: "adobe photoshop", fileName: "photoshop.svg" },
        { name: "blender", fileName: "blender.svg" },
      ],
      cssFrameworks: [
        { name: "Tailwind CSS", fileName: "tailwind-css.svg" },
        { name: "Bootstrap", fileName: "bootstrap.svg" },
        { name: "CSS", fileName: "css.svg" },
      ],
      DBMS: [
        { name: "PostgreSQL", fileName: "postgresql.svg" },
        { name: "MySQL", fileName: "mysql.svg" },
        { name: "MongoDB", fileName: "mongodb.svg" },
      ],
    },
    softSkills: [
      {
        name: "Adaptability",
        fileName: "adaptability.svg",
        description: {
          en: "I possess the ability to adapt to various working environments and can adapt quickly to new situations.",
          fr: "Je possède la capacité de m'adapter à divers environnements de travail et je peux m'adapter rapidement à de nouvelles situations.",
        },
      },
      {
        name: "Productivity",
        fileName: "fast-working.svg",
        description: {
          en: "I'm an organized person who strives to maintain a clear and structured approach to my work.",
          fr: "Je suis une personne organisée qui s'efforce de maintenir une approche claire et structurée de mon travail.",
        },
      },
      {
        name: "Problem Solving",
        fileName: "problem-solving.svg",
        description: {
          en: "I have a natural ability to think outside of the box and come up with creative solutions to complex challenges.",
          fr: "J'ai une capacité naturelle à sortir des sentiers battus et à trouver des solutions créatives à des problèmes complexes.",
        },
      },
      {
        name: "Creativity",
        fileName: "creativity.svg",
        description: {
          en: "I bring a fresh and imaginative approach to all of my projects, and I am always open to new ideas and approaches.",
          fr: "J'apporte une approche fraîche et imaginative à tous mes projets, et je suis toujours ouverte aux nouvelles idées et approches.",
        },
      },
    ],
  };

  return { projects, skills, language };
});
