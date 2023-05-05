import { Component } from '@angular/core';
import { LocalService } from '../local.service';

export interface Task {
  name: string;
  completed: boolean;
  link?: string;
  index?: number;
  subtasks?: Task[];
}

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})

export class SongListComponent {
  constructor(private localStore: LocalService) { }

  task: Task = {
    name: 'Songs',
    completed: false,
    subtasks: [
      {name: 'Primary', completed: false},
      {name: 'Accent', completed: false},
      {name: 'Warn', completed: false},
    ],
  };

  ngOnInit() {
    let songList = this.localStore.getData('strSongList').split(', ');
    console.log("songList: " + songList);
    let tempSubtasks = [];
    let tempSongDetails = [];
    if (songList.length > 0) {
      for (let i = 0; i < songList.length; i++) {
        tempSongDetails = songList[i].split(' | ');
        console.log("tempSongDetails: " + tempSongDetails);
        tempSubtasks.push({name: tempSongDetails[0], link: tempSongDetails[1], index: i, completed: false});
      }
    }
    this.task.subtasks = tempSubtasks;
    for (let j = 0; j < this.task.subtasks.length; j++) {
      console.log("subtasks ->  name: " + this.task.subtasks[j].name + " link: " + this.task.subtasks[j].link);
    }
  }

  onChange(taskTitle: string) {
    console.log("changed");
    if (this.task.subtasks) {
      for (let j = 0; j < this.task.subtasks.length; j++) {
        console.log("subtasks ->  name: " + this.task.subtasks[j].name + " link: " + this.task.subtasks[j].link);
      }
    }
    let index = -1;
    let currSong = null;
    if (this.task.subtasks) {
      for (let i = 0; i < this.task.subtasks.length; i++) {
        currSong = this.task.subtasks[i];
        if (currSong.name == taskTitle)
          index = i;
          console.log("index: " + index);
      }
    }
    if (this.task.subtasks) {
      this.task.subtasks[index].completed != this.task.subtasks[index].completed;
    }
    this.songList.splice(index, 1);
  }

  songList = [0];

  saveData() {
    //let strSongList = this.songList.toString();
    let strSongList = '';
    let songListArray = null;
    let currSong = null;
    if (this.task.subtasks) {
      songListArray = this.task.subtasks;
      for (let i = 0; i < songListArray.length; i++) {
        currSong = songListArray[i];
        console.log("songListArray[" + i + "]: " + currSong);
        if (currSong.link)
          strSongList += currSong.name + ' | ' + currSong.link + ', ';
      }
      console.log(strSongList);
      this.localStore.saveData('strSongList', strSongList);
      window.location.reload();
    }
  }

  /*
    Given an index (from 1-num songs in the list), subtract 1 to get the index in the songList array, then 
  
  deleteSong(index: number) {
    this.localStore.removeData('strSongList');
    this.songList.splice(index, 1); // 2nd parameter means remove one item only
    console.log("songList: " + this.songList);
  }
  */

  deleteSong() {
    this.localStore.removeData('strSongList');
    this.task.subtasks = [];
    window.location.reload();
  }

  songDetails = '';

  addSong() {
    let songDetailList = this.songDetails.split(', ');
    this.songDetails = '';
    console.log(songDetailList);
    let badSongURL = songDetailList[1].split('youtu.be/');
    console.log("badSongURL: " + badSongURL);
    let searchURL = "" + badSongURL[1];
    let songURL = "https://www.youtube.com/embed/" + searchURL;
    let songName = songDetailList[0];
    let lastSong = null;
    if (this.task.subtasks) {
      lastSong = this.task.subtasks[this.task.subtasks.length - 1];
      this.task.subtasks.push({name: songName, link: songURL, index: (this.task.subtasks.length), completed: false});
      console.log(this.task.subtasks);
    }
    else {
      this.task.subtasks = [{name: songName, link: songURL, index: 0, completed: false}];
      console.log(this.task.subtasks);
    }
    if (this.songList.length > 1)
      this.songList.push(0);
    this.saveData();
    window.location.reload();
  }


  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
