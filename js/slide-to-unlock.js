const slideToUnlockEls = document.querySelectorAll('.slide-to-unlock');

slideToUnlockEls.forEach((slideToUnlock) => {
  const draggable = slideToUnlock.querySelector('.slide-to-unlock__draggable');
  const track = slideToUnlock.querySelector('.slide-to-unlock__track');

  let isDragging = false;
  let startX = 0;
  let draggableLeft = 0;
  let maxLeft = 0;

  draggable.addEventListener('mousedown', startDrag);
  draggable.addEventListener('touchstart', startDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    draggableLeft = draggable.offsetLeft;
    maxLeft = slideToUnlock.clientWidth * 0.8;

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.body.style.userSelect = 'none';
  }

  function drag(e) {
    if (!isDragging) return;
    const x = (e.clientX || e.touches[0].clientX) - startX;
    let newLeft = draggableLeft + x;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));

    draggable.style.left = `${newLeft}px`;
    track.style.width = `${newLeft + draggable.offsetWidth}px`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    if (draggable.offsetLeft >= maxLeft) {
      unlock();
    } else {
      draggable.style.left = '0';
      track.style.width = '0';
    }
  }

  function unlock() {
    draggable.removeEventListener('mousedown', startDrag);
    draggable.removeEventListener('touchstart', startDrag);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('contextmenu', (event) => event.preventDefault());
    document.body.style.userSelect = '';
  }
});
