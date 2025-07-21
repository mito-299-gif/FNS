document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ການກຳນົດຄ່າຕົວແປ ແລະ ອົງປະກອບຕ່າງໆ ---
    // ເມື່ອໜ້າໂຫຼດສຳເລັດ, ໃຫ້ເລີ່ມທຳງານ

    // ອົງປະກອບຂອງ Modal (ໜ້າຕ່າງນ້ອຍ)
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const loginOverlay = document.getElementById('login-overlay'); // ເອົາ overlay ທີ່ບັງຄັບໃຫ້ລັອກອິນ

    // ອົງປະກອບຂອງຟອມ
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // ລາຍການ (Nav) ສຳລັບສະຖານະການລັອກອິນ
    const loginNavItem = document.getElementById('loginNavItem'); // ປຸ່ມລັອກອິນກ່ອນເຂົ້າລະບົບ
    const userNavItem = document.getElementById('userNavItem'); // ຊື່ຜູ້ໃຊ້ຫຼັງຈາກເຂົ້າລະບົບ
    const usernameDisplay = document.getElementById('usernameDisplay'); // ບ່ອນສະແດງຊື່ຜູ້ໃຊ້
    const logoutButton = document.getElementById('logoutButton'); // ປຸ່ມອອກຈາກລະບົບ

    // ປຸ່ມສຳລັບເປີດ Modal
    const loginNavButton = document.getElementById("loginNavButton");
    const switchToRegisterButton = document.getElementById("switchToRegister");

    // ປຸ່ມປິດ
    const closeButtons = document.querySelectorAll(".modal .close");
    const loginModalCloseButton = document.getElementById('loginModalCloseButton'); // ເອົາປຸ່ມປິດຂອງໜ້າຕ່າງລັອກອິນໂດຍສະເພາະ

    // ---ຄວບຄຸມໜ້າຕາເວັບ (UI) ---

    // ເປີດ Modal
    const openModal = (modal) => {
        if (modal) modal.style.display = "flex";
    };

    // ປິດ Modal
    const closeModal = (modal) => {
        if (modal) modal.style.display = "none";
    };

    // ສະແດງສະຖານະ "ລັອກອິນແລ້ວ"
    function showLoggedInState(user) {
        if (loginNavItem) loginNavItem.style.display = 'none'; // ຊ່ອນປຸ່ມ "Login"
        if (userNavItem) userNavItem.style.display = 'flex'; // ສະແດງຊື່ຜູ້ໃຊ້ ແລະ ປຸ່ມອອກຈາກລະບົບ
        if (usernameDisplay) usernameDisplay.textContent = user.username; // ສະແດງຊື່ຜູ້ໃຊ້
        if (loginOverlay) loginOverlay.style.display = 'none'; // ຊ່ອນ overlay ທີ່ບັງຄັບໃຫ້ລັອກອິນ
        if (loginModalCloseButton) loginModalCloseButton.style.display = 'block'; // ກວດສອບໃຫ້ແນ່ໃຈວ່າປຸ່ມປິດສະແດງຂຶ້ນມາ ເພື່ອໃຫ້ສາມາດເປີດ-ປິດໄດ້ອີກ

        // Show main content and hide login prompt
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('login-prompt').style.display = 'none';
    }

    // ສະແດງສະຖານະ "ຍັງບໍ່ໄດ້ລັອກອິນ"
    function showLoggedOutState() {
        if (loginNavItem) loginNavItem.style.display = 'flex'; // ສະແດງປຸ່ມ "Login"
        if (userNavItem) userNavItem.style.display = 'none'; // ຊ່ອນຊື່ຜູ້ໃຊ້
        if (usernameDisplay) usernameDisplay.textContent = '';
    }

    // --- 3. ກວດສອບສະຖານະການລັອກອິນເມື່ອໜ້າໂຫຼດ ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        // If user is admin, redirect to admin page immediately
        if (loggedInUser.username === 'admin') {
            window.location.href = 'Admin/index.html';
            return; // Stop further execution on this page
        }

        showLoggedInState(loggedInUser);
        // Load initial page content for non-admin users
        loadPage('user/DIR-1/contact-1.html');
    } else {
        showLoggedOutState();
        // Hide main content and show login prompt
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('login-prompt').style.display = 'block';
    }

    // --- 4. ຕົວຮັບຟັງເຫດການ (Event Listeners) ---

    // ເປີດໜ້າຕ່າງລັອກອິນຈາກ Navbar (ກໍລະນີທີ່ຜູ້ໃຊ້ອອກຈາກລະບົບແລ້ວກົດອີກຄັ້ງ)
    if (loginNavButton) {
        loginNavButton.addEventListener("click", () => {
            if (loginModalCloseButton) loginModalCloseButton.style.display = 'block'; // ສະແດງປຸ່ມປິດ ຖ້າເປີດດ້ວຍຕົນເອງ
            openModal(loginModal);
        });
    }

    // ສະຫຼັບຈາກໜ້າຕ່າງລັອກອິນ ໄປໜ້າຕ່າງລົງທະບຽນ
    if (switchToRegisterButton) {
        switchToRegisterButton.addEventListener("click", () => {
            closeModal(loginModal);
            openModal(registerModal);
        });
    }

    // ເພີ່ມ event listener ໃຫ້ກັບປຸ່ມປິດທັງໝົດ
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // ກວດສອບວ່າປຸ່ມປິດທີ່ກົດນັ້ນຢູ່ໃນໜ້າຕ່າງສະໝັກສະມາຊິກ (register modal) ຫຼືບໍ່
            if (button.closest('#registerModal')) {
                // ຖ້າແມ່ນ, ໃຫ້ປິດໜ້າຕ່າງສະໝັກ ແລະ ເປີດໜ້າຕ່າງລັອກອິນຂຶ້ນມາແທນ
                closeModal(registerModal);
                openModal(loginModal);
            } else {
                // ຖ້າເປັນປຸ່ມປິດອື່ນ (ເຊັ່ນ ໃນໜ້າຕ່າງລັອກອິນ), ໃຫ້ປິດທຸກໜ້າຕ່າງ
                closeModal(loginModal);
                closeModal(registerModal);
            }
        });
    });

    // ປິດ Modal ເມື່ອກົດພື້ນຫຼັງ (ຈະບໍ່ເຮັດວຽກຖ້າຖືກບັງຄັບໃຫ້ລັອກອິນ)
    window.addEventListener("click", (event) => {
        // ອະນຸຍາດໃຫ້ປິດໄດ້ກໍຕໍ່ເມື່ອຜູ້ໃຊ້ລັອກອິນແລ້ວເທົ່ານັ້ນ
        // if (!sessionStorage.getItem('loggedInUser')) return;

        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });

    // ປິດ Modal ດ້ວຍປຸ່ມ Escape (ຈະບໍ່ເຮັດວຽກຖ້າຖືກບັງຄັບໃຫ້ລັອກອິນ)
    document.addEventListener('keydown', (event) => {
        // ອະນຸຍາດໃຫ້ປິດໄດ້ກໍຕໍ່ເມື່ອຜູ້ໃຊ້ລັອກອິນແລ້ວເທົ່ານັ້ນ
        // if (!sessionStorage.getItem('loggedInUser')) return;

        if (event.key === "Escape") {
            closeModal(loginModal);
            closeModal(registerModal);
        }
    });

    // --- 5. ໂລຈິກການສົ່ງຟອມ ---

    // ການຈັດການການລົງທະບຽນ
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('registerUsername').value;
            const lastname = document.getElementById('registerlastname').value;
            const password = document.getElementById('registerpassword').value;
            const gender = document.getElementById('registerage').value;
            const phone = document.getElementById('registernumber').value;
            const email = document.getElementById('registeremail').value;

            const newUser = {
                username,
                lastname,
                password, // ໝາຍເຫດ: ໃນແອັບຕົວຈິງ, ຫ້າມເກັບລະຫັດຜ່ານເປັນຂໍ້ຄວາມທຳມະດາເດັດຂາດ
                gender,
                phone,
                email
            };

            // ດືງຂໍ້ມູນ localStorage ສ້າງ array ຖ້າຍັງບໍ່ມີ
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // ກວດສອບວ່າຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວຫຼືບໍ່
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                Swal.fire({
                    icon: 'error',
                    title: 'ຜິດພາດ',
                    text: 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ. ກະລຸນາເລືອກຊື່ອື່ນ.',
                });
                return;
            }

            // ເພີ່ມຜູ້ໃຊ້ໃໝ່ ແລະ ບັນທຶກລົງ localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            Swal.fire({
                icon: 'success',
                title: 'ສຳເລັດ',
                text: 'ສະໝັກສະມາຊິກສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ.',
            });

            // ປິດໜ້າຕ່າງສະໝັກ ແລະ ເປີດໜ້າຕ່າງລັອກອິນ
            closeModal(registerModal);
            openModal(loginModal);
            registerForm.reset(); // ລ້າງຂໍ້ມູນໃນຟອມ
        });
    }

    // ການຈັດການການລັອກອິນ
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const identifier = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            // ຄົ້ນຫາຜູ້ໃຊ້ທີ່ຂໍ້ມູນກົງກັນ
            // ອະນຸຍາດໃຫ້ລັອກອິນດ້ວຍ username, email, ຫຼື phone
            const foundUser = users.find(user =>
                (user.username === identifier || user.email === identifier || user.phone === identifier) && user.password === password
            );

            if (identifier === 'admin' && password === 'Admin') {
                const adminUser = { username: 'admin' };
                sessionStorage.setItem('loggedInUser', JSON.stringify(adminUser));
                showLoggedInState(adminUser);
                Swal.fire({
                    icon: 'success',
                    title: `Welcome, Admin!`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = 'Admin/index.html';
                });
                closeModal(loginModal);
                loginForm.reset();
            } else if (identifier === 'user' && password === 'user') {
                const regularUser = { username: 'user' };
                sessionStorage.setItem('loggedInUser', JSON.stringify(regularUser));
                showLoggedInState(regularUser);
                Swal.fire({
                    icon: 'success',
                    title: `Welcome, user!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                closeModal(loginModal);
                loginForm.reset();
                loadPage('user/DIR-1/contact-1.html');
            } else if (foundUser) {
                // ເກັບຂໍ້ມູນຜູ້ໃຊ້ໄວ້ໃນ sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                // ອັບເດດໜ້າຕາເວັບ (UI)
                showLoggedInState(foundUser);
                Swal.fire({
                    icon: 'success',
                    title: `ຍິນດີຕ້ອນຮັບ, ${foundUser.username}!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                closeModal(loginModal);
                loginForm.reset();
                // ໂຫຼດເນື້ອຫາເລີ່ມຕົ້ນຫຼັງຈາກລັອກອິນສຳເລັດ
                loadPage('user/DIR-1/contact-1.html');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ຜິດພາດ',
                    text: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ.',
                });
            }
        });
    }

    // ການຈັດການການລັອກເອົາ
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser'); // ລຶບຂໍ້ມູນ session
            Swal.fire({
                icon: 'success',
                title: 'ອອກຈາກລະບົບສຳເລັດ',
                text: 'ກຳລັງໂຫຼດໜ້າໃໝ່...',
                timer: 1500, // ສະແດງເປັນເວລາ 1.5 ວິນາທີ
                showConfirmButton: false,
                allowOutsideClick: false, // ປ້ອງກັນການປິດໂດຍການກົດຂ້າງນອກ
            }).then(() => {
                window.location.reload(); // ໂຫຼດໜ້າเว็บໃໝ່ຫຼັງຈາກເວລາໝົດ
            });
        });
    }
});


