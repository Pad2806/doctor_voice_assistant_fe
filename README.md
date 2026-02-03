# Medical Examination Assistant - Frontend (Trợ lý Khám bệnh - Frontend)

## Tổng quan
Đây là ứng dụng giao diện người dùng (frontend) cho hệ thống Trợ lý Khám bệnh (Medical Examination Assistant). Ứng dụng cung cấp giao diện cho bệnh nhân, bác sĩ và quản trị viên để quản lý lịch hẹn, hồ sơ y tế và hỗ trợ chẩn đoán bằng AI.

## Công nghệ sử dụng
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Xác thực & Backend Services:** [Supabase](https://supabase.com/)
- **Tích hợp AI:**
  - [LangChain](https://js.langchain.com/) (AI Chains & Agents)
  - Google Gemini / Groq (Nhà cung cấp LLM)
- **Quản lý trạng thái:** React Hooks
- **Icons:** Lucide React

## Các tính năng chính
- **Cổng thông tin bệnh nhân:** Đặt lịch hẹn, xem lịch sử khám bệnh.
- **Bảng điều khiển bác sĩ:** Quản lý hàng đợi bệnh nhân, ghi chú khám bệnh (Chuyển giọng nói thành văn bản), Chẩn đoán hỗ trợ bởi AI.
- **Trang quản trị (Admin):** Quản lý người dùng, cấu hình hệ thống.
- **Cập nhật thời gian thực:** Sử dụng Supabase Realtime.

## Hướng dẫn cài đặt và chạy

### Yêu cầu tiên quyết
- Node.js (khuyên dùng bản v20 trở lên)
- npm

### Các bước cài đặt

1.  Clone repository và di chuyển vào thư mục frontend:
    ```bash
    cd medical-examination-assistant-fe
    ```

2.  Cài đặt các thư viện phụ thuộc (dependencies):
    ```bash
    npm install
    ```

3.  Cấu hình biến môi trường:
    - Copy file `.env.example` thành `.env.local`:
      ```bash
      cp .env.example .env.local
      ```
    - Cập nhật các giá trị trong `.env.local` với thông tin thực tế của bạn (Supabase URL/Key, Database URL, AI API Keys).

4.  Chạy server development:
    ```bash
    npm run dev
    ```

5.  Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000).

## Cấu trúc dự án
- `/src/app`: Các trang và layout của Next.js App Router.
- `/src/components`: Các thành phần React tái sử dụng.
- `/src/lib`: Các hàm tiện ích, cấu hình cơ sở dữ liệu và client API.
- `/src/lib/db`: Định nghĩa schema Drizzle.