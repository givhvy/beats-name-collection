# Hướng dẫn cấu hình Environment Variables trên Vercel

## Vấn đề
Sau khi deploy lên Vercel, ứng dụng không thể kết nối với Firebase vì thiếu environment variables.

## Giải pháp: Thêm Environment Variables trên Vercel

### Bước 1: Truy cập Vercel Dashboard
1. Đăng nhập vào https://vercel.com/
2. Chọn project **beats-name-collection** (hoặc tên project của bạn)

### Bước 2: Mở Settings
1. Click vào tab **Settings** ở menu trên
2. Chọn **Environment Variables** ở menu bên trái

### Bước 3: Thêm các Environment Variables

Thêm từng biến sau (click **Add Another** cho mỗi biến):

| Key | Value |
|-----|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAaFjz90C9VftaujY-hcMCKjtbKdxxGArM` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `viewnamesformusic.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `viewnamesformusic` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `viewnamesformusic.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `797756052377` |
| `VITE_FIREBASE_APP_ID` | `1:797756052377:web:31a763ec6949cab3bdf908` |

**Lưu ý:**
- Chọn environment: **Production**, **Preview**, và **Development** (chọn cả 3)
- Click **Save** sau khi thêm xong

### Bước 4: Redeploy
Sau khi thêm environment variables:

**Option 1: Tự động (Khuyến nghị)**
- Push code mới lên GitHub
- Vercel sẽ tự động deploy với environment variables mới

**Option 2: Manual**
1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click menu **...** (3 chấm)
4. Chọn **Redeploy**

### Bước 5: Kiểm tra
1. Mở website Vercel của bạn
2. Nhấn **Ctrl + Shift + R** để hard refresh
3. Mở Console (F12)
4. Kiểm tra xem có log `🔥 Initializing Firebase with project: viewnamesformusic`
5. Nếu thấy `❌ Firebase configuration is missing!` thì environment variables chưa được set đúng

## Screenshot Environment Variables

Environment Variables page nên trông như thế này:

```
Key                                    Value                                           Environments
VITE_FIREBASE_API_KEY                  AIzaSyAaFjz90C9VftaujY-hcMCKjtbKdxxGArM         Production, Preview, Development
VITE_FIREBASE_AUTH_DOMAIN              viewnamesformusic.firebaseapp.com               Production, Preview, Development
VITE_FIREBASE_PROJECT_ID               viewnamesformusic                               Production, Preview, Development
VITE_FIREBASE_STORAGE_BUCKET           viewnamesformusic.firebasestorage.app          Production, Preview, Development
VITE_FIREBASE_MESSAGING_SENDER_ID      797756052377                                    Production, Preview, Development
VITE_FIREBASE_APP_ID                   1:797756052377:web:31a763ec6949cab3bdf908      Production, Preview, Development
```

## Troubleshooting

### Environment variables không hoạt động?
1. Đảm bảo tên biến bắt đầu bằng `VITE_` (Vite yêu cầu prefix này)
2. Đảm bảo đã chọn đúng environment (Production/Preview/Development)
3. Phải redeploy sau khi thêm environment variables

### Vẫn không kết nối được Firebase?
1. Kiểm tra Firebase Rules (xem file `FIREBASE_RULES_FIX.md`)
2. Kiểm tra console logs xem có error gì không
3. Đảm bảo Firebase project đang hoạt động

## Liên hệ
Nếu vẫn gặp vấn đề, gửi screenshot của:
1. Vercel Environment Variables page
2. Console logs từ website deployed
