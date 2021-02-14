import Incident from "../models/Incident";

export default class IncidentDTO {
  id: number;
  title: string;
  value: number;

  constructor(incident: Incident) {
    this.id = incident.id;
    this.title = incident.title;
    this.value = incident.value;
  }

}