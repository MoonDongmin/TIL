package basic.primitive_type_and_reference_type;

public class ProductMain2 {
  public static void main(String[] args) {
    ProductOrder productOrder1 = createOrder("두부", 2000, 2);
    ProductOrder productOrder2 = createOrder("김치", 5000, 1);
    ProductOrder productOrder3 = createOrder("콜라", 1500, 2);

    ProductOrder[] productOrders = {productOrder1, productOrder2, productOrder3};

    printOrders(productOrders);
    int totalAmount = getTotalAmount(productOrders);
    System.out.println("총 결제 금액: " + totalAmount);

  }

  static ProductOrder createOrder(String productName, int price, int quantity) {
    ProductOrder productOrder = new ProductOrder();
    productOrder.productName = productName;
    productOrder.price = price;
    productOrder.quantity = quantity;
    return productOrder;
  }

  static void printOrders(ProductOrder[] orders) {
//    for (int i = 0; i < orders.length; i++) {
//      System.out.println("상품명: " + orders[i].productName + " 가격: " + orders[i].productName +
//              " 수량: " + orders[i].quantity);
//    }
    // 향상된 for문을 사용해서 해보자
    for (ProductOrder productOrder : orders) {
      System.out.println("상품명: " + productOrder.productName + " 가격: " + productOrder.productName +
              " 수량: " + productOrder.quantity);
    }
  }

  static int getTotalAmount(ProductOrder[] orders) {
    int sum = 0;
    for (int i = 0; i < orders.length; i++) {
      sum += orders[i].price * orders[i].quantity;
    }
    return sum;
  }
}
