// Import các thư viện cần thiết từ Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa kiểu dữ liệu cho một item trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

// Định nghĩa interface cho store quản lý giỏ hàng
interface CartStore {
  items: CartItem[]; // Mảng chứa các sản phẩm trong giỏ
  addItem: (item: CartItem) => void; // Thêm sản phẩm vào giỏ
  removeItem: (id: string) => void;  // Giảm số lượng hoặc xóa sản phẩm
  clearCart: () => void;            // Xóa toàn bộ giỏ hàng
}

// Tạo store Zustand với middleware persist để lưu vào localStorage
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [], // Khởi tạo giỏ hàng trống

      // Hàm thêm sản phẩm vào giỏ
      addItem: (item) =>
        set((state) => {
          // Kiểm tra xem sản phẩm đã có trong giỏ chưa
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            // Nếu đã có → tăng số lượng
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity } // tăng số lượng
                  : i // giữ nguyên item khác
              ),
            };
          }

          // Nếu chưa có → thêm mới vào giỏ
          return { items: [...state.items, item] };
        }),

      // Hàm giảm số lượng sản phẩm hoặc xóa nếu về 0
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 } // giảm số lượng
                  : item
              )
              .filter((item) => item.quantity > 0), // chỉ giữ lại item có số lượng > 0
          };
        }),

      // Hàm xóa toàn bộ giỏ hàng
      clearCart: () => set(() => ({ items: [] })),
    }),

    // Cấu hình persist: lưu vào localStorage với key là "cart"
    { name: "cart" }
  )
);
