import { HTML, nFlex } from '@brtmvdl/frontend'
import * as COLORS from '../utils/colors.js'

export class PageTop extends HTML {
  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('background-color', COLORS.BLACK_1)
    this.setStyle('color', COLORS.WHITE_1)
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('font-size', '2rem')
    this.setStyle('padding', '1rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getMenuButton())
    flex.append(this.getTitle())
    flex.append(this.getSearchButton())
    return flex
  }

  getMenuButton() {
    return new HTML()
  }

  getTitle() {
    const title = new HTML()
    title.setText('Calendar')
    return title
  }

  getSearchButton() {
    return new HTML()
  }
}
