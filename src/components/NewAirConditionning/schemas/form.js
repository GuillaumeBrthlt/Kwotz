const form = {
  formId: "new-cold-room-form",
  formField: {
    ACname: {
      name: "ACname",
      type:"text", 
      label:"Nom de la pièce",
      placeholder:"ex: Salon/séjour",
      errorMsg: "Ce champ est obligatoire",
    },
    type: {
      name: "type",
      type:"number",
      label:"unité extérieur",
      errorMsg: "Vous devez choisir une option",
    },
    current_type: {
      name: "current_type",
      type:"number",
      label:"Régime électrique",
      errorMsg: "Vous devez choisir une option",
    },
    inside_unit_type: {
      name: "inside_unit_type",
      type: "text",
      placeholder: "Gainable BSP/MSP/HSP, Cassette 600x600/900x900/ 360°, Mural, Console, Plafonnier etc…",
      label: "type d'unité intérieur",
      errorMsg: "Ce champ est obligatoire",
    },
    surface: {
      name: "surface",
      type:"number",
      label:"Surface (m²)",
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
    accessories: {
      name: "accessories",
      type: "text",
      label: "accessoires",
      placeholder: "Télécommandes IR, Commande centralisée, Kit-Wifi, Passerelle GTB,...",
    },
    comment: {
      name: "comment",
      type: "text",
      label: "commentaires",
      placeholder: "(facultatif)"
    },
  },
};

export default form;