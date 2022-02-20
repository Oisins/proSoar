/**
 * task.js
 *
 * This is part of proSoar.
 *
 * (c) 2012, Tobias Lohner <tobias@lohner-net.de>
 *
 * Licenced under GPL v2
**/
import {Turnpoint} from "./turnpoint";

interface Options {
  type: string,
  aat_min_time: number,
  start_max_speed: number,
  start_max_height: number,
  start_max_height_ref: string,
  finish_min_height: number,
  finish_min_height_ref: string,
  fai_finish: boolean
}

export class Task {
  types: {
    racing: {
      name: "Racing Task",
      start: { startline: true, circle: true, faistart: true, bgastartsector: true },
      sectors: { daec: true, circle: true, fai: true, bgafixedcourse: true, bgaenhancedoption: true },
      finish: { finishline: true, circle: true, faifinish: true },
      defaults: { start: 'startline', sector: 'daec', finish: 'finishline' },
      aat_min_time: false,
      fai_finish_def: false,
    },
    aat: {
      name: "Assigned Area Task",
      start: { startline: true, circle: true, faistart: true, bgastartsector: true },
      sectors: { circle: true, sector: true },
      finish: { finishline: true, circle: true, faifinish: true },
      defaults: { start: 'startline', sector: 'circle', finish: 'finishline' },
      aat_min_time: true,
      fai_finish_def: false,
    },
    fai: {
      name: "FAI badge/records",
      start: { startline: true, faistart: true },
      sectors: { fai: true, circle: true },
      finish: { finishline: true, faifinish: true },
      defaults: { start: 'startline', sector: 'fai', finish: 'finishline' },
      aat_min_time: false,
      fai_finish_def: true,
    },
  }

  current: Turnpoint;
  options: Options;
  taskLength: number;
  fai: any;

  constructor() {
    this.current = null;
    this.taskLength = 0;
    //this.fai = new FAI(this);
    this.options = {
      type: 'racing',
      aat_min_time: 3*3600,
      start_max_speed: 60,
      start_max_height: 2000,
      start_max_height_ref: 'MSL',
      finish_min_height: 0,
      finish_min_height_ref: 'AGL',
      fai_finish: false,
    }
  }


  // add TP in task after current TP
//  addAfterCurrent(lonlat, type, sectorId, waypoint_id, waypoint_name) {
  addAfterCurrent(lonlat, type, sectorId, waypoint) {
    const previous = this.current ? this.current : null;
    const next = this.current ? this.current.getNext() : null;
    let position = this.current ? (this.current.getPosition() + 1) : 1;

    this.current = new Turnpoint({
      previous: previous,
      next: next,
      options: {
        lon: lonlat.lon,
        lat: lonlat.lat,
        waypoint: waypoint,
        position: position,
        sector: {
          type: type,
          sectorId: sectorId,
        },
      },
    });

    if (previous) {
      previous.setNext(this.current);
      previous.updateNextLeg();
      previous.updateBearing();
    }

    if (next) {
      next.setPrevious(this.current);
      next.updateBearing();
    }

    var insertPosition = position;

    while(this.next()) {
      position++;
      this.current.setPosition(position);
    }

    this.taskLength++;

    this.fai.addTurnpoint(insertPosition);

    this.gotoTurnpoint(insertPosition);
  }

  // return current TP
  getCurrentTurnpoint() {
    return this.current;
  }

  // return next TP
  getNextTurnpoint() {
    return this.current.getNext()?this.current.getNext():false;
  }

  // return previous TP
  getPreviousTurnpoint() {
    return this.current.getPrevious()?this.current.getPrevious():false;
  }

  // return length of task
  getLength() {
    return this.taskLength;
  }

  // goto first TP
  first() {
    if (!this.current) return false;
    while (this.current.getPrevious()) {
      var previous = this.current.getPrevious();
      this.current = previous;
    }
    return true;
  }

  // goto last TP
  last() {
    if (!this.current) return false;
    while (this.current.getNext()) {
      var next = this.current.getNext();
      this.current = next;
    }
    return true;
  }

  // goto next TP
  next() {
    if (this.current == null) return false;

    var next = this.current.getNext();
    if (next) {
      this.current = next;
      return true;
    } else
      return false;
  }

  // goto previous TP
  previous() {
    if (this.current == null) return false;

    var previous = this.current.getPrevious();
    if (previous) {
      this.current = previous;
      return true;
    } else
      return false;
  }

