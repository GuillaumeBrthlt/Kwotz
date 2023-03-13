const form = {
  formId: "new-spare-part-form",
  formField: {
    SPname: {
      name: "SPname",
      type:"string", 
      label:"Nom/type de la pièce détachée",
      placeholder:"ex: compresseur à piston",
      errorMsg: "Ce champ est obligatoire",
    },
    brand: {
      name: "brand",
      type:"string",
      label:"Marque (facultatif)",
      placeholder:"ex: Tecumseh",
    },
    reference: {
      name: "reference",
      type: 'string',
      label: "Référence de la pièce (facultatif)",
      placeholder: "ex: TAJ2428Z"
    },
    quantity: {
      name: "quantity",
      type: 'number',
      label: "Quantité",
    },
    details: {
      name: "details",
      type:"text",
      label:"Détails",
      placeholder:"ex: Puissance 5kW, négatif",
    },
  },
};

export default form;