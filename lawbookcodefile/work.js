/* =========================================
   NYAYASETU - INDIAN LAW PORTAL
   JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");

        menuBtn.textContent =
            navLinks.classList.contains("show")
                ? "✕"
                : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuBtn.textContent = "☰";
        });
    });
}


/* =========================================
   DARK MODE
========================================= */

const darkModeBtn = document.getElementById("darkMode");

function enableDarkMode() {
    document.body.classList.add("dark");

    if (darkModeBtn) {
        darkModeBtn.textContent = "☀️";
        darkModeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }

    localStorage.setItem("nyayaTheme", "dark");
}

function disableDarkMode() {
    document.body.classList.remove("dark");

    if (darkModeBtn) {
        darkModeBtn.textContent = "🌙";
        darkModeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }

    localStorage.setItem("nyayaTheme", "light");
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}


/* Load saved theme */

const savedTheme = localStorage.getItem("nyayaTheme");

if (savedTheme === "dark") {
    enableDarkMode();
}


/* =========================================
   LAW SEARCH
========================================= */

const searchInput = document.getElementById("searchInput");
const actsGrid = document.getElementById("actsGrid");
const noResults = document.getElementById("noResults");

function searchLaws() {

    if (!searchInput || !actsGrid) return;

    const query =
        searchInput.value
            .toLowerCase()
            .trim();

    const cards =
        actsGrid.querySelectorAll(".act-card");

    let found = 0;

    cards.forEach(card => {

        const searchableText =
            (
                card.dataset.name ||
                card.textContent
            ).toLowerCase();

        if (
            query === "" ||
            searchableText.includes(query)
        ) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }

    });

    if (noResults) {
        noResults.style.display =
            found === 0
                ? "block"
                : "none";
    }
}

if (searchInput) {
    searchInput.addEventListener(
        "input",
        searchLaws
    );

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                searchLaws();

                if (actsGrid) {
                    actsGrid.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }

        }
    );
}


/* =========================================
   LAW MODAL
========================================= */

const lawModal =
    document.getElementById("lawModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");


function openModal(title, text) {

    if (!lawModal) return;

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalText) {
        modalText.textContent = text;
    }

    lawModal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


function closeModal() {

    if (!lawModal) return;

    lawModal.style.display = "none";

    document.body.style.overflow = "auto";
}


/* Close modal when clicking outside */

if (lawModal) {

    lawModal.addEventListener(
        "click",
        event => {

            if (
                event.target === lawModal
            ) {
                closeModal();
            }

        }
    );
}


/* Close modal with Escape */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* =========================================
   FAQ ACCORDION
========================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );

faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.closest(".faq-item");

            const isActive =
                currentItem.classList.contains(
                    "active"
                );


            /* Close all FAQ items */

            document
                .querySelectorAll(".faq-item")
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                    const icon =
                        item.querySelector(
                            ".faq-question span"
                        );

                    if (icon) {
                        icon.textContent = "+";
                    }

                });


            /* Open selected item */

            if (!isActive) {

                currentItem.classList.add(
                    "active"
                );

                const icon =
                    currentItem.querySelector(
                        ".faq-question span"
                    );

                if (icon) {
                    icon.textContent = "−";
                }

            }

        }
    );

});


/* =========================================
   BACK TO TOP BUTTON
========================================= */

const topBtn =
    document.getElementById("topBtn");


function updateTopButton() {

    if (!topBtn) return;

    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

}

window.addEventListener(
    "scroll",
    updateTopButton
);

updateTopButton();


if (topBtn) {

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================
   LEGAL QUIZ
========================================= */

const quizQuestions = [

    {
        question:
            "Which is the supreme legal framework of India?",

        options: [
            "Indian Penal Code",
            "Constitution of India",
            "RTI Act",
            "Motor Vehicles Act"
        ],

        answer: 1
    },

    {
        question:
            "Fundamental Rights are mainly contained in which Part of the Constitution?",

        options: [
            "Part I",
            "Part II",
            "Part III",
            "Part IV"
        ],

        answer: 2
    },

    {
        question:
            "What does RTI stand for?",

        options: [
            "Right to Indian Information",
            "Right to Information",
            "Right to Internal Information",
            "Rule to Information"
        ],

        answer: 1
    },

    {
        question:
            "Which Act deals with electronic records and cyber offences?",

        options: [
            "Information Technology Act",
            "Motor Vehicles Act",
            "Consumer Protection Act",
            "Companies Act"
        ],

        answer: 0
    },

    {
        question:
            "Which Article is associated with constitutional remedies?",

        options: [
            "Article 14",
            "Article 19",
            "Article 21",
            "Article 32"
        ],

        answer: 3
    }

];


function startQuiz() {

    let score = 0;

    quizQuestions.forEach(
        (question, index) => {

            const optionsText =
                question.options
                    .map(
                        (option, optionIndex) =>
                            `${optionIndex + 1}. ${option}`
                    )
                    .join("\n");


            const userAnswer =
                prompt(
                    `Question ${index + 1}/${quizQuestions.length}\n\n` +
                    question.question +
                    "\n\n" +
                    optionsText +
                    "\n\nEnter option number:"
                );


            if (userAnswer === null) {
                return;
            }


            const selected =
                Number(userAnswer) - 1;


            if (
                selected ===
                question.answer
            ) {
                score++;
            }

        }
    );


    const percentage =
        Math.round(
            (score /
                quizQuestions.length) *
            100
        );


    let message = "";

    if (percentage === 100) {
        message =
            "Excellent! You got everything correct. 🎉";
    } else if (percentage >= 60) {
        message =
            "Good job! Keep learning Indian law. 👍";
    } else {
        message =
            "Keep studying. You can improve your score! 📚";
    }


    alert(
        `⚖️ NyayaSetu Legal Quiz\n\n` +
        `Score: ${score}/${quizQuestions.length}\n` +
        `Percentage: ${percentage}%\n\n` +
        message
    );

}




const revealElements =
    document.querySelectorAll(
        ".category-card, .act-card, .right-card, .procedure-card, .info-card"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

            observer.observe(element);

        }
    );

}



const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(
    revealStyle
);


/* =========================================
   SEARCH CLEAR WITH ESCAPE
========================================= */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                searchInput.value = "";

                searchLaws();

                searchInput.blur();

            }

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );

yearElements.forEach(
    element => {
        element.textContent =
            new Date().getFullYear();
    }
);


/* =========================================
   PAGE LOADED
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "⚖️ NyayaSetu Legal Awareness Portal Loaded Successfully."
        );

    }
);

