function searchFunction() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();

    // Chuyển hướng đến trang sản phẩm khi tìm kiếm
    window.location.href = "san_pham.html#search-result";

    // Chuyển đến vị trí sản phẩm khi tìm thấy kết quả
    var products = document.getElementsByClassName("product");
    var found = false;

    // Duyệt qua từng sản phẩm
    for (var i = 0; i < products.length; i++) {
        var productName = products[i].getElementsByTagName("p")[0];
        if (productName) {
            var txtValue = productName.textContent || productName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                products[i].style.display = ""; // Hiển thị sản phẩm nếu tên sản phẩm chứa từ khóa tìm kiếm
                if (!found) {
                    products[i].scrollIntoView({ behavior: "smooth", block: "start" }); // Cuộn đến sản phẩm đầu tiên tìm thấy
                    found = true; // Đánh dấu là đã tìm thấy sản phẩm
                }
            } else {
                products[i].style.display = "none"; // Ẩn sản phẩm không phù hợp với từ khóa tìm kiếm
            }
        }
    }
}
