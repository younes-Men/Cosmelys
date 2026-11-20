export type ProductItem = {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  gammeId: string;
  gammeName: string;
  keyIngredients: string[];
  benefits: string[];
  texture: string;
  packagingOptions: string[];
  moq: number;
  image: string;
};

export type GammeItem = {
  id: string;
  name: string;
  tabLabel: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
  products: ProductItem[];
};

export const GAMMES_DATA: GammeItem[] = [
  {
    id: "cheveux",
    name: "Gamme Capillaire & Cheveux",
    tabLabel: "Capillaire & Cheveux",
    badge: "Bestseller Salon & Retail",
    description: "Formulations professionnelles pour revitaliser, réparer et sublimer tous les types de cheveux. Sans sulfates, sans parabènes, enrichies en actifs nobles.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    highlights: ["0% Sulfates & Silicones lourds", "Enrichi en Kératine & Argan Bio", "Parfums longue tenue"],
    products: [
      {
        id: "shampoing-sans-sulfate",
        name: "Shampoing Doux Sans Sulfate",
        shortDesc: "Nettoie en douceur sans agresser le cuir chevelu. Formule nourrissante et protectrice.",
        fullDesc: "Spécialement développé pour les cheveux traités, colorés ou sensibilisés. Base lavante végétale ultra-douce qui préserve l'hydratation naturelle de la fibre capillaire.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Huile d'Argan Bio", "Protéines de Soie", "Extrait d'Aloé Vera", "Pro-Vitamine B5"],
        benefits: ["Maintient les lissages et couleurs", "Mousse onctueuse sans sulfate", "Cuir chevelu apaisé"],
        texture: "Gel fluide nacré soyeux",
        packagingOptions: ["Flacon pompe 250ml", "Flacon pompe 500ml", "Flacon disc-top 300ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "apres-shampoing-demelant",
        name: "Après-Shampoing Démêlant & Brillance",
        shortDesc: "Démêle instantanément, referme les écailles et apporte une brillance miroir.",
        fullDesc: "Formule crémeuse ultra-fondante enrichie en agents conditionneurs d'origine végétale pour un démêlage sans casse et un toucher soyeux immédiat.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Beurre de Karité", "Huile de Jojoba", "Huile d'Argan", "Phytokératine"],
        benefits: ["Facilite le coiffage", "Anti-casse et pointes renforcées", "Légèreté absolue"],
        texture: "Crème onctueuse veloutée",
        packagingOptions: ["Flacon pompe 250ml", "Tube souple 200ml", "Flacon pompe 500ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "masque-capillaire-reparateur",
        name: "Masque Capillaire Réparateur Intense",
        shortDesc: "Soin profond régénérant pour cheveux secs, abîmés ou décolorés.",
        fullDesc: "Cure de nutrition intense qui pénètre au cœur de la cuticule pour reconstruire les ponts disulfures endommagés et sceller les nutriments.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Kératine végétale hydrolysée", "Beurre de Karité brut", "Huile d'Avocat", "Vitamine E"],
        benefits: ["Réparation structurelle de la fibre", "Nutrition profonde", "Douceur extrême"],
        texture: "Beurre riche et fondant",
        packagingOptions: ["Pot cosmétique luxe 250ml", "Pot 500ml", "Pot 200ml double paroi"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1556228722-d0b71f3b39d8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "serum-capillaire-anti-frisottis",
        name: "Sérum Capillaire Anti-Frisottis & Thermoprotecteur",
        shortDesc: "Gouttes de soie protectrices contre la chaleur des fers et l'humidité.",
        fullDesc: "Élixir léger non gras qui discipline les mèches rebelles, dompte les frisottis et protège la fibre jusqu'à 230°C lors du brushing.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Huile d'Argan pure", "Huile de Camélia", "Vitamine E", "Filtres thermoprotecteurs"],
        benefits: ["Protection chaleur 230°C", "Fini non gras éclat instantané", "Discipline 48h"],
        texture: "Huile sèche soyeuse cristal",
        packagingOptions: ["Flacon pompe verre ambré 50ml", "Flacon verre transparent 100ml", "Flacon pipette luxe"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1608248597359-2c70ba93df03?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "traitement-keratine-botox",
        name: "Traitement Kératine & Botox Capillaire",
        shortDesc: "Soin rajeunissant professionnel à haute concentration d'acides aminés.",
        fullDesc: "Formule salon d'exception pour un lissage et rajeunissement spectaculaire. Repulpe la fibre capillaire affinée et élimine 100% des frisottis.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Kératine pure hydrolysée", "Acide Hyaluronique", "Acides aminés de collagène", "Huile de Pracaxi"],
        benefits: ["Effet miroir durable 3 à 5 mois", "Reconstruction en profondeur", "Brillance extrême"],
        texture: "Émulsion fluide thermo-active",
        packagingOptions: ["Flacon 500ml salon", "Flacon 1000ml professionnel", "Kit dose 120ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "gel-coiffant-naturel",
        name: "Gel & Cire Coiffante Fixation Naturelle",
        shortDesc: "Sculpte et maintient sans effet carton ni résidus blancs.",
        fullDesc: "Fixation souple ou forte à base d'actifs hydratants pour préserver la santé du cheveu tout en assurant une tenue impeccable toute la journée.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Gel d'Aloe Vera bio", "Gomme de xanthane naturelle", "Glycérine végétale", "Pro-Vitamine B5"],
        benefits: ["Zéro pellicules et zéro résidu", "Fixation longue durée", "Hydrate en sculptant"],
        texture: "Gel cristal aqueux ou pâte cire mate",
        packagingOptions: ["Pot alu 150ml", "Pot plastique 200ml", "Tube applicateur 150ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "lotion-anti-chute-romarin",
        name: "Lotion & Spray Anti-Chute au Romarin & Peptides",
        shortDesc: "Stimule la microcirculation du cuir chevelu et freine la chute de cheveux.",
        fullDesc: "Sérum aqueux fortifiant à pulvériser sur les racines. Active les follicules pileux dormants et favorise une repousse plus dense et robuste.",
        gammeId: "cheveux",
        gammeName: "Gamme Capillaire & Cheveux",
        keyIngredients: ["Hydrolat de Romarin à Cinéole", "Biotine (Vitamine B8)", "Peptides de cuivre", "Caféine"],
        benefits: ["Freine la chute réactionnelle et saisonnière", "Densifie la chevelure", "Ne graisse pas les racines"],
        texture: "Brume aqueuse vivifiante non collante",
        packagingOptions: ["Flacon spray brumisateur 100ml", "Flacon pipette 50ml", "Flacon applicateur pointe 150ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "visage",
    name: "Gamme Soins du Visage (Skincare)",
    tabLabel: "Soins Visage",
    badge: "Haute Efficacité Dermatologique",
    description: "Sérums hautement concentrés, crèmes voluptueuses et nettoyants doux pour cibler chaque préoccupation cutanée : éclat, anti-âge, acné et hydratation.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    highlights: ["Actifs purs titrés (Vit C, Hyaluronique, Niacinamide)", "Testé sous contrôle dermatologique", "Textures légères & sensorielles"],
    products: [
      {
        id: "serum-vitamine-c",
        name: "Sérum Éclat Vitamine C 15% & Acide Férulique",
        shortDesc: "Puissant antioxydant anti-taches pour un teint radieux et unifié.",
        fullDesc: "Véritable concentré de lumière, ce sérum atténue les taches pigmentaires, stimule la synthèse de collagène et protège la peau des agressions extérieures.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Vitamine C stabilisée (15%)", "Acide Férulique", "Vitamine E", "Extrait d'Acérola"],
        benefits: ["Booste l'éclat en 7 jours", "Atténue les taches brunes", "Protège contre le stress oxydatif"],
        texture: "Sérum fluide aqueux ultra-pénétrant",
        packagingOptions: ["Flacon compte-gouttes verre ambré 30ml", "Flacon pipette dépoli blanc 30ml", "Flacon airless 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "serum-acide-hyaluronique",
        name: "Sérum Acide Hyaluronique Multi-Moléculaire 2%",
        shortDesc: "Hydratation repulpante immédiate sur toutes les couches de l'épiderme.",
        fullDesc: "Formule associant 3 poids moléculaires d'acide hyaluronique pour désaltérer en surface, combler les ridules et relancer l'hydratation biologique en profondeur.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Acide Hyaluronique Haut & Bas Poids", "Panthénol B5", "Eau florale de Rose de Damas"],
        benefits: ["Repulpe les ridules de déshydratation", "Peau souple et rebondie", "Texture fraîche non collante"],
        texture: "Gel aqueux cristal transparent frais",
        packagingOptions: ["Flacon pipette verre 30ml", "Flacon compte-gouttes 50ml", "Flacon airless 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1608248597359-2c70ba93df03?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "serum-niacinamide-zinc",
        name: "Sérum Niacinamide 10% + Zinc PCA 1%",
        shortDesc: "Régule le sébum, resserre les pores et réduit les imperfections.",
        fullDesc: "Soin équilibrant ciblant les brillances, l'acné adulte ou juvénile et les rougeurs. Laisse la peau nette, matifiée et le grain de peau affiné.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Niacinamide (Vitamine B3) 10%", "Zinc PCA 1%", "Extrait d'Arbre à Thé", "Allantoïne"],
        benefits: ["Purifie et matifie", "Resserre visiblement les pores", "Calme les inflammations cutanées"],
        texture: "Fluide léger à absorption rapide",
        packagingOptions: ["Flacon compte-gouttes 30ml", "Flacon pipette verre opale 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "serum-retinol-anti-age",
        name: "Sérum Rétinol Encapsulé 0.5% & Squalane",
        shortDesc: "Régénération cellulaire nocturne et correction anti-rides puissante.",
        fullDesc: "Rétinol encapsulé pour une libération progressive sans irritation. Lisse les rides d'expression, raffermit les tissus et accélère le renouvellement épidermique.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Rétinol encapsulé 0.5%", "Squalane végétal d'Olive", "Huile de pépins de figue de barbarie"],
        benefits: ["Lisse les rides installées", "Uniformise le grain de peau", "Haute tolérance cutanée"],
        texture: "Émulsion soyeuse nutritive",
        packagingOptions: ["Flacon flacon pompe airless opaque 30ml", "Flacon verre ambré compte-gouttes 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "creme-hydratante-jour-nuit",
        name: "Crème Hydratante Veloutée Confort",
        shortDesc: "Bouclier protecteur anti-dessèchement pour une peau douce toute la journée.",
        fullDesc: "Texture enveloppante mais non comédogène, riche en céramides et huiles botaniques précieuses, pour renforcer la barrière cutanée des agressions urbaines.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Céramides NP", "Huile d'Argan Bio", "Acide Hyaluronique", "Extrait de Calendula"],
        benefits: ["Hydratation continue 24h", "Barrière cutanée renforcée", "Toucher doux velours poudré"],
        texture: "Crème fondante onctueuse",
        packagingOptions: ["Pot en verre luxe 50ml", "Flacon pompe airless 50ml", "Pot acrylique haut de gamme"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "creme-solaire-spf50",
        name: "Fluide Solaire Invisible SPF 50+ PA++++",
        shortDesc: "Très haute protection UV sans traces blanches ni fini gras.",
        fullDesc: "Formulation nouvelle génération associant filtres organiques photostables et antioxydants. Idéal sous le maquillage, résiste à l'eau et à la transpiration.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Filtres solaires large spectre UVA/UVB", "Niacinamide", "Vitamine E", "Extrait de Thé Vert"],
        benefits: ["0% traces blanches, 0% brillance", "Anti-vieillissement photo-induit", "Parfait comme base de maquillage"],
        texture: "Fluide ultra-léger toucher sec",
        packagingOptions: ["Flacon shaker 50ml", "Tube avec canule 50ml", "Flacon pompe 50ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "gel-nettoyant-visage",
        name: "Gel Nettoyant Moussant Purifiant",
        shortDesc: "Élimine maquillage, impuretés et excès de sébum sans tirailler la peau.",
        fullDesc: "Mousse aérienne au pH physiologique qui nettoie en profondeur les pores tout en préservant le film hydrolipidique protecteur.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Acide Salicylique végétal", "Eau florale d'Hamamélis", "Camomille apaisante", "Glycérine végétale"],
        benefits: ["Désobstrue les pores en douceur", "Sensation de fraîcheur nette", "Respecte le microbiome cutané"],
        texture: "Gel moussant frais au rinçage facile",
        packagingOptions: ["Flacon pompe 200ml", "Tube souple 150ml", "Flacon 250ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1556228722-d0b71f3b39d8?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "gommage-visage-eclat",
        name: "Gommage Visage Exfoliant Doux Éclat",
        shortDesc: "Désincruste les cellules mortes et lisse immédiatement le grain de peau.",
        fullDesc: "Exfoliation mécanique douce aux micro-grains de noyaux d'abricot et enzymes de fruits pour raviver le teint terne sans causer de micro-lésions.",
        gammeId: "visage",
        gammeName: "Gamme Soins du Visage (Skincare)",
        keyIngredients: ["Poudre de noyau d'Abricot micronisée", "Enzymes de Papaye", "Huile d'Amande Douce", "Miel pur"],
        benefits: ["Lisse instantanément la texture de peau", "Booste l'absorption des soins", "Teint éclatant de fraîcheur"],
        texture: "Pâte exfoliante crémeuse gourmande",
        packagingOptions: ["Pot en verre 100ml", "Tube souple 100ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "corps",
    name: "Gamme Soins du Corps & Silhouette",
    tabLabel: "Soins Corps",
    badge: "Formules Riches & Sensorielles",
    description: "Soins sensoriels pour le corps alliant nutrition intense, gommages exfoliants et huiles scintillantes aux senteurs envoûtantes orientales et florales.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    highlights: ["Senteurs signature longue durée", "Huiles végétales nobles", "Absorption rapide sans film gras"],
    products: [
      {
        id: "lait-corporel-hydratant",
        name: "Lait Corporel Hydratant Soyeux",
        shortDesc: "Hydrate intensément la peau et l'enveloppe d'un voile délicatement parfumé.",
        fullDesc: "Émulsion fluide et légère qui pénètre instantanément sans coller. Laisse la peau veloutée et parfumée aux notes d'ambre, vanille ou fleur d'oranger.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Huile d'Amande Douce", "Beurre de Karité", "Glycérine végétale", "Vitamine E"],
        benefits: ["Hydratation 48h prouvée", "Habillage immédiat sans effet gras", "Senteur raffinée"],
        texture: "Lait fluide velouté fondant",
        packagingOptions: ["Flacon pompe 250ml", "Flacon pompe 400ml", "Flacon aluminium 250ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "creme-eclaircissante-zones-sensibles",
        name: "Crème Éclaircissante Unifiante Zones Ciblées",
        shortDesc: "Uniformise le teint sur les zones de frottement (aisselles, coudes, genoux, entre-cuisses).",
        fullDesc: "Formule innovante et sécurisée sans hydroquinone pour atténuer l'hyperpigmentation frictionnelle et unifier les zones d'ombre du corps.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Alpha-Arbutine 2%", "Acide Kojique dipalmitate", "Extrait de Réglisse", "Niacinamide"],
        benefits: ["Éclaircit visiblement les zones assombries", "Adoucit les rugosités", "Formule testée sans danger"],
        texture: "Crème fondante soyeuse",
        packagingOptions: ["Tube canule 100ml", "Pot cosmétique 100ml", "Flacon pompe 150ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "gommage-corps-sucre-cafe",
        name: "Gommage Corps Gourmand au Sel & Café Arabica",
        shortDesc: "Exfolie en profondeur, tonifie les tissus et stimule la fermeté de la peau.",
        fullDesc: "Gommage énergisant associant marc de café Arabica tonifiant et cristaux de sucre enrobés d'huiles précieuses pour une peau de bébé dès la première douche.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Marc de Café Arabica pur", "Cristaux de Sucre de Canne", "Huile de Coco vierge", "Huile d'Argan"],
        benefits: ["Effet peau neuve immédiat", "Atténue l'aspect peau d'orange", "Laisse un film satiné nutritif"],
        texture: "Pâte exfoliante granuleuse riche en huiles",
        packagingOptions: ["Pot cristal PET 250ml", "Pot aluminium 200ml", "Pot verre 300ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1519735777090-ec97164dc2a0?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "huile-scintillante-pailletee",
        name: "Huile Sèche Scintillante Dorée Sublimatrice",
        shortDesc: "Sublime le bronzage et la peau avec de fines nacres dorées et cuivrées.",
        fullDesc: "Inspirée du soleil marocain, cette huile sèche illumine le décolleté, les bras et les jambes tout en nourrissant intensément sans jamais tacher les vêtements.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Nacres minérales naturelles dorées", "Huile d'Argan Bio", "Huile de Macadamia", "Parfum Ambre Solaire"],
        benefits: ["Reflets dorés féeriques", "Fini sec et soyeux instantané", "Parfum captivant"],
        texture: "Huile sèche fluide scintillante",
        packagingOptions: ["Flacon rectangulaire verre luxe 50ml", "Flacon spray verre 100ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1608248597359-2c70ba93df03?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "gel-douche-parfume",
        name: "Gel Douche Parfumé & Surgras Sans Sulfate",
        shortDesc: "Une mousse généreuse qui lave tout en laissant un sillage parfumé irrésistible.",
        fullDesc: "Base lavante enrichie en agents surgraissants pour nettoyer sans dessécher même les peaux les plus sensibles sous la douche.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Glycérine végétale", "Extrait de Fleur d'Oranger", "Pro-Vitamine B5"],
        benefits: ["Mousse riche et enveloppante", "Ne tiraille pas", "Notes olfactives orientales prestigieuses"],
        texture: "Gel onctueux moussant ambré",
        packagingOptions: ["Flacon pompe 300ml", "Flacon disc-top 500ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "deodorant-naturel-baume",
        name: "Déodorant Naturel Efficacité 24h",
        shortDesc: "Protège des odeurs sans bloquer la transpiration naturelle.",
        fullDesc: "Sans aluminium, sans alcool, sans parabènes. Formule crémeuse ou roll-on enrichie en poudres végétales absorbantes et huiles essentielles purifiantes.",
        gammeId: "corps",
        gammeName: "Gamme Soins du Corps & Silhouette",
        keyIngredients: ["Poudre de Marante (Arrow-root)", "Oxyde de Zinc", "Huile de Coco Bio", "Huile essentielle de Palmarosa"],
        benefits: ["Neutralise les odeurs toute la journée", "Respecte les aisselles sensibles", "Sans traces blanches"],
        texture: "Baume fondant poudré ou stick solide",
        packagingOptions: ["Stick roll-on 50ml", "Pot aluminium 50g", "Stick push-up carton biodégradable"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1556228722-d0b71f3b39d8?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "hammam",
    name: "Gamme Traditionnelle & Hammam Marocain",
    tabLabel: "Hammam & Traditionnel",
    badge: "Trésors du Patrimoine Marocain",
    description: "Les rituels ancestraux du Hammam et de la beauté marocaine sublimés dans des formules pures, certifiées biologiques et conformes aux standards internationaux.",
    image: "https://images.unsplash.com/photo-1512290900672-1f5be50cb89a?auto=format&fit=crop&w=800&q=80",
    highlights: ["100% Matières premières marocaines d'origine contrôlée", "Argan & Figue de barbarie première pression à froid", "Idéal pour l'export & spas"],
    products: [
      {
        id: "savon-noir-eucalyptus",
        name: "Savon Noir Traditionnel à l'Eucalyptus & Huile d'Argan",
        shortDesc: "Pâte lavante végétale emblématique du Hammam pour préparer la peau au gommage.",
        fullDesc: "Fabriqué à base d'olives noires pressées et enrichi en huile essentielle d'eucalyptus globulus. Ramollit les cellules mortes et purifie en profondeur.",
        gammeId: "hammam",
        gammeName: "Gamme Traditionnelle & Hammam Marocain",
        keyIngredients: ["Huile d'Olive noire saponifiée", "Huile essentielle d'Eucalyptus", "Huile d'Argan Bio"],
        benefits: ["Élimine les toxines et impuretés", "Rend la peau incroyablement douce", "Ouvre les voies respiratoires"],
        texture: "Pâte végétale onctueuse ambrée sombre",
        packagingOptions: ["Pot cosmétique 200g", "Pot 500g format spa", "Seau professionnel 1kg"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1512290900672-1f5be50cb89a?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "huile-argan-pure-bio",
        name: "Huile d'Argan Pure Vierge Extra Bio Cosmétique",
        shortDesc: "L'or liquide marocain extrait par première pression à froid dans le Souss.",
        fullDesc: "Huile d'argan 100% pure et vierge non torréfiée, garantie sans additifs. Véritable trésor anti-âge riche en vitamine E et acides gras insaturés (Oméga 6 et 9).",
        gammeId: "hammam",
        gammeName: "Gamme Traditionnelle & Hammam Marocain",
        keyIngredients: ["100% Argania Spinosa Kernel Oil vierge biologique"],
        benefits: ["Anti-rides puissant et régénérant", "Fortifie ongles et cheveux", "Certifiable Bio & ECOCERT"],
        texture: "Huile dorée soyeuse au parfum subtil de noisette",
        packagingOptions: ["Flacon pipette verre ambré 50ml", "Flacon spray verre 100ml", "Flacon luxe 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1608248597359-2c70ba93df03?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "huile-figue-barbarie-pure",
        name: "Huile de Pépins de Figue de Barbarie Pure (Élixir Rare)",
        shortDesc: "L'élixir anti-âge le plus convoité et le plus puissant au monde.",
        fullDesc: "Nécessite près d'une tonne de fruits pour extraire un seul litre d'huile. Teneur record en stérols et vitamine E pour lifter le contour des yeux et lisser les rides profondes.",
        gammeId: "hammam",
        gammeName: "Gamme Traditionnelle & Hammam Marocain",
        keyIngredients: ["100% Opuntia Ficus-Indica Seed Oil pure première pression"],
        benefits: ["Effet liftant et raffermissant immédiat", "Efface cernes et poches sous les yeux", "Anti-âge naturel d'exception"],
        texture: "Huile fine non grasse à pénétration instantanée",
        packagingOptions: ["Flacon compte-gouttes verre luxe 15ml", "Flacon pipette 30ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rhassoul-mineral-atlas",
        name: "Rhassoul Minéral Purifié de l'Atlas aux 7 Plantes",
        shortDesc: "Argile volcanique naturelle saponifère qui absorbe les impuretés.",
        fullDesc: "Exploité exclusivement au Maroc dans la région de Missour. Purifié et broyé en poudre ultrafine pour des masques visage, corps et cataplasmes capillaires purifiants.",
        gammeId: "hammam",
        gammeName: "Gamme Traditionnelle & Hammam Marocain",
        keyIngredients: ["Argile Ghassoul naturelle", "Extrait de Romarin, Thym, Lavande, Myrte, Clou de Girofle"],
        benefits: ["Régule l'excès de sébum", "Nettoie sans décaper", "Donne du volume aux racines de cheveux"],
        texture: "Poudre micronisée fine ou pâte prête à l'emploi",
        packagingOptions: ["Sachet kraft hermétique 250g", "Pot cosmétique 300g"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "eau-de-rose-distillee",
        name: "Eau de Rose Pure Distillée de Kelaat M'Gouna",
        shortDesc: "Hydrolat pur de Rose de Damas, tonifiant et rafraîchissant.",
        fullDesc: "Obtenue par distillation traditionnelle à la vapeur d'eau des pétales de roses fraîches cueillies à l'aube dans la Vallée des Roses. Tonique idéal matin et soir.",
        gammeId: "hammam",
        gammeName: "Gamme Traditionnelle & Hammam Marocain",
        keyIngredients: ["100% Rosa Damascena Flower Water pure sans alcool"],
        benefits: ["Resserre les pores et tonifie l'épiderme", "Apaise les rougeurs", "Parfum floral naturel délicat"],
        texture: "Hydrolat aqueux brumisable pur",
        packagingOptions: ["Flacon spray brume 100ml", "Flacon spray verre 200ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  {
    id: "homme",
    name: "Gamme Soins Homme & Barbe",
    tabLabel: "Homme & Barbe",
    badge: "Grooming & Barberie Moderne",
    description: "Formules adaptées aux spécificités de la peau masculine et des poils de barbe : textures légères, absorptions rapides et parfums boisés et frais.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    highlights: ["Senteurs viriles (Cèdre, Santal, Ambre)", "Formules légères zéro brillance", "Entretien barbe & rasage"],
    products: [
      {
        id: "huile-a-barbe-nourrissante",
        name: "Huile à Barbe Adoucissante & Parfûmée",
        shortDesc: "Discipline le poil, adoucit et nourrit la peau en dessous sans graisser.",
        fullDesc: "Mélange d'huiles végétales précieuses (Jojoba, Argan, Ricin) pour favoriser la pousse saine d'une barbe dense, soyeuse et délicatement parfumée au bois de cèdre.",
        gammeId: "homme",
        gammeName: "Gamme Soins Homme & Barbe",
        keyIngredients: ["Huile de Ricin fortifiante", "Huile d'Argan Bio", "Huile de Jojoba", "Huile essentielle de Bois de Cèdre"],
        benefits: ["Élimine les démangeaisons de la barbe", "Assouplit les poils drus", "Parfum masculin boisé élégant"],
        texture: "Huile fine toucher sec",
        packagingOptions: ["Flacon pipette verre noir mat 30ml", "Flacon compte-gouttes 50ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "shampoing-barbe-visage",
        name: "Shampoing 2-en-1 Barbe & Visage",
        shortDesc: "Purifie les poils de barbe et nettoie la peau en douceur au quotidien.",
        fullDesc: "Formule purifiante au charbon actif et menthol pour rafraîchir le visage, éliminer les impuretés et prévenir les poils incarnés.",
        gammeId: "homme",
        gammeName: "Gamme Soins Homme & Barbe",
        keyIngredients: ["Charbon Végétal Binchotan", "Extrait de Menthe poivrée", "Aloe Vera", "Allantoïne"],
        benefits: ["Barbe propre et désodorisée", "Effet coup de frais immédiat", "Prévient les irritations"],
        texture: "Gel fluide noir purifiant",
        packagingOptions: ["Flacon pompe noir 200ml", "Tube noir mat 150ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "baume-apres-rasage-apaisant",
        name: "Baume Après-Rasage Anti-Feu du Rasoir",
        shortDesc: "Calme instantanément les brûlures du rasage et hydrate intensément.",
        fullDesc: "Soin fluide apaisant sans alcool qui répare la barrière cutanée immédiatement après le rasage tout en laissant un fini mat et protecteur.",
        gammeId: "homme",
        gammeName: "Gamme Soins Homme & Barbe",
        keyIngredients: ["Bisabolol apaisant", "Panthénol B5", "Beurre de Karité", "Extrait de Calendula"],
        benefits: ["Stoppe le feu du rasoir", "Zéro bouton de rasage", "Fini mat non luisant"],
        texture: "Baume émulsion fluide fraîche",
        packagingOptions: ["Flacon pompe airless 100ml", "Flacon verre dépoli 100ml"],
        moq: 50,
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
];

// Helper to get all products in a flat list
export const ALL_PRODUCTS: ProductItem[] = GAMMES_DATA.flatMap(g => g.products);

// Quantity tier options for quote builder
export const QUANTITY_TIERS = [
  { value: "50", label: "50 unités (Idéal pour tester votre marché)" },
  { value: "100", label: "100 unités (Lancement de marque recommandé)" },
  { value: "250", label: "250 unités (Tarif préférentiel)" },
  { value: "500", label: "500 unités (Production moyenne série)" },
  { value: "1000", label: "1 000 unités (Grande série économique)" },
  { value: "2500+", label: "2 500+ unités (Marque établie / Export)" }
];
