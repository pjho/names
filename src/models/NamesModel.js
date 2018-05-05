import { observable, computed, action, autorun } from "mobx";

/*
  Responsibilities
  - Load data?
  - Query and filter
  - Favorites


  - Year store??? this would be seperate but loaded at the same time
*/



class NamesModel {
  @observable favourites = [];
  @observable query = '';

  constructor() {
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

  // @computed
  // get totalSpend() {
  //   return this.expenses.reduce((total, ex) => (total + ex.amount), 0)
  // }

  @action
  favourite(name) {
    this.favourites.push(name);
  }
}

export const nameStore = new NamesModel()
// window.nameStore = nameStore

