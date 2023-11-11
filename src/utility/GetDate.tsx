function GetDate(d: Date) {
    const date = new Date(d)
    return date.toLocaleDateString("default", { day: "2-digit", month: 'short', year: "numeric" })
}

export default GetDate;