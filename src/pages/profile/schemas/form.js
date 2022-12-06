const form = {
  formId: "new-user-form",
  formField: {
    company: {
      name: "company",
      label: "Société",
      type: "text",
      placeholder: "eg. Google",
      errorMsg: "Veuillez entrer un nom de société",
    },
    address: {
      name: "address",
      label: "Adresse",
      type: "text",
      placeholder: "eg. 8 rue de la paix",
      errorMsg: "Veuillez indiquer une adresse.",
    },
    zipcode: {
      name: "zipcode",
      label: "Code postal",
      type: "number",
      placeholder: "75000",
      errorMsg: "Veuillez entrer un code postal.",
      invalidMsg: "Code postal non valide",
    },
    city: {
      name: "city",
      label: "Ville",
      type: "text",
      placeholder: "eg. Paris",
      errorMsg: "Veuillez indiquer une ville.",
    },
    role: {
      name: "role",
      label: "Vôtre fonction",
      type: "text",
      placeholder: "eg. Technicien",
      errorMsg: "Veuillez indiquer une fonction.",
    },
    first_name: {
      name: "first_name",
      label: "Prénom",
      type: "text",
      placeholder: "eg. Pierre",
      errorMsg: "Veuillez indiquer vôtre prénom.",
    },
    last_name: {
      name: "last_name",
      label: "Nom",
      type: "text",
      placeholder: "eg. Dupont",
      errorMsg: "Veuillez indiquer vôtre nom.",
    },
    shipping_alias: {
      name: "shipping_alias",
      label: "Nom de l'adresse de livraison",
      type: "text",
      placeholder: "eg. Mon atelier",
      errorMsg: "Veuillez indiquer le nom de l'adresse.",
    },
    shipping_address: {
      name: "shipping_address",
      label: "Adresse de livraison",
      type: "text",
      placeholder: "eg. 8 rue de la paix",
      errorMsg: "Veuillez entrer une adresse de livraison.",
    },
    shipping_zipcode: {
      name: "shipping_zipcode",
      label: "Code postal de livraison",
      type: "number",
      placeholder: "75000",
      errorMsg: "Veuillez entrer un code postal.",
      invalidMsg: "Code postal non valide.",
    },
    shipping_city: {
      name: "shipping_city",
      label: "Ville de livraison",
      type: "text",
      placeholder: "eg. Lyon",
      errorMsg: "Veuillez indiquer une ville de livraison.",
    },
    phone_number: {
      name: "phone_number",
      label: "N° de téléphone",
      type: "number",
      placeholder: "0612345678",
    },
  },
};

export default form;