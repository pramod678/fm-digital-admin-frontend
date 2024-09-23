export type ReleaseInfoDto = {
    ReleaseType: string
    ReleaseTitle: Date
    PrimaryArtist: Date
    FeaturingArtist: string
    Genre: string
    SubGenre: string
    LabelName: number
    ReleaseDate: Date
    PLine: string
    CLine: string
    UPCEAN: string
    users_id: number
    Status: number
    releseInfo_id: number
    ImageDocument: []
}

export type FeatureArtistDto = {
    FeaturingArtist: string
    AppleId: string
    SpotifyId: string
    users_id: Number
}

export type PrimaryArtistDto = {
    PrimaryArtist: string
    AppleId: string
    SpotifyId: string
    users_id: Number
}


export type SongDetailsDto = {
    AudioDocument: string
    Trackversion: string
    Instrumental: string
    Title: string
    VersionSubtitle: string
    Primaryartist: string
    FeaturingArtist: string
    Author: string
    Composer: string
    Producer: string
    Publisher: string
    ISRC: string
    Genre: string
    PriceTier: string
    Subgenre: string
    ExplicitVersion: string
    TrackTitleLanguage: string
    LyricsLanguage: string
    Lyrics: string
    CallerTuneTiming: string
    DistributeMusicvideo: string
    users_id: number
    releseInfo_id: number
    songsInfo_id: number
}