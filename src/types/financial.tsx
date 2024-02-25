export type FinancialDto = {
    total_amount: number
    month_date: string
    earning_resources: string
    vender: string
    requested_by: string
    cPercents:number
}

export type AddUserFundDto = {
    user_id: string
    earning_amount:number
}

export type CreateUserFinancialDto = {
    user_id: string
    earning_amount: number
}

export const EarningOption: any[] = [
    { value: "Video Distribution", label: "Video Distribution" },
    { value: "Audio Distribution", label: "Audio Distribution" },
]


export const RequestedOptions: any[] = [
    { value: "Admin", label: "Admin" },
    { value: "Sub Admin", label: "Sub Admin" },
]


export const SelectCommission: any[] = [
    { value: 0, label: "0%" },
    { value: 5, label: "5%" },
    { value: 10, label: "10%" },
    { value: 15, label: "15%" },
]