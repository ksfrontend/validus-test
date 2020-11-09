export interface AlbumModel {
    id: number;
    name: string;
    artist_id: number;
    year_released: number;
}

export interface ArtistModel {
    id: number;
    name: string;
}

export interface SongModel {
    id: number;
    album_id: number;
    track: number;
    name: string;

    album_name: string;
    year_released: number;
    artist_id: number;
    artist_name: string;
}