let slideIndex = 1; // Used to navigate through images in slideshow
let timeoutID; // Used to reset slideshow timer
/**
 * Previous Button Pressed
 */
function btnPrev_Click(){
    clearTimeout(timeoutID); // Cancel timer to prevent double switching
    let slides = document.getElementById("Slideshow"); // Get div that contains all images
    let children = slides.childNodes; // get the children of the div
    children[slideIndex - 1].style.display = "none"; // Hides current slide
    // Shows previous slide
    slideIndex--;
    if(slideIndex <= 0){slideIndex = slides.childElementCount}
    children[slideIndex - 1].style.display = "block";
    timeoutID = setTimeout(showSlides, 4000); // starts timer to transition again after 4s
}
/**
 * Next Button Pressed
 */
function btnNext_Click(){
    clearTimeout(timeoutID); // Cancel timer to prevent double switching
    showSlides(); // switches to next slide
}
/**
 * Hides all images in slideshow
 */
function hideSlideshow(){
    let slides = document.getElementById("Slideshow"); // Get div that contains all images
    let children = slides.childNodes; // get the children of the div
    // For each child, add css 'display:none;'
    for(let i = 0; i < slides.childElementCount; i++){
        children[i].style.display = "none";
    }
}
/**
 * Shows next slide after 4000ms (4s)
 */
function showSlides(){
    let slides = document.getElementById("Slideshow"); // Get div that contains all images
    let children = slides.childNodes; // get the children of the div
    children[slideIndex - 1].style.display = "none"; // hides previous slide
    slideIndex++;
    if(slideIndex > slides.childElementCount){slideIndex = 1}
    children[slideIndex - 1].style.opacity = 1;
    children[slideIndex - 1].style.display = "block";

    timeoutID = setTimeout(showSlides, 4000); // starts timer to transition again after 4s
}
/**
 * Creates Image element in html
 * 
 * Example Element:
 * <a href=LINK_URL><img src=IMAGE_URL></a>
 */
const createImage = (IMAGE_URL, LINK_URL) => {
    const linkElement = document.createElement('a');
    linkElement.href = LINK_URL;
	const imageElement = document.createElement('img');
	imageElement.src = IMAGE_URL;
	imageElement.id = 'slide'; // sets id: #slide
    linkElement.appendChild(imageElement);
	return linkElement;
};
/**
 * Creates previous slide button
 */
const createPrevArrow = () => {
    const ArrowContainer = document.createElement('div');
    ArrowContainer.id='prevarrow';
    // svg for chevron : https://www.svgrepo.com/
    ArrowContainer.innerHTML = `<a><svg width="8vmin" height="8vmin" viewBox="0 0 24 24" fill="none"><path d="M14 16L10 12L14 8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
    return ArrowContainer;
};
/**
 * Creates next slide button
 */
const createNextArrow = () => {
    const ArrowContainer = document.createElement('div');
    ArrowContainer.id='nextarrow';
    // svg for chevron : https://www.svgrepo.com/
    ArrowContainer.innerHTML = `<a><svg width="8vmin" height="8vmin" viewBox="0 0 24 24" fill="none"><path id="Vector" d="M10 8L14 12L10 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
    return ArrowContainer;
};
/**
 * wraps all images in div
 */
const createImageContainer = () => {
	const imageContainer = document.createElement('div');
    imageContainer.class = "Slides";
    imageContainer.id = "Slideshow";
	imageContainer.appendChild(createImage("https://static.wixstatic.com/media/d672b9_474e90968bef4a7da0870945fbfe91cc~mv2.png", "https://www.881theburg.com/news-central"));
    imageContainer.appendChild(createImage("https://static.wixstatic.com/media/d672b9_64d563b847ef45028b910dfe75904c98~mv2.png", "https://www.881theburg.com/shows"));
    imageContainer.appendChild(createImage("https://static.wixstatic.com/media/d672b9_9c65067e8bbc403087d0e1e15ed03ad1~mv2.png", "https://www.instagram.com/881theburg/"));
	return imageContainer;
};
/**
 * Creats CSS for custom element
 */
const createStyle = () => {
	const styleElement = document.createElement('style'); 
	styleElement.innerHTML = `
    wix-default-custom-element {
        text-align: center;
        width: 100vw !important;
        aspect-ratio: 2.69/1 !important;
    }
    #prevarrow{
        opacity: .4;
        left: 20px;
        top: calc((100vw/2.69)/2);
        position: absolute;
        z-index: 9;
    }
    #prevarrow svg{
        background-color: #242323;
    }
    #nextarrow{
        opacity: .4;
        right: 20px;
        top: calc((100vw/2.69)/2);
        position: absolute;
        z-index: 9;
    }
    #nextarrow svg{
        background-color: #242323;
    }
    /* Removes min height on wix element that interferes */
    .Unjiej > :first-child{
        min-height: 0px !important;
    }
    /* Keeps same width/height ratio for wix element as the image */
    #comp-lfmrc9sq{
        width: 100vw !important;
        aspect-ratio: 2.69/1 !important;
    }
    .Slides {
        margin: auto;
        text-align: center;
    }
    #slide {
        width: 100vw;
        aspect-ratio: 2.69/1;
        position: absolute;
        left: 0;
        top: 0;
        animation: fadeinout 4s linear forwards; /* Fades in and out over 4 seconds */
    }
    /* Removes margin from wix element that shifts custom element by 20% */
    [data-mesh-id="Containergj3c0inlineContent-gridContainer"] > [id="comp-lfmrc9sq"]{
        margin: 0;
    }
    /* Removes margin from wix element that shifts custom element by 20% */
    #comp-lfmrc9sq{
        width: 0;
    }
    @keyframes fadeinout {
        0%,100% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
    }
    `;

	return styleElement;
};

class mySlideShow extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.appendChild(createStyle()); // Adds Styling
        this.appendChild(createPrevArrow()); // Adds Previous Arrow Button
        this.appendChild(createNextArrow()); // Adds Next Arrow Button
		this.appendChild(createImageContainer()); // Adds Images
        hideSlideshow(); // Hides all images in slideshow
        showSlides(); // Shows first image
        document.getElementById("prevarrow").addEventListener("click", btnPrev_Click); // Adds on click event to previous arrow button
        document.getElementById("nextarrow").addEventListener("click", btnNext_Click); // Adds on click event to next arrow button
	}
}
customElements.define('slide-show', mySlideShow);