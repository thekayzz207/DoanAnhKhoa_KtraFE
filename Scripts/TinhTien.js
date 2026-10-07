document.addEventListener('DOMContentLoaded', () => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
    };

    const calculateCart = () => {
        let totalQty = 0;
        let totalPrice = 0;

        // Lặp qua từng mặt hàng trong giỏ
        document.querySelectorAll('.cart-item').forEach(item => {
            const input = item.querySelector('.qty-input');
            const priceDisplay = item.querySelector('.price-display');

            // Lấy giá trị từ ô input, nếu rỗng thì mặc định là 0
            let qty = parseInt(input.value) || 0;
            if (qty < 0) qty = 0; // Ngăn người dùng nhập số âm

            const unitPrice = parseFloat(input.getAttribute('data-price'));

            // Tính tiền từng món và cập nhật hiển thị
            const itemTotalPrice = qty * unitPrice;
            priceDisplay.textContent = formatCurrency(itemTotalPrice);

            // Cộng dồn vào tổng số lượng và tổng tiền
            totalQty += qty;
            totalPrice += itemTotalPrice;
        });

        // Cập nhật lên giao diện
        document.getElementById('cart-count').textContent = totalQty;
        document.getElementById('subtotal-count').textContent = totalQty;
        document.getElementById('bottom-subtotal-count').textContent = totalQty;
        document.getElementById('subtotal-price').textContent = formatCurrency(totalPrice);
        document.getElementById('bottom-subtotal-price').textContent = formatCurrency(totalPrice);
    };

    // Lắng nghe sự kiện khi thay đổi số lượng (bằng mũi tên hoặc gõ phím)
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('input', calculateCart);
    });

    // Tính toán lần đầu khi vừa mở trang
    calculateCart();
});