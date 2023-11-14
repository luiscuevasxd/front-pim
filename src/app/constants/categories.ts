import {
  faHome,
  faGamepad,
  faGem,
  faShoePrints,
  faBriefcase,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';

export const categories = [
  {
    id: 'HOUSEHOLD',
    name: 'Familiar',
    icon: faHome,
    class: 'bg-orange-100 text-orange-500',
  },
  {
    id: 'GAME',
    name: 'Juegos',
    icon: faGamepad,
    class: 'bg-purple-100 text-purple-500',
  },
  {
    id: 'ACCESSORY',
    name: 'Accesorios',
    icon: faGem,
    class: 'bg-gray-100 text-gray-500',
  },
  {
    id: 'SHOES',
    name: 'Zapatos',
    icon: faShoePrints,
    class: 'bg-green-100 text-green-500',
  },
  {
    id: 'OFFICE',
    name: 'Oficina',
    icon: faBriefcase,
    class: 'bg-blue-100 text-blue-500',
  },
  {
    id: 'ELECTRONICS',
    name: 'Electronica',
    icon: faMobileScreenButton,
    class: 'bg-red-100 text-red-500',
  },
];
