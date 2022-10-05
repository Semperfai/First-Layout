

// module-scroll------------------------------------------------------------------------------------------------------------------------------------

const functional = () => {
	const header = document.querySelector('.header');
	const addСlass = (item) => header.classList.add(item);
	const removeСlass = (item) => header.classList.remove(item);
	window.addEventListener('scroll', (e) => {
		(window.scrollY > header.style.width) ? addСlass("scroll-header") : removeСlass("scroll-header");
	})
}






window.addEventListener('DOMContentLoaded', (event) => {
	functional()
});