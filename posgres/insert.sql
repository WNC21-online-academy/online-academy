TRUNCATE Roles CASCADE;
INSERT INTO Roles(role, name)
VALUES ('administrator', 'Quản trị viên'),
  ('teacher', 'Giảng viên'),
  ('student', 'Học viên');
  
TRUNCATE Users CASCADE;
INSERT INTO Users(id, role, fullname, email, password)
VALUES (1, 'administrator', 'Chủ tịch', 'thi174hcmus@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (2, 'teacher', 'Thầy A', 'thile.dev@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (3, 'student', 'Học viên Z', 'ichi.itus@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m');
ALTER SEQUENCE users_id_seq RESTART WITH 4;

TRUNCATE Categories CASCADE;
INSERT INTO Categories(id, name, id_parent)
VALUES (1, 'Lập trình',NULL),
  (2, 'Kinh doanh', NULL),
  (3, 'Tài chính & Kế toán', NULL),
  (4, 'Marketing', NULL),
  (5, 'Tin học văn phòng', NULL),
  (6, 'Thiết kế & Đồ họa', NULL),
  (7, 'Nhiếp ảnh & sáng tạo phim', NULL),
  (8, 'Ngôn ngữ', NULL),
  (9, 'Phát triển bản thân', NULL),
  (10, 'Kỹ năng sống', NULL),
  (11, 'Sức khỏe & Thể thao', NULL),
  (12, 'Âm nhạc', NULL),
  (13, 'Hội họa', NULL),
  (14, 'Khác', NULL),
  -- Children
  -- Lap trinh
  (15, 'Website', 1),
  (16, 'Ứng dụng di động', 1),
  (17, 'Game', 1),
  (18, 'Khoa học dữ liệu', 1),
  (19, 'Cơ sở dữ liệu', 1),
  (20, 'Kiểm thử phần mềm', 1),
  (21, 'Mạng & Bảo mật', 1),
  (22, 'Quản trị hệ thống', 1),
  (23, 'Ngôn ngữ lập trình', 1),
  (24, 'Kiến thức nền tảng', 1),
  (25, 'Kiến thức chuyên sâu', 1),
  (26, 'Chứng chỉ IT', 1),
  -- Kinh doanh
  (27, 'Kinh doanh căn bản', 2),
  (28, 'Giao tiếp', 2),
  (29, 'Quản lý', 2),
  (30, 'Bán hàng', 2),
  (31, 'Chiến lược kinh doanh', 2),
  (32, 'Quản lý chuỗi cung ứng - Logistic', 2),
  (33, 'Luật kinh tế', 2),
  (34, 'Phân tích doanh nghiệp', 2),
  (35, 'Quản lý nhân lực', 2),
  (36, 'Thương mại điện tử', 2),
  (37, 'Truyền thông', 2),
  -- Tai chinh
  (38, 'Quản lý sổ sách', 3),
  (39, 'Nguyên lý kiểm toán', 3),
  (40, 'Kinh tế học', 3),
  (41, 'Quản lý tài chính', 3),
  (42, 'Phân tích tài chính', 3),
  (43, 'Quản lý tài chính', 3),
  (44, 'Đầu tư & giao dịch', 3),
  (45, 'Thuế', 3),
  (46, 'Tài chính phi tập trung', 3),
  -- Marketing
  (47, 'Digital marketing', 4),
  (48, 'Search Engine Optimization (SEO)', 4),
  (49, 'Social media marketing', 4),
  (50, 'Xây dựng thương hiệu', 4),
  (51, 'Marketing cơ bản', 4),
  (52, 'Quan hệ công chúng', 4),
  (53, 'Quảng cáo', 4),
  (54, 'Marketing nội dung', 4),
  (55, 'Marketing sản phẩm', 4),
  -- Tin hoc van phong
  (56, 'Microsoft', 5),
  (57, 'Google', 5),
  (58, 'Apple', 5),
  (59, 'Oracle', 5),
  -- THiet ke do hoa
  (60, 'Thiết kế website', 6),
  (61, 'Thiết kế game', 6),
  (62, 'Thiết kế ứng dụng di động', 6),
  (63, 'Thiết kế trải nghiệm người dùng', 6),
  (64, 'Đồ họa 3D & hoạt cảnh', 6),
  (65, 'Phong cách thiết kệ hiện đại', 6),
  (66, 'Công cụ dùng cho thiết kế', 6),
  (67, 'Thiết kế kiến trúc & xây dựng', 6),
  (68, 'Thiết kế nội nhất', 6),
  -- Nhiep anh & video
  (69, 'Ảnh kỹ thuật số', 7),
  (70, 'Ảnh kỹ chân dung', 7),
  (71, 'Xây dựng video', 7),
  (72, 'Công cụ hỗ trợ', 7),
  -- Ngôn ngữ
  (73, 'Tiếng Anh', 8),
  (74, 'Tiếng Việt', 8),
  (75, 'Tiếng Pháp', 8),
  (76, 'Tiếng Nhật', 8),
  (77, 'Tiếng Hàn', 8),
  (78, 'Tiếng Tây Ban Nha', 8),
  (79, 'Tiếng Nga', 8),
  (80, 'Tiếng Thái', 8),
  -- Phat trien ban than
  (81, 'Kỹ năng lãnh đạo', 9),
  (82, 'Kỹ năng làm việc nhóm', 9),
  (83, 'Phát triển sự nghiệp', 9),
  (84, 'Nuôi dạy con', 9),
  (85, 'Sáng tạo', 9),
  (86, 'Tự tin', 9),
  (87, 'Kiểm soát căng thẳng', 9),
  -- Ky nang song
  (88, 'Nấu ăn', 10),
  (89, 'Làm đẹp', 10),
  (90, 'Chăm sóc thú cưng', 10),
  (91, 'Thường ngày', 10),
  (92, 'Du lịch', 10),
  -- Suc khoe & the thao
  (93, 'Bài tập tại nhà', 11),
  (94, 'Chế độ dinh dưỡng', 11),
  (95, 'Yoga & Thiền định', 11),
  (96, 'Các môn thể thao', 11),
  (97, 'Tự vệ', 11),
  (98, 'Sơ cứu', 11),
  -- Am nhac
  (99, 'Sáng tác', 12),
  (100, 'Dụng cụ', 12),
  (101, 'Thanh nhạc', 12),
  (102, 'Kỹ thuật cơ bản', 12),
  (103, 'Phần mềm hỗ trợ', 12),
  -- Hoi hoa
  (104, 'Sáng tác tranh', 13),
  (105, 'Hình họa', 13),
  (106, 'Kỹ thuật thể hiện tranh', 13),
  (107, 'Chất liệu', 13);
ALTER SEQUENCE categories_id_seq RESTART WITH 108;


TRUNCATE Courses CASCADE;
INSERT INTO Courses(id, id_category, id_created_by, name, description, content, thumbnail, tutition)
VALUES
  -- Lap trinh 15-26
  (1, 15, 1, 'Javascript 2021', 'From Zero to master', 'Khóa học Javascript hiện đại. JavaScript là ngôn ngữ lập trình phổ biến nhất trên thế giới trong suốt 20 năm qua. Nó cũng là một trong số 3 ngôn ngữ chính của lập trình web (Html, Css, Javascript). JavaScript có thể học nhanh và dễ dàng áp dụng cho nhiều mục đích khác nhau, từ việc cải thiện tính năng của website đến việc chạy game và tạo phần mềm nền web. Hơn nữa, có hàng ngàn mẫu template JavaScript và ứng dụng ngoài kia, nhờ vào sự cống hiến của cộng đồng.', 'https://antrandigital.com/wp-content/uploads/2020/07/share-khoa-hoc-javascript-antrandigital.jpg', 1500000),
  (2, 15, 1, 'NodeJs 2021', 'Xây dựng backend', 'NodeJS là một nền tảng được xây dựng trên V8 JavaScript Engine – trình thông dịch thực thi mã JavaScript, giúp xây dựng các ứng dụng web một cách đơn giản và dễ dàng mở rộng.
  Theo khảo sát của Stack Overflow về các framework, nền tảng được sử dụng nhiều nhất năm 2019, NodeJS đã giành vị trí số 1 với số lượng người dùng lên đến gần 50%. Điều đó cho thấy nếu học NodeJS, cơ hội việc làm của bạn sẽ vô cùng rộng mở.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png', 1200000),
  (3, 15, 1, 'Wordpress 2021', 'Công cụ xây dựng website nhanh', 'WordPress là một Hệ quản trị nội dung Mã nguồn mở miễn phí viết bằng ngôn ngữ lập trình PHP cùng với cơ sở dữ liệu MySQL hoặc MariaDB. WordPress là hậu duệ chính thức của b2/cafelog.', 'https://www.semtek.com.vn/wp-content/uploads/2020/08/t%E1%BA%A1o-Website-tin-t%E1%BB%A9c-b%E1%BA%B1ng-Wordpress-2.jpg', 1800000),
  (4, 16, 1, 'Google Flutter', 'Phát triển ứng dụng di động đa nền tảng', 'Flutter là một SDK phát triển ứng dụng di động nguồn mở được tạo ra bởi Google. Nó được sử dụng để phát triển ứng ứng dụng cho Android và iOS, cũng là phương thức chính để tạo ứng dụng cho Google Fuchsia', 'https://colaninfofactors.com/wp-content/uploads/2019/01/FlutterBanner.png', 2500000),
  (5, 17, 1, 'Unity 2021', 'Xây dựng game 3D', 'Unity là một game engine đa nền tảng được phát triển bởi Unity Technologies, mà chủ yếu để phát triển video game cho máy tính, consoles và điện thoại. Lần đầu tiên nó được công bố chạy trên hệ điều hành OS X, tại Apple s Worldwide Developers Conference vào năm 2005, đến nay đã mở rộng 27 nền tảng.', 'https://taap.vn/upload/r/news/1%20tuyen%20unity.jpg', 3200000),
  (6, 18, 1, 'Machine Learning 2021', 'Một tập con của AI', 'Học máy là một lĩnh vực của trí tuệ nhân tạo liên quan đến việc nghiên cứu và xây dựng các kĩ thuật cho phép các hệ thống "học" tự động từ dữ liệu để giải quyết những vấn đề cụ thể. Ví dụ như các máy có thể "học" cách phân loại thư điện tử xem có phải thư rác hay không và tự động xếp thư vào thư mục tương ứng.', 'http://dotnetguru.org/wp-content/uploads/2018/12/machine-learning-va-ai.jpg', 2800000),
  (7, 19, 1, 'PostgreSQL 2021', 'Hệ QTCSDL quan hệ', 'PostgreSQL là một hệ quản trị cơ sở dữ liệu quan hệ và đối tượng dựa trên POSTGRES, bản 4.2, được khoa điện toán của đại học California tại Berkeley phát triển. POSTGRES mở đường cho nhiều khái niệm quan trọng mà các hệ quản trị dữ liệu thương mại rất lâu sau mới có.', 'http://sqladvice.com/wp-content/uploads/2020/08/tinh-nang-cua-postgresql.png', 1200000),
  (8, 20, 1, 'Selenium 2021', 'Công cụ kiểm thử tự động', 'Selenium là bộ kiểm thử tự động miễn phí (mã nguồn mở) dành cho các ứng dụng web trên các trình duyệt và nền tảng khác nhau. Nó khá là giống với HP Quick Test Pro (QTP bây giờ là UFT) chỉ khác là Selenium thì tập trung vào việc tự động hoá các ứng dụng dựa trên nền tảng web. Kiểm thử được thực hiện bằng cách sử dụng công cụ Selenium thường được gọi là Kiểm thử Selenium. Selenium không chỉ là 1 công cụ độc lập mà là 1 bộ công cụ của phần mềm, mỗi bộ đều đáp ứng được nhu cầu kiểm thử khác nhau của 1 tổ chức.', 'https://ec30.org/wp-content/uploads/2017/01/selenium-chart.png', 1400000),
  (9, 21, 1, 'An toàn mạng 2021', 'Ngăn chặn xâm nhập trái phép trên đường truyền mạng', 'Bảo mật mạng là tập hợp các hình thức, công cụ, thiết bị, chương trình được doanh nghiệp sử dụng nhằm mục đích bảo vệ tính riêng tư và an toàn cho những thông tin. Bảo mật mạng giúp hạn chế khả năng truy cập, sửa đổi và đánh cắp dữ liệu từ những cá nhân hoặc tổ chức khác.', 'https://i2.wp.com/1.bp.blogspot.com/-ggRh-2-uGws/XPgZ3Z9GEgI/AAAAAAAABmY/pM8ZbI1evs8m26r5UChIOHaMC8AHeu4ygCLcBGAs/s1600/X5gFB1559764843.png', 1200000),
  (10, 22, 1, 'Linux', 'Quản lý linux server', 'Linux đã đã cho thấy sự tiến bộ vượt bậc so với một thập kỷ trước, nâng bản thân nó từ một hệ điều hành mã nguồn mở trở nên thực sự hữu dụng với mọi người. Nhiều người đã quay lưng lại với Windows để đến với các bản phân phối miễn phí của Linux.', 'https://thietbiketnoi.com/wp-content/uploads/2019/11/linux-la-gi-he-dieu-hanh-ma-nguon-mo.jpg', 1000000),
  (11, 23, 1, 'Golang 2021', 'Ngôn ngữ mã nguồn mở của Google', 'Go là một ngôn ngữ lập trình mới do Google thiết kế và phát triển. Nó được kỳ vọng sẽ giúp ngành công nghiệp phần mềm khai thác nền tảng đa lõi của bộ vi xử lý và hoạt động đa nhiệm tốt hơn.', 'https://matobnews.b-cdn.net/wp-content/uploads/2020/11/go.png', 2000000),
  (12, 24, 1, 'Cấu trúc dữ liệu', 'Rất quan trọng trong mọi khía cạnh của lập trình', 'Trong khoa học máy tính, cấu trúc dữ liệu là một cách lưu dữ liệu trong máy tính sao cho nó có thể được sử dụng một cách hiệu quả. Trong thiết kế nhiều loại chương trình, việc chọn cấu trúc dữ liệu là vấn đề quan trọng.', 'http://zephyrfalcon.org/wp-content/uploads/2020/09/cau-truc-giai-thuat-la-gi.png', 1200000),
  (13, 25, 1, 'Kiến trúc Microservices', 'Một biến thể của kiến trúc hướng dịch vụ (SOA)', 'Microservice là một kỹ thuật phát triển phần mềm, một biến thể của kiến trúc hướng dịch vụ cấu trúc một ứng dụng như một tập hợp các dịch vụ được ghép lỏng lẻo. Trong kiến trúc microservice, các dịch vụ được xử lý tốt và các giao thức rất nhẹ.', 'https://bizflyportal.mediacdn.vn/bizflyportal/1455/2428/2021/05/14/15/26/mic16209591662533.jpeg', 1200000)
  
  -- Kinh doanh 27-37

  -- Tai chinh 38-46
  
  -- Marketing 47-55

  -- Tin hoc van phong 56-59
  
  -- THiet ke do hoa 60-68

  -- Nhiep anh & video 69-72

  -- Ngôn ngữ 73-80

  -- Phat trien ban than 81-87

  -- Ky nang song 88-92

  -- Suc khoe & the thao 9-98

  -- Am nhac 99-103

  -- Hoi hoa 104-107 
;
ALTER SEQUENCE courses_id_seq RESTART WITH 14;

TRUNCATE Rating CASCADE;
INSERT INTO Rating(id, id_course, id_student, score, comment)
VALUES (1, 1, 1, 5, 'Good'),
  (2, 1, 2, 5, 'Good'),
  (3, 2, 1, 5, 'Good'),
  (4, 3, 1, 5, 'Good'),
  (5, 4, 1, 5, 'Good'),
  (6, 5, 1, 5, 'Good'),
  (7, 6, 1, 5, 'Good'),
  (8, 7, 1, 5, 'Good'),
  (9, 8, 1, 5, 'Good'),
  (10, 9, 1, 5, 'Good'),
  (11, 10, 1, 5, 'Good'),
  (12, 11, 1, 5, 'Good'),
  (13, 12, 1, 5, 'Good'),
  (14, 13, 1, 5, 'Good');
ALTER SEQUENCE rating_id_seq RESTART WITH 19;

TRUNCATE AttachmentTypes CASCADE;
INSERT INTO AttachmentTypes(id, type, name)
VALUES (1, 'outline', 'Đề cương tóm tắt'),
  (2, 'video', 'Video bài giảng'),
  (3, 'document', 'File tài liệu');
ALTER SEQUENCE attachmenttypes_id_seq RESTART WITH 19;
