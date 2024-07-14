// Định nghĩa các giá sản phẩm
var productPrices = {
    InterMiami: 200000,
    Paris_Saint_Germain: 190000,
    Barcelona: 220000,
    Liverpool_SanKhach: 250000,
    Liverpool_SanNha: 250000,
    AC_Milan_SanNha: 240000,
    Asenal_SanNha: 230000,
    ManchesterCity: 280000,
    BorussiaDortmund: 220000,
    InterMiami_SanNha: 250000,
    Barcelona_SanNha: 290000,
    Juventus_SanNha: 240000,
    Juventus_SanKhach: 240000,
    ManchesterUnited_SanKhach: 280000,
    Paris_Saint_Germain_SanKhach: 260000,
    Liverpool_SanTap: 270000,
    Belgium_SanNha: 230000,
    Portugal_SanKhach: 170000,
    Germany_SanNha: 180000,
    Italia_SanNha: 220000,
    Spain_SanNha: 190000,
    Spain_SanKhach: 210000,
    Germany_SanKhach: 250000,
    Argentina_SanNha: 200000,
    French_SanNha: 240000,
    French_SanKhach: 160000,
    Mexico_SanNha: 190000,
    Mexico_SanKhach: 240000,
    England_SanNha: 240000,
    Ao_Tap_Do: 100000,
    Ao_Tap_Vang: 100000,
    Argentina_SanKhach: 210000,
    Giay_WIKA_Den: 310000,
    Giay_WIKA_Bac: 370000,
    Giay_WIKA_Xanh_Den: 390000,
    Giay_WIKA_Xanh_Duong: 350000,
    Giay_WIKA_Xanh_La: 360000,
    Giay_WIKA_Do: 350000,
    Giay_ALPHA_Xanh_Nhat: 430000,
    Giay_ALPHA_Xanh_Duong: 480000,
    Gio_Giay_The_Thao: 150000,
    Bang_Keo_Quan_Chan: 20000,
    Bang_Got_The_Thao: 50000,
    Tat_Bong_Da: 25000
};

var ul = document.getElementById("ul_pr");
var total = 0;
var cart = []; // Mảng lưu trữ giỏ hàng

// Kiểm tra nếu Local Storage đã có giỏ hàng
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart')); // Lấy giỏ hàng từ Local Storage
    // Hiển thị giỏ hàng đã lưu
    cart.forEach(function(item) {
        add(item.id, item.quantity);
    });
}

// Thêm sản phẩm vào giỏ hàng
function add(id, quantity = 1) {
    var existingItem = document.getElementById(id + "_item");

    // Nếu sản phẩm đã tồn tại trong giỏ hàng
    if (existingItem) {
        // Tăng số lượng sản phẩm
        var quantityElement = existingItem.querySelector('.quantity-input');
        var currentQuantity = parseInt(quantityElement.value);
        quantityElement.value = currentQuantity + quantity;
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        var li_new = document.createElement("li");
        li_new.id = id + "_item"; // Gán id cho li mới
        li_new.classList.add("product-item"); // Thêm class cho li mới

        // Tạo nút xóa
        var del_btn = document.createElement("button");
        del_btn.innerText = "Xóa";
        del_btn.classList.add("btn-delete"); // Thêm class cho nút xóa
        del_btn.onclick = function() {
            removeItem(id, li_new);
        };

        // Tạo ô nhập số lượng sản phẩm
        var quantity_input = document.createElement("input");
        quantity_input.type = "number";
        quantity_input.value = quantity;
        quantity_input.classList.add("quantity-input"); // Thêm class để dễ dàng lấy số lượng
        quantity_input.min = 1;
        quantity_input.onchange = function() {
            updateQuantity(id, quantity_input.value);
        };
        li_new.appendChild(quantity_input);

        // Thêm tên sản phẩm và giá sản phẩm
        var productName = id.replace(/_/g, " ");
        var productPrice = productPrices[id] * quantity; // Tính tổng giá sản phẩm
        var li_text = productName + " - Giá: " + productPrice.toLocaleString('vi-VN') + " VNĐ";
        var li_inp = document.createElement("span");
        li_inp.classList.add("product-name"); // Thêm class cho tên sản phẩm
        li_inp.textContent = li_text;
        li_new.appendChild(li_inp);

        li_new.appendChild(del_btn);
        ul.appendChild(li_new);
    }

    // Cập nhật giỏ hàng và Local Storage
    updateCart();

    // Cập nhật lại tổng giá tiền
    calculateTotal();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(id, li) {
    ul.removeChild(li);
    // Cập nhật giỏ hàng và Local Storage
    updateCart();

    // Cập nhật lại tổng giá tiền
    calculateTotal();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(id, quantity) {
    var item = document.getElementById(id + "_item");
    var quantityElement = item.querySelector('.quantity-input');
    quantityElement.value = quantity;

    // Cập nhật giỏ hàng và Local Storage
    updateCart();

    // Cập nhật lại giá sản phẩm
    var productPrice = productPrices[id] * quantity; // Tính tổng giá sản phẩm
    var productName = id.replace(/_/g, " ");
    var li_text = productName + " - Giá: " + productPrice.toLocaleString('vi-VN') + " VNĐ";
    var li_inp = item.querySelector('.product-name');
    li_inp.textContent = li_text;

    // Cập nhật lại tổng giá tiền
    calculateTotal();
}

// Cập nhật giỏ hàng và Local Storage
function updateCart() {
    cart = [];
    var listItems = ul.children;
    for (var i = 0; i < listItems.length; i++) {
        var id = listItems[i].id.replace("_item", "");
        var quantity = parseInt(listItems[i].querySelector('.quantity-input').value);
        cart.push({ id: id, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Tính tổng tiền
function calculateTotal() {
    total = 0;
    cart.forEach(function(item) {
        total += productPrices[item.id] * item.quantity;
    });
    document.getElementById("total_price").innerText = "Tổng tiền: " + total.toLocaleString('vi-VN') + " VNĐ";
}

// Xóa toàn bộ sản phẩm khỏi giỏ hàng
function emptyList() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    // Xóa Local Storage
    localStorage.removeItem('cart');

    // Cập nhật tổng tiền
    total = 0;
    document.getElementById("total_price").innerText = "Tổng tiền: 0 VNĐ";
}


function checkout() {
    alert("Cảm ơn bạn đã mua hàng!");
    emptyList(); // Xóa giỏ hàng sau khi thanh toán
}

// Hàm xóa giỏ hàng
function emptyList() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    localStorage.removeItem('cart');
    total = 0;
    document.getElementById("total_price").innerText = "Tổng tiền: 0 VNĐ";
}
