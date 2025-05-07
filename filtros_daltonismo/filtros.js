document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-button');
  const colorBoxes = document.querySelectorAll('.color-box');
  //const image = document.querySelector('.image-container img');
  const video = document.querySelector('.camera-filtros');
  let activeFilter = 'none';

  function applyFilter(filterName) {
    const elements = [...colorBoxes, video];

    elements.forEach(element => {
      if (filterName === 'acromantopsia') {
        element.style.filter = 'grayscale(100%)';
      } else if (filterName === 'none') {
        element.style.filter = 'none';
      } else {
        element.style.filter = `url(#${filterName}-filter)`;
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filterName = button.dataset.filter;

      // Alternar filtro
      if (activeFilter === filterName) {
        activeFilter = 'none';
        buttons.forEach(btn => btn.classList.remove('active'));
      } else {
        activeFilter = filterName;
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      }

      applyFilter(activeFilter);
    });
  });
});
