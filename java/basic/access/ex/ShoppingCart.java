package basic.access.ex;

public class ShoppingCart {
  private Item[] items = new Item[10];
  private int itemCount;

  public void addItem(Item item) {
    if (items.length < itemCount) {
      System.out.println("장바구니가 가득 찼습니다.");
      return;
    }
    items[itemCount] = item;
    itemCount++;
  }


  public void displayItems() {
    for (Item item : items) {
      System.out.println("상품명: " + item.getName() +
              ", 합계: " + (item.getPrice() * item.getQuantity()));
    }
  }

  

}
