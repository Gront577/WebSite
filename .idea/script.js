document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer для анимаций при скролле
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section, .fade-in-item').forEach(el => {
        observer.observe(el);
    });

    // Обработка формы Web3Forms (AJAX)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const messageEl = document.getElementById('form-message');

            messageEl.classList.remove('hidden', 'text-green-400', 'text-red-400');
            messageEl.textContent = 'Отправляем...';
            messageEl.classList.add('text-gray-300');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    messageEl.textContent = 'Сообщение отправлено! Скоро свяжусь 🚀';
                    messageEl.classList.add('text-green-400');
                    form.reset();
                } else {
                    const errorData = await response.json();
                    messageEl.textContent = errorData.message || 'Ошибка отправки. Попробуй позже.';
                    messageEl.classList.add('text-red-400');
                }
            } catch (error) {
                messageEl.textContent = 'Проблема с сетью. Проверь интернет.';
                messageEl.classList.add('text-red-400');
            }
        });
    }
});