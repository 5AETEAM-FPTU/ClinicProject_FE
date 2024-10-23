export const generateReportCode = (): string => {
    const currentYear = new Date().getFullYear()
    const randomNumber = Math.floor(100000 + Math.random() * 900000) 
    return `GR-${currentYear}-${randomNumber}`
}
