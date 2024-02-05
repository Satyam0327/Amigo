import {
    MaterialIcons,
    FontAwesome5,
    Ionicons,
    Entypo,
    AntDesign,
} from '@expo/vector-icons';
import { Image } from 'react-native';
import { calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import GeneralIcon from "../assets/icons/categoryIcon/general.png";
import TransportIcon from "../assets/icons/categoryIcon/transport.png";
import ShoppingIcon from "../assets/icons/categoryIcon/shopping.png";
import DinningIcon from "../assets/icons/categoryIcon/dinning.png";
import UtilitiesIcon from "../assets/icons/categoryIcon/utilities.png";
import GroceriesIcon from "../assets/icons/categoryIcon/groceries.png"
const size = calcWidth(3);

const createIcon = (source) => (
      <Image source={source} style={{
        height: size, 
        width:size,
        resizeMode: 'contain',
      }} />
  );
  
const categories = [
    {
        name: 'General',
        icon: createIcon(GeneralIcon),
    }, // Blue Grey
    {
        name: 'Groceries',
        icon: createIcon(GroceriesIcon),
    },
    {
        name: 'Transport',
        icon: createIcon(TransportIcon),
    }, // Blue
    {
        name: 'Utilities',
        icon: createIcon(UtilitiesIcon),
    }, // Orange
    {
        name: 'Dining',
        icon: createIcon(DinningIcon),
    }, // Pink
    {
        name: 'Shopping',
        icon: createIcon(ShoppingIcon),
    }, // Purple
];

export function getCategoryIcon(name) {
    // Find the category object where the name matches the input parameter
    const category = categories.find((cat) => cat.name === name);

    // Return the icon of the found category, or null if no match is found
    return category ? category.icon : null;
}

export default categories;
