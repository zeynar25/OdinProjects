export default class Project {
  constructor(name, description = "") {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}