function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
}

document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#loginPassword');

    if (togglePassword && passwordInput) {

        const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
        const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.08.99-.22 1.44l1.82 1.82c.97-.67 1.8-1.55 2.4-2.56C19.27 9.11 15.99 6.5 12 6.5zm-1.09 7.72L12 14.14c.83 0 1.5-.67 1.5-1.5 0-.09-.01-.18-.03-.26l-1.11-1.11c-.08-.02-.17-.03-.26-.03-.83 0-1.5.67-1.5 1.5 0 .42.17.8.44 1.09zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.6 1.6L19.73 22 22 19.73 4.27 2 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;


        togglePassword.innerHTML = eyeIcon;

        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? eyeIcon : eyeSlashIcon;
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#loginPassword');
    const toggleRegisterPassword = document.querySelector('#toggleRegisterPassword');
    const registerPasswordInput = document.querySelector('#registerPassword');

    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
    const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.08.99-.22 1.44l1.82 1.82c.97-.67 1.8-1.55 2.4-2.56C19.27 9.11 15.99 6.5 12 6.5zm-1.09 7.72L12 14.14c.83 0 1.5-.67 1.5-1.5 0-.09-.01-.18-.03-.26l-1.11-1.11c-.08-.02-.17-.03-.26-.03-.83 0-1.5.67-1.5 1.5 0 .42.17.8.44 1.09zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.6 1.6L19.73 22 22 19.73 4.27 2 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;

    // login password toggle
    if (togglePassword && passwordInput) {
        togglePassword.innerHTML = eyeIcon;
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? eyeIcon : eyeSlashIcon;
        });
    }

    // register password toggle
    if (toggleRegisterPassword && registerPasswordInput) {
        toggleRegisterPassword.innerHTML = eyeIcon;
        toggleRegisterPassword.addEventListener('click', function () {
            const type = registerPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            registerPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? eyeIcon : eyeSlashIcon;
        });
    }
});
