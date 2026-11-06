
// ===== SCREEN NAVIGATION =====

const screens = document.querySelectorAll(".screen");

function showScreen(screenId) {
    screens.forEach(function (screen) {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (nextScreen) {
        nextScreen.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createHearts(4);
    }
}

// All next and back buttons
document.querySelectorAll("[data-next]").forEach(function (button) {
    button.addEventListener("click", function () {
        const destination = button.getAttribute("data-next");
        showScreen(destination);
    });
});


// ===== PHOTO SLIDESHOW =====

const photos = [
    {
        src: "photo1.jpeg",
        caption: "My favourite person ♡"
    },
    {
        src: "photo2.png",
        caption: "A little piece of happiness 💗"
    },
    {
        src: "photo3.png",
        caption: "My forever favourite memory 🥹"
    }
];

let currentPhoto = 0;

const slidePhoto = document.getElementById("slidePhoto");
const slideCaption = document.getElementById("slideCaption");
const slideCount = document.getElementById("slideCount");

function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;

    if (slidePhoto) {
        slidePhoto.src = photos[currentPhoto].src;
    }

    if (slideCaption) {
        slideCaption.textContent = photos[currentPhoto].caption;
    }

    if (slideCount) {
        slideCount.textContent =
            (currentPhoto + 1) + " / " + photos.length;
    }
}

document.getElementById("previousPhoto").addEventListener("click", function () {
    showPhoto(currentPhoto - 1);
});

document.getElementById("nextPhoto").addEventListener("click", function () {
    showPhoto(currentPhoto + 1);
});


// ===== SWIPE PHOTOS ON MOBILE =====

const photoArea = document.querySelector(".polaroid");

let touchStartX = 0;

if (photoArea) {
    photoArea.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    photoArea.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                showPhoto(currentPhoto + 1);
            } else {
                showPhoto(currentPhoto - 1);
            }
        }
    });
}


// ===== OPEN LOVE LETTER =====

const envelope = document.getElementById("envelope");
const loveLetter = document.getElementById("loveLetter");

if (envelope && loveLetter) {
    envelope.addEventListener("click", function () {
        loveLetter.hidden = false;
        envelope.style.transform = "scale(0.9)";
        envelope.innerHTML = '<span class="envelope-heart">💗</span><span class="envelope-label">Opened with love</span>';

        createHearts(12);
    });
}


// ===== FINAL HUG SURPRISE =====

const finalSurprise = document.getElementById("finalSurprise");
const finalMessage = document.getElementById("finalMessage");

if (finalSurprise && finalMessage) {
    finalSurprise.addEventListener("click", function () {
        finalMessage.hidden = false;
        finalSurprise.textContent = "Biggest hug sent! 💗";

        createHearts(25);
    });
}


// ===== FLOATING HEARTS =====

function createHearts(amount) {
    const heartsContainer = document.getElementById("hearts");

    if (!heartsContainer) return;

    const heartTypes = ["💗", "💕", "❤️", "💖", "💘"];

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "heart-particle";

        heart.textContent =
            heartTypes[Math.floor(Math.random() * heartTypes.length)];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";

        heartsContainer.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 6500);
    }
}


// ===== RESTART THE STORY =====

const restartButton = document.getElementById("restart");

if (restartButton) {
    restartButton.addEventListener("click", function () {
        showScreen("welcome");

        // Reset the letter and final surprise
        loveLetter.hidden = true;
        finalMessage.hidden = true;

        envelope.innerHTML =
            '<span class="envelope-flap"></span>' +
            '<span class="envelope-heart">♥</span>' +
            '<span class="envelope-label">For my bby</span>';

        finalSurprise.textContent = "One more hug? 🫶";

        // Reset slideshow
        showPhoto(0);

        createHearts(15);
    });
}


// ===== START WITH FIRST PHOTO =====

showPhoto(0);
