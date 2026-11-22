// Script de gestion du catalogue d'activités (activites.html)

document.addEventListener("DOMContentLoaded", function () {
  const conteneur = document.getElementById("listeActivites");
  const champRecherche = document.getElementById("champRecherche");
  const filtreCategorie = document.getElementById("filtreCategorie");
  const compteur = document.getElementById("compteurActivites");
  const messageAucun = document.getElementById("messageAucun");

  // Éléments de la fenêtre modale
  const modalTitre = document.getElementById("modalActiviteTitre");
  const modalImage = document.getElementById("modalActiviteImage");
  const modalCategorie = document.getElementById("modalActiviteCategorie");
  const modalDuree = document.getElementById("modalActiviteDuree");
  const modalPrix = document.getElementById("modalActivitePrix");
  const modalDescription = document.getElementById("modalActiviteDescription");
  const modalLienReserver = document.getElementById("modalLienReserver");

  // Afficher la liste des cartes selon le tableau filtré
  function afficherActivites(liste) {
    conteneur.innerHTML = "";
    compteur.textContent = liste.length;

    if (liste.length === 0) {
      messageAucun.classList.remove("d-none");
      return;
    }

    messageAucun.classList.add("d-none");

    for (let i = 0; i < liste.length; i++) {
      const act = liste[i];

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-3";

      col.innerHTML =
        '<article class="card h-100 shadow-sm carte-activite">' +
          '<img src="' + act.image + '" class="card-img-top" alt="' + act.alt + '">' +
          '<div class="card-body d-flex flex-column">' +
            '<div class="d-flex justify-content-between align-items-center mb-2">' +
              '<span class="badge badge-categorie">' + act.categorie + '</span>' +
              '<small class="text-muted fw-semibold">' + act.duree + '</small>' +
            '</div>' +
            '<h2 class="card-title h5">' + act.titre + '</h2>' +
            '<p class="card-text small text-secondary">' + act.accroche + '</p>' +
            '<p class="fw-bold text-primary mt-auto mb-3">' + act.prix + ' TND / personne</p>' +
            '<div class="d-grid gap-2">' +
              '<button type="button" class="btn btn-outline-primary btn-sm btn-details" data-id="' + act.id + '" data-bs-toggle="modal" data-bs-target="#modalDetails">Voir les détails</button>' +
              '<a href="reservation.html?id=' + act.id + '" class="btn btn-capbon btn-sm">Réserver</a>' +
            '</div>' +
          '</div>' +
        '</article>';

      conteneur.appendChild(col);
    }

    // Attacher l'événement d'ouverture de détails sur chaque bouton généré
    const boutonsDetails = document.querySelectorAll(".btn-details");
    for (let j = 0; j < boutonsDetails.length; j++) {
      boutonsDetails[j].addEventListener("click", function () {
        const idChoisi = this.getAttribute("data-id");
        ouvrirDetailsActivite(idChoisi);
      });
    }
  }

  // Remplir la modale Bootstrap avec les informations de l'activité choisie
  function ouvrirDetailsActivite(id) {
    let activiteTrouvee = null;
    for (let i = 0; i < ACTIVITES.length; i++) {
      if (ACTIVITES[i].id === id) {
        activiteTrouvee = ACTIVITES[i];
        break;
      }
    }

    if (activiteTrouvee) {
      modalTitre.textContent = activiteTrouvee.titre + " (" + activiteTrouvee.id + ")";
      modalImage.src = activiteTrouvee.image;
      modalImage.alt = activiteTrouvee.alt;
      modalCategorie.textContent = activiteTrouvee.categorie;
      modalDuree.textContent = activiteTrouvee.duree;
      modalPrix.textContent = activiteTrouvee.prix + " TND";
      modalDescription.textContent = activiteTrouvee.description;
      modalLienReserver.href = "reservation.html?id=" + activiteTrouvee.id;
    }
  }

  // Filtrage combiné : catégorie + mot-clé (titre ou lieu)
  function filtrerActivites() {
    const motCle = champRecherche.value.trim().toLowerCase();
    const categorieChoisie = filtreCategorie.value;

    const resultat = [];
    for (let i = 0; i < ACTIVITES.length; i++) {
      const act = ACTIVITES[i];
      const correspondCategorie = (categorieChoisie === "Toutes") || (act.categorie === categorieChoisie);
      const correspondMotCle =
        act.titre.toLowerCase().includes(motCle) ||
        act.lieu.toLowerCase().includes(motCle);

      if (correspondCategorie && correspondMotCle) {
        resultat.push(act);
      }
    }

    afficherActivites(resultat);
  }

  champRecherche.addEventListener("input", filtrerActivites);
  filtreCategorie.addEventListener("change", filtrerActivites);

  // Affichage initial des 8 activités
  afficherActivites(ACTIVITES);
});
