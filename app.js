'use Strict'
const operationContainer = document.querySelector('.operation_content')
const operationOptioncontainer = document.querySelector('.operations_options')
const operationsOptionContent = document.querySelectorAll('.operations_option_content')
const headerBar = document.querySelector('.header_top')
const header = document.querySelector('.header')
const headerMenu = document.querySelector('.header_top')
const headerHeight = headerMenu.getBoundingClientRect().height;

////////  IMPLEMENT SCROLLING
document.querySelector('.header').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('direct_link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
});
//////// OPERATION
operationOptioncontainer.addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('option')) {
    operationsOptionContent.forEach(el => el.classList.add('hidden'))
    document.querySelector(`.operations_option_content-${e.target.id}`).classList.remove('hidden')
  }
})
//HOVER_ON_HEADER
const hoverOnHeaderBar = function (e) {
  if (e.target.classList.contains('direct_link')) {
    const link = e.target
    const siblings = link.closest('.header_top').querySelectorAll('.direct_link')
    const logo = link.closest('.header_top').querySelector('img')
    siblings.forEach(el => {
      if (el != link) { el.style.opacity = this }
    })
    // logo.style.opacity = this
  }
}
headerBar.addEventListener('mouseover', hoverOnHeaderBar.bind(0.5))
headerBar.addEventListener('mouseout', hoverOnHeaderBar.bind(1))

// STICKY NAVIGATION
const stickyHeaderBar = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) headerMenu.classList.add('fixedMenu')
  else {
    headerMenu.classList.remove('fixedMenu')
  }
}
const headerObserver = new IntersectionObserver(stickyHeaderBar, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`
})
headerObserver.observe(header)

// // REVELING SECTION
// const sectionAll = document.querySelectorAll('.section')
// const sectionDesc = function (entries, observer) {
//   const [entry] = entries
//   // console.log(entry)
//   if (!entry.isIntersecting) return
//   entry.target.classList.remove('hidden_content')
//   observer.unobserve(entry.target)
// }
// const sectionObserver = new IntersectionObserver(sectionDesc, {
//   root: null,
//   threshold: 0.15,
//   // rootMargin:
// })
// sectionAll.forEach(section => {
//   sectionObserver.observe(section)
//   section.classList.add('hidden_content')
// })

// lazy load images
const allFeaturesImg = document.querySelectorAll('img[data-src]')
const imgload = function (entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  console.log(entry.target)
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);

}
const imgObserver = new IntersectionObserver(imgload, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
})
allFeaturesImg.forEach(img => { imgObserver.observe(img) })

// slider
const allSlides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.btn_left')
const btnRight = document.querySelector('.btn_right')
let curSlide = 0
const maxSlide = allSlides.length
// console.log(maxSlide)
const goToSlide = function (slide) {
  allSlides.forEach((el, i) => (el.style.transform = `translateX(${100 * (i - slide)}%)`))
}
goToSlide(0)

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const prevSlide = function () {
  console.log(curSlide)
  if (curSlide == 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--
  }
  goToSlide(curSlide)
}
btnLeft.addEventListener('click', prevSlide)
btnRight.addEventListener('click', nextSlide)

