'use client'

export default function UserExaminedTurn({
    numberExaminedTurn,
}: {
    numberExaminedTurn: number
}) {
    return (
        <div className="w-3/7 flex flex-col items-center justify-center rounded-2xl bg-white shadow-third">
            <p className="block h-full px-5 pt-[20px] text-xs font-bold text-[#003553]">
                Số lần bạn khám tại P-Clinic
            </p>
            <p className="m-0 p-0 text-[80px] font-semibold text-[#003553]">
                {numberExaminedTurn <= 10
                    ? '0' + numberExaminedTurn
                    : numberExaminedTurn}
            </p>
        </div>
    )
}
