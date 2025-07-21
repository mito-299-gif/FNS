document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Define all variables and elements ---
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginNavItem = document.getElementById('loginNavItem');
    const userNavItem = document.getElementById('userNavItem');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logoutButton');
    const loginNavButton = document.getElementById("loginNavButton");
    const switchToRegisterButton = document.getElementById("switchToRegister");
    const closeButtons = document.querySelectorAll(".modal .close");
    const loginModalCloseButton = document.getElementById('loginModalCloseButton');
    const loginNavIcon = document.getElementById('loginNavIcon');

    // Password toggle elements
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#loginPassword');
    const toggleRegisterPassword = document.querySelector('#toggleRegisterPassword');
    const registerPasswordInput = document.querySelector('#registerpassword'); // Corrected ID

    // --- 2. UI Control Functions ---
    const openModal = (modal) => {
        if (modal) modal.style.display = "flex";
    };

    const closeModal = (modal) => {
        if (modal) modal.style.display = "none";
    };

    function showLoggedInState(user) {
        if (loginNavItem) loginNavItem.style.display = 'none';
        if (userNavItem) userNavItem.style.display = 'flex';
        if (usernameDisplay) usernameDisplay.textContent = user.username;
        if (loginOverlay) loginOverlay.style.display = 'none';
        if (loginModalCloseButton) loginModalCloseButton.style.display = 'block';
        if (loginNavIcon) loginNavIcon.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('login-prompt').style.display = 'none';
    }

    function showLoggedOutState() {
        if (loginNavItem) loginNavItem.style.display = 'flex';
        if (userNavItem) userNavItem.style.display = 'none';
        if (usernameDisplay) usernameDisplay.textContent = '';
        if (loginNavIcon) loginNavIcon.style.display = 'block';
    }

    // --- 3. Initial Login State Check ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        if (loggedInUser.username === 'admin') {
            window.location.href = 'Admin/index.html';
            return;
        }
        showLoggedInState(loggedInUser);
        loadPage('user/DIR-1/contact-1.html');
    } else {
        showLoggedOutState();
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('login-prompt').style.display = 'block';
    }

    // --- 4. Event Listeners ---

    // Open login modal
    if (loginNavButton) {
        loginNavButton.addEventListener("click", () => openModal(loginModal));
    }

    // Switch to register modal
    if (switchToRegisterButton) {
        switchToRegisterButton.addEventListener("click", () => {
            closeModal(loginModal);
            openModal(registerModal);
        });
    }

    // All close buttons
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal);
                // If closing register, reopen login
                if (modal.id === 'registerModal') {
                    openModal(loginModal);
                }
            }
        });
    });

    // --- 5. Form Submission Logic ---

    // Register form
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const lastname = document.getElementById('registerlastname').value;
            const password = document.getElementById('registerpassword').value;
            const gender = document.getElementById('registerage').value;
            const phone = document.getElementById('registernumber').value;
            const email = document.getElementById('registeremail').value;

            const newUser = { username, lastname, password, gender, phone, email };
            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.some(user => user.username === username)) {
                Swal.fire({ icon: 'error', title: 'ຜິດພາດ', text: 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ. ກະລຸນາເລືອກຊື່ອື່ນ.' });
                return;
            }

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            Swal.fire({ icon: 'success', title: 'ສຳເລັດ', text: 'ສະໝັກສະມາຊິກສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ.' });
            closeModal(registerModal);
            openModal(loginModal);
            registerForm.reset();
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => (user.username === identifier || user.email === identifier || user.phone === identifier) && user.password === password);

            if (identifier === 'admin' && password === 'Admin') {
                const adminUser = { username: 'admin' };
                sessionStorage.setItem('loggedInUser', JSON.stringify(adminUser));
                Swal.fire({ icon: 'success', title: 'Welcome, Admin!', showConfirmButton: false, timer: 1500 })
                    .then(() => { window.location.href = 'Admin/index.html'; });
            } else if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                showLoggedInState(foundUser);
                Swal.fire({ icon: 'success', title: `ຍິນດີຕ້ອນຮັບ, ${foundUser.username}!`, showConfirmButton: false, timer: 1500 });
                closeModal(loginModal);
                loginForm.reset();
                loadPage('user/DIR-1/contact-1.html');
            } else {
                Swal.fire({ icon: 'error', title: 'ຜິດພາດ', text: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ.' });
            }
        });
    }

    // Logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            Swal.fire({ icon: 'success', title: 'ອອກຈາກລະບົບສຳເລັດ', text: 'ກຳລັງໂຫຼດໜ້າໃໝ່...', timer: 1500, showConfirmButton: false, allowOutsideClick: false })
                .then(() => { window.location.reload(); });
        });
    }

    // --- 6. Password Toggle Logic ---
    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
    const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.08.99-.22 1.44l1.82 1.82c.97-.67 1.8-1.55 2.4-2.56C19.27 9.11 15.99 6.5 12 6.5zm-1.09 7.72L12 14.14c.83 0 1.5-.67 1.5-1.5 0-.09-.01-.18-.03-.26l-1.11-1.11c-.08-.02-.17-.03-.26-.03-.83 0-1.5.67-1.5 1.5 0 .42.17.8.44 1.09zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.6 1.6L19.73 22 22 19.73 4.27 2 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;

    function setupPasswordToggle(toggleButton, inputElement) {
        if (toggleButton && inputElement) {
            toggleButton.innerHTML = eyeIcon;
            toggleButton.addEventListener('click', function () {
                const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
                inputElement.setAttribute('type', type);
                this.innerHTML = type === 'password' ? eyeIcon : eyeSlashIcon;
            });
        }
    }

    setupPasswordToggle(togglePassword, passwordInput);
    setupPasswordToggle(toggleRegisterPassword, registerPasswordInput);
});

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
    }
}
