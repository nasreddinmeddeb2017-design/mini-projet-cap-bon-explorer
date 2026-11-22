// Script du simulateur de réservation (reservation.html)

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formReservation");
  const selectActivite = document.getElementById("activite");
  const inputParticipants = document.getElementById("participants");
  const inputDate = document.getElementById("dateSouhaitee");
  const btnCalculer = document.getElementById("btnCalculer");
  const btnReinitialiser = document.getElementById("btnReinitialiser");

  // Zones d'affichage des montants
  const affPrixUnitaire = document.getElementById("affPrixUnitaire");
  const affSousTotal = document.getElementById("affSousTotal");
  const affRemise = document.getElementById("affRemise");
  const affTotal = document.getElementById("affTotal");

  // Zone de messages et récapitulatif
  const zoneErreur = document.getElementById("messageErreurReservation");
  const zoneRecap = document.getElementById("recapitulatifSimulation");

  // Remplir la liste déroulante des 8 activités
  function remplirSelectActivites() {
    for (let i = 0; i < ACTIVITES.length; i++) {
      const act = ACTIVITES[i];
      const option = document.createElement("option");
      option.value = act.id;
      option.textContent = act.id + " - " + act.titre + " (" + act.prix + " TND)";
      selectActivite.appendChild(option);
    }

    // Bonus : présélectionner l'activité si passée dans l'URL (?id=A02)
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get("id");
    if (idUrl) {
      selectActivite.value = idUrl;
    }
  }

  // Trouver l'objet activité correspondant à l'ID sélectionné
  function getActiviteSelectionnee() {
    const id = selectActivite.value;
    for (let i = 0; i < ACTIVITES.length; i++) {
      if (ACTIVITES[i].id === id) {
        return ACTIVITES[i];
      }
    }
    return ACTIVITES[0];
  }

  // Calculer et mettre à jour les prix en direct
  function calculerMontants() {
    const act = getActiviteSelectionnee();
    const prixUnitaire = act ? act.prix : 0;
    let nb = parseInt(inputParticipants.value, 10);

    if (isNaN(nb) || nb < 1) {
      nb = 1;
    }

    const sousTotal = prixUnitaire * nb;
    const remise = nb >= 4 ? sousTotal * 0.10 : 0;
    const total = sousTotal - remise;

    affPrixUnitaire.textContent = prixUnitaire + " TND";
    affSousTotal.textContent = sousTotal + " TND";
    affRemise.textContent = remise + " TND";
    affTotal.textContent = total + " TND";

    return {
      activite: act,
      participants: nb,
      sousTotal: sousTotal,
      remise: remise,
      total: total
    };
  }

  // Vérifier que la date choisie n'est pas dans le passé
  function estDateValide(valeurDate) {
    if (!valeurDate) {
      return false;
    }
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    const parties = valeurDate.split("-");
    const dateChoisie = new Date(
      parseInt(parties[0], 10),
      parseInt(parties[1], 10) - 1,
      parseInt(parties[2], 10)
    );

    return dateChoisie >= aujourdhui;
  }

  // Événements de calcul dynamique
  selectActivite.addEventListener("change", calculerMontants);
  inputParticipants.addEventListener("input", calculerMontants);
  btnCalculer.addEventListener("click", calculerMontants);

  // Validation lors de la soumission du formulaire
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    zoneErreur.classList.add("d-none");
    zoneRecap.classList.add("d-none");

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const dateVal = inputDate.value;
    const nb = parseInt(inputParticipants.value, 10);
    const conditionsAcceptees = document.getElementById("conditions").checked;

    const erreurs = [];

    if (nom === "" || prenom === "") {
      erreurs.push("Le nom et le prénom sont obligatoires.");
    }
    if (!form.checkValidity() || email === "" || email.indexOf("@") === -1) {
      erreurs.push("Veuillez saisir une adresse e-mail valide.");
    }
    if (telephone === "") {
      erreurs.push("Le numéro de téléphone ne doit pas être vide.");
    }
    if (!estDateValide(dateVal)) {
      erreurs.push("La date souhaitée est obligatoire et ne doit pas être passée.");
    }
    if (isNaN(nb) || nb < 1 || nb > 6) {
      erreurs.push("Le nombre de participants doit être compris entre 1 et 6.");
    }
    if (!conditionsAcceptees) {
      erreurs.push("Vous devez accepter les conditions de simulation.");
    }

    form.classList.add("was-validated");

    if (erreurs.length > 0) {
      zoneErreur.innerHTML = "<strong>Erreur de saisie :</strong> " + erreurs[0];
      zoneErreur.classList.remove("d-none");
      return;
    }

    // Tout est valide : afficher le récapitulatif local
    const calcul = calculerMontants();
    const typeRadio = document.querySelector('input[name="typeParticipation"]:checked');
    const typeTexte = typeRadio ? typeRadio.value : "Individuel";

    document.getElementById("recapActivite").textContent = calcul.activite.titre;
    document.getElementById("recapDate").textContent = dateVal;
    document.getElementById("recapParticipants").textContent = calcul.participants + " (" + typeTexte + ")";
    document.getElementById("recapTotal").textContent = calcul.total + " TND";

    zoneRecap.classList.remove("d-none");
  });

  // Réinitialisation complète
  btnReinitialiser.addEventListener("click", function () {
    form.reset();
    form.classList.remove("was-validated");
    zoneErreur.classList.add("d-none");
    zoneRecap.classList.add("d-none");
    setTimeout(calculerMontants, 0);
  });

  remplirSelectActivites();
  calculerMontants();
});
