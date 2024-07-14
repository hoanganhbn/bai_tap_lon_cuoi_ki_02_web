function add(productId) {
    // Lấy sản phẩm từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    let productIndex = cart.findIndex(item => item.id === productId);
  
    if (productIndex > -1) {
      // Nếu sản phẩm đã có, tăng số lượng lên 1
      cart[productIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng là 1
      cart.push({ id: productId, quantity: 1 });
    }
  
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Hiển thị thông báo
    showAlert('Sản phẩm đã được thêm vào giỏ hàng');
  }
  
  function showAlert(message) {
    // Tạo phần tử thông báo
    let alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
  
    // Thêm phần tử thông báo vào body
    document.body.appendChild(alertBox);
  
    // Loại bỏ thông báo sau 1.5 giây
    setTimeout(() => {
      alertBox.remove();
    }, 1500);
  }
  