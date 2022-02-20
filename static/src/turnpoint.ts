export class Turnpoint {
    next: Turnpoint;
    previous: Turnpoint;
    lat: number;
    lon: number;


    constructor(a) {
        this.next = a.next ? a.next : null;
        this.previous = a.previous ? a.previous : null;

        // lat and lon of turnpoint
        this.lat = a.options.lat;
        this.lon = a.options.lon;

        // set sector
        this.sector = new Sector(a.options.sector);

        // position in task
        this.position = a.options.position;

        // name of waypoint this turnpoint resides on. "Free turnpoint" if no underlying waypoint
        this.wpName = a.options.waypoint.name ? a.options.waypoint.name : _("Free turnpoint");
        this.wpComment = a.options.waypoint.comment ? a.options.waypoint.comment : "";
        this.wpAltitude = a.options.waypoint.altitude ? a.options.waypoint.altitude : 0;

        // distance to next turnpoint. 0 if last.
        this.updateNextLeg();

        // initial bearing to next and previous
        this.updateBearing();

        // id of this turnpoint on the map
        this.mapId = -1;
    }

    // return latitude of turnpoint
    getLat() {
        return this.lat;
    }

    // return longitude of turnpoint
    getLon() {
        return this.lon;
    }

    // return both longitude and latitude of turnpoint
    getLonLat() {
        return {lon: this.lon, lat: this.lat};
    }

    // next turnpoint
    getNext() {
        return this.next;
    }

    // previous turnpoint
    getPrevious() {
        return this.previous;
    }

    // return position of TP in task
    getPosition() {
        return this.position;
    }

    // set the sector
    setSector(sector) {
        this.sector = sector;
    }

    getSector() {
        return this.sector;
    }

    // set next turnpoint
    setNext(next) {
        this.next = next;
    }

    // set previous turnpoint
    setPrevious(previous) {
        this.previous = previous;
    }

    // set longitude of turnpoint
    setLon(lon) {
        this.lon = lon;
    }

    // set latitude of turnpoint
    setLat(lat) {
        this.lat = lat;
    }

    // set both longitude and latitude of turnpoint
    setLonLat(lon, lat) {
        this.lon = lon;
        this.lat = lat;

        this.updateNextLeg();
        this.updateBearing();

        if (this.previous) {
            this.previous.updateNextLeg();
            this.previous.updateBearing();
        }
        if (this.next) {
            this.next.updateBearing();
        }
    }

    // update the length of next leg
    updateNextLeg() {
        if (this.next) {
            this.nextLegDistance = Util_distVincenty({lon: this.lon, lat: this.lat}, this.next.getLonLat());
        } else
            this.nextLegDistance = 0;
    }

    // update the initial bearing to the previous and next wp
    updateBearing() {
        if (this.next)
            this.nextBearing = calculateBearing(this.getLonLat(), this.next.getLonLat());
        else
            this.nextBearing = -1;

        if (this.previous)
            this.previousBearing = calculateBearing(this.getLonLat(), this.previous.getLonLat());
        else
            this.previousBearing = -1;
    }

    // set the name of the underlying waypoint
    setWaypointName(wpName) {
        this.wpName = wpName;
    }

    // get the name of the underlying waypoint
    getWaypointName() {
        return this.wpName;
    }

    // set the altitude of the underlying waypoint
    setWaypointAltitude(wpAltitude) {
        this.wpAltitude = wpAltitude;
    }

    // get the altitude of the underlying waypoint
    getWaypointAltitude() {
        return this.wpAltitude;
    }

    // set the comment of the underlying waypoint
    setWaypointComment(wpComment) {
        this.wpComment = wpComment;
    }

    // get the comment of the underlying waypoint
    getWaypointComment() {
        return this.wpComment;
    }

    // set position in task of turnpoint
    setPosition(position) {
        this.position = position;
    }

    // set the id of the turnpoint on map
    setMapId(mapId) {
        this.mapId = mapId;
    }

    // get the id of the turnpoint on map
    getMapId() {
        return this.mapId;
    }

    // return the distance to the next turnpoint
    getNextLegDistance() {
        return this.nextLegDistance;
    }

    // return the bearing to the previous turnpoint
    getPreviousBearing() {
        return this.previousBearing;
    }

    // return the bearing to the next turnpoint
    getNextBearing() {
        return this.nextBearing;
    }


}

