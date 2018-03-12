import { observable, action } from 'mobx';

class StateStore {
  @observable public inventoryTab = 'ingredients';
  @observable public showBackButton = false;
  @observable public addInventoryOpen = false;
  @observable public addOrderOpen = false;
  @observable public addFoodOpen = false;
  @observable public createIngredientOption = 'condiments';
  @observable public selectedVariety = 'Pork';
  @observable public showVariety = false;
  @observable public quantityModalOpen = false;
  @observable public showUpdateIngredient = false;
  @observable public showOrderFood = false;
  @observable public showCheckout = false;
  @observable public addShoppingListFormOpen = true;
  @observable public editShoppingListFormOpen = true;
  @observable public showFoodCategories = false;
  @observable public confirmationPrompted = true;

  @action
  public setIngredientOption(option) {
    this.createIngredientOption = option;
  }

  @action.bound
  public setVariety(variety) {
    this.selectedVariety = variety;
  }

  @action.bound
  public toggle(prop) {
    this[prop] = !this[prop];
  }

}

export default new StateStore();
