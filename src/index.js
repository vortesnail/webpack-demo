import userImg from './userimg.jpg';
import style from './style.scss';
import createUserImg from './createUserImg';

createUserImg();

const img = new Image();
img.src = userImg;
img.setAttribute('class', style["user-img"]); // style.user-img

const root = document.querySelector('.root');
root.appendChild(img);

const icon = document.createElement('i');
icon.classList.add('iconfont', 'iconfangdajing');
icon.innerHTML = '&#xe775;';
root.appendChild(icon);