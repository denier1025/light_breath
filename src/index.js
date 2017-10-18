import './resources/index.css'
import createMenu from './menu';
var menu = createMenu(['Главная', 'Обо мне', 'ПортФолио'], 'menu');
document.body.appendChild(menu);