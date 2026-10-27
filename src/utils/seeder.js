const Category = require('../models/category.model');
const Product = require('../models/product.model');
const Voucher = require('../models/voucher.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

// Dữ liệu meta phân loại quà tặng LUXE GIFTS
const OCCASIONS = [
  { id: 'all', name: 'Tất cả dịp lễ', desc: 'Tất cả các dịp tặng quà' },
  { id: 'cuoi', name: 'Cưới hỏi & Hỷ sự', desc: 'Món quà chúc phúc trăm năm hạnh phúc' },
  { id: 'sinh-nhat', name: 'Sinh nhật', desc: 'Bất ngờ ngọt ngào mừng tuổi mới' },
  { id: 'tan-gia', name: 'Mừng tân gia', desc: 'Tài lộc, bình an cho tổ ấm mới' },
  { id: 'ky-niem', name: 'Kỷ niệm & Tình yêu', desc: 'Lãng mạn, thăng hoa cảm xúc đôi lứa' },
  { id: 'doanh-nghiep', name: 'Tri ân đối tác / Sếp', desc: 'Sang trọng, đẳng cấp và chuyên nghiệp' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả mức giá', min: 0, max: 10000000 },
  { id: 'under-300', label: 'Dưới 300.000đ', min: 0, max: 300000 },
  { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
  { id: '500-1000', label: '500.000đ - 1.000.000đ', min: 500000, max: 1000000 },
  { id: 'above-1000', label: 'Trên 1.000.000đ', min: 1000000, max: 10000000 }
];

const GIFT_TYPES = [
  { id: 'all', label: 'Tất cả quà tặng' },
  { id: 'single', label: 'Quà lẻ', desc: 'Từng món quà độc lập, tinh tuyển' },
  { id: 'combo', label: 'Quà combo', desc: 'Hộp quà trọn vẹn phối sẵn thiệp' }
];

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
  // 1. Quà Combo Cưới
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
    fullDesc: "Set Quà Cưới Song Hỷ Uyên Ương được thiết kế tinh tế với sắc đỏ may mắn và vàng vương giả. Bộ đôi ly pha lê chạm khắc đường nét mềm mại đồng hành cùng hương nến thơm nồng nàn tạo nên khoảnh khắc ngọt ngào đáng nhớ trong ngày trọng đại.",
    material: "Pha lê cao cấp không chì, sáp đậu nành tự nhiên, giấy mỹ thuật 350gsm.",
    care: "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp vào nến."
  },

  // 2. Quà Combo Sinh Nhật
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
    fullDesc: "Mỗi chi tiết trong set Sweet Joy Deluxe đều mang sắc thái tươi sáng. Khách hàng có thể yêu cầu khắc tên hoặc lời chúc ngắn lên thân bình giữ nhiệt để tạo dấu ấn cá nhân độc bản.",
    material: "Inox 316 kháng khuẩn, hoa khô tự nhiên, giấy kraft nghệ thuật.",
    care: "Rửa bình bằng bọt mềm, tránh va đập mạnh."
  },

  // 3. Quà Combo Tân Gia
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
    fullDesc: "Món quà lý tưởng chúc mừng gia chủ về tổ ấm mới. Hương thơm tinh dầu thiên nhiên xua tan mùi sơn mới, đem đến không gian sống ấm cúng và tràn ngập sinh khí.",
    material: "Gốm nung men sứ, tinh dầu thiên nhiên 100%, thủy tinh cao cấp.",
    care: "Dùng nước tinh khiết cho máy khuếch tán, lau khô đáy máy sau khi dùng."
  },

  // 4. Quà Combo Doanh Nghiệp
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
    fullDesc: "Sự kết hợp hoàn hảo giữa nét lịch lãm và tính ứng dụng cao. Bút ký êm ái cùng sổ tay da bền bỉ sẽ đồng hành cùng người nhận trong mọi ký kết và dự án thành công.",
    material: "Hợp kim cao cấp, Da nhân tạo PU kháng nước, Giấy Ford Nhật 100gsm.",
    care: "Bảo quản nơi khô ráo, đậy nắp bút sau khi sử dụng."
  },

  // 5. Quà Combo Kỷ Niệm Tình Yêu
  {
    name: "Set Quà Kỷ Niệm Tình Yêu Forever Love",
    category: "hop-qua-combo",
    categoryName: "Hộp Quà & Combo",
    giftType: "combo",
    occasions: ["ky-niem", "sinh-nhat"],
    price: 850000,
    originalPrice: 990000,
    discountPercent: 14,
    badge: "BÁN CHẠY",
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 98,
    soldCount: 340,
    stock: 15,
    brand: "LUXE GIFTS",
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [
      { name: "Hộp nhạc gỗ quay tay giai điệu Can't Help Falling in Love", quantity: 1, desc: "Khắc laser hoa văn cổ điển" },
      { name: "Lọ nước hoa khô mini hương hoa cỏ dịu ngọt", quantity: 1, desc: "Dưỡng da và lưu hương 6-8 tiếng" },
      { name: "Hộp hoa hồng sáp đỏ giữ màu 3 năm", quantity: 1, desc: "Biểu tượng tình yêu vĩnh cửu" },
      { name: "Thiệp Love Letter kèm phong bì da", quantity: 1, desc: "Để bạn viết bức thư tình chân thành nhất" }
    ],
    giftBox: "Hộp quà hình lục giác đính ruy băng lụa champagne",
    shortDesc: "Món quà kỷ niệm lãng mạn giúp hâm nóng tình yêu và ghi dấu ngày hẹn hò khó phai.",
    fullDesc: "Âm thanh trong trẻo từ chiếc hộp nhạc gỗ mộc mạc hòa cùng hương thơm thanh thoát sẽ khiến người thương rung động ngay khi mở hộp.",
    material: "Gỗ sồi tự nhiên, sáp dưỡng thơm hữu cơ, hoa sáp mềm mịn.",
    care: "Tránh tiếp xúc nước với hộp gỗ và hoa sáp."
  },

  // 6. Quà Lẻ: Nến Thơm Cao Cấp
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
    fullDesc: "Được đúc thủ công từ 100% sáp đậu nành thiên nhiên không khói đen độc hại. Bấc nến bằng gỗ tự nhiên phát ra tiếng lách tách êm tai khi cháy, tạo không gian thư giãn tuyệt hảo.",
    material: "Sáp đậu nành nguyên chất, bấc gỗ, tinh dầu nguyên chất nhập khẩu Pháp.",
    care: "Cắt bấc còn khoảng 5mm trước mỗi lần thắp, đốt tối thiểu 1 tiếng để mặt nến tan đều."
  },

  // 7. Quà Lẻ: Ly Sứ Vẽ Tay Hoàng Gia
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
    fullDesc: "Chất liệu sứ xương nung ở nhiệt độ 1300 độ C loại bỏ hoàn toàn chì và tạp chất. Cầm đầm tay, giữ nhiệt tốt cho tách trà hay cà phê buổi sớm của người nhận.",
    material: "Sứ xương cao cấp nung nhiệt cao, men sáng bóng chống ố vàng.",
    care: "Khuyên rửa bằng tay để giữ lớp viền vàng luôn lấp lánh như mới."
  },

  // 8. Quà Lẻ: Đèn Ngủ Mặt Trăng 3D
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
    fullDesc: "Mang cả vầng trăng lung linh vào căn phòng của người thương. Sử dụng pin sạc cổng USB tiện dụng, có đế đỡ bằng gỗ sồi mộc mạc và chế độ điều khiển cảm ứng chạm đổi màu.",
    material: "Nhựa sinh học PLA an toàn thân thiện môi trường, đế gỗ tự nhiên.",
    care: "Sạc đầy trong 2 tiếng, dùng liên tục từ 8-12 tiếng."
  },

  // 9. Quà Lẻ: Bút Ký Doanh Nhân Khắc Tên
  {
    name: "Bút Ký Kim Loại Khắc Tên Tự Chọn Kèm Ngòi Thay Thế",
    category: "so-tay-but-ky",
    categoryName: "Bút Ký & Sổ Da",
    giftType: "single",
    occasions: ["doanh-nghiep", "sinh-nhat"],
    price: 250000,
    originalPrice: 300000,
    discountPercent: 17,
    badge: "HOT",
    isNew: false,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 89,
    soldCount: 390,
    stock: 35,
    brand: "Signet Master",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp bút bao da sang trọng lót nhung",
    shortDesc: "Bút ký thân kim loại đầm tay, tặng kèm dịch vụ khắc tên laser sắc nét theo yêu cầu.",
    fullDesc: "Mực gel cao cấp ra đều, không bị đứt đoạn hay lem mực khi ký tài liệu. Món quà ý nghĩa dành tặng đồng nghiệp, đối tác hoặc bạn bè nhân dịp thăng chức.",
    material: "Hợp kim sơn tĩnh điện mạ chrome chống xước.",
    care: "Đậy nắp ngay sau khi viết để mực không bị khô ngòi."
  },

  // 10. Quà Lẻ: Bình Giữ Nhiệt LED Thông Minh
  {
    name: "Bình Giữ Nhiệt Hiển Thị Nhiệt Độ LED Cảm Ứng",
    category: "gom-su-pha-le",
    categoryName: "Gốm Sứ & Pha Lê",
    giftType: "single",
    occasions: ["sinh-nhat", "doanh-nghiep"],
    price: 280000,
    originalPrice: 350000,
    discountPercent: 20,
    badge: "BÁN CHẠY",
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 112,
    soldCount: 430,
    stock: 28,
    brand: "Thermos Tech",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp quà hình trụ thắt nơ tinh tế",
    shortDesc: "Chỉ cần chạm nhẹ vào nắp bình để biết chính xác nhiệt độ đồ uống bên trong.",
    fullDesc: "Ruột bình bằng inox 316 chuẩn y tế giữ nóng 12 tiếng và giữ lạnh 24 tiếng. Nắp bình tích hợp chip cảm biến nhiệt độ thông minh không cần sạc pin.",
    material: "Thép không gỉ SUS 316, lớp chân không cách nhiệt 5 lớp.",
    care: "Không ngâm nắp chứa màn hình LED vào nước quá lâu."
  },

  // 11. Hàng Bán Chậm (Deadstock demonstration item)
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
    shortDesc: "Bộ cờ vua thủy tinh mờ và trong suốt chế tác thủ công tinh xảo, thích hợp trưng bày phòng làm việc.",
    fullDesc: "Thiết kế nghệ thuật độc đáo. Mỗi quân cờ được vát cạnh mượt mà, bàn cờ bằng kính cường lực chống xước mang vẻ đẹp kiêu kỳ và bí ẩn.",
    material: "Thủy tinh quang học cao cấp, bàn cờ kính cường lực 8mm.",
    care: "Lau sạch bằng khăn mềm ẩm, tránh va chạm mạnh."
  },

  // 12. Hàng Bán Chậm (Deadstock demonstration 2)
  {
    name: "Quả Cầu Tuyết Pha Lê Đế Gỗ Phát Sáng Mùa Đông",
    category: "trang-tri-nghe-thuat",
    categoryName: "Decor & Đèn Nghệ Thuật",
    giftType: "single",
    occasions: ["sinh-nhat", "ky-niem"],
    price: 620000,
    originalPrice: 720000,
    discountPercent: 14,
    badge: "XẢ KHO",
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 20,
    soldCount: 18,
    stock: 42,
    brand: "Winter Magic",
    images: [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1000&auto=format&fit=crop"
    ],
    comboItems: [],
    giftBox: "Hộp quà tuyết trắng bông tuyết mùa đông",
    shortDesc: "Quả cầu tuyết thủy tinh trong vắt với lâu đài mùa đông và bông tuyết bay tự động.",
    fullDesc: "Hộp phát nhạc tích hợp đèn đổi màu và motor phun tuyết tự động khi bật công tắc. Thích hợp làm quà sinh nhật hoặc kỷ niệm vào mùa lễ hội.",
    material: "Pha lê K9, nước tinh khiết khử ion, đế gỗ thông mộc.",
    care: "Tránh để nơi có nhiệt độ quá cao hoặc ánh nắng trực tiếp gay gắt."
  }
];

