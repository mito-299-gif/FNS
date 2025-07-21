function setupBudgetTable() {
    const tbody = document.getElementById("budget-table-body");
    const totalEl = document.getElementById("total");
    if (!tbody || !totalEl) return;

    function formatNumber(num) {
        return Number(num).toLocaleString("lo-LO");
    }

    function calculateTotal() {
        let total = 0;
        const inputs = tbody.querySelectorAll('input[name="amount[]"]');
        inputs.forEach(input => {
            const value = parseInt(input.value.replace(/,/g, '')) || 0;
            total += value;
        });
        totalEl.textContent = formatNumber(total);
    }

    function formatInputValue(e) {
        let val = e.target.value.replace(/,/g, '');
        if (val === "") return;
        val = parseInt(val).toString();
        if (!isNaN(val) && val !== "NaN") {
            e.target.value = formatNumber(val);
        } else {
            e.target.value = "";
        }
        calculateTotal();
    }

    tbody.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i}</td>
            <td><input type="text" name="description[]"></td>
            <td><input type="text" name="amount[]"></td>
        `;
        tbody.appendChild(tr);
    }

    tbody.querySelectorAll('input[name="amount[]"]').forEach(input => {
        input.addEventListener('input', formatInputValue);
    });

    calculateTotal();
}