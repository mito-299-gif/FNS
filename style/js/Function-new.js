function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector("#main-content").innerHTML = data;


            if (url.includes("contact-1.html")) {
                setTimeout(() => {
                    setupBudgetTable();
                }, 0);
            }
        });


}

