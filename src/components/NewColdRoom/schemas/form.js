const form = {
  formId: "new-cold-room-form",
  formField: {
    CFname: {
      name: "CFname",
      type:"text", 
      label:"Nom de la chambre froide",
      placeholder:"ex: CF fruits et légumes",
      errorMsg: "Ce champ est obligatoire",
    },
    temperature: {
      name: "temperature",
      type:"number",
      label:"Température (°C)",
      placeholder:"ex: 6",
      errorMsg: "Ce champ est obligatoire",
    },
    condensing_unit: {
      name: "condensing_unit",
      label: "Production frigorifique",
      errorMsg: "Vous devez choisir une option",
    },
    prod_outside: {
      name: "prod_outside",
      label: "Emplacement de la production",
      errorMsg: "Vous devez choisir une option",
    },
    refrigerant_type: {
      name: "refrigerant_type",
      type:"text",
      label:"Fluide réfrigérant",
      placeholder:"ex: R134a",
      errorMsg: "Ce champ est obligatoire",
    },
    CFlength: {
      name: "CFlength",
      type:"number",
      label:"Longueur (m)",
    },
    width: {
      name: "width",
      type:"number",
      label:"Largeur (m)",
    },
    height: {
      name: "height",
      type:"number",
      label:"Hauteur (m)",
    },
    volume: {
      name: "volume",
      type:"number",
      label:"Volume (m³)",
    },
    product_types: {
      name: "product_types",
      errorMsg: "Ce champ est obligatoire",
    },
    entries_frequency: {
      name: "entries_frequency",
      type: 'text',
      label: "Fréquence d'entrée des denrées"
    },
    entries_quantity: {
      name: "entries_quantity",
    },
    entry_temperature: {
      type: 'number',
      name: "entry_temperature",
    },
    heat_sources_power: {
      name: "heat_sources_power",
    },
    heat_sources: {
      name: "heat_sources",
    },
    comment: {
      name: "comment",
    },
  },
};

export default form;