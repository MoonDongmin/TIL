package basic.access.ex;

public class Item {
  private String name;
  private int price;
  private int quantity;

  public Item(String name, int price, int quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  public String getName() {
    return name;
  }


  public int getPrice() {
    return price;
  }

  public int getQuantity() {
    return quantity;
  }

  // 추가한 로직
  public int getTotalPrice() {
    return price * quantity;
  }
}
