export type YouTubeClaimsDto = {
    Selectrelease: string
    SelectAudio: string
    Selectplatform: string
    SelectPolicy: string
    PasteURL: string
}

export type ProfileLinkingDto = {
    Selectrelease: string
    SelectAudio: string
    Selectplatform: string
    FecebookLink: string
    InstagramLink: string
    ArtistName:string
}

export const policyOptions: any[] = [
    { value: "Monetize", label: "Monetize" },
    { value: "Remove", label: "Remove" },
    { value: "Block", label: "Block" }
]