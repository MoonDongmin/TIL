package basic.primitive_type_and_reference_type;

import java.util.Scanner;

public class ProductOrderMain3 {
  public static void main(String[] args) {


    int choiceMenu = choiceMenu();

    ProductOrder[] orders = new ProductOrder[choiceMenu];

    productInfo(choiceMenu, orders);

    printOrders(orders);

    System.out.println("총 금액: " + total(orders));

  }

  static int choiceMenu() {
    Scanner sc = new Scanner(System.in);

    System.out.print("입력할 주문의 개수를 입력하세요: ");
    int number = sc.nextInt();
    return  number;
  }

  static void productInfo(int number, ProductOrder[] orders) {
    Scanner sc = new Scanner(System.in);

    for (int i = 0; i < number; i++) {
      System.out.println((i + 1) + "번째 주문 정보를 입력하세요.");

      System.out.print("상품명: ");
      String productName = sc.nextLine();

      System.out.print("가격: ");
      int price = sc.nextInt();

      System.out.print("수량: ");
      int quantity = sc.nextInt();
      sc.nextLine();

      orders[i] = createProduct(productName, price, quantity);
    }

  }

  static ProductOrder createProduct(String productName, int price, int quantity) {
    ProductOrder productOrder = new ProductOrder();
    productOrder.productName = productName;
    productOrder.price = price;
    productOrder.quantity = quantity;
    return productOrder;
  }

  static void printOrders(ProductOrder[] orders) {
    for (ProductOrder productOrder : orders) {
      System.out.println("상품명: " + productOrder.productName + " 가격: " + productOrder.productName +
              " 수량: " + productOrder.quantity);
    }
  }

  static int total(ProductOrder[] orders) {
    int total = 0;
    for (ProductOrder productOrder : orders) {
      total += productOrder.price * productOrder.quantity;
    }
    return total;
  }

}
