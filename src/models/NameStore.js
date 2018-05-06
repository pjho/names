import { observable, computed, action, autorun } from "mobx";

export class NameStore {
  @observable query = '';
  @observable favourites = [];
  female = {};
  male = {};
  names = {
    female: [],
    male: [],
  };

  constructor(rootStore) {
    const storedVals = localStorage.getItem('nz-names')
    if (storedVals) {
      const { favourites } = JSON.parse(storedVals)

      if (favourites) {
        this.favourites = favourites
      }
    }

    autorun(() => {
      localStorage.setItem('nz-names', JSON.stringify({
        favourites: this.favourites,
      }))
    })
  }

  startsWithQuery = (name) => name.toLowerCase().startsWith(this.query.toLowerCase())

  @computed
  get femaleList() {
    return this.names.female.filter(this.startsWithQuery)
  }

  @computed
  get maleList() {
    return this.names.male.filter(this.startsWithQuery)
  }


  @action
  favourite(name) {
    this.favourites.push(name);
  }
}


