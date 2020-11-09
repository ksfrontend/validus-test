import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { AlbumModel, ArtistModel, SongModel } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public albums: AlbumModel[] = [];
  public artists: ArtistModel[] = [];
  public songs: SongModel[] = [];
  public currentPage: number;
  public totalItems: number;
  public itemsPerPage: number = 10;
  public sort: string;
  public order: string;
  public currentOrder: string;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  ngOnInit() {
    let self = this;
    self.GetArtistList(function () {
      self.GetAlbumList(function () {
        self.GetSongTotalItems(function () {
          self.GetSongList();
        });
      });
    });
  }

  public GetAlbumList(callback) {
    let self = this;
    self.commonService.ApiCall('/albums', null, true,
      function (response: AlbumModel[]) {
        self.albums = response;
        if (callback)
          callback();
      });
  }

  public GetArtistList(callback) {
    let self = this;
    self.commonService.ApiCall('/artists', null, true,
      function (response: ArtistModel[]) {
        self.artists = response;
        if (callback)
          callback();
      });
  }

  public GetSongTotalItems(callback) {
    let self = this;
    self.commonService.ApiCall('/songs', null, true,
      function (response: SongModel[]) {
        self.totalItems = response.length;
        if (callback)
          callback();
      });
  }

  public GetSongList(pageNumber: number = 1, sort: string = 'track', order: string = 'asc') {//
    let self = this;
    self.currentPage = pageNumber;

    let songUrl = '/songs?_page=' + pageNumber + '&_limit=' + this.itemsPerPage;
    if (sort) {
      songUrl += '&_sort=' + sort;

      if (order) {
        songUrl += '&_order=' + order;
      }
    }

    self.commonService.ApiCall(songUrl, null, true,
      function (response: SongModel[]) {
        self.songs = response;

        self.songs.forEach((song: SongModel) => {
          let album = self.albums.find(t => t.id == song.album_id) as AlbumModel;
          if (album) {
            song.album_name = album.name;
            song.year_released = album.year_released;

            let artist = self.artists.find(t => t.id == album.artist_id) as ArtistModel;
            if (artist) {
              song.artist_id = artist.id;
              song.artist_name = artist.name;
            }
          }
        });
      });
  }

  public toggleDirection(sort: string = 'track') {
    if (this.currentOrder == 'asc') {
      this.currentOrder = 'desc';
    } else {
      this.currentOrder = 'asc';
    }

    this.GetSongList(1, sort, this.currentOrder);
  }
}
