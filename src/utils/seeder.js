const Category = require('../models/category.model');
const Product = require('../models/product.model');
const Voucher = require('../models/voucher.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

const initialCategories = [
  {
    name: "Hộp Quà & Combo",
    slug: "hop-qua-combo",
    count: 28,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    description: "Bộ quà tặng phối sẵn chỉn chu trong hộp nhung thắt nơ lụa cao cấp."
  },
  {
    name: "Nến Thơm & Tinh Dầu",
    slug: "nen-thom-tinh-dau",
    count: 35,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    description: "Nến sáp đậu nành thiên nhiên và tinh dầu thơm phòng thư giãn tâm hồn."
  },
  {
    name: "Gốm Sứ & Pha Lê",
    slug: "gom-su-pha-le",
    count: 24,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    description: "Ly sứ vẽ tay nghệ thuật, ly pha lê mạ vàng tinh xảo."
  },
  {
    name: "Bút Ký & Sổ Da",
    slug: "so-tay-but-ky",
    count: 19,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
    description: "Bút ký ngòi vàng khắc tên, sổ da dập vân thủ công đẳng cấp."
  },
  {
    name: "Decor & Đèn Nghệ Thuật",
    slug: "trang-tri-nghe-thuat",
    count: 22,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    description: "Đèn ngủ 3D mặt trăng, đồng hồ cát nghệ thuật tạo điểm nhấn không gian."
  },
  {
    name: "Trà Hoa & Sức Khỏe",
    slug: "tra-hoa-thao-moc",
    count: 16,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
    description: "Trà hoa cúc tiến vua, trà dưỡng nhan và mật ong hữu cơ bổ dưỡng."
  }
];

const initialProducts = [
  {
    name: "Set Quà Cưới Song Hỷ Uyên Ương Hoàng Gia",
    category: "hop-qua-combo",
    categoryName: "Hộp Quà & Combo",
    giftType: "combo",
    occasions: ["cuoi", "ky-niem"],
    price: 1250000,
    originalPrice: 1450000,
    discountPercent: 14,
    badge: "BÁN CHẠY",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 168,
    soldCount: 385,
    stock: 24,
    brand: "LUXE GIFTS",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [
      { name: "Cặp ly rượu vang pha lê viền vàng 18K", quantity: 2, desc: "Pha lê Bohemia cao cấp" },
      { name: "Hũ nến thơm hoa hồng Pháp 200g", quantity: 1, desc: "Sáp đậu nành thiên nhiên thơm 45 giờ" },
      { name: "Hộp trà hoa hồng Damask thượng hạng", quantity: 1, desc: "Trà thảo mộc dưỡng nhan" },
      { name: "Thiệp chúc cưới ép kim vàng viết tay", quantity: 1, desc: "Giấy mỹ thuật dày dặn" }
    ],
    giftBox: "Hộp cứng nam châm phủ nhung đỏ ruby thắt nơ ruy băng kim tuyến",
    shortDesc: "Món quà cưới ý nghĩa chúc phúc cho đôi uyên ương trăm năm hoà hợp và ngập tràn hạnh phúc.",
    fullDesc: "Set Quà Cưới Song Hỷ Uyên Ương được thiết kế tinh tế với sắc đỏ may mắn và vàng vương giả.",
    material: "Pha lê cao cấp không chì, sáp đậu nành tự nhiên, giấy mỹ thuật 350gsm.",
    care: "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp vào nến."
  },
  {
    name: "Hộp Quà Sinh Nhật Sweet Joy Pastel Deluxe",
    category: "hop-qua-combo",
    categoryName: "Hộp Quà & Combo",
    giftType: "combo",
    occasions: ["sinh-nhat", "ky-niem"],
    price: 680000,
    originalPrice: 790000,
    discountPercent: 14,
    badge: "BÁN CHẠY",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 142,
    soldCount: 520,
    stock: 18,
    brand: "LUXE GIFTS",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [
      { name: "Bình giữ nhiệt Pastel khắc tên miễn phí", quantity: 1, desc: "Inox 316 giữ nhiệt 12h" },
      { name: "Hũ kẹo dẻo hoa quả cao cấp Pháp", quantity: 1, desc: "Vị dâu tây & đào ngọt dịu" },
      { name: "Bó hoa baby khô vĩnh cửu", quantity: 1, desc: "Hoa khô giữ màu 2 năm" },
      { name: "Dây đèn đom đóm Fairy Light + Thiệp 3D", quantity: 1, desc: "Kèm pin sẵn mở hộp sáng lung linh" }
    ],
    giftBox: "Hộp quà màu hồng be pastel thắt nơ ren cao cấp",
    shortDesc: "Hộp quà sinh nhật ngọt ngào, ấm áp gửi gắm niềm vui và năng lượng tích cực cho tuổi mới.",
    fullDesc: "Mỗi chi tiết trong set Sweet Joy Deluxe đều mang sắc thái tươi sáng.",
    material: "Inox 316 kháng khuẩn, hoa khô tự nhiên, giấy kraft nghệ thuật.",
    care: "Rửa bình bằng bọt mềm, tránh va đập mạnh."
  },
  {
    name: "Set Quà Tân Gia Phú Quý Cát Tường",
    category: "hop-qua-combo",
    categoryName: "Hộp Quà & Combo",
    giftType: "combo",
    occasions: ["tan-gia", "doanh-nghiep"],
    price: 1580000,
    originalPrice: 1850000,
    discountPercent: 15,
    badge: "MỚI",
    isNew: true,
    isBestSeller: false,
    rating: 5.0,
    reviewCount: 78,
    soldCount: 290,
    stock: 12,
    brand: "LUXE GIFTS",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [
      { name: "Máy khuếch tán gốm vân đá siêu âm", quantity: 1, desc: "Dung tích 300ml, đèn ngủ 7 màu" },
      { name: "Bộ 3 chai tinh dầu tự nhiên (Quế, Cam, Sả chanh)", quantity: 3, desc: "Khử mùi, thanh lọc không khí nhà mới" },
      { name: "Đồng hồ cát nghệ thuật kim sa phong thủy", quantity: 1, desc: "Biểu trưng cho thời gian và tài lộc" },
      { name: "Thiệp mừng Tân Gia An Khang dập nổi", quantity: 1, desc: "Lời chúc phúc gia chủ vạn sự như ý" }
    ],
    giftBox: "Hộp quà nắp gập vân gỗ tự nhiên thắt nơ đũi vàng kim",
    shortDesc: "Món quà tân gia phong thủy mang lại nguồn năng lượng an lành, hưng vượng cho ngôi nhà mới.",
    fullDesc: "Món quà lý tưởng chúc mừng gia chủ về tổ ấm mới.",
    material: "Gốm nung men sứ, tinh dầu thiên nhiên 100%, thủy tinh cao cấp.",
    care: "Dùng nước tinh khiết cho máy khuếch tán, lau khô đáy máy sau khi dùng."
  },
  {
    name: "Set Quà Tri Ân Doanh Nhân Hoàng Gia",
    category: "hop-qua-combo",
    categoryName: "Hộp Quà & Combo",
    giftType: "combo",
    occasions: ["doanh-nghiep", "sinh-nhat"],
    price: 920000,
    originalPrice: 1100000,
    discountPercent: 16,
    badge: "BÁN CHẠY",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 115,
    soldCount: 410,
    stock: 20,
    brand: "LUXE GIFTS",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585336261026-6a0b4d458641?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [
      { name: "Bút ký kim loại ngòi mực gel mạ vàng", quantity: 1, desc: "Ngòi trơn 0.5mm, khắc tên theo yêu cầu" },
      { name: "Sổ tay bìa da PU cao cấp gáy may chỉ", quantity: 1, desc: "200 trang giấy ngà chống lóa mắt" },
      { name: "Hộp đựng danh thiếp da bò thủ công", quantity: 1, desc: "Khóa nam châm hít chắc chắn" },
      { name: "Hộp quà định hình phủ nhung đen sang trọng", quantity: 1, desc: "Thiết kế chuẩn mực doanh nhân" }
    ],
    giftBox: "Hộp quà cứng màu đen lì dập kim vàng vương giả",
    shortDesc: "Bộ quà tặng trang trọng, khẳng định vị thế và gửi gắm lòng tri ân sâu sắc tới sếp, thầy cô hoặc đối tác.",
    fullDesc: "Sự kết hợp hoàn hảo giữa nét lịch lãm và tính ứng dụng cao.",
    material: "Hợp kim cao cấp, Da nhân tạo PU kháng nước, Giấy Ford Nhật 100gsm.",
    care: "Bảo quản nơi khô ráo, đậy nắp bút sau khi sử dụng."
  },
  {
    name: "Nến Thơm Tinh Dầu Gỗ Đàn Hương & Hổ Phách",
    category: "nen-thom-tinh-dau",
    categoryName: "Nến Thơm & Tinh Dầu",
    giftType: "single",
    occasions: ["sinh-nhat", "ky-niem", "tan-gia"],
    price: 290000,
    originalPrice: 350000,
    discountPercent: 17,
    badge: "BÁN CHẠY",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 210,
    soldCount: 620,
    stock: 45,
    brand: "Aura Home",
    sizes: ["100g", "200g", "300g"],
    colors: [
      { name: "Trắng Ngà", hex: "#F5F5DC" },
      { name: "Đen Sứ", hex: "#1C1C1C" },
      { name: "Vàng Gold", hex: "#C9A84C" }
    ],
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp giấy kraft định hình mạ kim sang trọng",
    shortDesc: "Hương gỗ đàn hương ấm áp phối hổ phách sâu lắng, giúp xoa dịu tâm trí sau ngày dài bận rộn.",
    fullDesc: "Được đúc thủ công từ 100% sáp đậu nành thiên nhiên không khói đen độc hại.",
    material: "Sáp đậu nành nguyên chất, bấc gỗ, tinh dầu nguyên chất nhập khẩu Pháp.",
    care: "Cắt bấc còn khoảng 5mm trước mỗi lần thắp."
  },
  {
    name: "Ly Sứ Vẽ Tay Hoàng Gia Kèm Muỗng Mạ Vàng",
    category: "gom-su-pha-le",
    categoryName: "Gốm Sứ & Pha Lê",
    giftType: "single",
    occasions: ["sinh-nhat", "cuoi", "doanh-nghiep"],
    price: 220000,
    originalPrice: 280000,
    discountPercent: 21,
    badge: "HOT",
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 130,
    soldCount: 480,
    stock: 50,
    brand: "Royal Potter",
    sizes: ["240ml", "350ml", "480ml"],
    colors: [
      { name: "Trắng Hoàng Gia", hex: "#FEFEFE" },
      { name: "Xanh Cobalt", hex: "#1A4F8A" },
      { name: "Hồng Pastel", hex: "#F4A7B9" }
    ],
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp quà lót lụa chống sốc thắt nơ",
    shortDesc: "Ly sứ men ngọc cao cấp họa tiết vẽ tay viền vàng, kèm muỗng cà phê quý tộc.",
    fullDesc: "Chất liệu sứ xương nung ở nhiệt độ 1300 độ C loại bỏ hoàn toàn chì và tạp chất.",
    material: "Sứ xương cao cấp nung nhiệt cao, men sáng bóng chống ố vàng.",
    care: "Khuyên rửa bằng tay để giữ lớp viền vàng luôn lấp lánh như mới."
  },
  {
    name: "Đèn Ngủ Mặt Trăng 3D Cảm Ứng Đổi 16 Màu",
    category: "trang-tri-nghe-thuat",
    categoryName: "Decor & Đèn Nghệ Thuật",
    giftType: "single",
    occasions: ["sinh-nhat", "ky-niem"],
    price: 340000,
    originalPrice: 420000,
    discountPercent: 19,
    badge: "MỚI",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 154,
    soldCount: 510,
    stock: 22,
    brand: "Lumi Art",
    sizes: ["10cm", "15cm", "20cm", "25cm"],
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp quà vũ trụ dạ quang sang trọng",
    shortDesc: "Đèn ngủ in 3D mô phỏng chân thực bề mặt mặt trăng với 16 màu sắc tùy chỉnh qua remote.",
    fullDesc: "Mang cả vầng trăng lung linh vào căn phòng của người thương.",
    material: "Nhựa sinh học PLA an toàn thân thiện môi trường, đế gỗ tự nhiên.",
    care: "Sạc đầy trong 2 tiếng, dùng liên tục từ 8-12 tiếng."
  },
  {
    name: "Bộ Cờ Vua Thủy Tinh Khắc Axit Nghệ Thuật Độc Bản",
    category: "trang-tri-nghe-thuat",
    categoryName: "Decor & Đèn Nghệ Thuật",
    giftType: "single",
    occasions: ["doanh-nghiep", "tan-gia"],
    price: 1890000,
    originalPrice: 2200000,
    discountPercent: 14,
    badge: "XẢ KHO",
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 15,
    soldCount: 12,
    stock: 38,
    brand: "Artisan Glass",
    images: [
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp da chuyên dụng bảo vệ từng quân cờ",
    shortDesc: "Bộ cờ vua thủy tinh mờ và trong suốt chế tác thủ công tinh xảo (Hàng bán chậm cần xả kho).",
    fullDesc: "Thiết kế nghệ thuật độc đáo. Mỗi quân cờ được vát cạnh mượt mà.",
    material: "Thủy tinh quang học cao cấp, bàn cờ kính cường lực 8mm.",
    care: "Lau sạch bằng khăn mềm ẩm, tránh va chạm mạnh."
  }
];

const initialVouchers = [
  { code: "GIFT2026", discount: 15, maxDiscount: 300000, minOrder: 500000, desc: "Giảm 15% tối đa 300.000đ cho đơn quà tặng từ 500.000đ", isShipping: false },
  { code: "FREESHIP", discount: 100, isShipping: true, minOrder: 300000, desc: "Miễn phí vận chuyển toàn quốc cho đơn từ 300.000đ" },
  { code: "WELCOME10", discount: 10, maxDiscount: 150000, minOrder: 0, desc: "Giảm 10% cho khách hàng mới đặt quà tặng", isShipping: false }
];

const seedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('🌱 Đang khởi tạo danh mục quà tặng ban đầu...');
      await Category.insertMany(initialCategories);
      console.log('✅ Đã tạo danh mục quà tặng!');
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Đang khởi tạo sản phẩm quà tặng ban đầu...');
      await Product.insertMany(initialProducts);
      console.log('✅ Đã tạo sản phẩm quà tặng!');
    }

    const voucherCount = await Voucher.countDocuments();
    if (voucherCount === 0) {
      await Voucher.insertMany(initialVouchers);
      console.log('✅ Đã tạo vouchers quà tặng!');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        {
          fullName: 'Admin Quản Trị LUXE GIFTS',
          email: 'admin@luxestore.vn',
          password: 'Password123!',
          phone: '0988 888 888',
          role: 'admin',
          membership: 'QUẢN TRỊ VIÊN HỆ THỐNG',
        },
        {
          fullName: 'Nguyễn Văn An',
          email: 'demo.customer@luxestore.vn',
          password: 'Password123!',
          phone: '0912 345 678',
          role: 'customer',
          membership: 'HỘI VIÊN LUXE VIP',
          address: {
            province: 'Hà Nội',
            district: 'Hoàn Kiếm',
            ward: 'Phường Hàng Trống',
            detail: '45 Phố Hàng Trống',
          },
        },
      ]);
      console.log('✅ Đã tạo tài khoản mẫu!');
    }
  } catch (err) {
    console.error('⚠️ Lỗi khi seed dữ liệu:', err.message);
  }
};

module.exports = { seedDatabase };
