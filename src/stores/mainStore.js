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
      website: "",
    },
    // {
    //   id: 2,
    //   name: "Virtual Crypto Wallet",
    //   description: {
    //     en: "This Vue App is a crypto virtual wallet, it allows to buy cryptocurrencies, listing crypto assets, the data comes from CoinAPI.io.",
    //     fr: "Cette application à été conçue avec le Framework Vue.js, Elle implémente les fonctionnalités de base d'un portefeuille crypto virtuel, elle permet d'acheter des crypto-monnaies, de lister des actifs crypto, les données proviennent de CoinAPI.io.",
    //   },
    //   technologies: [
    //     "Vue.js",
    //     "Vite",
    //     "Pinia",
    //     "Tailwind CSS",
    //     "Supabase",
    //     "Chart.js",
    //   ],
    //   githubUrl: "https://github.com/RyukShi/Virtual-Crypto-Wallet",
    //   website: "",
    // },
    // {
    //   id: 3,
    //   name: "Museum Of Art",
    //   description: {
    //     en: "Symfony Application to visualize data from The Metropolitan Museum of Art, located in New York, this museum is one of the largest museums in the USA.",
    //     fr: "Application Symfony pour visualiser les données du Metropolitan Museum of Art, situé à New York, ce musée est l'un des plus grands musées des États-Unis.",
    //   },
    //   technologies: ["Symfony 6", "Twig", "PHP 8.1", "PostgreSQL", "Bootstrap"],
    //   githubUrl: "https://github.com/RyukShi/Museum-Of-Art",
    //   website: "",
    // },
    // {
    //   id: 4,
    //   name: "Web Scraping Project",
    //   description: {
    //     en: "This project aims to represent in graphic form the web technologies most used in business web projects in many differents countries. The data comes mainly from jobboards: LinkedIn and Indeed.",
    //     fr: "Ce projet vise à représenter sous forme graphique les technologies web les plus utilisées dans les projets web d'entreprise dans de nombreux pays différents. Les données proviennent principalement des sites d'emploi : LinkedIn et Indeed.",
    //   },
    //   technologies: [
    //     "Python",
    //     "BeautifulSoup",
    //     "Pandas",
    //     "Plotly",
    //     "MySQL",
    //     "Jupyter-NoteBooks",
    //     "Google Cloud",
    //   ],
    //   githubUrl: "https://github.com/RyukShi/Web-Scraping-Project",
    // },
    // {
    //   id: 5,
    //   name: "What Are We Eating Tonight",
    //   description: {
    //     en: "What are we eating tonight? That's a great question! Thanks to this application, you'll never run out of inspiration for dinner, all you have to do is fill in what you have left in your fridge and you'll be presented with several recipe suggestions, click on any of them to get detailed instructions.",
    //     fr: "Qu'est- ce qu'on mange ce soir? C'est une excellente question! Grâce à cette application, vous ne serez jamais à court d'inspiration pour le dîner, il vous suffit de renseigner ce qu'il vous reste dans votre réfrigérateur et plusieurs suggestions de recettes vous seront présentées, cliquez sur l'une d'entre elles pour obtenir des instructions détaillées.",
    //   },
    //   technologies: ["React.js", "TypeScript", "Vite", "OpenAI API", "CSS"],
    //   githubUrl: "https://github.com/RyukShi/What-Are-We-Eating-Tonight",
    //   website: "",
    // },
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
