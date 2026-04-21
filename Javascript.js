// Sample data
const userData = {
    name: 'Adriano Curtis',
    initial: 'Ac',
    balance: 60534.04,
    email: 'adriano.curtis@example.com',
    income: 5000.00,
    expense: 1300.00,
    savings: 3700.00
};

const transactionsData = [
    {
        id: 1,
        name: 'Supermarket Store',
        amount: -125.50,
        type: 'debit',
        date: 'Today',
        icon: '🛒'
    },
    {
        id: 2,
        name: 'Salary Deposit',
        amount: 5000.00,
        type: 'credit',
        date: 'Feb 02',
        icon: '💳'
    },
    {
        id: 3,
        name: 'Electric Bill',
        amount: -89.99,
        type: 'debit',
        date: 'Feb 01',
        icon: '⚡'
    },
    {
        id: 4,
        name: 'Restaurant Payment',
        amount: -45.30,
        type: 'debit',
        date: 'Jan 31',
        icon: '🍽️'
    },
    {
        id: 5,
        name: 'Transfer Received',
        amount: 1000.00,
        type: 'credit',
        date: 'Jan 29',
        icon: '📤'
    }
];

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

function renderTransactions() {
    const container = document.getElementById('transactionsList');
    container.innerHTML = '';

    transactionsData.forEach(transaction => {
        const isCredit = transaction.type === 'credit';
        const transactionEl = document.createElement('div');
        transactionEl.className = 'transaction-item';

        const iconSymbol = isCredit ? '↓' : '↑';

        transactionEl.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon-wrapper ${transaction.type}">
                    ${iconSymbol}
                </div>
                <div class="transaction-details">
                    <p class="transaction-name">${transaction.name}</p>
                    <p class="transaction-date">${transaction.date}</p>
                </div>
            </div>
            <div class="transaction-amount-wrapper">
                <p class="transaction-amount ${transaction.type}">
                    ${isCredit ? '+' : '−'}${formatCurrency(Math.abs(transaction.amount))}
                </p>
                <p class="transaction-type">${transaction.type}</p>
            </div>
        `;

        container.appendChild(transactionEl);
    });
}

function updateStats() {
    document.getElementById('incomeAmount').textContent = formatCurrency(userData.income);
    document.getElementById('expenseAmount').textContent = formatCurrency(userData.expense);
    document.getElementById('savingsAmount').textContent = formatCurrency(userData.savings);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function initPage() {
    // Set user name and initial
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userInitial').textContent = userData.initial;

    // Set balance
    document.getElementById('balanceAmount').textContent = formatCurrency(userData.balance);

    // Update stats
    updateStats();

    // Render transactions
    renderTransactions();

    // Setup navigation
    setupNavigation();

    // Add click handlers to spending cards
    const spendingCards = document.querySelectorAll('.spending-card');
    spendingCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Add click handler to notification button
    document.querySelector('.notification-btn').addEventListener('click', () => {
        console.log('Notifications clicked');
    });

    // Add smooth scroll for see-all links
    document.querySelectorAll('.see-all').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('View all clicked');
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
