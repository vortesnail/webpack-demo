import './style.css';

const btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
  const div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
}

