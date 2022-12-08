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
    length: {
      name: "length",
    },
    width: {
      name: "width",
    },
    height: {
      name: "height",
    },
    volume: {
      name: "volume",
    },
    product_types: {
      name: "product_types",
      errorMsg: "Ce champ est obligatoire",
    },
    entries_frequency: {
      name: "entries_frequency",
    },
    entries_quantity: {
      name: "entries_quantity",
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