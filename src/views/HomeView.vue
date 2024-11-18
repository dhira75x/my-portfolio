<script setup>
import UbuntuTerminal from "../components/UbuntuTerminal.vue";
import ChooseLanguage from "../components/ChooseLanguage.vue";
import { useMainStore } from "../stores/mainStore";

const mainStore = useMainStore();
</script>

<template>
  <div>
    <h1 class="main-title">Hi there 👋, I'm Phareedah</h1>

    <ChooseLanguage />

    <h2 class="sub-title">
      * {{ mainStore.language === "en" ? "About me" : "À propos de moi" }} *
    </h2>

    <div v-if="mainStore.language === 'en'" class="text-justify">
      <p>
        Welcome to my portfolio! I'm
        <strong class="text-indigo-500">Abdul Farida Francisca</strong>, a web
        developer with a passion for learning and creating. I'm mainly
        interested in web technologies,
        <strong class="text-amber-500">Angular.js</strong> and
        <strong class="text-amber-500">Vue.js</strong> are my Frameworks of
        choice. I'm currently learning
        <strong class="text-amber-500">.Node.js</strong> with
        <strong class="text-amber-500">Golang</strong>, and improve my knowledge
        with <strong class="text-amber-500">React.js</strong>.
      </p>
      <p class="mt-4">
        As a front-end developer, I’m passionate about creating intuitive and
        visually appealing web applications. The front-end is where users engage
        with a product, and I find great satisfaction in crafting seamless,
        interactive experiences that captivate and delight. I enjoy building
        applications from the ground up, ensuring they are not only functional
        but also aesthetically pleasing. My goal is to create solutions that are
        useful to a wide audience, contributing to society by making technology
        more accessible and engaging for everyone.
      </p>
      <!-- <p class="mt-4">
        I'm currently working on my personal projects, which you can discover by
        visiting the projects page.
      </p>
      <p class="mt-4">
        I'm currently looking for a full-time position in web development, where
        I can use my skills and knowledge to create amazing things. If you're
        interested in working with me, please feel free to reach out. I'm always
        happy to discuss potential projects and opportunities.
      </p> -->
    </div>
    <div v-else-if="mainStore.language === 'fr'" class="text-justify">
      <p>
        Bienvenue sur mon portfolio! Je suis
        <strong class="text-indigo-500">Phareedah</strong>, un développeur web
        junior passionné par l'apprentissage et la création. Je suis
        principalement intéressé par les technologies web,
        <strong class="text-amber-500">Symfony</strong> et
        <strong class="text-amber-500">Vue.js</strong> sont mes frameworks de
        prédilection. Je suis actuellement en train d'apprendre
        <strong class="text-amber-500">.NET</strong> avec
        <strong class="text-amber-500">C#</strong>, et je perfectionne mes
        connaissances concernant
        <strong class="text-amber-500">React.js</strong>.
      </p>
      <p class="mt-4">
        En tant que développeur front-end, je suis passionné par la création
        intuitive et applications Web visuellement attrayantes. Le front-end est
        l'endroit où les utilisateurs s'engagent avec un produit, et je trouve
        une grande satisfaction à fabriquer sans couture, des expériences
        interactives qui captivent et ravissent. J'aime construire applications
        à partir de zéro, en garantissant qu'elles ne sont pas seulement
        fonctionnelles mais aussi esthétique. Mon objectif est de créer des
        solutions qui sont utile à un large public, contribuant à la société en
        rendant la technologie plus accessible et engageant pour tout le monde.
      </p>
      <!-- <p class="mt-4">
        Je travaille actuellement sur mes projets personnels, que vous pouvez
        découvrir en visitant la page des projets.
      </p>
      <p class="mt-4">
        Je suis actuellement à la recherche d'un poste à temps plein en tant que
        développeur web junior. Si mon profile vous intéresse, n'hésitez pas à
        me contacter. Je suis toujours heureux de discuter de projets potentiels
        et d'opportunités.
      </p> -->
    </div>
    <div v-else class="text-justify">
      <p>
        nae poteupollio-e osin geos-eul hwan-yeonghabnida! jeoneun hagseubgwa
        changjag-e daehan yeoljeong-eul jinin web gaebalja
        <strong class="text-indigo-500"> Abdul Farida Franciscaibnida </strong>.
        jeoneun julo web gisul-e gwansim-i issneunde,<strong
          class="text-amber-500"
          >Angular.js</strong
        >wa <strong class="text-amber-500">Vue.js</strong>ga jega seontaeghan
        peuleim-wokeu-ibnida. jeoneun hyeonjae
        <strong class="text-amber-500">Golang-eulo</strong
        ><strong class="text-amber-500">Node.jsleul</strong> baeugo iss-eumyeo
        <strong class="text-amber-500">React.jslo</strong> jisig-eul neulligo
        issseubnida.
      </p>
      <p class="mt-4">
        jeoneun peulonteuendeu gaebaljaloseo jiggwanjeog-igo sigagjeog-eulo
        maelyeogjeog-in web aepeullikeisyeon. peuleonteuendeuneun sayongjaga
        cham-yeohaneun gos-ibnida. jepum-eul gajigo ieummae eobs-i jejaghaneunde
        keun manjoggam-eul neukkibnida. maelyeogjeog-igo jeulgeoum-eul juneun
        daehwahyeong gyeongheom. naneun geonchug-eul jeulginda
        aepeullikeisyeon-i cheoeumbuteo gineungjeog-il ppunman anila ppunman
        anila mijeog-eulodo jeulgeobseubnida. nae mogpyoneun da-eumgwa gat-eun
        sollusyeon-eul mandeuneun geos-ibnida. pogneolb-eun cheongjung-ege
        yuyonghamyeo, gisul-eul mandeul-eo sahoee gongheonhabnida. modeun
        salam-i deo swibge jeobgeunhago cham-yeohal su issseubnida.
      </p>
      <!-- <p class="mt-4">
        Je travaille actuellement sur mes projets personnels, que vous pouvez
        découvrir en visitant la page des projets.
      </p>
      <p class="mt-4">
        Je suis actuellement à la recherche d'un poste à temps plein en tant que
        développeur web junior. Si mon profile vous intéresse, n'hésitez pas à
        me contacter. Je suis toujours heureux de discuter de projets potentiels
        et d'opportunités.
      </p> -->
    </div>

    <div class="text-center text-xl text-indigo-500 mt-10">
      <p v-if="mainStore.language === 'en'">
        Thanks for taking the time to visit my portfolio. Have a nice visit!
      </p>
      <p v-else-if="mainStore.language === 'fr'">
        Merci de prendre le temps de visiter mon portfolio. Bonne visite!
      </p>
      <p v-else>
        Sigan-eul naeeo je poteupollioleul bangmunhae jusyeoseo gamsahabnida.
        jeulgeoun bangmun doeseyo!
      </p>
    </div>

    <div class="my-10 centered">
      <a
        class="btn-lg btn-amber hover:-translate-y-1"
        href="mailto:fariffarida@gmail.com"
        >Contact me!</a
      >
    </div>

    <div class="centered">
      <div
        class="border-2 border-slate-50 hover:border-amber-500 rounded-lg py-8 px-16 centered gap-x-28 duration-200"
      >
        <div>
          <p class="font-bold text-2xl">CV Frond-End Developer</p>
          <p class="mt-2">
            Need to know more about my background, download my CV.
          </p>
        </div>
        <a
          href="./cv.pdf"
          class="btn-lg btn-amber hover:-translate-y-1"
          target="_blank"
          rel="noopener noreferrer"
          >Download it!</a
        >
      </div>
    </div>

    <div class="my-10">
      <h2 class="sub-title">* Terminal *</h2>
      <p v-if="mainStore.language === 'en'">
        My idea was to create a terminal like interface to display my skills.
        There are some Easter eggs, try to find them! Execute
        <strong class="text-indigo-500">"help"</strong> command in order to
        obtain the available commands.
      </p>
      <p v-else>
        Mon idée était de créer une interface de type terminal pour montrer mes
        compétences. Il y a quelques surprises, essayez de les trouver! Exécuter
        la commande <strong class="text-indigo-500">"help"</strong> afin
        d'obtenir les commandes disponibles.
      </p>
      <div class="centered mt-10">
        <UbuntuTerminal />
      </div>
    </div>
  </div>
</template>
