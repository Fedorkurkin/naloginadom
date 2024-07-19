let balance = parseFloat(localStorage.getItem('balance')) || 0;
let isTaxPaid = localStorage.getItem('isTaxPaid') === 'true' ? true : false;
let lastPaymentTime = localStorage.getItem('lastPaymentTime');

function updateBalance() {
    setInterval(function() {
        // Проверка наличия новых данных в localStorage
        const newBalance = parseFloat(localStorage.getItem('balance')) || 0;
        if (newBalance !== balance) {
            balance = newBalance;
            // Отправляем данные на основную страницу
            postMessage({ balanceUpdate: balance });
        }
    }, 1000); // Проверка каждую секунду
}

// Обработка сообщений от основного скрипта
onmessage = function(event) {
    const { action } = event.data;
    if (action === 'start') {
        // Начинаем периодическую проверку баланса
        updateBalance();
    }
};