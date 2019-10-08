import userImg from './userimg.jpg';

function createUserImg() {
  const img = new Image();
  img.src = userImg;
  img.setAttribute('class', 'user-img');
  
  const root = document.querySelector('.root');
  root.appendChild(img);
}

export default createUserImg;