// Données communes des 8 activités obligatoires - Cap Bon Explorer
const ACTIVITES = [
  {
    id: "A01",
    titre: "Découverte de la médina - Nabeul",
    lieu: "Nabeul",
    categorie: "Culture",
    duree: "2 h",
    prix: 20,
    image: "images/a01.svg",
    alt: "Illustration de la médina de Nabeul",
    accroche: "Balade guidée au cœur des ruelles historiques et des souks traditionnels de Nabeul.",
    description: "Partez à la découverte de l'ancienne médina de Nabeul accompagnés d'un guide local passionné. Vous visiterez les portes historiques, les souks animés et les ateliers traditionnels qui font la renommée de la ville. Cette visite permet de comprendre l'histoire et l'architecture authentique du Cap Bon."
  },
  {
    id: "A02",
    titre: "Atelier d'initiation à la poterie - Nabeul",
    lieu: "Nabeul",
    categorie: "Artisanat",
    duree: "1 h 30",
    prix: 35,
    image: "images/a02.svg",
    alt: "Illustration d'un atelier de poterie à Nabeul",
    accroche: "Apprenez à façonner l'argile sur un tour traditionnel avec un maître potier.",
    description: "Plongez dans le savoir-faire ancestral des potiers de Nabeul lors d'un atelier pratique de 90 minutes. Après une présentation des techniques de préparation de l'argile, vous réaliserez votre propre pièce sur le tour. Chacun repart avec un souvenir artisanal façonné de ses propres mains."
  },
  {
    id: "A03",
    titre: "Parcours découverte de Kerkouane - Kerkouane",
    lieu: "Kerkouane",
    categorie: "Culture",
    duree: "2 h 30",
    prix: 30,
    image: "images/a03.svg",
    alt: "Illustration du site archéologique de Kerkouane",
    accroche: "Exploration du célèbre site archéologique punique classé au patrimoine mondial.",
    description: "Visitez les vestiges remarquablement conservés de la cité punique de Kerkouane face à la mer Méditerranée. Le parcours commenté dévoile l'organisation des habitations, les thermes antiques et les mosaïques emblématiques. Une immersion culturelle incontournable au nord-est du Cap Bon."
  },
  {
    id: "A04",
    titre: "Randonnée découverte - Djebel Abderrahmane",
    lieu: "Djebel Abderrahmane",
    categorie: "Nature",
    duree: "3 h",
    prix: 25,
    image: "images/a04.svg",
    alt: "Illustration d'une randonnée au Djebel Abderrahmane",
    accroche: "Marche en pleine nature offrant des panoramas exceptionnels sur toute la péninsule.",
    description: "Parcourez les sentiers forestiers du Djebel Abderrahmane lors d'une randonnée accessible à tous les amateurs de plein air. Vous observerez la flore méditerranéenne locale tout en profitant de points de vue dégagés sur les deux versants du Cap Bon. Pensez à prévoir des chaussures de marche et de l'eau."
  },
  {
    id: "A05",
    titre: "Circuit du littoral - Kélibia",
    lieu: "Kélibia",
    categorie: "Nature",
    duree: "3 h",
    prix: 40,
    image: "images/a05.svg",
    alt: "Illustration du littoral et de la plage de Kélibia",
    accroche: "Excursion côtière entre criques sauvages, eaux turquoise et vue sur le fort de Kélibia.",
    description: "Découvrez les plus beaux paysages maritimes de Kélibia à travers un circuit commenté le long du littoral. L'itinéraire longe des plages de sable fin, des falaises rocheuses et offre un panorama unique sur la forteresse historique. Cette sortie allie détente, observation côtière et grand air."
  },
  {
    id: "A06",
    titre: "Peinture sur céramique - Nabeul",
    lieu: "Nabeul",
    categorie: "Artisanat",
    duree: "2 h",
    prix: 25,
    image: "images/a06.svg",
    alt: "Illustration de peinture sur céramique à Nabeul",
    accroche: "Initiez-vous aux motifs floraux et géométriques traditionnels de la céramique nabeulienne.",
    description: "Dans un atelier lumineux de Nabeul, découvrez l'art délicat de la décoration sur faïence émaillée. Vous apprendrez à manier les pinceaux fins et à associer les couleurs emblématiques bleu, jaune et vert. Votre assiette ou carreau décoré sera ensuite préparé selon la tradition locale."
  },
  {
    id: "A07",
    titre: "Découverte d'un marché local - Nabeul",
    lieu: "Nabeul",
    categorie: "Découverte",
    duree: "1 h 30",
    prix: 15,
    image: "images/a07.svg",
    alt: "Illustration du marché local de Nabeul",
    accroche: "Immersion sensorielle parmi les étals d'épices, d'agrumes, de fleurs d'oranger et d'artisanat.",
    description: "Accompagnés d'un animateur local, parcourez les allées colorées du marché hebdomadaire de Nabeul. Vous découvrirez les produits du terroir comme l'harissa artisanale, les épices parfumées et les spécialités de saison. Une expérience conviviale pour rencontrer les producteurs de la région."
  },
  {
    id: "A08",
    titre: "Promenade photographique - Hammamet",
    lieu: "Hammamet",
    categorie: "Découverte",
    duree: "2 h",
    prix: 30,
    image: "images/a08.svg",
    alt: "Illustration d'une promenade photographique à Hammamet",
    accroche: "Capturez la lumière unique des remparts, des ruelles blanches et du port de Hammamet.",
    description: "Suivez un parcours conçu pour les passionnés de photo, débutants ou confirmés, dans le vieux Hammamet. Des remparts dominant la mer aux portes bleues fleuries, chaque arrêt permet de travailler le cadrage et la lumière naturelle. L'activité se réalise aussi bien avec un smartphone qu'un appareil photo."
  }
];

// Gestion du mini-formulaire de contact sur contact.html (si présent)
document.addEventListener("DOMContentLoaded", function () {
  const formContact = document.getElementById("formContact");
  if (formContact) {
    formContact.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const retour = document.getElementById("retourContact");
      formContact.classList.add("was-validated");

      if (!formContact.checkValidity()) {
        retour.className = "alert alert-danger mt-3";
        retour.textContent = "Veuillez remplir correctement tous les champs obligatoires.";
        return;
      }

      const nom = document.getElementById("contactNom").value.trim();
      retour.className = "alert alert-success mt-3";
      retour.textContent = "Merci " + nom + " ! Votre message a bien été enregistré localement (simulation pédagogique).";
      formContact.reset();
      formContact.classList.remove("was-validated");
    });
  }
});