const initialVouchers = [
  { code: "GIFT2026", discount: 15, maxDiscount: 300000, minOrder: 500000, desc: "Giảm 15% tối đa 300.000đ cho đơn quà tặng từ 500.000đ", isShipping: false },
  { code: "FREESHIP", discount: 100, isShipping: true, minOrder: 300000, desc: "Miễn phí vận chuyển toàn quốc cho đơn quà từ 300.000đ" },
  { code: "WELCOME10", discount: 10, maxDiscount: 150000, minOrder: 0, desc: "Giảm 10% cho khách hàng mới đặt quà tặng", isShipping: false }
];

const seedDatabase = async (force = false) => {
  try {
    // 1. Kiểm tra / đồng bộ Categories
    const existingGiftCat = await Category.findOne({ slug: 'hop-qua-combo' });
    if (force || !existingGiftCat) {
      console.log('🌱 Đang đồng bộ danh mục quà tặng LUXE GIFTS lên server...');
      await Category.deleteMany({});
      await Category.insertMany(initialCategories);
      console.log('✅ Đã cập nhật 6 danh mục quà tặng lên MongoDB!');
    }

    // 2. Kiểm tra / đồng bộ Products
    const sampleGiftProd = await Product.findOne({ name: 'Set Quà Cưới Song Hỷ Uyên Ương Hoàng Gia' });
    const prodCount = await Product.countDocuments();
    if (force || !sampleGiftProd || prodCount < 12) {
      console.log('🌱 Đang đồng bộ 12 sản phẩm quà tặng LUXE GIFTS lên server...');
      await Product.deleteMany({});
      await Product.insertMany(initialProducts);
      console.log('✅ Đã cập nhật đủ 12 sản phẩm quà tặng lên MongoDB!');
    }

    // 3. Vouchers
    const voucherCount = await Voucher.countDocuments();
    if (force || voucherCount === 0) {
      await Voucher.deleteMany({});
      await Voucher.insertMany(initialVouchers);
      console.log('✅ Đã tạo vouchers quà tặng!');
    }

    // 4. Users
    let demoUser = await User.findOne({ email: 'demo.customer@luxestore.vn' });
    let adminUser = await User.findOne({ email: 'admin@luxestore.vn' });

    if (!adminUser) {
      adminUser = await User.create({
        fullName: 'Admin Quản Trị LUXE GIFTS',
        email: 'admin@luxestore.vn',
        password: 'Password123!',
        phone: '0988 888 888',
        role: 'admin',
        membership: 'QUẢN TRỊ VIÊN HỆ THỐNG',
      });
      console.log('✅ Đã tạo tài khoản Admin!');
    }

    if (!demoUser) {
      demoUser = await User.create({
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
      });
      console.log('✅ Đã tạo tài khoản Demo Customer!');
    }

    // 5. Orders mẫu gắn với demoUser
    const orderCount = await Order.countDocuments();
    if (force || orderCount === 0) {
      console.log('🌱 Đang tạo đơn hàng mẫu cho tài khoản khách hàng...');
      await Order.deleteMany({});
      await Order.insertMany([
        {
          orderCode: "LUXE-8821",
          userId: demoUser ? demoUser._id : null,
          customerInfo: {
            fullName: "Nguyễn Văn An",
            phone: "0912 345 678",
            email: "demo.customer@luxestore.vn",
            province: "Hà Nội",
            district: "Hoàn Kiếm",
            ward: "Phường Hàng Trống",
            address: "45 Phố Hàng Trống",
            note: "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé!"
          },
          items: [
            {
              name: "Set Quà Cưới Song Hỷ Uyên Ương Hoàng Gia",
              price: 1250000,
              quantity: 1,
              categoryName: "Hộp Quà & Combo",
              image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop"
            }
          ],
          subtotal: 1250000,
          shippingFee: 0,
          discountAmount: 0,
          voucherCode: "",
          total: 1250000,
          paymentMethod: "Chuyển khoản VietQR",
          status: "Đang giao hàng",
          statusCode: "shipping"
        },
        {
          orderCode: "LUXE-8820",
          userId: demoUser ? demoUser._id : null,
          customerInfo: {
            fullName: "Nguyễn Văn An",
            phone: "0912 345 678",
            email: "demo.customer@luxestore.vn",
            province: "Hà Nội",
            district: "Hoàn Kiếm",
            ward: "Phường Hàng Trống",
            address: "45 Phố Hàng Trống",
            note: "Chúc mừng sinh nhật!"
          },
          items: [
            {
              name: "Hộp Quà Sinh Nhật Sweet Joy Pastel Deluxe",
              price: 680000,
              quantity: 1,
              categoryName: "Hộp Quà & Combo",
              image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop"
            },
            {
              name: "Nến Thơm Tinh Dầu Gỗ Đàn Hương & Hổ Phách",
              price: 290000,
              quantity: 1,
              categoryName: "Nến Thơm & Tinh Dầu",
              image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=300&auto=format&fit=crop"
            }
          ],
          subtotal: 970000,
          shippingFee: 0,
          discountAmount: 0,
          voucherCode: "",
          total: 970000,
          paymentMethod: "Thanh toán khi nhận hàng (COD)",
          status: "Đã giao thành công",
          statusCode: "delivered"
        }
      ]);
      console.log('✅ Đã tạo đơn hàng mẫu trên MongoDB!');
    }
  } catch (err) {
    console.error('⚠️ Lỗi khi seed dữ liệu:', err.message);
  }
};

module.exports = {
  seedDatabase,
  OCCASIONS,
  PRICE_RANGES,
  GIFT_TYPES,
  initialCategories,
  initialProducts,
  initialVouchers
};
