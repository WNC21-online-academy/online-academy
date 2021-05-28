TRUNCATE AccountType CASCADE;
INSERT INTO AccountType(id, type, name)
VALUES (1, 'administrator', 'Quản trị viên'),
  (2, 'teacher', 'Giảng viên'),
  (3, 'student', 'Học viên');
  
TRUNCATE Account CASCADE;
INSERT INTO Account(id, id_type, fullname, email, password)
VALUES (1, 1, 'Chủ tịch', 'thi174hcmus@gmail.com', 'admin');

TRUNCATE Category CASCADE;
INSERT INTO Category(id, name, id_parent)
VALUES (1, 'Làm giàu',NULL),
  (2, 'Lập trình',NULL),
  (3, 'Ngoại ngữ',NULL),
  (4, 'Nghệ thuật',NULL),
  (5, 'Kỹ năng sống',NULL),
  (6, 'Kinh doanh', '1'),
  (7, 'Đầu tư', '1'),
  (8, 'Mobile', '2'),
  (9, 'Web', '2'),
  (10, 'Mobile', '2'),
  (11, 'Game', '2'),
  (12, 'TIếng Anh', '3'),
  (13, 'Tiếng Mỹ', '3 '),
  (14, 'Hát', '4'),
  (15, 'Đàn', '4'),
  (16, 'Rap', '4'),
  (17, 'Kỹ năng mềm', '5'),
  (18, 'Kỹ năng sinh tồn', '5');
  
TRUNCATE Course CASCADE;
INSERT INTO Course(id_category, id_created_by, name, description, content, thumbnail, tutition, is_completed, image_messenger)
VALUES (1, 1, 'Làm giàu 1', 'Thánh lùa gà', 'mô tả nội dung', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU', 1500000, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU'),
(2, 1, 'Giàu', 'Thánh lùa gà', 'mô tả nội dung', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU', 1500000, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU'),
(3, 1, 'Ngoại ngữ 1', 'Cổ nhân', 'mô tả nội dung', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU', 1500000, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU'),
(4, 1, 'Nghệ thuật1', 'Cổ nhân', 'mô tả nội dung', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU', 1500000, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU'),
(4, 1, 'Kỹ năng sống 1', 'Cổ nhân', 'mô tả nội dung', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU', 1500000, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6y1-ILXV5PlvQKG5QVPuGFa1_Qxr6fuARA&usqp=CAU');

TRUNCATE AttachmentType CASCADE;
INSERT INTO AttachmentType(id, type, name)
VALUES (1, 'outline', 'Đề cương tóm tắt'),
  (2, 'video', 'Video bài giảng'),
  (3, 'document', 'File tài liệu');
