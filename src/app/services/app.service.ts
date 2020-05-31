import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private appLoader = new BehaviorSubject<boolean>(false);
  private loadingComponents: string[] = []

  addLoadComponent(key: string) {
    if (this.loadingComponents.indexOf(key) === -1) {
      this.loadingComponents.push(key)
      this.setLoader(true)
    }
  }

  clearLoader() {
    this.loadingComponents = []
    this.setLoader(false)
  }

  getLoader() {
    return this.appLoader.asObservable();
  }

  removeLoadedComponent(key: string) {
    const index = this.loadingComponents.indexOf(key);
    if (index > -1) {
      this.loadingComponents = this.loadingComponents.splice(0, index).concat(this.loadingComponents.splice(index + 1, this.loadingComponents.length))
    }
    if (this.loadingComponents.length === 0) {
      this.setLoader(false)
    }
  }

  setLoader(value: boolean) {
    this.appLoader.next(value);
  }
}
