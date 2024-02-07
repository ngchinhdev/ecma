import { getBlogs } from "../../api/apiBlogs.js";
import { getProducts } from "../../api/apiProducts.js";
import { getUser } from "../../api/apiUsers.js";
import { loader2 } from "../../utils/loader.js";

async function generateMarkup(container, data) {
    container.innerHTML = '';
    await loader2(container, 500);

    const markup = `<div id="dashboard">
                        <h1>Trang thống kê</h1>
                        <div class="four-col">
                            <div class="col col-1">
                                <div class="icon">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalUsers}
                                </div>
                                <h3 class="title">
                                    Người dùng
                                </h3>
                                <div class="more-info link" data-control="user">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-2">
                                <div class="icon">
                                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalBlogs}
                                </div>
                                <h3 class="title">
                                    Bài viết
                                </h3>
                                <div class="more-info link" data-control="category">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-3">
                                <div class="icon">
                                    <i class="fa fa-lemon-o" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalProducts}
                                </div>
                                <h3 class="title">
                                    Sản phẩm
                                </h3>
                                <div class="more-info link" data-control="product">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col col-4">
                                <div class="icon">
                                    <i class="fa fa-money" aria-hidden="true"></i>
                                </div>
                                <div class="number">
                                    ${data.totalBlogs}
                                </div>
                                <h3 class="title">
                                    Tổng doanh thu
                                </h3>
                                <div class="more-info link" data-control="order">
                                    Xem thêm <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="two-col">
                            <div class="col">
                                <div class="title">
                                    <h3>Đơn hàng gần đây</h3>
                                </div>
                                <div class="content chart-box">
                                    <div class="hints">
                                        
                                    </div>
                                    <div id="chart">
                                     
                                    </div>
                                </div>
                            </div>
                            <div class="col best-inventory">
                                <div class="title">
                                    <h3>Sản phẩm sắp hết hàng</h3>
                                </div>
                                <div class="content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function initDashboard(container) {
    const data = {};

    const totalProducts = await getProducts();
    const totalBlogs = await getBlogs();
    const totalUsers = await getUser();
    const totalOrders = await getProducts();

    data['totalProducts'] = totalProducts.length;
    data['totalBlogs'] = totalBlogs.length;
    data['totalUsers'] = totalUsers.length;
    data['totalOrders'] = totalOrders.length;

    await generateMarkup(container, data);
}