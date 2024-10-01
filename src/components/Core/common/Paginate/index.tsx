import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Paginate({ totalPages, onPageChange }: { totalPages: number, onPageChange?: (page: number) => void }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Hàm chuyển trang
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return; // Không cho phép đi ra ngoài giới hạn trang
        setCurrentPage(page);
        if (onPageChange)
            onPageChange(page); // Gọi callback với số trang hiện tại
    };

    // Hàm khi nhấn vào nút trang trước đó
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    // Hàm khi nhấn vào nút trang tiếp theo
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Hàm để render các nút trang rút gọn
    const renderPageButtons = () => {
        const buttons = [];
        const pageLimit = 2; // Số trang hiển thị ở đầu, cuối, và xung quanh trang hiện tại

        // Hiển thị các trang đầu tiên
        for (let i = 1; i <= Math.min(pageLimit, totalPages); i++) {
            buttons.push(
                <button
                    key={i}
                    className={`mx-1 px-1 rounded-full ${currentPage === i
                        ? 'bg-gradient-to-r from-[#4D9EE0] to-[#5582BC] text-white'
                        : 'border-[#DEE2E6] border-[1px] text-[#8392AB]'
                        } w-9 h-9`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Hiển thị dấu "..." nếu cần (cho phần giữa)
        if (currentPage > pageLimit + 1) {
            buttons.push(<span key="start-ellipsis" className="mx-2">...</span>);
        }

        // Hiển thị các trang xung quanh trang hiện tại
        const startPage = Math.max(currentPage - 1, pageLimit + 1);
        const endPage = Math.min(currentPage + 1, totalPages - pageLimit);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`mx-1 px-1 rounded-full ${currentPage === i
                        ? 'bg-gradient-to-r from-[#4D9EE0] to-[#5582BC] text-white'
                        : 'border-[#DEE2E6] border-[1px] text-[#8392AB]'
                        } w-9 h-9`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Hiển thị dấu "..." nếu cần (cho phần cuối)
        if (currentPage < totalPages - pageLimit - 1) {
            buttons.push(<span key="end-ellipsis" className="mx-2">...</span>);
        }

        // Hiển thị các trang cuối cùng
        for (let i = Math.max(totalPages - pageLimit + 1, pageLimit + 1); i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`mx-1 px-1 rounded-full ${currentPage === i
                        ? 'bg-gradient-to-r from-[#4D9EE0] to-[#5582BC] text-white'
                        : 'border-[#DEE2E6] border-[1px] text-[#8392AB]'
                        } w-9 h-9`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-center mt-8">
            <button
                className="mx-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9"
                onClick={handlePreviousPage}
                disabled={currentPage === 1} // Vô hiệu hóa nút nếu đang ở trang đầu tiên
            >
                <ChevronLeft className="mx-auto" size={15} />
            </button>

            {renderPageButtons()}

            <button
                className="mx-1 rounded-full border-[#DEE2E6] border-[1px] text-[#8392AB] w-9 h-9"
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Vô hiệu hóa nút nếu đang ở trang cuối cùng
            >
                <ChevronRight className="mx-auto" size={15} />
            </button>
        </div>
    );
}
