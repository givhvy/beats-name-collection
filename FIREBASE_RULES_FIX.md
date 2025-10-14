# Hướng dẫn sửa lỗi Firebase Rules

## Vấn đề
Khi bạn thêm tên vào ứng dụng nhưng không thấy hiển thị, có thể do Firebase Firestore Rules chưa được cấu hình đúng.

## Giải pháp

### Bước 1: Mở Firebase Console
1. Truy cập: https://console.firebase.google.com/
2. Chọn project: **viewnamesformusic**

### Bước 2: Cấu hình Firestore Rules
1. Ở menu bên trái, chọn **Firestore Database**
2. Chọn tab **Rules**
3. Thay thế rules hiện tại bằng code sau:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to beatNames collection
    match /beatNames/{document=**} {
      allow read, write: if true;
    }

    // Allow read/write access to categories collection
    match /categories/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Bước 3: Publish Rules
1. Click nút **Publish** để áp dụng rules mới
2. Đợi vài giây để rules được cập nhật

### Bước 4: Kiểm tra lại ứng dụng
1. Mở ứng dụng và mở **Console** (F12)
2. Thử thêm một tên mới
3. Xem console logs để kiểm tra:
   - `📝 Submitting names: ...` - Form đang submit
   - `🚀 App: handleAddNames called with ...` - App nhận được request
   - `🔥 Firebase: Adding name to Firestore: ...` - Đang thêm vào Firebase
   - `✅ Firebase: Name added with ID: ...` - Thêm thành công
   - `✅ Firebase: Fetched X names from Firestore` - Đọc lại dữ liệu

## Lỗi phổ biến và cách fix

### Lỗi: "Missing or insufficient permissions"
**Nguyên nhân:** Firebase Rules quá chặt chẽ

**Cách fix:** Thay đổi rules như hướng dẫn ở Bước 2

### Lỗi: Thêm vào Firebase thành công nhưng không hiển thị
**Nguyên nhân:** Có thể do:
1. Component NamesList lọc dữ liệu không đúng
2. Category không tồn tại

**Cách fix:**
1. Mở Console (F12)
2. Check xem có log `✅ Firebase: Fetched X names from Firestore` không
3. Kiểm tra category của tên vừa thêm có match với categories không

### Debug thêm
Nếu vẫn chưa hoạt động, mở Console và chạy lệnh sau:

```javascript
// Kiểm tra tất cả names trong state
console.log('All names:', window.location.reload())
```

## Liên hệ
Nếu vẫn gặp vấn đề, gửi screenshot console logs để được hỗ trợ.
