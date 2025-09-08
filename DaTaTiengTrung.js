// Dữ liệu từ vựng
const vocabularyData = [
    // 1. Đại từ & nhân xưng
    { chinese: "你", pinyin: "nǐ", meaning: "bạn", category: "1" },
    { chinese: "你好", pinyin: "nǐ hǎo", meaning: "xin chào", category: "1" },
    { chinese: "我", pinyin: "wǒ", meaning: "tôi", category: "1" },
    { chinese: "他", pinyin: "tā", meaning: "anh ấy", category: "1" },
    { chinese: "她", pinyin: "tā", meaning: "cô ấy", category: "1" },
    { chinese: "们", pinyin: "men", meaning: "(hậu tố số nhiều)", category: "1" },
    { chinese: "谁", pinyin: "shuí / shéi", meaning: "ai", category: "1" },
    { chinese: "什么", pinyin: "shénme", meaning: "cái gì", category: "1" },
    
    // 2. Động từ & trợ động từ
    { chinese: "叫", pinyin: "jiào", meaning: "gọi, tên là", category: "2" },
    { chinese: "是", pinyin: "shì", meaning: "là", category: "2" },
    { chinese: "说", pinyin: "shuō", meaning: "nói", category: "2" },
    { chinese: "会", pinyin: "huì", meaning: "biết, có thể", category: "2" },
    { chinese: "去", pinyin: "qù", meaning: "đi", category: "2" },
    { chinese: "回", pinyin: "huí", meaning: "về", category: "2" },
    { chinese: "学", pinyin: "xué", meaning: "học", category: "2" },
    { chinese: "写", pinyin: "xiě", meaning: "viết", category: "2" },
    { chinese: "吃", pinyin: "chī", meaning: "ăn", category: "2" },
    { chinese: "喝", pinyin: "hē", meaning: "uống", category: "2" },
    { chinese: "想", pinyin: "xiǎng", meaning: "muốn, nghĩ", category: "2" },
    { chinese: "买", pinyin: "mǎi", meaning: "mua", category: "2" },
    
    // 3. Nghề nghiệp & quan hệ
    { chinese: "学生", pinyin: "xuéshēng", meaning: "học sinh, sinh viên", category: "3" },
    { chinese: "工程师", pinyin: "gōngchéngshī", meaning: "kỹ sư", category: "3" },
    { chinese: "老师", pinyin: "lǎoshī", meaning: "giáo viên", category: "3" },
    { chinese: "朋友", pinyin: "péngyǒu", meaning: "bạn bè", category: "3" },
    { chinese: "同学", pinyin: "tóngxué", meaning: "bạn học", category: "3" },
    { chinese: "爸爸", pinyin: "bàba", meaning: "bố", category: "3" },
    { chinese: "妈妈", pinyin: "māma", meaning: "mẹ", category: "3" },
    { chinese: "弟弟", pinyin: "dìdi", meaning: "em trai", category: "3" },
    
    // 4. Quốc gia & dân tộc
    { chinese: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", category: "4" },
    { chinese: "美国", pinyin: "Měiguó", meaning: "Mỹ", category: "4" },
    { chinese: "越南", pinyin: "Yuènán", meaning: "Việt Nam", category: "4" },
    { chinese: "人", pinyin: "rén", meaning: "người", category: "4" },
    
    // 5. Ngôn ngữ & chữ viết
    { chinese: "汉语", pinyin: "Hànyǔ", meaning: "tiếng Trung", category: "5" },
    { chinese: "英语", pinyin: "Yīngyǔ", meaning: "tiếng Anh", category: "5" },
    { chinese: "越南语", pinyin: "Yuènányǔ", meaning: "tiếng Việt", category: "5" },
    { chinese: "汉字", pinyin: "Hànzì", meaning: "chữ Hán", category: "5" },
    
    // 6. Thời gian & số đếm
    { chinese: "今天", pinyin: "jīntiān", meaning: "hôm nay", category: "6" },
    { chinese: "昨天", pinyin: "zuótiān", meaning: "hôm qua", category: "6" },
    { chinese: "明天", pinyin: "míngtiān", meaning: "ngày mai", category: "6" },
    { chinese: "月", pinyin: "yuè", meaning: "tháng", category: "6" },
    { chinese: "生日", pinyin: "shēngrì", meaning: "sinh nhật", category: "6" },
    { chinese: "一", pinyin: "yī", meaning: "một", category: "6" },
    { chinese: "二", pinyin: "èr", meaning: "hai", category: "6" },
    { chinese: "三", pinyin: "sān", meaning: "ba", category: "6" },
    { chinese: "四", pinyin: "sì", meaning: "bốn", category: "6" },
    { chinese: "五", pinyin: "wǔ", meaning: "năm", category: "6" },
    { chinese: "六", pinyin: "liù", meaning: "sáu", category: "6" },
    { chinese: "七", pinyin: "qī", meaning: "bảy", category: "6" },
    { chinese: "八", pinyin: "bā", meaning: "tám", category: "6" },
    { chinese: "九", pinyin: "jiǔ", meaning: "chín", category: "6" },
    { chinese: "十", pinyin: "shí", meaning: "mười", category: "6" },
    { chinese: "几", pinyin: "jǐ", meaning: "mấy, bao nhiêu", category: "6" },
    { chinese: "号", pinyin: "hào", meaning: "ngày (trong tháng), số", category: "6" },
    { chinese: "个", pinyin: "gè", meaning: "(lượng từ chung)", category: "6" },
    
    // 7. Thức ăn & đồ uống
    { chinese: "苹果", pinyin: "píngguǒ", meaning: "táo", category: "7" },
    { chinese: "西瓜", pinyin: "xīguā", meaning: "dưa hấu", category: "7" },
    { chinese: "芒果", pinyin: "mángguǒ", meaning: "xoài", category: "7" },
    { chinese: "菠萝", pinyin: "bōluó", meaning: "dứa", category: "7" },
    { chinese: "鸡蛋", pinyin: "jīdàn", meaning: "trứng gà", category: "7" },
    { chinese: "面包", pinyin: "miànbāo", meaning: "bánh mì", category: "7" },
    { chinese: "饼干", pinyin: "bǐnggān", meaning: "bánh quy", category: "7" },
    { chinese: "水果", pinyin: "shuǐguǒ", meaning: "trái cây", category: "7" },
    { chinese: "茶", pinyin: "chá", meaning: "trà", category: "7" },
    { chinese: "咖啡", pinyin: "kāfēi", meaning: "cà phê", category: "7" },
    { chinese: "果汁", pinyin: "guǒzhī", meaning: "nước ép", category: "7" },
    { chinese: "水", pinyin: "shuǐ", meaning: "nước", category: "7" },
    { chinese: "牛奶", pinyin: "niúnǎi", meaning: "sữa", category: "7" },
    { chinese: "啤酒", pinyin: "píjiǔ", meaning: "bia", category: "7" },
    { chinese: "可乐", pinyin: "kělè", meaning: "coca", category: "7" },
    
    // 8. Từ khác
    { chinese: "名字", pinyin: "míngzi", meaning: "tên", category: "8" },
    { chinese: "不", pinyin: "bù", meaning: "không", category: "8" },
    { chinese: "都", pinyin: "dōu", meaning: "đều", category: "8" },
    { chinese: "也", pinyin: "yě", meaning: "cũng", category: "8" },
    { chinese: "和", pinyin: "hé", meaning: "và", category: "8" },
    { chinese: "喜欢", pinyin: "xǐhuān", meaning: "thích", category: "8" },
    { chinese: "再见", pinyin: "zàijiàn", meaning: "tạm biệt", category: "8" },
    { chinese: "吗", pinyin: "ma", meaning: "(trợ từ nghi vấn)", category: "8" },
    { chinese: "哪", pinyin: "nǎ", meaning: "nào", category: "8" },
    { chinese: "这", pinyin: "zhè", meaning: "cái này, đây", category: "8" },
    { chinese: "大", pinyin: "dà", meaning: "to, lớn", category: "8" },
    { chinese: "呢", pinyin: "ne", meaning: "trợ từ (thì sao?)", category: "8" }
];

// Tên danh mục
const categoryNames = {
    "1": "Đại từ & nhân xưng",
    "2": "Động từ & trợ động từ",
    "3": "Nghề nghiệp & quan hệ",
    "4": "Quốc gia & dân tộc",
    "5": "Ngôn ngữ & chữ viết",
    "6": "Thời gian & số đếm",
    "7": "Thức ăn & đồ uống",
    "8": "Từ khác"
};