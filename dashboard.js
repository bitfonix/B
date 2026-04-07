document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-navigation button');
    const tabContents = document.querySelectorAll('.tab-content');

    const userModal = document.getElementById('user-modal');
    const investmentModal = document.getElementById('investment-modal');
    const swapModal = document.getElementById('swap-modal');
    const sellModal = document.getElementById('sell-modal');

    const closeModalButtons = document.querySelectorAll('.btn-cancel');

    // Tab functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Function to open modals
    const openModal = (modal) => {
        if (modal) modal.classList.add('active');
    };

    // Function to close modals
    const closeModal = (modal) => {
        if (modal) modal.classList.remove('active');
    };

    // Add event listeners for details buttons
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    // Add event listeners for close buttons in modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal if clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
});
