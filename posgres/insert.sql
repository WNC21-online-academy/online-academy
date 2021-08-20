TRUNCATE Roles CASCADE;
INSERT INTO Roles(role, name)
VALUES ('administrator', 'Quản trị viên'),
  ('teacher', 'Giảng viên'),
  ('student', 'Học viên');
  

TRUNCATE Users CASCADE;
INSERT INTO Users(id, role, fullname, email, password)
VALUES (1, 'administrator', 'Quản trị viên 1', 'admin1@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (2, 'administrator', 'Quản trị viên 2', 'admin2@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (3, 'teacher', 'Trần Huyền Trang', 'teacher1@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (4, 'teacher', 'Nguyễn Tấn Mân', 'teacher2@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (5, 'teacher', 'Lê Kim Quy', 'teacher3@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (6, 'student', 'Phạm Văn Hai', 'student1@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (7, 'student', 'Hoàng Minh Nhật', 'student2@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (8, 'student', 'Đặng Bảo Thái', 'student3@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (9, 'student', 'Học viên 4', 'student4@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (10, 'student', 'Học viên 5', 'student5@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (11, 'student', 'Học viên 6', 'student6@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (12, 'student', 'Học viên 7', 'student7@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (13, 'student', 'Học viên 8', 'student8@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (14, 'student', 'Học viên 9', 'student9@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (15, 'student', 'Học viên 10', 'student10@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (16, 'student', 'Học viên 11', 'student11@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (17, 'student', 'Học viên 12', 'student12@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (18, 'student', 'Học viên 13', 'student13@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m'),
  (19, 'student', 'Học viên 14', 'student14@gmail.com', '$2b$10$mNyffbvojuMTp3cwhVycPuORtl5a4Jk/YkoBH/FrOrGKOF/0Xtc/m');
ALTER SEQUENCE users_id_seq RESTART WITH 20;


TRUNCATE Categories CASCADE;
INSERT INTO Categories(id, name, id_parent)
-- Parent
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
INSERT INTO Courses(id, id_category, id_created_by, name, description, content, thumbnail, tutition, view_count)
VALUES
  -- Lap trinh 15-26
  (1, 15, 3, 'Javascript 2021', 'From Zero to master - Javacript', 'Khóa học Javascript hiện đại. JavaScript là ngôn ngữ lập trình phổ biến nhất trên thế giới trong suốt 20 năm qua. Nó cũng là một trong số 3 ngôn ngữ chính của lập trình web (Html, Css, Javascript). JavaScript có thể học nhanh và dễ dàng áp dụng cho nhiều mục đích khác nhau, từ việc cải thiện tính năng của website đến việc chạy game và tạo phần mềm nền web. Hơn nữa, có hàng ngàn mẫu template JavaScript và ứng dụng ngoài kia, nhờ vào sự cống hiến của cộng đồng.', 'https://antrandigital.com/wp-content/uploads/2020/07/share-khoa-hoc-javascript-antrandigital.jpg', 1500000, 25),
  (2, 15, 4, 'HTML, CSS căn bản', 'HTML và CSS là xương sống của tất cả công việc tạo kiểu trang web và được coi là nền tảng của công nghệ internet.', 'HTML/CSS có thể nói là khởi đầu của mọi tất cả vấn đề liên quan tới web, dù bạn là người làm nghành nào, miễn là có đụng tới quản trị web thì ít nhất phải biết qua hai cái này. Nếu bạn có ý định học lập trình web thì lại càng nên thành thạo hai cái này, nếu bạn là blogger chuyên viết bài thì cũng nên nắm cái này.', 'https://tuhoclaptrinh.edu.vn/upload/post/16/10/18/tu-hoc-lap-trinh-html-va-css-462993.jpg', 1000000, 19),
  (3, 15, 5, 'NodeJs 2021', 'Tôi đã tạo ra khóa học này để trở thành những gì tôi muốn khi tôi học Node.', 'NodeJS là một nền tảng được xây dựng trên V8 JavaScript Engine – trình thông dịch thực thi mã JavaScript, giúp xây dựng các ứng dụng web một cách đơn giản và dễ dàng mở rộng.
  Theo khảo sát của Stack Overflow về các framework, nền tảng được sử dụng nhiều nhất năm 2019, NodeJS đã giành vị trí số 1 với số lượng người dùng lên đến gần 50%. Điều đó cho thấy nếu học NodeJS, cơ hội việc làm của bạn sẽ vô cùng rộng mở.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png', 1700000, 123),
  (4, 15, 5, 'Reactjs 2021', 'Tôi đã tạo ra khóa học này để trở thành những gì tôi muốn khi tôi học Reactjs.', '- React là một thư viện viết bằng javascript, dùng để xây dựng giao diện người dùng(User Interface – UI). React là một mã nguồn mở được xây dựng bởi chính Facebook. Rất nhiều thương hiệu hàng đầu thế giới đang sử dụng React, như là Facebook & Instagram.
  - Nếu bạn đã biết mô hình MVC, thì ReactJS chính là "V" - View. Sức mạnh khủng khiếp mà Facebook mang đến trong React, đó chính là mô hình DOM, làm tăng khả năng trình diễn các đối tượng trên nền web một cách hiệu quả & tốc độ mượt hơn bất kì Java Script Framework nào trước đây.
  - React rất dễ học nếu như bạn là một beginner, đặc biệt, React cực kì thân thiện đối với bạn nào đã từng học qua JavaScript, CSS hoặc HTML.', 'https://topdev.vn/blog/wp-content/uploads/2019/09/reactjs-nhung-dieu-ban-can-phai-biet-3.png', 1700000, 99),
  (5, 15, 4, 'Vue 3 with composition api', 'Với những cải tiến đáng giá từ performance cho tới API,điển hình là sự ra đời của Composition API thay cho Options API ở Vue 2.', 'Không những thay đổi lớn về performance, không thể chê được vào đâu khi bổ sung hàng loạt tính năng mới, nhưng kích thước của Vue 3 cũng chỉ bằng Vue 2 (12KB).', 'https://images.viblo.asia/cfae9be4-d0bf-45a9-8a81-6c94f02260a5.jpg', 1800000, 188),
  (6, 16, 3, 'Google Flutter', 'Mobile UI framework của Google để tạo ra các giao diện chất lượng cao trên iOS và Android', 'Flutter là một SDK phát triển ứng dụng di động nguồn mở được tạo ra bởi Google. Nó được sử dụng để phát triển ứng ứng dụng cho Android và iOS, cũng là phương thức chính để tạo ứng dụng cho Google Fuchsia', 'https://colaninfofactors.com/wp-content/uploads/2019/01/FlutterBanner.png', 2500000, 67),
  (7, 16, 3, 'React native cho người mới', 'Framework được tạo bởi Facebook, cho phép sử dụng JavaScript để làm mobile app', 'React Native chính là một framework sử dụng mã nguồn mở để có thể xây dựng được các ứng dụng dùng Javascript do Facebook phát hành. Đây là một trong những framework sử dụng cấu hình thiết kế tương tự như React. 
 Hầu hết các giao diện và chức năng của nó đều được cấu thành từ rất nhiều thành phần con. React Native được sử dụng để phát triển cho rất nhiều các ứng dụng di động khác như:  Android, iOS, Web, UWP.', 'https://blog.itnavi.com.vn/wp-content/uploads/2020/06/React-Native-l%C3%A0-g%C3%AC-1.jpg', 2700000, 87),
  (8, 17, 5, 'Unity 2021', 'Xây dựng game 3D', 'Unity là một game engine đa nền tảng được phát triển bởi Unity Technologies, mà chủ yếu để phát triển video game cho máy tính, consoles và điện thoại. Lần đầu tiên nó được công bố chạy trên hệ điều hành OS X, tại Apple s Worldwide Developers Conference vào năm 2005, đến nay đã mở rộng 27 nền tảng.', 'https://taap.vn/upload/r/news/1%20tuyen%20unity.jpg', 3200000, 29),
  (9, 18, 4, 'Machine Learning 2021', 'Machine learning (ML) hay máy học là một nhánh của trí tuệ nhân tạo (AI)', 'Học máy là một lĩnh vực của trí tuệ nhân tạo liên quan đến việc nghiên cứu và xây dựng các kĩ thuật cho phép các hệ thống "học" tự động từ dữ liệu để giải quyết những vấn đề cụ thể. Ví dụ như các máy có thể "học" cách phân loại thư điện tử xem có phải thư rác hay không và tự động xếp thư vào thư mục tương ứng.', 'http://dotnetguru.org/wp-content/uploads/2018/12/machine-learning-va-ai.jpg', 2800000, 234),
  (10, 18, 3, 'Tenserflow và Deep learning', 'Thư viện phần mềm mã nguồn mở dành cho máy học trong nhiều loại hình tác vụ nhận thức và hiểu ngôn ngữ', 'Tensorflow là gì – Với sự bùng nổ của lĩnh vực Trí Tuệ Nhân Tạo – A.I. trong thập kỷ vừa qua, machine learning và deep learning rõ ràng cũng phát triển theo cùng. Và ở thời điểm hiện tại, TensorFlow chính là thư viện mã nguồn mở cho machine learning nổi tiếng nhất thế giới, được phát triển bởi các nhà nghiên cứu từ Google. Việc hỗ trợ mạnh mẽ các phép toán học để tính toán trong machine learning và deep learning đã giúp việc tiếp cận các bài toán trở nên đơn giản, nhanh chóng và tiện lợi hơn nhiều. ', 'https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2020/04/TensorFlowLogo-2100x1200.jpg', 2500000, 219),
  (11, 19, 3, 'PostgreSQL 2021', 'Hệ QTCSDL quan hệ', 'PostgreSQL là một hệ quản trị cơ sở dữ liệu quan hệ và đối tượng dựa trên POSTGRES, bản 4.2https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2020/04/TensorFlowLogo-2100x1200.jpg, được khoa điện toán của đại học California tại Berkeley phát triển. POSTGRES mở đường cho nhiều khái niệm quan trọng mà các hệ quản trị dữ liệu thương mại rất lâu sau mới có.', 'http://sqladvice.com/wp-content/uploads/2020/08/tinh-nang-cua-postgresql.png', 1200000, 48),
  (12, 19, 4, 'Khóa SQL nâng cao 2021', 'Nâng cao kỹ năng truy vấn SQL của bạn và chuyển từ trình độ trung cấp đến nâng cao', 'Nếu bạn đã có một số kinh nghiệm với SQL và muốn phát triển kỹ năng truy vấn của mình lên cấp độ tiếp theo từ trung cấp đến nâng cao thì đây là khóa học hoàn hảo dành cho bạn!
  Không cần tải xuống hoặc cài đặt phần mềm. Chúng tôi sẽ sử dụng Oracle APEX, một ứng dụng dựa trên web - bạn sẽ được thiết lập với cơ sở dữ liệu ảo của riêng mình được lưu trữ trên đám mây! Mặc dù chúng ta sẽ sử dụng Oracle APEX, khóa học được thiết kế để làm nổi bật sự khác biệt chính giữa một số Hệ quản trị cơ sở dữ liệu chính như MySQL và Microsoft SQL Server, vì vậy những gì bạn học được trong khóa học này có thể được áp dụng trên tất cả các nền tảng hỗ trợ SQL.', 'https://cdn.lynda.com/course/139988/139988-637021525148800194-16x9.jpg', 1900000, 72),
  (13, 20, 3, 'Selenium 2021', 'Công cụ kiểm thử tự động', 'Selenium là bộ kiểm thử tự động miễn phí (mã nguồn mở) dành cho các ứng dụng web trên các trình duyệt và nền tảng khác nhau. Nó khá là giống với HP Quick Test Pro (QTP bây giờ là UFT) chỉ khác là Selenium thì tập trung vào việc tự động hoá các ứng dụng dựa trên nền tảng web. Kiểm thử được thực hiện bằng cách sử dụng công cụ Selenium thường được gọi là Kiểm thử Selenium. Selenium không chỉ là 1 công cụ độc lập mà là 1 bộ công cụ của phần mềm, mỗi bộ đều đáp ứng được nhu cầu kiểm thử khác nhau của 1 tổ chức.', 'https://ec30.org/wp-content/uploads/2017/01/selenium-chart.png', 1400000, 24),
  (14, 21, 3, 'An toàn mạng 2021', 'Ngăn chặn xâm nhập trái phép trên đường truyền mạng', 'Bảo mật mạng là tập hợp các hình thức, công cụ, thiết bị, chương trình được doanh nghiệp sử dụng nhằm mục đích bảo vệ tính riêng tư và an toàn cho những thông tin. Bảo mật mạng giúp hạn chế khả năng truy cập, sửa đổi và đánh cắp dữ liệu từ những cá nhân hoặc tổ chức khác.', 'https://i2.wp.com/1.bp.blogspot.com/-ggRh-2-uGws/XPgZ3Z9GEgI/AAAAAAAABmY/pM8ZbI1evs8m26r5UChIOHaMC8AHeu4ygCLcBGAs/s1600/X5gFB1559764843.png', 1200000, 54),
  (15, 22, 2, 'Linux', 'Quản lý linux server', 'Linux đã đã cho thấy sự tiến bộ vượt bậc so với một thập kỷ trước, nâng bản thân nó từ một hệ điều hành mã nguồn mở trở nên thực sự hữu dụng với mọi người. Nhiều người đã quay lưng lại với Windows để đến với các bản phân phối miễn phí của Linux.', 'https://thietbiketnoi.com/wp-content/uploads/2019/11/linux-la-gi-he-dieu-hanh-ma-nguon-mo.jpg', 1400000, 78),
  (16, 22, 3, 'Window Powershell', 'Tìm hiểu PowerShell để kiểm soát và quản trị các máy và máy chủ Windows', 'Khóa đào tạo Học Windows PowerShell từ Infinite Skills này sẽ dạy bạn cách sử dụng trình bao dòng lệnh và ngôn ngữ kịch bản dựa trên tác vụ này, được xây dựng trên .NET framework, được thiết kế đặc biệt cho quản trị hệ thống. Khóa học này được thiết kế cho người mới bắt đầu hoàn toàn, có nghĩa là không cần trải nghiệm trước với Windows PowerShell.
  Bạn sẽ bắt đầu bằng cách tìm hiểu những kiến thức cơ bản về PowerShell, sau đó bắt đầu cài đặt và thiết lập PowerShell. Từ đó, Mark sẽ dạy bạn các lệnh PowerShell, bao gồm các đối tượng và lớp, get-help và get-command. Bạn cũng sẽ tìm hiểu về các tập lệnh và nhà cung cấp PowerShell, chẳng hạn như nhà cung cấp hệ thống tệp, nhà cung cấp bí danh và nhà cung cấp môi trường. Video hướng dẫn này cũng sẽ trình bày cách làm việc với các tệp và thư mục, quản trị hệ thống và PowerShell phiên bản 5.', 'https://adamtheautomator.com/wp-content/uploads/2020/11/Powershell-As-Admin.png', 1000000, 13),
  (17, 23, 3, 'Golang 2021', 'Ngôn ngữ mã nguồn mở của Google', 'Go là một ngôn ngữ lập trình mới do Google thiết kế và phát triển. Nó được kỳ vọng sẽ giúp ngành công nghiệp phần mềm khai thác nền tảng đa lõi của bộ vi xử lý và hoạt động đa nhiệm tốt hơn.', 'https://matobnews.b-cdn.net/wp-content/uploads/2020/11/go.png', 2000000, 111),
  (18, 23, 3, 'Lập trình Python chuyên sâu', 'Khóa học Python cho người mới bắt đầu này dạy bạn ngôn ngữ Python nhanh chóng. Bao gồm đào tạo trực tuyến Python với Python 3', 'Cho dù bạn muốn:
  - xây dựng các kỹ năng bạn cần để có được công việc lập trình Python đầu tiên của bạn
  - chuyển sang vị trí nhà phát triển phần mềm cao cấp hơn
  - bắt đầu với Học máy, Khoa học dữ liệu, Django hoặc các lĩnh vực hấp dẫn khác mà Python chuyên về
  - hoặc chỉ cần học Python để có thể tạo các ứng dụng Python của riêng bạn một cách nhanh chóng.
  Thì bạn cần một nền tảng vững chắc về lập trình Python. Và khóa học này được thiết kế để cung cấp cho bạn những kỹ năng cốt lõi đó một cách nhanh chóng.
  Khóa học này nhằm vào những người mới bắt đầu hoàn thành chưa từng lập trình trước đây, cũng như các lập trình viên hiện tại muốn tăng các lựa chọn nghề nghiệp của họ bằng cách học Python.', 'http://imic-technology.com/images/technology/ban-nen-tham-gia-khoa-hoc-lap-trinh-python-web-django-development-tai-imic-technology-lap-trinh-python-cho-beginer.jpg', 2200000, 100),
  (19, 23, 3, 'C# căn bản', 'Với hơn 50 học viên hài lòng và hơn 15 đánh giá tích cực, khóa học này là khóa học phổ biến nhất nhì để học C# từ đầu!', 'C# là một ngôn ngữ đa nền tảng tuyệt đẹp có thể được sử dụng để xây dựng nhiều ứng dụng khác nhau. Với C #, bạn có thể xây dựng ứng dụng di động (dành cho Windows, Android và iOS), trò chơi, trang web và ứng dụng máy tính để bàn.
  Một khi bạn thành thạo các nguyên tắc cơ bản về C # và lập trình với .NET framework, bạn sẽ có rất nhiều lựa chọn trước mắt. Bạn có thể chọn xây dựng ứng dụng di động nếu muốn hoặc bạn có thể thay đổi công việc và làm việc với tư cách là nhà phát triển web. Miễn là bạn biết rõ các nguyên tắc cơ bản, việc chuyển đổi sang các nền tảng công nghệ khác nhau là điều khá dễ dàng.', 'https://codelearn.io/Upload/Blog/cau-hoi-thuong-gap-khi-phong-van-csharp-63725502869.334.jpg', 1500000, 66),
  (20, 24, 3, 'Cấu trúc dữ liệu', 'Rất quan trọng trong mọi khía cạnh của lập trình', 'Trong khoa học máy tính, cấu trúc dữ liệu là một cách lưu dữ liệu trong máy tính sao cho nó có thể được sử dụng một cách hiệu quả. Trong thiết kế nhiều loại chương trình, việc chọn cấu trúc dữ liệu là vấn đề quan trọng.', 'http://zephyrfalcon.org/wp-content/uploads/2020/09/cau-truc-giai-thuat-la-gi.png', 1200000, 190),
  (21, 24, 3, '300 Giải thuật nâng cao', 'Viết mã nhanh hơn, sử dụng ít bộ nhớ hơn và chuẩn bị cho phỏng vấn thực tế', 'Khóa học này được chuẩn bị dựa trên kinh nghiệm phỏng vấn xin việc Kỹ sư phần mềm thực sự của tôi với Google, Microsoft, Amazon và Snapchat.
  Trong khóa học này, bạn sẽ học cách phân tích các thuật toán như thuật toán Sắp xếp, Tìm kiếm và Đồ thị. Và làm thế nào để giảm độ phức tạp của mã từ cấp độ Big-O này sang cấp độ khác. Hơn nữa, bạn sẽ tìm hiểu các loại Cấu trúc dữ liệu khác nhau cho mã của mình. Ngoài ra, bạn sẽ học cách tìm Big-O cho mọi cấu trúc dữ liệu và cách áp dụng Cấu trúc dữ liệu chính xác cho vấn đề của bạn trong Java. Cuối cùng, bạn sẽ có thể viết mã chạy nhanh hơn và sử dụng bộ nhớ thấp. Bạn cũng sẽ học cách phân tích các vấn đề bằng cách sử dụng Lập trình động.', 'https://nordiccoder.com/app/uploads/2020/06/T%E1%BB%94NG-H%E1%BB%A2P-10-QUY%E1%BB%82N-S%C3%81CH-V%E1%BB%80-THU%E1%BA%ACT-TO%C3%81N-M%C3%80-M%E1%BB%8CI-L%E1%BA%ACP-TR%C3%8CNH-VI%C3%8AN-PH%E1%BA%A2I-%C4%90%E1%BB%8CC-QUA-%C3%8DT-NH%E1%BA%A4T-1-L%E1%BA%A6N-696x457.jpg', 1400000, 134),
  (22, 24, 3, 'Lý thuyết trò chơi', 'Game theory', 'Các chủ đề được đề cập trong các video này bao gồm: cách lưu trữ và biểu diễn đồ thị trên máy tính; các vấn đề lý thuyết đồ thị phổ biến được thấy trong tự nhiên; các thuật toán duyệt đồ thị nổi tiếng (DFS & BFS); Thuật toán đường đi ngắn nhất của Dijkstra (cả phiên bản lười biếng và háo hức); sắp xếp tôpô là gì, cách tìm một loại và những vị trí mà nó được sử dụng; tìm hiểu về cách phát hiện các chu kỳ âm và tìm đường đi ngắn nhất với các thuật toán Bellman-Ford và Floyd-Warshall; khám phá cầu và các điểm khớp trong đồ thị; hiểu và phát hiện các thành phần được kết nối mạnh mẽ với thuật toán của Tarjan, và cuối cùng giải quyết vấn đề người bán hàng lưu động bằng lập trình động.', 'https://miro.medium.com/max/700/1*0EIYm4pF_ZLDv9MUmaFRhA.png', 1200000, 77),
  (23, 25, 3, 'Kiến trúc Microservices', 'Một biến thể của kiến trúc hướng dịch vụ (SOA)', 'Microservice là một kỹ thuật phát triển phần mềm, một biến thể của kiến trúc hướng dịch vụ cấu trúc một ứng dụng như một tập hợp các dịch vụ được ghép lỏng lẻo. Trong kiến trúc microservice, các dịch vụ được xử lý tốt và các giao thức rất nhẹ.', 'https://bizflyportal.mediacdn.vn/bizflyportal/1455/2428/2021/05/14/15/26/mic16209591662533.jpeg', 1200000, 125),
  (24, 25, 3, 'CI/CD', 'CI (Continuous Integration) và CD (Continuous Delivery)', 'CI là Continuous Integration. Nó là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được "build" tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Cả team nhận thấy rằng cách tiếp cận này giảm thiểu vấn đề tích hợp và cho phép phát triển phần mềm nhanh hơn.', 'https://www.parasoft.com/wp-content/uploads/2021/04/CICD_CICD.png', 1000000, 89),
  (25, 25, 4, 'Git', 'Hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS)', 'Các dự án thực tế thường có nhiều lập trình viên làm việc song song. Vì vậy, một hệ thống kiểm soát phiên bản như Git là cần thiết để đảm bảo không có xung đột code giữa các lập trình viên.
  Ngoài ra, các yêu cầu trong các dự án như vậy thay đổi thường xuyên. Vì vậy, một hệ thống kiểm soát phiên bản cho phép các nhà phát triển revert và quay lại phiên bản cũ hơn của code.', 'https://hocjava.com/wp-content/uploads/2021/03/git-logo.jpg', 900000, 89),
  (26, 25, 3, 'DevOps', 'Development (Dev) và Operations (Ops)', 'DevOps là một văn hóa làm việc đề cao sự hợp tác, kéo hai giai đoạn phát triển (development) và vận hành (operations) xích lại gần nhau hơn. DevOps cần học nhiều một số ngôn ngữ lập trình cần thiết như: Python, Ruby, Lua Scripting và cả một số tool tùy theo yêu cầu công việc cụ thể.', 'https://import.viva64.com/docx/blog/0710_DevOps_vs_DevSecOps/image4.png', 1700000, 89)
  
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
ALTER SEQUENCE courses_id_seq RESTART WITH 26;


TRUNCATE Lessons CASCADE;
INSERT INTO Lessons(id, id_course, sort_order, title, description, video)
VALUES (1, 1, 1, 'Giới thiệu javasript', '', '/videos/1-1.mp4'),
  (2, 1, 2, 'Công cụ', '', '/videos/1-2.mp4'),
  (3, 1, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (4, 2, 1, 'Giới thiệu html', '', '/videos/1-1.mp4'),
  (5, 2, 2, 'Giới thiệu css', '', '/videos/1-2.mp4'),
  (6, 2, 3, 'Công cụ lập trình', '', '/videos/1-3.mp4'),
  (7, 2, 4, 'Cắt psd', '', '/videos/1-1.mp4'),
  (8, 3, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (9, 3, 2, 'Cài đặt môi trường', '', '/videos/1-2.mp4'),
  (10, 3, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (11, 4, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (12, 4, 2, 'Biến, hằng, kiểu dữ liệu', '', '/videos/1-2.mp4'),
  (13, 5, 1, 'Ôn lại Vue 2', '', '/videos/1-1.mp4'),
  (14, 5, 2, 'Vue 3 có gì mới', '', '/videos/1-2.mp4'),
  (15, 5, 3, 'Option Api', '', '/videos/1-3.mp4'),
  (16, 5, 4, 'Composition Api', '', '/videos/1-2.mp4'),
  (17, 5, 5, 'Code dự án thực tế', '', '/videos/1-3.mp4'),
  (18, 6, 1, 'Giới thiệu javasript', '', '/videos/1-1.mp4'),
  (19, 6, 2, 'Công cụ', '', '/videos/1-2.mp4'),
  (20, 6, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (21, 7, 1, 'Giới thiệu html', '', '/videos/1-1.mp4'),
  (22, 7, 2, 'Giới thiệu css', '', '/videos/1-2.mp4'),
  (23, 7, 3, 'Công cụ lập trình', '', '/videos/1-3.mp4'),
  (24, 7, 4, 'Cắt psd', '', '/videos/1-1.mp4'),
  (25, 8, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (26, 8, 2, 'Cài đặt môi trường', '', '/videos/1-2.mp4'),
  (27, 8, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (28, 9, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (29, 9, 2, 'Biến, hằng, kiểu dữ liệu', '', '/videos/1-2.mp4'),
  (30, 10, 1, 'Giới thiệu javasript', '', '/videos/1-1.mp4'),
  (31, 10, 2, 'Công cụ', '', '/videos/1-2.mp4'),
  (32, 10, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (33, 11, 1, 'Giới thiệu html', '', '/videos/1-1.mp4'),
  (34, 11, 2, 'Giới thiệu css', '', '/videos/1-2.mp4'),
  (35, 11, 3, 'Công cụ lập trình', '', '/videos/1-3.mp4'),
  (36, 11, 4, 'Cắt psd', '', '/videos/1-1.mp4'),
  (37, 12, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (38, 12, 2, 'Cài đặt môi trường', '', '/videos/1-2.mp4'),
  (39, 12, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (40, 13, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (41, 13, 2, 'Biến, hằng, kiểu dữ liệu', '', '/videos/1-2.mp4'),
  (42, 14, 1, 'Giới thiệu javasript', '', '/videos/1-1.mp4'),
  (43, 14, 2, 'Công cụ', '', '/videos/1-2.mp4'),
  (44, 14, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (45, 15, 1, 'Giới thiệu html', '', '/videos/1-1.mp4'),
  (46, 15, 2, 'Giới thiệu css', '', '/videos/1-2.mp4'),
  (47, 15, 3, 'Công cụ lập trình', '', '/videos/1-3.mp4'),
  (48, 15, 4, 'Cắt psd', '', '/videos/1-1.mp4'),
  (49, 16, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (50, 16, 2, 'Cài đặt môi trường', '', '/videos/1-2.mp4'),
  (51, 16, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (52, 17, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (53, 17, 2, 'Biến, hằng, kiểu dữ liệu', '', '/videos/1-2.mp4'),
  (54, 18, 1, 'Giới thiệu javasript', '', '/videos/1-1.mp4'),
  (55, 18, 2, 'Công cụ', '', '/videos/1-2.mp4'),
  (56, 18, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (57, 19, 1, 'Giới thiệu html', '', '/videos/1-1.mp4'),
  (58, 19, 2, 'Giới thiệu css', '', '/videos/1-2.mp4'),
  (59, 19, 3, 'Công cụ lập trình', '', '/videos/1-3.mp4'),
  (60, 19, 4, 'Cắt psd', '', '/videos/1-1.mp4'),
  (61, 20, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (62, 20, 2, 'Cài đặt môi trường', '', '/videos/1-2.mp4'),
  (63, 20, 3, 'Cú pháp', '', '/videos/1-3.mp4'),
  (64, 21, 1, 'Giới thiệu', '', '/videos/1-1.mp4'),
  (65, 21, 2, 'Biến, hằng, kiểu dữ liệu', '', '/videos/1-2.mp4');

ALTER SEQUENCE lessons_id_seq RESTART WITH 66;


TRUNCATE Course_Details CASCADE;
INSERT INTO Course_Details(id_user, id_course)
VALUES  (1, 1),
  (6, 2),
  (6, 3),
  (6, 4),
  (6, 5),
  (7, 1),
  (7, 2),
  (7, 3),
  (7, 4),
  (7, 7),
  (7, 8),
  (7, 10),
  (7, 11),
  (7, 15),
  (7, 16),
  (7, 19),
  (8, 1),
  (8, 2),
  (8, 3),
  (8, 4),
  (8, 5),
  (8, 6),
  (8, 7),
  (9, 2),
  (9, 14),
  (9, 17),
  (10, 3),
  (10, 6),
  (11, 2),
  (11, 3),
  (11, 4),
  (11, 5),
  (12, 1),
  (12, 2),
  (13, 13),
  (13, 12),
  (13, 7),
  (13, 8),
  (13, 10),
  (14, 11),
  (14, 15),
  (14, 16),
  (14, 19),
  (14, 1),
  (15, 2),
  (15, 7),
  (15, 4),
  (15, 5),
  (16, 6),
  (17, 7);


TRUNCATE Rating CASCADE;
INSERT INTO Rating(id, id_course, id_student, score, comment)
VALUES (1, 1, 7, 4, 'Tốt'),
  (2, 1, 9, 3, 'Tạm'),
  (3, 2, 8, 5, 'Hay'),
  (4, 2, 10, 1, 'Tệ'),
  (5, 2, 11, 5, 'Tốt'),
  (6, 3, 10, 4, 'Khá hay'),
  (7, 4, 12, 5, 'Good'),
  (8, 4, 13, 3, 'Tạm'),
  (9, 5, 14, 5, 'Rất hay'),
  (10, 6, 14, 5, 'Rất hay'),
  (11, 7, 15, 3, 'Tốt'),
  (12, 7, 10, 5, 'Hay'),
  (13, 8, 13, 4, 'Ổn'),
  (14, 9, 12, 3, 'OK'),
  (15, 10, 7, 4, 'Tốt'),
  (16, 10, 9, 3, 'Tạm'),
  (17, 11, 8, 5, 'Hay'),
  (18, 12, 10, 1, 'Tệ'),
  (19, 13, 11, 5, 'Tốt'),
  (20, 13, 10, 4, 'Khá hay'),
  (21, 14, 12, 5, 'Good'),
  (22, 15, 13, 3, 'Tạm'),
  (23, 15, 14, 5, 'Rất hay'),
  (24, 16, 14, 5, 'Rất hay'),
  (25, 17, 15, 3, 'Tốt'),
  (26, 17, 10, 5, 'Hay'),
  (27, 18, 13, 4, 'Ổn'),
  (29, 19, 12, 3, 'OK');
ALTER SEQUENCE rating_id_seq RESTART WITH 30;

-- TRUNCATE AttachmentTypes CASCADE;
-- INSERT INTO AttachmentTypes(id, type, name)
-- VALUES (1, 'outline', 'Đề cương tóm tắt'),
--   (2, 'video', 'Video bài giảng'),
--   (3, 'document', 'File tài liệu');
-- ALTER SEQUENCE attachmenttypes_id_seq RESTART WITH 19;
