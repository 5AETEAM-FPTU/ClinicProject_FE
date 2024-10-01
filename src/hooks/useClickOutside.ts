import { useEffect } from 'react'

function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Kiểm tra nếu click không nằm trong phần tử ref
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        // Lắng nghe sự kiện click
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            // Hủy lắng nghe khi component unmount
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, callback]) // Chỉ chạy lại effect nếu ref hoặc callback thay đổi
}

export default useClickOutside