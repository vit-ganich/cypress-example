export default class WebElement {
  protected _selector: string | keyof HTMLElementTagNameMap;
  /**
   * Search for element contains a text using cy.contains
   */
  protected contains: boolean = false;

  get selector() {
    return this._selector;
  }

  /**
   *
   * @param selector string selector
   * @param options flag to search for containing text
   */
  constructor(
    selector: string | keyof HTMLElementTagNameMap,
    { contains = false } = {},
  ) {
    this._selector = selector;
    this.contains = contains;
  }

  /**
   * Find an element using cy.get()
   * @param options
   * @returns
   */
  get(
    options?: Partial<
      Cypress.Loggable &
        Cypress.Timeoutable &
        Cypress.Withinable &
        Cypress.Shadow
    >,
  ) {
    if (this.contains) {
      return cy.contains(this._selector, options);
    }
    return cy.get(this._selector, options);
  }

  /**
   * Click on the element
   * @param options
   * @returns
   */
  click(
    options?: Partial<Cypress.ClickOptions>,
  ): Cypress.Chainable<JQuery> | Cypress.Chainable<undefined> {
    return this.get().click(options);
  }
}
