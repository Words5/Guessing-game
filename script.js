document.querySelectorAll('.topic-btn').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    changeBackground(theme);
  });
});

function changeBackground(theme) {
  let imageUrl = '';

  switch (theme) {
    case 'fruits':
      imageUrl = 'images/fruits.jpg';
      break;
    case 'planets':
      imageUrl = 'images/planets.jpg';
      break;
    case 'animals':
      imageUrl = 'images/animals.jpg';
      break;
    default:
      imageUrl = 'images/default.jpg';
  }

  document.body.style.background = `url('${imageUrl}') no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';
}
