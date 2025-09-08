import ShopContent from "@/components/shop/ShopContent";
import { Product } from "@/types/type";
const getAllProducts = (): Product[] => {
  return[
  {
    id: 1,
    name: "Bobines de fil multicolores",
    price: 25,
    originalPrice: 30,
    image: "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",
    rating: 4.7,
    reviews: 120,
    isNew: false,
    isOnSale: true,
    category: "Accessoires de Couture",
    material: "Polyester",
    height: "-",
    color: "Multicolore",
    inStock: true,
    description: "Un assortiment de belles bobines de fil multicolores, parfaites pour tous vos projets de couture."
  },
  {
    id: 2,
    name: "Fournitures de couture ",
    price: 40,
    image: "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
    rating: 4.5,
    reviews: 85,
    category: "Accessoires de Couture",
    material: "Mix",
    height: "-",
    color: "Multicolore",
    inStock: true,
    description: "Collection d’outils de couture (fils, boutons, etc.) idéal pour atelier et DIY."
  },
  {
    id: 3,
    name: "Fils colorés dans un tiroir",
    price: 30,
    image: "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg",
    rating: 4.8,
    reviews: 150,
    isNew: true,
    isOnSale: false,
    category: "Accessoires de Couture",
    material: "Coton",
    height: "-",
    color: "Multicolore",
    inStock: true,
    description: "Vue rapprochée de fils à coudre colorés bien rangés dans un tiroir."
  },
  {
    id: 4,
    name: "Tissus assortis colorés",
    price: 35,
    image: "https://static.mapetitemercerie.com/48913-large_default/machine-a-coudre-smarter-260c-pfaff.jpg",
    rating: 4.6,
    reviews: 143,
    isNew: false,
    isOnSale: false,
    category: "Tissus",
    material: "Coton",
    height: "-",
    color: "Multicolore",
    inStock: true,
    description: "Collection de tissus 100% coton, idéals pour patchwork, quilting et projets créatifs."
  },
  {
    id: 5,
    name: "Ciseaux de couture professionnels",
    price: 45,
    originalPrice: 55,
    image: "https://static.mapetitemercerie.com/178630-large_default/machine-a-coudre-designer-jade-20-husqvarna-viking.jpg",
    rating: 4.8,
    reviews: 78,
    isNew: false,
    isOnSale: true,
    category: "Outils de Coupe",
    material: "Acier inoxydable",
    height: "25cm",
    color: "Argenté",
    inStock: true,
    description: "Ciseaux de tailleur en acier inoxydable, lames affûtées pour une coupe précise et nette."
  },
  {
    id: 6,
    name: "Boutons vintage assortis",
    price: 18,
    image: "https://static.mapetitemercerie.com/86898-large_default/bobine-de-fil-pour-tout-coudre-gutermann-100-m-n280.jpg",
    rating: 4.5,
    reviews: 92,
    isNew: true,
    isOnSale: false,
    category: "Fils & Mercerie",
    material: "Plastique/Métal",
    height: "-",
    color: "Multicolore",
    inStock: true,
    description: "Assortiment de boutons vintage dans différentes tailles et couleurs pour personnaliser vos créations."
  },
  {
    id: 7,
    name: "Épingles à tête colorée",
    price: 12,
    image: "https://static.mapetitemercerie.com/157135-large_default/super-laine-100-merinos-storm.jpg",
    rating: 4.4,
    reviews: 156,
    isNew: false,
    isOnSale: false,
    category: "Fils & Mercerie",
    material: "Métal",
    height: "3cm",
    color: "Multicolore",
    inStock: true,
    description: "Épingles droites avec têtes colorées, parfaites pour le bâti et l'assemblage de tissus."
  },
  {
    id: 8,
    name: "Mètre ruban rétractable",
    price: 8,
    originalPrice: 12,
    image: "https://static.mapetitemercerie.com/200778-large_default/fil-macaroni-coton-recycle-cachou-100m.jpg",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isOnSale: true,
    category: "Outils de Coupe",
    material: "Plastique",
    height: "-",
    color: "Jaune",
    inStock: true,
    description: "Mètre ruban de 150cm avec système rétractable automatique, idéal pour prendre les mesures."
  },
  {
    id: 9,
    name: "Tissus liberty imprimés",
    price: 65,
    image: "https://static.mapetitemercerie.com/56855-large_default/mannequin-de-couture-prymadonna-multi-taille-s.jpg",
    rating: 4.9,
    reviews: 124,
    isNew: true,
    isOnSale: false,
    category: "Tissus",
    material: "Coton Liberty",
    height: "-",
    color: "Fleuri",
    inStock: false,
    description: "Tissus Liberty authentiques avec motifs floraux délicats, parfaits pour vêtements et accessoires."
  },
  {
    id: 10,
    name: "Dé à coudre ajustable",
    price: 15,
    image: "https://static.mapetitemercerie.com/191023-large_default/aiguille-circulaire-bois-d-erable-80-cm-n15.jpg",
    rating: 4.3,
    reviews: 67,
    isNew: false,
    isOnSale: false,
    category: "Fils & Mercerie",
    material: "Métal",
    height: "2cm",
    color: "Argenté",
    inStock: true,
    description: "Dé à coudre en métal ajustable, protège efficacement le doigt lors de la couture à la main."
  },
  {
    id: 11,
    name: "Surjeteuse 4 fils",
    price: 320,
    originalPrice: 380,
    image: "https://static.mapetitemercerie.com/242692-large_default/boutons-pressions-15-mm-outillage-couture-loisirs.jpg",
    rating: 4.7,
    reviews: 45,
    isNew: false,
    isOnSale: true,
    category: "Machines à Coudre",
    material: "Métal/Plastique",
    height: "30cm",
    color: "Blanc",
    inStock: true,
    description: "Surjeteuse professionnelle 4 fils pour finitions parfaites et coutures stretch."
  },
  {
    id: 12,
    name: "Patron de robe vintage",
    price: 25,
    image: "https://static.mapetitemercerie.com/75645-large_default/tapis-de-decoupe.jpg",
    rating: 4.8,
    reviews: 93,
    isNew: true,
    isOnSale: false,
    category: "Patrons",
    material: "Papier",
    height: "-",
    color: "Blanc",
    inStock: true,
    description: "Patron de robe vintage années 50, tailles 36 à 46, avec instructions détaillées en français."
  }
]
};

const ShopPage: React.FC = async () => {
  // Récupération des produits côté serveur
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Le contenu interactif est délégué au composant client */}
        <ShopContent products={products} />
      </div>
    </div>
  );
};

export default ShopPage;