  // get current position in task
  getPosition() {
    if (this.current) return this.current.getPosition();
    return 0;
  }

  // goto TP
  gotoTurnpoint(number) {
    if (number == this.getPosition()) return true;
    else if (number < this.getPosition()) {
      while (this.previous())
        if (this.getPosition() == number) return true;
    } else if (number > this.getPosition()) {
      while (this.next())
        if (this.getPosition() == number) return true;
    }

    return false;
  }

  // delete current TP
  deleteCurrent() {
    if (this.current == null) return;

    var next = this.current.getNext();
    var previous = this.current.getPrevious();
    var current = null;
    var position = this.current.getPosition();

    this.fai.removeTurnpoint(position);

    if (next && previous) {
      next.setPrevious(previous);
      previous.setNext(next);
      previous.updateNextLeg();

      previous.updateBearing();
      next.updateBearing();

      current = next;
    } else if (next && !previous) {
      next.setPrevious(null);
      next.updateBearing();

      current = next;
    } else if (!next && previous) {
      previous.setNext(null);
      previous.updateNextLeg();
      previous.updateBearing();

      current = previous;
      position--;
    }

    delete this.current;
    this.current = current;


    this.current.setPosition(position);
    while(this.next()) {
      position++;
      this.current.setPosition(position);
    }

    this.taskLength--;
  }

  // set lonlat of current turnpoint
  setCurrentLonLat(lon, lat) {
    this.current.setLonLat(lon, lat);
    var position = this.getPosition();
    this.fai.updateDistances(position);
    this.gotoTurnpoint(position);
  }

  // get type of task
  getType() {
    return this.options.type;
  }

  // set type of task
  setType(type) {
    this.options.type = type;
  }

  getFaiTriangle() {
    return this.fai.isFAI();
  }


  moveDown(position) {
    this.gotoTurnpoint(position);
    if (this.current.getNext() == null) return;

    this.moveUp(this.current.getNext().getPosition());
  }

  moveUp(position) {
    this.gotoTurnpoint(position);
    if (this.current.getPrevious() == null) return;

    var before = this.current.getPrevious().getPrevious();
    var previous = this.current.getPrevious();
    var next = this.current;
    var after = this.current.getNext();

    if (before) {
      before.setNext(next);
      next.setPrevious(before);
    } else {
      // switch turnpoint types
      var temp = next.getSector();
      next.setSector(previous.getSector());
      previous.setSector(temp);
      next.setPrevious(null);
    }

    next.setNext(previous);
    previous.setPrevious(next);

    if (after) {
      previous.setNext(after);
      after.setPrevious(previous);
    } else {
      if (before){
        // switch turnpoint types (but only once if there are only two turnpoints)
        var temp = next.getSector();
        next.setSector(previous.getSector());
        previous.setSector(temp);
      }
      previous.setNext(null);
    }

    var temp = next.getPosition();
    next.setPosition(previous.getPosition());
    previous.setPosition(temp);


    if (before) {
      before.updateBearing();
      before.updateNextLeg();
    }

    next.updateNextLeg();
    next.updateBearing();

    previous.updateNextLeg();
    previous.updateBearing();

    if (after) {
      after.updateBearing();
    }

    this.current = previous;
  }

  // return the total distance around all task turnpoints
  getTotalDistance() {
    if (!this.first()) return 0;

    var taskDistance = 0;

    do {
      taskDistance += this.getCurrentTurnpoint().getNextLegDistance();
    } while (this.next());

    return Math.round(taskDistance/100)/10;
  }

  getTaskBounds() {
    this.first();

    var lat_min = this.current.getLat();
    var lat_max = this.current.getLat();
    var lon_min = this.current.getLon();
    var lon_max = this.current.getLon();


    while (this.next()) {
      if (this.current.getLon() < lon_min)
        lon_min = this.current.getLon();
      else if (this.current.getLon() > lon_max)
        lon_max = this.current.getLon();

      if (this.current.getLat() < lat_min)
        lat_min = this.current.getLat();
      else if (this.current.getLat() > lat_max)
        lat_max = this.current.getLat();
    }

    var add_lon = (lon_max-lon_min)/10;
    var add_lat = (lat_max-lat_min)/10;

    return [lon_min-add_lon, lat_min-add_lat, lon_max+add_lon, lat_max+add_lat];
  }

}


