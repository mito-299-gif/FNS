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
    }

    // ສະແດງສະຖານະ "ຍັງບໍ່ໄດ້ລັອກອິນ"
    function showLoggedOutState() {
        if (loginNavItem) loginNavItem.style.display = 'flex'; // ສະແດງປຸ່ມ "Login"
        if (userNavItem) userNavItem.style.display = 'none'; // ຊ່ອນຊື່ຜູ້ໃຊ້
        if (usernameDisplay) usernameDisplay.textContent = '';
    }

    // --- 3. ກວດສອບສະຖານະການລັອກອິນເມື່ອໜ້າໂຫຼດ ---
    // ກວດສອບວ່າເຄີຍມີການລັອກອິນຄ້າງໄວ້ໃນ sessionStorage ຫຼືບໍ່
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
        // Load initial page content since user is already logged in
        loadPage('../DIR-1/contact-1.html');
    } else {
        showLoggedOutState();
        if (loginOverlay) loginOverlay.style.display = 'block'; // ສະແດງ overlay ເພື່ອບັງຄັບໃຫ້ລັອກອິນ
        if (loginModalCloseButton) loginModalCloseButton.style.display = 'none'; // ຊ່ອນປຸ່ມປິດ ເມື່ອຖືກບັງຄັບໃຫ້ລັອກອິນ
        openModal(loginModal); // Force open login modal
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
            // ປຸ່ມນີ້ຈະປິດໜ້າຕ່າງລົງທະບຽນ, ແຕ່ປຸ່ມປິດຂອງໜ້າຕ່າງລັອກອິນຈະຖືກຊ່ອນໄວ້ເມື່ອຖືກບັງຄັບ
            closeModal(loginModal);
            closeModal(registerModal);
        });
    });

    // ປິດ Modal ເມື່ອກົດພື້ນຫຼັງ (ຈະບໍ່ເຮັດວຽກຖ້າຖືກບັງຄັບໃຫ້ລັອກອິນ)
    window.addEventListener("click", (event) => {
        // ອະນຸຍາດໃຫ້ປິດໄດ້ກໍຕໍ່ເມື່ອຜູ້ໃຊ້ລັອກອິນແລ້ວເທົ່ານັ້ນ
        if (!sessionStorage.getItem('loggedInUser')) return;

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
        if (!sessionStorage.getItem('loggedInUser')) return;

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

            if (foundUser) {
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
                loadPage('../DIR-1/contact-1.html');
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