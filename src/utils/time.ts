import dayjs from "dayjs"

export  const getTimeAgo = (creationTime: string): string => {
    const now = dayjs()
    const time = dayjs(creationTime)
    const diffInSeconds = now.diff(time, 'second')

    if (diffInSeconds < 60) {
        return 'Vừa xong' 
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} phút trước` 
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} giờ trước` 
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} ngày trước` 
    } else {
        return time.format('DD/MM/YYYY HH:mm') 
    }
}