let currentView = 'all';
let allTickets = [];
let currentSeach = "";

const tbody = document.getElementById("table-body");
const tabs = document.getElementById("ticketTabs");
const searchInput = document.getElementById("search-ticket-input");
const checkBoxAll = document.getElementById("select-all-checkbox")
const checkBoxes = document.getElementById("select-check-boxes");
const editSelected = document.getElementById("edit-selected-btn");

function fetchTickets() {
    // this will be replaced with the Zammad API call
    return [
        { id: 12345, name: "Example Ticket 1", status: "open", severity: "high", daysOpen: 5 },
        { id: 67890, name: "Example Ticket 2", status: "closed", severity: "low", daysOpen: 2 },
        { id: 54321, name: "Example Ticket 3", status: "open", severity: "medium", daysOpen: 10 },
        { id: 92834, name: "printer not working", status: "open", severity: "low", daysOpen: 1 },
        { id: 30498, name: "pc not turning on", status: "open", severity: "high", daysOpen: 5 },
        { id: 204, name: "monitor is black", status: "open", severity: "high", daysOpen: 2 },
        { id: 283, name: "phone is not working", status: "open", severity: "high", daysOpen: 2 },
        { id: 10398, name: "rta not working", status: "open", severity: "high", daysOpen: 6 },
        { id: 4955, name: "cant print", status: "open", severity: "medium", daysOpen: 4 },
    ]
}

function isRecent(ticket) {
    return ticket.daysOpen <= 7;
}

function applyViewFilter(tickets, view) {
    switch (view) {
        case 'open':
            return tickets.filter(ticket => ticket.status === 'open');
        case 'closed':
            return tickets.filter(ticket => ticket.status === 'closed');
        case 'recent':
            return tickets.filter(isRecent);
        case "all":
        default:
            return tickets;

    }

}

function applySearchFilter(tickets, query) {
    const q = query.trim().toLowerCase();
    if (!q) return tickets;

    return tickets.filter(t =>
        String(t.id).includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q) ||
        t.severity.toLowerCase().includes(q)
    );
}


// can add more for more information
function renderTable(tickets){
    tbody.innerHTML = tickets.map(t => `
        <tr>
            <td class="col-select"><input type="checkbox" class="row-select" id="select-check-boxes" aria-label="Select ticket ${t.id}"></td>
            <td>${t.id}</td>
            <td>${t.name}</td>
            <td>${t.status}</td>
            <td>${t.severity}</td>
            <td>${t.daysOpen}</td>
        </tr>
    `).join('');
}

function refresh(){
    const viewFiltered = applyViewFilter(allTickets, currentView);
    const searchFiltered = applySearchFilter(viewFiltered, currentSeach);
    renderTable(searchFiltered);
}

function getInitialView() {
    const params = new URLSearchParams(window.location.search);
    return params.get("view" || "all");
}

function hideEditSelected(){
    const selected = document.querySelectorAll(".row-select:checked")
    if(selected.length === 0) {
        editSelected.style.visibility = "hidden";
    }
    else if (selected.length === 1) {
        editSelected.style.visibility = "visible";
    }
    else {
        editSelected.style.visibility = "hidden";
    }
}

document.addEventListener("change", (e) => {
    if(e.target.classList.contains("row-select")) {
        hideEditSelected();
    }
})

hideEditSelected();

// MUST DO STILL


// DELETE THE SELECTED TICKETS

// HAVE THE NUMBER OF TICKETS PRESENTED

// ARCHIVE TAB?




tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;

    currentView = btn.dataset.view;

    // update active tab style
    document.querySelectorAll("#ticketTabs .tab").forEach(t => t.classList.remove("is-active"));
    btn.classList.add("is-active");

    refresh();
});

// search handler
searchInput.addEventListener("input", (e) => {
    currentSeach = e.target.value;
    refresh();
});

// initial load
currentView = getInitialView();
allTickets = fetchTickets();
refresh();

document.querySelectorAll("#ticketTabs .tab").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.view === currentView);
});

checkBoxAll.addEventListener("click", (e) => {
    const checkBoxes = document.querySelectorAll(".row-select");

    checkBoxes.forEach(cb => {
        cb.checked = e.target.checked;
    })

})

