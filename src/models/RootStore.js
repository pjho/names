import _mapValues from 'lodash-es/mapValues'

import { NameStore } from './NameStore'
import { UiStore } from './UiStore'
import { YearStore } from './YearStore'

import { allYears } from "../utils/allyears";


export class RootStore {
  constructor() {
    this.uiStore = new UiStore(this)
    this.nameStore = new NameStore(this)
    this.yearStore = new YearStore(this)
    this.loadCoreData()
  }

  loadCoreData() {
    fetch("/assets/data/baby-names.json")
      .then(resp => resp.json())
      .then((json) => {
        const { female, male, names, totals } = json
        // console.log(json)
        this.nameStore.names = names
        this.nameStore.female = _mapValues(female, (v) => ({ ...v, years: { ...allYears, ...v.years } }))
        this.nameStore.male = _mapValues(male, (v) => ({ ...v, years: { ...allYears, ...v.years } }))

        this.yearStore.totals = totals

        this.uiStore.dataLoaded = true;
      });
  }
}




